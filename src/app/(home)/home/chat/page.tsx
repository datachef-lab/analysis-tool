"use client";

import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, MessageSquare, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

// Interface for our chat messages
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Interface for chat history
interface ChatHistory {
  id: string;
  title: string;
  preview: string;
  date: Date;
  unread?: boolean;
}

// Sample chat history data
const chatHistoryData: ChatHistory[] = [
  {
    id: "1",
    title: "Student Performance Analysis",
    preview:
      "Here's the trend analysis of student grades for the past 3 semesters...",
    date: new Date(),
    unread: true,
  },
  {
    id: "2",
    title: "Class Attendance Report",
    preview:
      "The attendance patterns show significant variations across departments...",
    date: new Date(Date.now() - 86400000),
  },
  {
    id: "3",
    title: "Course Grade Distribution",
    preview:
      "The data reveals that science courses have a higher average grade than humanities...",
    date: new Date(Date.now() - 172800000),
  },
  {
    id: "4",
    title: "Faculty Performance Review",
    preview:
      "Based on student feedback and course outcomes, the top performing faculty are...",
    date: new Date(Date.now() - 259200000),
  },
  {
    id: "5",
    title: "Enrollment Trends 2023",
    preview:
      "Comparing this year's enrollment with previous years shows a 12% increase in...",
    date: new Date(Date.now() - 345600000),
  },
];

