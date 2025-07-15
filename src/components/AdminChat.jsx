import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io('http://localhost:4444', { withCredentials: true });

const AdminChatPanel = () => {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", { userId: "admin", role: "admin" });

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/message/active-users`);
        setUsers(res.data.users || []);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();

    socket.on("receiveMessage", (msg) => {
      if (msg.senderId === activeUser || msg.recipientId === activeUser) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [activeUser]);

  const selectUser = async (userId) => {
    setActiveUser(userId);

    try {
      const userMsgs = await axios.get(`${import.meta.env.VITE_BASE_URL}/message/user-messages/${userId}`);
      const adminMsgs = await axios.get(`${import.meta.env.VITE_BASE_URL}/message/admin-messages/${userId}`);
      const all = [...userMsgs.data.data, ...adminMsgs.data.data];
      all.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setMessages(all);
    } catch (err) {
      console.error("Failed to load conversation", err);
    }
  };

  const sendMessage = () => {
    if (!messageInput.trim() || !activeUser) return;

    const msgData = {
      senderId: "admin",
      recipientId: activeUser,
      message: messageInput.trim(),
      isFromAdmin: true
    };

    socket.emit("sendMessage", msgData);
    setMessages((prev) => [...prev, msgData]);
    setMessageInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grid grid-cols-4 h-screen">
      {/* Sidebar */}
      <div className="col-span-1 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => selectUser(user._id)}
            className={`p-2 cursor-pointer rounded-lg ${
              activeUser === user._id ? "bg-blue-200" : "hover:bg-gray-200"
            }`}
          >
            {user.name || user.email || user._id}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="col-span-3 flex flex-col h-full">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 p-2 max-w-lg rounded-lg ${
                msg.isFromAdmin ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"
              }`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 p-2 border rounded-lg mr-2"
            placeholder="Type a message"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminChatPanel;
