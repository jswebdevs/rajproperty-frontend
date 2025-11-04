import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { MessageSquare, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";

// Connect to backend securely
const socket = io("https://backend.rajproperty.site", {
  transports: ["websocket", "polling"],
  secure: true,
});

const EXPIRATION_MS = 2 * 60 * 60 * 1000; // 2 hours

const ChatButton = () => {
  const [open, setOpen] = useState(false);
  const [visitor, setVisitor] = useState(null);
  const [inputs, setInputs] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  // Load visitor info from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("visitor"));
    if (
      stored &&
      stored.savedAt &&
      Date.now() - stored.savedAt < EXPIRATION_MS
    ) {
      setVisitor(stored);
      setOpen(true);
      fetchMessages(stored.email);
    } else {
      localStorage.removeItem("visitor");
    }
  }, []);

  // Fetch previous messages from backend
  const fetchMessages = async (email) => {
    try {
      const res = await fetch(
        `https://backend.rajproperty.site/api/chat/${email}`
      );
      if (!res.ok) return setChat([]);
      const data = await res.json();
      setChat(Array.isArray(data) ? data : []);
      scrollToBottom();
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // Handle visitor form submission
  const handleVisitorSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.name || !inputs.email) return alert("Name and email required");

    try {
      await fetch("https://backend.rajproperty.site/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const visitorData = { ...inputs, savedAt: Date.now() };
      localStorage.setItem("visitor", JSON.stringify(visitorData));
      setVisitor(visitorData);
      setOpen(true);
      fetchMessages(inputs.email);
    } catch (err) {
      console.error("Error saving visitor:", err);
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    const handleMessage = (data) => {
      if (visitor && data.email === visitor.email) {
        setChat((prev) => {
          if (!prev.some((m) => m.id === data.id)) return [...prev, data];
          return prev;
        });
        scrollToBottom();
      }
    };
    socket.on("receive_message", handleMessage);
    return () => socket.off("receive_message", handleMessage);
  }, [visitor]);

  // Send a new message
  const sendMessage = async () => {
    if (!message.trim() || !visitor?.email) return;

    const msg = {
      id: Date.now(),
      sender: visitor.name,
      email: visitor.email,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch("https://backend.rajproperty.site/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const scrollToBottom = () =>
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Live chat with RajProperty for instant property inquiries in Rajshahi City, Bangladesh. Start your conversation now, no login required."
        />
        <meta
          property="og:description"
          content="Live chat available! Connect with RajProperty for real estate advice, property listings, and buying/selling support in Rajshahi City."
        />
      </Helmet>
      {/* Floating Chat Button */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          aria-label="Open live chat"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: [1, 1.05, 1],
            transition: { duration: 1.8, repeat: Infinity },
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-5 right-5 z-[9999] bg-accent text-white p-3 rounded-full shadow-lg cursor-pointer"
        >
          <MessageSquare size={22} />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-16 right-5 w-80 max-w-xs h-[400px] border border-gray-700 rounded-lg shadow-lg flex flex-col z-[9999] bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
          >
            {/* Header */}
            <div className="bg-black text-white p-2 rounded-t-lg font-semibold flex justify-between items-center border-b border-gray-700">
              <span>Live Chat</span>
              <button
                onClick={() => setOpen(false)}
                className="hover:bg-gray-700 px-2 rounded-md"
              >
                ✕
              </button>
            </div>

            {/* Visitor Form */}
            {!visitor ? (
              <form
                onSubmit={handleVisitorSubmit}
                className="p-2 flex flex-col gap-2"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                  className="border border-gray-700 rounded px-2 py-1 bg-gray-800 text-white placeholder-gray-400 outline-0 focus:ring-1 focus:ring-teal-700"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                  className="border border-gray-700 rounded px-2 py-1 bg-gray-800 text-white placeholder-gray-400 outline-0 focus:ring-1 focus:ring-teal-700"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-900 hover:from-cyan-600 hover:via-cyan-700 hover:to-cyan-800 text-white px-3 py-1 rounded cursor-pointer transition-colors duration-300"
                >
                  Start Chat
                </button>
              </form>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 p-2 overflow-y-auto bg-gray-800">
                  {chat.length === 0 && (
                    <div className="text-gray-400 text-center mt-10">
                      No messages yet
                    </div>
                  )}
                  {chat.map((c) => {
                    const isUser =
                      c.sender.toLowerCase() === visitor.name.toLowerCase();
                    return (
                      <motion.div
                        key={c.id || c.createdAt}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`mb-2 flex ${
                          isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`px-2 py-1 rounded-lg max-w-[70%] ${
                            isUser
                              ? "bg-blue-600 text-white text-right"
                              : "bg-gray-700 text-gray-200 text-left"
                          }`}
                        >
                          <div>{c.message}</div>
                          <div className="text-xs text-gray-400 text-right">
                            {c.createdAt
                              ? new Date(c.createdAt).toLocaleTimeString()
                              : ""}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  <div ref={chatEndRef}></div>
                </div>

                {/* Input */}
                <div className="p-2 flex gap-2 bg-gray-900 border-t border-gray-700">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-700 rounded px-2 py-1 bg-gray-800 text-white placeholder-gray-400 resize-none outline-0 focus:ring-1 focus:ring-teal-700"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-900 hover:from-cyan-600 hover:via-cyan-700 hover:to-cyan-800 text-white px-3 py-1 rounded cursor-pointer transition-colors duration-300"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;
