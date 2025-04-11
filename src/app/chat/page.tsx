"use client";

import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

// Define the shape of a message
interface Message {
  text: string;
  sender: "user" | "server";
}

// Define the shape of the message received from the server
interface ServerMessage {
  message: string;
}

// Connect to the backend
const socket: any = io("http://api.udccenter.xyz");
// const socket: any = io("http://localhost:4000");

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen for messages from the server
    socket.on("receiveMessage", (newMessage: ServerMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage.message, sender: "server" },
      ]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Function to send message and get response from API
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emit the message to the server
    socket.emit("sendMessage", message);

    // Add user message to state
    const newMessages: Message[] = [
      ...messages,
      { text: message, sender: "user" },
    ];
    setMessages(newMessages);
    setMessage("");
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[30rem] h-[40rem] border border-gray-300 rounded-md overflow-hidden shadow-lg">
        {/* Messages Display */}
        <div className="h-[36rem] overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Form */}
        <form onSubmit={onFormSubmit} className="flex p-4 border-t">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-l-md focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-r-md"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}