import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://backend.rajproperty.site"); // backend URL

const AdminChatBox = () => {
  const [visitors, setVisitors] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [unread, setUnread] = useState({});
  const [hoveredEmail, setHoveredEmail] = useState(null);
  const messagesEndRef = useRef(null);

  const capitalize = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

  // Fetch all visitors with their messages
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await axios.get(
          "https://backend.rajproperty.site/api/chat"
        );
        // Sort visitors by most recent message time
        const sorted = res.data
          .map((v) => ({
            ...v,
            lastMessageTime: v.messages?.length
              ? new Date(v.messages[v.messages.length - 1].createdAt).getTime()
              : 0,
          }))
          .sort((a, b) => b.lastMessageTime - a.lastMessageTime);
        setVisitors(sorted);

        // Detect unread status (messages from "user" or "bot" not read yet)
        const unreadObj = {};
        sorted.forEach((visitor) => {
          if (visitor.messages && visitor.messages.length > 0) {
            const lastMsg = visitor.messages[visitor.messages.length - 1];
            if (
              lastMsg.sender &&
              (lastMsg.sender.toLowerCase() === "user" ||
                lastMsg.sender.toLowerCase() === "bot") &&
              (!selectedVisitor || selectedVisitor.email !== visitor.email)
            ) {
              unreadObj[visitor.email] = true;
            }
          }
        });
        setUnread(unreadObj);
      } catch (err) {
        console.error("Failed to fetch visitors:", err);
      }
    };
    fetchVisitors();
  }, [selectedVisitor, messages]);

  // Fetch messages for selected visitor
  const fetchMessages = async (visitor) => {
    try {
      const res = await axios.get(
        `https://backend.rajproperty.site/api/chat/${visitor.email}`
      );
      const visitorData = Array.isArray(res.data) ? res.data : [];
      setSelectedVisitor(visitor);
      setMessages(visitorData);
      scrollToBottom();

      // Mark visitor's messages as read
      setUnread((prev) => {
        const copy = { ...prev };
        if (visitor.email) copy[visitor.email] = false;
        return copy;
      });
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setMessages([]);
    }
  };

  // Listen for real-time messages and deletions
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (selectedVisitor && data.email === selectedVisitor.email) {
        setMessages((prev) => {
          if (!prev.some((m) => m.id === data.id)) return [...prev, data];
          return prev;
        });
        scrollToBottom();
      } else {
        // Message for another visitor shows as unread
        setUnread((prev) => ({ ...prev, [data.email]: true }));
      }
    };

    const handleConversationDeleted = (data) => {
      if (selectedVisitor && data.email === selectedVisitor.email) {
        setMessages([]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("conversation_deleted", handleConversationDeleted);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("conversation_deleted", handleConversationDeleted);
    };
  }, [selectedVisitor]);

  const selectVisitor = (visitor) => {
    fetchMessages(visitor);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedVisitor) return;

    const msg = {
      id: Date.now().toString(),
      sender: "Admin",
      email: selectedVisitor.email,
      message: newMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("https://backend.rajproperty.site/api/chat", msg);
      setNewMessage("");
      setUnread((prev) => ({ ...prev, [selectedVisitor.email]: false }));
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Delete conversation for visitor
  const deleteConversation = async () => {
    if (!selectedVisitor) return;
    setLoadingDelete(true);
    try {
      await axios.delete(
        `https://backend.rajproperty.site/api/chat/${selectedVisitor.email}`
      );
      setMessages([]);
      socket.emit("delete_conversation", { email: selectedVisitor.email });
      setLoadingDelete(false);
      setUnread((prev) => ({ ...prev, [selectedVisitor.email]: false }));
    } catch (err) {
      setLoadingDelete(false);
      console.error("Failed to delete conversation:", err);
    }
  };

  // Permanently delete a visitor
  const deleteVisitor = async (email) => {
    if (!email) return;
    setLoadingDelete(true);
    try {
      await axios.delete(
        `https://backend.rajproperty.site/api/visitor/${email}`
      );
      setVisitors((prev) => prev.filter((v) => v.email !== email));
      // If deleting selected visitor, deselect and clear messages
      if (selectedVisitor && selectedVisitor.email === email) {
        setSelectedVisitor(null);
        setMessages([]);
      }
      setLoadingDelete(false);
    } catch (err) {
      setLoadingDelete(false);
      console.error("Failed to delete visitor:", err);
    }
  };

  return (
    <div className="flex h-[80vh] border border-gray-700 rounded-lg overflow-hidden bg-gray-900 shadow-lg">
      {/* Visitors Sidebar */}
      <div className="w-1/6 border-r border-gray-700 bg-gray-800 overflow-y-auto">
        <h2 className="text-xl font-semibold text-cyan-400 p-3 border-b border-gray-700">
          Visitors
        </h2>
        {visitors.map((v) => (
          <div
            key={v._id}
            onClick={() => selectVisitor(v)}
            onMouseEnter={() => setHoveredEmail(v.email)}
            onMouseLeave={() => setHoveredEmail(null)}
            className={`relative p-3 cursor-pointer border-b border-gray-700 
              hover:bg-gray-700 
              ${selectedVisitor?._id === v._id ? "bg-gray-700" : ""}
              ${
                unread[v.email]
                  ? "bg-yellow-100 text-gray-900 font-semibold"
                  : ""
              }
            `}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">
                {capitalize(v.name)}
                {unread[v.email] && (
                  <span className="ml-2 text-xs text-red-500">● Unread</span>
                )}
              </span>
              {hoveredEmail === v.email && (
                <button
                  className="ml-2 px-2 py-0.5 bg-red-500 hover:bg-red-700 text-white text-xs rounded transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteVisitor(v.email);
                  }}
                  disabled={loadingDelete}
                >
                  Delete
                </button>
              )}
            </div>
            <div className="text-gray-400 text-sm">{v.email}</div>
            {v.messages && v.messages.length > 0 && (
              <div className="text-xs text-gray-500 mt-1">
                Last:{" "}
                {new Date(
                  v.messages[v.messages.length - 1].createdAt
                ).toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Panel */}
      <div className="w-full flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-cyan-400">
            {selectedVisitor
              ? capitalize(selectedVisitor.name)
              : "Select a visitor"}
          </h3>
          {selectedVisitor && (
            <button
              disabled={loadingDelete}
              onClick={deleteConversation}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              {loadingDelete ? "Deleting..." : "Delete Conversation"}
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto bg-gray-900">
          {selectedVisitor ? (
            messages.length === 0 ? (
              <div className="text-gray-400 text-center mt-10">
                No messages yet
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isAdmin =
                  msg.sender && msg.sender.toLowerCase() === "admin";
                const isBot = msg.sender && msg.sender.toLowerCase() === "bot";
                return (
                  <div
                    key={msg.id || idx}
                    className={`my-2 flex ${
                      isAdmin ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg max-w-[70%] break-words ${
                        isAdmin
                          ? "bg-blue-600 text-white text-right"
                          : isBot
                          ? "bg-green-700 text-white text-left border-l-4 border-green-400"
                          : "bg-gray-700 text-white text-left"
                      }`}
                    >
                      <div>
                        {isBot && (
                          <span className="inline-block text-green-400 font-bold mr-2">
                            Bot:
                          </span>
                        )}
                        {msg.message}
                      </div>
                      <div className="text-xs text-gray-300 text-right mt-1">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleTimeString()
                          : ""}
                      </div>
                    </div>
                  </div>
                );
              })
            )
          ) : (
            <div className="text-gray-400 text-center mt-20">
              Select a visitor to view chat
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        {selectedVisitor && (
          <div className="p-3 border-t border-gray-700 bg-gray-800 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatBox;
