

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail, MapPin, Clock, Github, Linkedin,
  CheckCircle2, Radio, Activity, Cpu, Terminal
} from "lucide-react";
import { getContact, type Contact } from "@/lib/contact";

export default function ContactSection() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typingIndex, setTypingIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const terminalLines = [
    "> visitor_detected",
    "> ai_console_online",
    "> secure_channel_ready",
    "> awaiting_transmission"
  ];

  const gridLines = Array.from({ length: 20 }, (_, i) => i);

  useEffect(() => { getContact().then(setContact); }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTypingIndex((p) => (p + 1) % terminalLines.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate field lengths to match backend requirements
    if (formData.name.trim().length < 2) {
      setIsSubmitting(false);
      setError('Name must be at least 2 characters');
      return;
    }

    if (formData.email.trim().length === 0) {
      setIsSubmitting(false);
      setError('Email is required');
      return;
    }

    if (formData.subject.trim().length < 5) {
      setIsSubmitting(false);
      setError('Subject must be at least 5 characters');
      return;
    }

    if (formData.message.trim().length < 20) {
      setIsSubmitting(false);
      setError('Message must be at least 20 characters');
      return;
    }

    try {
      // Prepare payload with exact field names matching backend Pydantic model
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      // Debug: log what we're sending
      console.log('Sending:', payload);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/send`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Response error:', response.status, errorData);
        const errorMessage = errorData?.detail || `Server error (${response.status})`;
        throw new Error(errorMessage);
      }

      // Success - show success state
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      // Error - show error message
      setIsSubmitting(false);
      setError('Failed to send. Please try again or contact directly at mahabrizwan@gmail.com');
    }
  };

  if (!contact) return null;

  return (
    <section id="contact" className="relative overflow-hidden py-24 px-4 bg-gray-50 dark:bg-[#060816]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, rgba(99,102,241,${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? '.15' : '.08'}), transparent 40%)`
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-20 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
        {gridLines.map((i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
            style={{ top: `${(i * 5)}%`, width: '100%' }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[120px] md:text-[220px] font-black text-gray-900/[0.02] dark:text-white/[0.03]">
          CONTACT
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 dark:bg-indigo-500/10 bg-indigo-500/20">
            <Radio size={14} className="text-indigo-500 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-300 text-xs uppercase tracking-[3px]">
              AI Mission Console
            </span>
          </div>

          <h2 className="mt-6 text-5xl md:text-7xl font-black text-gray-900 dark:text-white">
            Let's Build The Future
          </h2>

          <p className="mt-4 text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
            {contact.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="rounded-3xl border border-indigo-500/20 bg-white/90 dark:bg-black/40 dark:backdrop-blur-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="text-indigo-500 dark:text-indigo-400" size={20} />
                <span className="text-indigo-600 dark:text-indigo-300 font-mono text-sm uppercase tracking-wider">System Console</span>
              </div>

              <div className="text-green-500 dark:text-green-400 font-mono text-lg mb-8 flex items-center gap-2">
                <span className="animate-pulse">▸</span>
                {terminalLines[typingIndex]}
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-indigo-500/20">
                  <Mail className="text-indigo-500 dark:text-indigo-400 mt-1" size={18} />
                  <div>
                    <div className="text-gray-500 dark:text-white/60 text-xs uppercase tracking-wide mb-1">Email</div>
                    <div className="text-gray-900 dark:text-white font-medium">{contact.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-indigo-500/20">
                  <MapPin className="text-indigo-500 dark:text-indigo-400 mt-1" size={18} />
                  <div>
                    <div className="text-gray-500 dark:text-white/60 text-xs uppercase tracking-wide mb-1">Location</div>
                    <div className="text-gray-900 dark:text-white font-medium">{contact.location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-indigo-500/20">
                  <Clock className="text-indigo-500 dark:text-indigo-400 mt-1" size={18} />
                  <div>
                    <div className="text-gray-500 dark:text-white/60 text-xs uppercase tracking-wide mb-1">Response Time</div>
                    <div className="text-gray-900 dark:text-white font-medium">{contact.responseTime}</div>
                  </div>
                </div>
              </div>

              {formData.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30"
                >
                  <div className="text-cyan-500 dark:text-cyan-400 font-mono text-xs flex items-center gap-2">
                    <Activity size={14} className="animate-pulse" />
                    AI IDENTIFIED VISITOR: {formData.name.toUpperCase()}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { Icon: Activity, label: "GitHub Active" },
                { Icon: Cpu, label: "LinkedIn Active" },
                { Icon: Terminal, label: "Email Active" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-2xl border border-indigo-500/30 p-4 bg-white/90 dark:bg-black/40 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, borderColor: "rgba(99,102,241,0.6)" }}
                  transition={{ duration: 0.2 }}
                >
                  <item.Icon className="text-indigo-500 dark:text-indigo-400 mb-2" size={20} />
                  <div className="text-gray-900 dark:text-white text-xs font-semibold">{item.label}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
                    <span className="text-green-600 dark:text-green-400 text-[10px]">ONLINE</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.a
                href={contact.githubUrl}
                className="rounded-2xl border border-indigo-500/30 p-4 text-gray-900 dark:text-white flex justify-center items-center gap-2 bg-white/90 dark:bg-black/40 backdrop-blur-sm transition-all"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}
                transition={{ duration: 0.2 }}
              >
                <Github size={18}/> GitHub
              </motion.a>
              <motion.a
                href={contact.linkedinUrl}
                className="rounded-2xl border border-indigo-500/30 p-4 text-gray-900 dark:text-white flex justify-center items-center gap-2 bg-white/90 dark:bg-black/40 backdrop-blur-sm transition-all"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}
                transition={{ duration: 0.2 }}
              >
                <Linkedin size={18}/> LinkedIn
              </motion.a>
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-500/20 bg-white/90 dark:bg-white/[0.03] p-8 backdrop-blur-2xl">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-4 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white border border-indigo-500/30 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-white/40"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-4 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white border border-indigo-500/30 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-white/40"
                />
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full p-4 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white border border-indigo-500/30 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-white/40"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={6}
                  className="w-full p-4 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white border border-indigo-500/30 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-white/40 resize-none"
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  animate={{ x: btnPos.x, y: btnPos.y }}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setBtnPos({
                      x: (e.clientX - r.left - r.width / 2) * 0.15,
                      y: (e.clientY - r.top - r.height / 2) * 0.15,
                    });
                  }}
                  onMouseLeave={() => setBtnPos({ x: 0, y: 0 })}
                  className="w-full py-4 rounded-xl text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)" }}
                >
                  {isSubmitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE ↗"}
                </motion.button>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30"
                  >
                    <p className="text-sm text-red-700 dark:text-red-300 text-center">
                      {error}
                    </p>
                  </motion.div>
                )}
              </form>
            ) : (
              <div className="text-center py-20">
                <CheckCircle2 size={72} className="mx-auto text-green-500 dark:text-green-400 mb-4"/>
                <h3 className="text-3xl text-gray-900 dark:text-white font-black">
                  TRANSMISSION ACCEPTED
                </h3>
                <p className="text-gray-600 dark:text-white/60 mt-4">
                  AI RESPONSE SYSTEM ONLINE • ETA {contact.responseTime}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}