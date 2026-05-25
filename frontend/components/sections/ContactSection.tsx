

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

  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
  }));

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
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (!contact) return null;

  return (
    <section id="contact" className="relative overflow-hidden py-24 px-4 bg-[#060816]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, rgba(99,102,241,.15), transparent 40%)`
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{ left: `${s.left}%`, top: `${s.top}%` }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[120px] md:text-[220px] font-black text-white/[0.03]">
          CONTACT
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10">
            <Radio size={14} className="text-indigo-400" />
            <span className="text-indigo-300 text-xs uppercase tracking-[3px]">
              AI Mission Console
            </span>
          </div>

          <h2 className="mt-6 text-5xl md:text-7xl font-black text-white">
            Let's Build The Future
          </h2>

          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            {contact.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="text-green-400 font-mono">
                {terminalLines[typingIndex]}
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="text-white">Email: {contact.email}</div>
                <div className="text-white">Location: {contact.location}</div>
                <div className="text-white">Response: {contact.responseTime}</div>
              </div>

              {formData.name && (
                <div className="mt-4 text-cyan-400 font-mono text-xs">
                  AI IDENTIFIED VISITOR: {formData.name.toUpperCase()}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[Activity, Cpu, Terminal].map((Icon, i) => (
                <div key={i} className="rounded-2xl border border-white/10 p-4 bg-white/[0.03]">
                  <Icon className="text-indigo-400 mb-2" />
                  <div className="text-white text-sm">ONLINE</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a href={contact.githubUrl} className="rounded-2xl border border-white/10 p-4 text-white flex justify-center gap-2">
                <Github size={18}/> GitHub
              </a>
              <a href={contact.linkedinUrl} className="rounded-2xl border border-white/10 p-4 text-white flex justify-center gap-2">
                <Linkedin size={18}/> LinkedIn
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-3 rounded-xl bg-white/5 text-white"/>
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 rounded-xl bg-white/5 text-white"/>
                <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="w-full p-3 rounded-xl bg-white/5 text-white"/>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" rows={6} className="w-full p-3 rounded-xl bg-white/5 text-white"/>

                <motion.button
                  type="submit"
                  animate={{ x: btnPos.x, y: btnPos.y }}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setBtnPos({
                      x: (e.clientX - r.left - r.width / 2) * 0.15,
                      y: (e.clientY - r.top - r.height / 2) * 0.15,
                    });
                  }}
                  onMouseLeave={() => setBtnPos({ x: 0, y: 0 })}
                  className="w-full py-4 rounded-xl text-white font-bold"
                  style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)" }}
                >
                  {isSubmitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE ↗"}
                </motion.button>
              </form>
            ) : (
              <div className="text-center py-20">
                <CheckCircle2 size={72} className="mx-auto text-green-400 mb-4"/>
                <h3 className="text-3xl text-white font-black">
                  TRANSMISSION ACCEPTED
                </h3>
                <p className="text-white/60 mt-4">
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
