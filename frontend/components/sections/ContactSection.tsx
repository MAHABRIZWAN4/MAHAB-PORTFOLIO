"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Github,
  Linkedin,
  CheckCircle2,
  Terminal,
  Activity,
  Cpu,
  Radio,
} from "lucide-react";
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

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    getContact().then(setContact);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
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

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!contact) return null;

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-[#060816]"
    >
      {/* Mouse Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(
            500px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(99,102,241,0.12),
            transparent 40%
          )`,
        }}
      />

      {/* Animated Grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.07]
          z-0
          bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)]
          bg-[size:50px_50px]
        "
      />

      {/* Top Glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
          absolute
          top-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-indigo-500
          to-transparent
        "
      />

      {/* Bottom Glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 2,
        }}
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-500
          to-transparent
        "
      />

      {/* Left Orb */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          absolute
          top-20
          left-[-100px]
          w-[350px]
          h-[350px]
          rounded-full
          blur-[120px]
          bg-indigo-500/20
        "
      />

      {/* Right Orb */}
      <motion.div
        animate={{
          y: [0, 40, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-10
          right-[-100px]
          w-[350px]
          h-[350px]
          rounded-full
          blur-[120px]
          bg-cyan-500/20
        "
      />

      {/* Huge Watermark */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          pointer-events-none
          select-none
          z-0
        "
      >
        <h1
          className="
            text-[120px]
            md:text-[220px]
            font-black
            tracking-tighter
            text-white/[0.02]
          "
        >
          CONTACT
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}

        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              border
              border-indigo-500/20
              bg-indigo-500/10
              mb-6
            "
          >
            <Radio size={14} className="text-indigo-400" />

            <span className="text-xs tracking-[3px] text-indigo-300 uppercase">
              Mission Control
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            className="
              text-5xl
              md:text-7xl
              font-black
              text-white
              mb-6
            "
          >
            Let's Build
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">
              The Future
            </span>
          </motion.h2>

          <p className="max-w-2xl mx-auto text-white/50 text-sm md:text-base">
            {contact.description}
          </p>
        </div>

        {/* Main Grid */}

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* LEFT SIDE */}

          <div className="space-y-6">
            {/* Terminal Card */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-6
              "
            >
              {/* Terminal Header */}

              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />

                <span className="ml-3 text-xs text-white/40 font-mono">
                  mission-control.exe
                </span>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <div className="text-green-400">
                  &gt; initialize_contact_protocol()
                </div>

                <div className="text-white/70">
                  STATUS:
                  <span className="ml-2 text-green-400">
                    ONLINE
                  </span>
                </div>

                <div className="text-white/70">
                  LOCATION:
                  <span className="ml-2 text-cyan-400">
                    {contact.location}
                  </span>
                </div>

                <div className="text-white/70">
                  RESPONSE_TIME:
                  <span className="ml-2 text-indigo-400">
                    {contact.responseTime}
                  </span>
                </div>

                <div className="text-white/70">
                  EMAIL:
                  <span className="ml-2 text-pink-400 break-all">
                    {contact.email}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-green-400">
                    &gt; availability_status()
                  </div>

                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10">
                    <motion.div
                      animate={{
                        opacity: [1, 0.2, 1],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                      }}
                      className="w-2 h-2 rounded-full bg-green-400"
                    />

                    <span className="text-green-400 text-xs">
                      {contact.availabilityText}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Status Cards */}

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Activity,
                  title: "STATUS",
                  value: "ONLINE",
                  color: "text-green-400",
                },
                {
                  icon: Cpu,
                  title: "PROJECTS",
                  value: "ACTIVE",
                  color: "text-indigo-400",
                },
                {
                  icon: Terminal,
                  title: "MODE",
                  value: "BUILDING",
                  color: "text-cyan-400",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{
                    y: -6,
                  }}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                    p-5
                  "
                >
                  <item.icon
                    className={`${item.color} mb-3`}
                    size={20}
                  />

                  <div className="text-xs text-white/40 mb-1">
                    {item.title}
                  </div>

                  <div className={`font-bold ${item.color}`}>
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Info */}

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "EMAIL",
                  value: contact.email,
                },
                {
                  icon: MapPin,
                  label: "LOCATION",
                  value: contact.location,
                },
                {
                  icon: Clock,
                  label: "RESPONSE",
                  value: contact.responseTime,
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{
                    x: 5,
                  }}
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                    p-4
                  "
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <item.icon
                      size={18}
                      className="text-indigo-400"
                    />
                  </div>

                  <div>
                    <div className="text-xs text-white/40">
                      {item.label}
                    </div>

                    <div className="text-white text-sm">
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Buttons */}

            <div className="grid grid-cols-2 gap-4">
              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.02,
                }}
                href={contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  py-4
                  text-white
                "
              >
                <Github size={18} />
                GitHub
              </motion.a>

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.02,
                }}
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  py-4
                  text-white
                "
              >
                <Linkedin size={18} />
                LinkedIn
              </motion.a>
            </div>
          </div>

          {/* RIGHT SIDE STARTS HERE */}
                    <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-2xl
              p-6 md:p-8
            "
          >
            {/* Animated Border Glow */}

            <div className="absolute inset-0 rounded-3xl pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-indigo-500/10" />
            </div>

            <div className="relative z-10">
              <div className="mb-8">
                <div className="text-xs uppercase tracking-[4px] text-indigo-400 mb-3">
                  Secure Transmission
                </div>

                <h3 className="text-3xl font-black text-white mb-2">
                  Send Message
                </h3>

                <p className="text-white/50 text-sm">
                  Start a conversation. Let's build something amazing together.
                </p>
              </div>

              {!isSuccess ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name */}

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-4
                        py-3
                        text-white
                        outline-none
                        focus:border-indigo-500
                        transition-all
                      "
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-4
                        py-3
                        text-white
                        outline-none
                        focus:border-cyan-500
                        transition-all
                      "
                    />
                  </div>

                  {/* Subject */}

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project discussion"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-4
                        py-3
                        text-white
                        outline-none
                        focus:border-pink-500
                        transition-all
                      "
                    />
                  </div>

                  {/* Message */}

                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase tracking-wider">
                      Message
                    </label>

                    <textarea
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project..."
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-4
                        py-3
                        text-white
                        outline-none
                        focus:border-indigo-500
                        transition-all
                      "
                    />
                  </div>

                  {/* Submit */}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="
                      relative
                      overflow-hidden
                      w-full
                      rounded-xl
                      py-4
                      font-bold
                      text-white
                      disabled:opacity-50
                    "
                    style={{
                      background:
                        "linear-gradient(135deg,#6366f1,#06b6d4)",
                    }}
                  >
                    <span className="relative z-10">
                      {isSubmitting
                        ? "TRANSMITTING..."
                        : "TRANSMIT MESSAGE ↗"}
                    </span>
                  </motion.button>

                  <div className="flex items-center justify-center gap-2 text-xs text-white/30">
                    <div className="w-2 h-2 rounded-full bg-green-400" />

                    End-to-end secure transmission
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="
                    min-h-[500px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <CheckCircle2
                      size={80}
                      className="text-green-400 mb-6"
                    />
                  </motion.div>

                  <h3 className="text-3xl font-black text-white mb-4">
                    Transmission Successful
                  </h3>

                  <p className="text-white/60 max-w-md">
                    Your message has been delivered successfully.
                    Expect a response within{" "}
                    {contact.responseTime}.
                  </p>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    onClick={() => setIsSuccess(false)}
                    className="
                      mt-8
                      px-6
                      py-3
                      rounded-xl
                      border
                      border-indigo-500/30
                      text-indigo-300
                    "
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}