// Sample suggestion prompts
const suggestionPrompts = [
  {
    id: "academic-performance",
    title: "Academic Performance",
    prompt: "What's the average GPA across all departments?",
    description: '"What\'s the average GPA across all departments?"',
  },
  {
    id: "top-students",
    title: "Top Students",
    prompt: "Show me the top 5 students in Computer Science",
    description: '"Show me the top 5 students in Computer Science"',
  },
  {
    id: "attendance-analysis",
    title: "Attendance Analysis",
    prompt: "Compare attendance rates between first and final year students",
    description:
      '"Compare attendance rates between first and final year students"',
  },
  {
    id: "subject-performance",
    title: "Subject Performance",
    prompt: "Which subject has the lowest pass rate?",
    description: '"Which subject has the lowest pass rate?"',
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const filteredHistory = chatHistoryData;

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle sending a message
  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return;

    // Generate a random ID for the message
    const messageId = Math.random().toString(36).substring(2, 15);

    // Add user message to state
    const userMessage: ChatMessage = {
      id: messageId,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    // Simulate AI response with a delay
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: messageId + "-response",
        role: "assistant",
        content: `Here's an analysis based on your query about "${text}". This is a placeholder response. In a real implementation, this would be connected to your AI data analysis backend.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  // Create a new chat
  const createNewChat = () => {
    setMessages([]);
    setSelectedChat(null);
  };

  // Handle suggestion card click
  const handleSuggestionClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Main Chat Panel */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          // Empty state - centered content with suggestion cards
          <div className="flex-1 flex flex-col items-center justify-center px-6 overflow-y-auto">
            <div className="w-full max-w-3xl">
              <h1 className="text-2xl font-semibold text-center mb-3">
                College Data Analysis Assistant
              </h1>
              <p className="text-base text-center text-gray-600 mb-8">
                Ask questions about student grades, attendance, performance
                trends, subject comparisons, or any other college data.
              </p>

              {/* Suggestion cards in a 2x2 grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                {suggestionPrompts.map((prompt) => (
                  <Card
                    key={prompt.id}
                    className="border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer bg-white"
                    onClick={() => handleSuggestionClick(prompt.prompt)}
                  >
                    <CardContent className="p-5">
                      <div className="font-medium mb-2 text-gray-800">
                        {prompt.title}
                      </div>
                      <p className="text-sm text-gray-600">
                        {prompt.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Input Area */}
              <div className="max-w-3xl mx-auto">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="relative"
                >
                  <div className="flex items-center relative">
                    <Textarea
                      className="flex-1 py-4 px-5 pr-14 rounded-lg border border-gray-300 bg-white focus-visible:ring-1 focus-visible:ring-offset-0 text-base resize-none min-h-[120px] max-h-96"
                      placeholder="Ask a question about college student data..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      rows={6}
                    />
                    <div className="absolute right-4 bottom-4 flex items-center">
                      <Button
                        type="submit"
                        size="icon"
                        className="rounded-full w-9 h-9 bg-gray-100 hover:bg-gray-200 text-gray-700"
                        disabled={!inputValue.trim() || isProcessing}
                      >
                        <SendHorizontal size={18} />
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          // Conversation active state
          <>
            {/* Header for active chat */}
            <div className="border-b border-gray-200 p-4">
              <h1 className="font-medium text-lg">
                College Data Analysis Assistant
              </h1>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`flex max-w-[85%] md:max-w-[70%] ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="mt-1 mr-2 md:mr-3 flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm">
                          AI
                        </div>
                      </div>
                    )}
                    <div
                      className={`${
                        message.role === "user"
                          ? "bg-blue-50 text-gray-800 py-3 px-4 rounded-xl rounded-tr-sm"
                          : "bg-gray-50 py-3 px-4 rounded-xl rounded-tl-sm"
                      }`}
                    >
                      <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </div>
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-1 mt-2 text-gray-400">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 rounded-md hover:bg-gray-100"
                            aria-label="Expand"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 4V10M4 10H10M4 10L9 5M20 20V14M20 14H14M20 14L15 19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 rounded-md hover:bg-gray-100"
                            aria-label="Copy"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7C20 5.89543 19.1046 5 18 5H16M8 5V3C8 2.44772 8.44772 2 9 2H15C15.5523 2 16 2.44772 16 3V5M8 5H16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 rounded-md hover:bg-gray-100"
                            aria-label="More options"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 4V20M4 12L20 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="flex max-w-[85%] md:max-w-[70%]">
                    <div className="mt-1 mr-2 md:mr-3 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm">
                        AI
                      </div>
                    </div>
                    <div className="bg-gray-50 py-3 px-4 rounded-xl rounded-tl-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Area - Bottom position for active conversation */}
            <div className="p-5 border-t border-gray-200 bg-white sticky bottom-0">
              <div className="max-w-3xl mx-auto">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="relative"
                >
                  <div className="flex items-center relative">
                    <Textarea
                      className="flex-1 py-4 px-5 pr-14 rounded-lg border border-gray-300 bg-white focus-visible:ring-1 focus-visible:ring-offset-0 text-base resize-none min-h-[120px] max-h-96"
                      placeholder="Ask a question about college student data..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      rows={6}
                    />
                    <div className="absolute right-4 bottom-4 flex items-center">
                      <Button
                        type="submit"
                        size="icon"
                        className="rounded-full w-9 h-9 bg-gray-100 hover:bg-gray-200 text-gray-700"
                        disabled={!inputValue.trim() || isProcessing}
                      >
                        <SendHorizontal size={18} />
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right Panel - Conversations */}
      <div className="hidden md:flex w-80 border-l border-gray-200 bg-white flex-col">
        <div className="border-b border-gray-200 p-4">
          <h2 className="font-medium">Conversations</h2>
        </div>

        <div className="p-3">
          <Button
            className="w-full justify-center items-center h-9 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-normal gap-1"
            variant="outline"
            onClick={createNewChat}
          >
            <PlusCircle size={16} />
            New Chat
          </Button>
        </div>

        <div className="px-3 py-2">
          <div className="text-sm font-medium mb-2 flex items-center">
            <span>New Conversation</span>
          </div>
          <div className="bg-gray-50 rounded-md p-3 flex items-start gap-2.5 cursor-pointer hover:bg-gray-100">
            <MessageSquare size={18} className="text-gray-500 mt-0.5" />
            <div>
              <div className="text-sm">
                Ask me anything about student data analysis...
              </div>
            </div>
          </div>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto pt-2">
          <div className="divide-y divide-gray-100">
            {filteredHistory.map((chat) => (
              <div
                key={chat.id}
                className={`px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedChat === chat.id ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium text-sm truncate flex-1">
                    {chat.title}
                    {chat.unread && (
                      <span className="ml-2 h-2 w-2 rounded-full bg-blue-500 inline-block"></span>
                    )}
                  </h3>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {chat.preview}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Faculty Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
