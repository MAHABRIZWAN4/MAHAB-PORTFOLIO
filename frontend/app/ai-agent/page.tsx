"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Circle } from "lucide-react";
import { sendMessage, type AgentResponse } from "@/lib/agent-api";
import { useTheme } from "next-themes";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  language?: string;
}

const LANGUAGES = [
  { name: "English", native: "English" },
  { name: "Urdu", native: "اردو" },
  { name: "Sindhi", native: "سنڌي" },
  { name: "Arabic", native: "العربية" },
  { name: "Spanish", native: "Español" },
  { name: "French", native: "Français" },
];

const SUGGESTED_QUESTIONS = [
  "What are Mahab's skills?",
  "Tell me about her experience",
  "What projects has she built?",
  "Can I download her CV?",
  "مہاب کی skills کیا ہیں؟",
  "مجھے اس کے projects بتاؤ",
];

export default function AIAgentPage() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! I'm Mahab's AI assistant. I can tell you everything about Mahab Rizwan — her skills, experience, projects, and how to contact her. What would you like to know?",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const MESSAGE_LIMIT = 10;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load message count from sessionStorage on mount
  useEffect(() => {
    const storedCount = sessionStorage.getItem("mr_agent_count");
    if (storedCount) {
      const count = parseInt(storedCount, 10);
      setMessageCount(count);
      if (count >= MESSAGE_LIMIT) {
        setIsLimitReached(true);
      }
    }
  }, []);

  useEffect(() => {
    // Initialize Web Speech API
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US"; // Default language
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        // Auto-submit after 300ms
        setTimeout(() => {
          handleSendMessage(transcript);
        }, 300);
      };

      recognitionRef.current.onerror = (event: any) => {
        setIsListening(false);
        console.error("Speech recognition error:", event.error);

        let errorText = "Could not hear clearly, please try again";

        if (event.error === "no-speech") {
          errorText = "No speech detected. Please speak into your microphone.";
        } else if (event.error === "audio-capture") {
          errorText = "Microphone not found. Please check your microphone settings.";
        } else if (event.error === "not-allowed") {
          errorText = "Microphone access denied. Please allow microphone permissions.";
        } else if (event.error === "network") {
          errorText = "Network error. Please check your internet connection.";
        }

        const errorMessage: Message = {
          id: Date.now().toString(),
          text: errorText,
          isUser: false,
        };
        setMessages((prev) => [...prev, errorMessage]);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    // Check if limit is reached
    if (messageCount >= MESSAGE_LIMIT) {
      setIsLimitReached(true);
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Increment message count
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    sessionStorage.setItem("mr_agent_count", newCount.toString());

    // Check if limit reached after this message
    if (newCount >= MESSAGE_LIMIT) {
      setIsLimitReached(true);
    }

    // Get agent response
    try {
      const response: AgentResponse = await sendMessage(text);

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.reply,
        isUser: false,
        language: response.language_detected,
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    handleSendMessage(question);
  };

  return (
    <div
      id="ai-agent"
      className="flex flex-col min-h-screen pt-24 pb-8 px-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-[#0a0e18] dark:via-[#0c1220] dark:to-[#101828]"
    >
      <div className="container mx-auto max-w-7xl flex-1 flex overflow-hidden">
        <div className="grid lg:grid-cols-[30%_70%] gap-6 w-full">
          {/* LEFT INFO PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-[#1e2433] rounded-2xl p-6 flex flex-col gap-6 overflow-y-auto border border-gray-200 dark:border-white/5 shadow-lg"
          >
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)",
                  boxShadow: "0 0 40px rgba(99,102,241,0.4)",
                }}
              >
                MR
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mahab Rizwan</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                  <span className="text-sm text-green-500">AI Agent Online</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-center">
              Ask me anything about Mahab — her skills, experience, projects, or how to hire her. I speak 50+ languages including Urdu, Sindhi and English.
            </p>

            {/* Language badges */}
            <div className="flex flex-wrap gap-2 justify-center">
              {LANGUAGES.map((lang) => (
                <span
                  key={lang.name}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30"
                >
                  {lang.native}
                </span>
              ))}
            </div>

            {/* Guardrail notice */}
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-auto">
              This agent only answers questions about Mahab Rizwan
            </p>

            {/* Suggested questions */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Suggested Questions:</h3>
              <div className="space-y-2">
                {SUGGESTED_QUESTIONS.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border border-gray-200 dark:border-white/5 hover:border-indigo-500 dark:hover:border-indigo-500/30"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT CHAT INTERFACE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-[#1e2433] rounded-2xl flex flex-col h-full overflow-hidden border border-gray-200 dark:border-white/5 shadow-lg"
          >
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)",
                  }}
                >
                  MR
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Mahab's AI Agent</h2>
                  <div className="flex items-center gap-2">
                    <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                    <span className="text-xs text-green-500">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 pb-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-start gap-3 max-w-[80%]">
                    {!message.isUser && (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)",
                        }}
                      >
                        MR
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.isUser
                          ? "bg-indigo-600 text-white rounded-tr-sm"
                          : "bg-gray-100 dark:bg-[#2a3142] text-gray-900 dark:text-gray-200 rounded-tl-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.text.split(/(\[Download CV\]\(\/CV_MAHAB_RIZWAN\.pdf\))/).map((part, idx) => {
                          if (part === "[Download CV](/CV_MAHAB_RIZWAN.pdf)") {
                            return (
                              <a
                                key={idx}
                                href="/CV_MAHAB_RIZWAN.pdf"
                                download="CV_MAHAB_RIZWAN.pdf"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                📄 Download CV
                              </a>
                            );
                          }
                          return part;
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #6366F1 0%, #14B8A6 100%)",
                    }}
                  >
                    MR
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl bg-gray-100 dark:bg-[#2a3142] rounded-tl-sm"
                  >
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 dark:border-white/5">
              {/* Limit reached message */}
              {isLimitReached && (
                <div className="mb-3 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30">
                  <p className="text-sm text-red-700 dark:text-red-300 text-center">
                    You've reached the session limit. Contact Mahab directly at{" "}
                    <a
                      href="mailto:mahabrizwan@gmail.com"
                      className="font-medium underline hover:text-red-800 dark:hover:text-red-200"
                    >
                      mahabrizwan@gmail.com
                    </a>
                  </p>
                </div>
              )}

              {/* Message counter */}
              <div className="mb-2 flex justify-end">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {messageCount}/{MESSAGE_LIMIT} messages used
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask me about Mahab..."
                  disabled={isLimitReached}
                  className="flex-1 px-5 py-3 rounded-full bg-gray-100 dark:bg-[#0a0e18] text-gray-900 dark:text-white text-sm outline-none border border-gray-300 dark:border-white/10 focus:border-indigo-500 transition-colors placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleVoiceInput}
                  disabled={isLimitReached}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse border-2 border-red-400"
                      : "bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-white/10 border border-gray-300 dark:border-white/15"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  title={
                    !recognitionRef.current
                      ? "Voice not supported in this browser"
                      : isListening
                      ? "Stop listening"
                      : "Start voice input"
                  }
                >
                  <Mic size={20} />
                </button>
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLimitReached}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
