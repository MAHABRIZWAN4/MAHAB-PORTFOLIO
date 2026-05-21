"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Github, Linkedin, CheckCircle2 } from "lucide-react";
import { getContact, type Contact } from "@/lib/contact";

export default function ContactSection() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    getContact().then(setContact);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // POST to backend endpoint
      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          to: contact?.formRecipientEmail,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!contact) return null;

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "#080c18" }}
    >
      {/* Top border glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

      {/* Bottom border glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-50" />

      {/* Animated glow accents */}
      <motion.div
        className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Top edge pulsing line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, rgba(99,102,241,0.5), rgba(20,184,166,0.5))",
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      {/* Bottom edge pulsing line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, rgba(20,184,166,0.5), rgba(99,102,241,0.5))",
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1.5,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono uppercase tracking-[3px] text-indigo-400 mb-3"
          >
            CONTACT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4 text-white"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-1 bg-indigo-500 mx-auto rounded-full"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT SIDE - Info */}
          <div className="space-y-8">
            {/* Heading */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[11px] font-mono tracking-[3px] mb-4"
                style={{ color: "rgba(99,102,241,0.7)" }}
              >
                {`> ${contact.subheading}`}
              </motion.p>

              <div className="space-y-1">
                {["LET'S", "BUILD", "TOGETHER"].map((word, index) => (
                  <motion.h3
                    key={word}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-4xl md:text-5xl font-black uppercase"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      letterSpacing: "-1px",
                      color: word === "BUILD" ? "transparent" : "white",
                      WebkitTextStroke: word === "BUILD" ? "2px rgba(99,102,241,0.8)" : "none",
                    }}
                  >
                    {word}
                  </motion.h3>
                ))}
              </div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[13px] font-mono"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {contact.description}
            </motion.p>

            {/* Info Cards */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: "EMAIL", value: contact.email, color: "#6366f1" },
                { icon: MapPin, label: "LOCATION", value: contact.location, color: "#14b8a6" },
                { icon: Clock, label: "RESPONSE TIME", value: contact.responseTime, color: "#f59e0b" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ borderColor: item.color }}
                  className="flex items-center gap-4 p-4 rounded-lg border transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-white/40">{item.label}</p>
                    <p className="text-[12px] font-mono text-white">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <motion.a
                href={contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ borderColor: "#6366f1" }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border font-mono text-[12px] text-white transition-all duration-300"
                style={{ borderColor: "rgba(255,255,255,0.12)" }}
              >
                <Github size={16} />
                GitHub
              </motion.a>
              <motion.a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ borderColor: "#14b8a6" }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border font-mono text-[12px] text-white transition-all duration-300"
                style={{ borderColor: "rgba(255,255,255,0.12)" }}
              >
                <Linkedin size={16} />
                LinkedIn
              </motion.a>
            </div>

            {/* Available Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[11px] font-mono text-green-400">{contact.availabilityText}</span>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(99,102,241,0.15)",
            }}
          >
            <p className="text-[11px] font-mono mb-6" style={{ color: "rgba(99,102,241,0.7)" }}>
              {"> send_message()"}
            </p>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-lg font-mono text-[13px] text-white border focus:outline-none focus:border-indigo-500 transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(99,102,241,0.25)",
                    }}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full px-4 py-3 rounded-lg font-mono text-[13px] text-white border focus:outline-none focus:border-indigo-500 transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(99,102,241,0.25)",
                    }}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="w-full px-4 py-3 rounded-lg font-mono text-[13px] text-white border focus:outline-none focus:border-indigo-500 transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(99,102,241,0.25)",
                    }}
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg font-mono text-[13px] text-white border focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(99,102,241,0.25)",
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ background: "rgba(99,102,241,0.15)" }}
                  className="w-full py-3 rounded-lg border font-mono text-[13px] transition-all duration-300 disabled:opacity-50"
                  style={{
                    borderColor: "#6366f1",
                    color: "#a5b4fc",
                  }}
                >
                  {isSubmitting ? "Sending..." : "> send_message() ↗"}
                </motion.button>

                <p className="text-center text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
                  encrypted · secure · no spam
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle2 size={48} className="text-green-500 mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Message sent!</h4>
                <p className="text-[13px] font-mono text-white/60">
                  I'll reply within 24hrs
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
