"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DynamicDisplay, DisplayResponse } from "./components/displays";

// Interface for our chat messages
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string | DisplayResponse;
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

// Interface for processing steps
interface ProcessingStep {
  text: string;
  completed: boolean;
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

// Component for processing steps display
const ProcessingSteps = ({
  steps,
  currentIndex,
}: {
  steps: ProcessingStep[];
  currentIndex: number;
}) => {
  return (
    <div className="text-[15px] leading-relaxed whitespace-pre-wrap text-gray-700">
      <div className="font-medium mb-3">Thinking...</div>
      <div className="space-y-2.5">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            {step.completed ? (
              <div className="w-5 h-5 flex-shrink-0 mr-2 text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ) : index === currentIndex ? (
              <div className="w-5 h-5 flex-shrink-0 mr-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
              </div>
            ) : (
              <div className="w-5 h-5 flex-shrink-0 mr-2 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM15.375 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM8.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <div
              className={
                step.completed
                  ? "text-gray-700 font-medium"
                  : index === currentIndex
                  ? "text-gray-700"
                  : "text-gray-400"
              }
            >
              {step.text}
              {step.completed && (
                <span className="ml-1.5 text-xs text-green-500">
                  ✓ complete
                </span>
              )}
            </div>
          </div>
        ))}

        {steps.length > 0 && steps[steps.length - 1].completed && (
          <div className="flex items-start mt-3 text-green-600 font-medium">
            <div className="w-5 h-5 flex-shrink-0 mr-2 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>Done! Displaying results...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const streamTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);

  // Add state for mobile sidebar toggle
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to simulate streaming text while waiting for API response
  const simulateStreaming = (questionText: string) => {
    // Clear any existing timer
    if (streamTimerRef.current) {
      clearTimeout(streamTimerRef.current);
    }

    setIsStreaming(true);

    // Analyze the question to customize the streaming steps
    const lowerCaseQuestion = questionText.toLowerCase();

    // Default processing steps that match backend analysis steps
    let streamingSteps = [
      "Understanding your question...",
      "Analyzing the database...",
      "Generating SQL query and retrieving data...",
      "Determining optimal visualization format...",
      "Preparing final response...",
    ];

    // Customize for question types based on likely backend processing
    if (
      lowerCaseQuestion.includes("compare") ||
      lowerCaseQuestion.includes("versus") ||
      lowerCaseQuestion.includes("vs")
    ) {
      streamingSteps = [
        "Understanding your comparison request...",
        "Analyzing database for comparison entities...",
        "Generating SQL query and retrieving comparison data...",
        "Determining optimal visualization format...",
        "Preparing comparative analysis...",
      ];
    } else if (
      lowerCaseQuestion.includes("top") ||
      lowerCaseQuestion.includes("best") ||
      lowerCaseQuestion.includes("highest") ||
      lowerCaseQuestion.includes("most") ||
      lowerCaseQuestion.includes("lowest") ||
      lowerCaseQuestion.includes("least")
    ) {
      streamingSteps = [
        "Understanding your ranking request...",
        "Analyzing database for ranking metrics...",
        "Generating SQL query with sorting and retrieving data...",
        "Determining optimal visualization format...",
        "Preparing ranking results...",
      ];
    } else if (
      lowerCaseQuestion.includes("trend") ||
      lowerCaseQuestion.includes("over time") ||
      lowerCaseQuestion.includes("historical")
    ) {
      streamingSteps = [
        "Understanding your trend analysis request...",
        "Analyzing database for time-series data...",
        "Generating SQL query and retrieving historical data...",
        "Determining optimal visualization format...",
        "Preparing trend analysis...",
      ];
    } else if (
      lowerCaseQuestion.includes("distribution") ||
      lowerCaseQuestion.includes("breakdown") ||
      lowerCaseQuestion.includes("proportion") ||
      lowerCaseQuestion.includes("percentage") ||
      lowerCaseQuestion.includes("ratio")
    ) {
      streamingSteps = [
        "Understanding your distribution request...",
        "Analyzing database for categorical data...",
        "Generating SQL query and retrieving distribution data...",
        "Determining optimal visualization format...",
        "Preparing distribution analysis...",
      ];
    }

    // If it's a very short greeting, use simpler steps
    if (
      questionText.trim().length < 10 &&
      (lowerCaseQuestion.includes("hi") ||
        lowerCaseQuestion.includes("hello") ||
        lowerCaseQuestion.includes("hey"))
    ) {
      streamingSteps = ["Processing greeting...", "Generating response..."];
    }

    // Initialize processing steps with completed status = false for all
    const initialProcessingSteps = streamingSteps.map((step) => ({
      text: step,
      completed: false,
    }));

    setProcessingSteps(initialProcessingSteps);
    setCurrentStepIndex(0); // Start with the first step

    // Start simulating step completion
    simulateStepCompletion(0);
  };

  // Function to simulate completion of steps one by one
  const simulateStepCompletion = (stepIndex: number) => {
    if (stepIndex >= processingSteps.length) {
      return;
    }

    // Mark current step as completed after a delay
    // First step should be quicker (understanding question)
    const stepDelay =
      stepIndex === 0
        ? 800 + Math.random() * 800 // 0.8-1.6s for first step
        : 1500 + Math.random() * 2000; // 1.5-3.5s for other steps

    setTimeout(() => {
      // Force a state update to ensure UI reflects changes
      setProcessingSteps((prevSteps) => {
        const updatedSteps = [...prevSteps];
        updatedSteps[stepIndex] = {
          ...updatedSteps[stepIndex],
          completed: true,
        };
        return updatedSteps;
      });

      // Move to next step after a short delay - using a separate setTimeout to ensure UI updates first
      setTimeout(() => {
        setCurrentStepIndex(stepIndex + 1);

        // Continue to next step if there is one
        if (stepIndex < processingSteps.length - 1) {
          simulateStepCompletion(stepIndex + 1);
        }
      }, 100); // Short delay to ensure UI updates
    }, stepDelay);
  };

  // Function to stop streaming
  const stopStreaming = () => {
    if (streamTimerRef.current) {
      clearTimeout(streamTimerRef.current);
      streamTimerRef.current = null;
    }
    setIsStreaming(false);
    setProcessingSteps([]);
    setCurrentStepIndex(-1);
  };

  // Function to get a summary/preview of the message content
  function getMessagePreview(content: string | DisplayResponse): string {
    if (typeof content === "string") {
      return content.length > 60 ? content.substring(0, 60) + "..." : content;
    } else {
      // Handle DisplayResponse objects - extract text preview based on type
      switch (content.type) {
        case "text":
          const textData = content.data as { text: string };
          return textData.text.length > 60
            ? textData.text.substring(0, 60) + "..."
            : textData.text;
        case "paragraphs":
          const paragraphsData = content.data as { paragraphs: string[] };
          const firstParagraph = paragraphsData.paragraphs[0] || "";
          return firstParagraph.length > 60
            ? firstParagraph.substring(0, 60) + "..."
            : firstParagraph;
        case "list":
          const listData = content.data as { items: string[] };
          return `List: ${listData.items.length} items`;
        case "table":
          const tableData = content.data as { headers: string[] };
          return `Table: ${tableData.headers.length} columns`;
        case "barChart":
        case "lineChart":
        case "pieChart":
          const chartData = content.data as { title?: string };
          return `${
            content.type.charAt(0).toUpperCase() + content.type.slice(1)
          }: ${chartData.title || "Untitled chart"}`;
        case "cards":
          const cardsData = content.data as { cards: unknown[] };
          return `Cards: ${cardsData.cards.length} items`;
        default:
          return "Visual data display";
      }
    }
  }

  // Helper function to detect if a result is a simple text message incorrectly formatted as a table
  function isSimpleTextResponse(results: Record<string, unknown>[]): {
    isSimple: boolean;
    text: string;
  } {
    if (!results || !Array.isArray(results) || results.length === 0) {
      return { isSimple: false, text: "" };
    }

    // Case 1: Single row, single column with Message-like column name
    if (results.length === 1 && Object.keys(results[0]).length === 1) {
      const columnName = Object.keys(results[0])[0];
      if (
        ["Message", "Result", "Response", "Text", "Content"].includes(
          columnName
        )
      ) {
        return {
          isSimple: true,
          text: String(results[0][columnName]),
        };
      }
    }

    // Case 2: Single row, simple message data with few words and no complex structure
    if (results.length === 1) {
      const firstRow = results[0];
      // If there's only one column with a short response, it's likely a simple message
      if (Object.keys(firstRow).length === 1) {
        const value = String(Object.values(firstRow)[0]);
        // Count words
        const wordCount = value.split(/\s+/).length;
        if (wordCount < 10 && !value.includes("\n") && !value.includes(",")) {
          return {
            isSimple: true,
            text: value,
          };
        }
      }
    }

    return { isSimple: false, text: "" };
  }

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

    // Start the streaming text simulation
    simulateStreaming(text);

    try {
      // Call the analyze API endpoint
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: text,
          messageId,
          requestDisplayType: true, // Flag to request structured display data
        }),
      });

      // Stop the streaming effect once we get a response
      stopStreaming();

      if (!response.ok) {
        throw new Error("Failed to get response from API");
      }

      const data = await response.json();
      console.log("ai response data:", data);

      // Initialize with a default value
      let assistantContent: string | DisplayResponse = {
        type: "text",
        data: { text: "Sorry, I couldn't process your request at this time." },
      };

      // Check if the API returned the displayData field (preferred way)
      if (
        data.displayData &&
        typeof data.displayData === "object" &&
        "type" in data.displayData
      ) {
        assistantContent = data.displayData as DisplayResponse;
      }
      // Fall back to our previous handling approach if no displayData
      else if (data.display && data.display.displayType) {
        // Handle different display types based on the API response
        switch (data.display.displayType) {
          case "numberCard":
            if (data.results && data.results.length > 0) {
              const result = data.results[0];

              // Format the card display with better formatting
              assistantContent = {
                type: "cards",
                data: {
                  cards: [
                    {
                      title: data.display.title,
                      content: Object.entries(result)
                        .map(([key, value]) => {
                          // Format different types of values
                          if (
                            key.includes("Rate") ||
                            key.includes("Percentage")
                          ) {
                            // Format percentage values
                            const numValue =
                              typeof value === "number"
                                ? value
                                : parseFloat(String(value));
                            return `**${key}:** ${
                              isNaN(numValue) ? value : numValue.toFixed(2)
                            }%`;
                          } else if (
                            key.includes("Name") ||
                            key.includes("Title")
                          ) {
                            // Make names/titles bold
                            return `**${key}:** ${value}`;
                          } else if (
                            !isNaN(Number(value)) &&
                            String(value).includes(".")
                          ) {
                            // Format decimal numbers
                            return `**${key}:** ${parseFloat(
                              String(value)
                            ).toFixed(2)}`;
                          } else {
                            // Default formatting - make all keys bold
                            return `**${key}:** ${value}`;
                          }
                        })
                        .join("\n"),
                      footer: data.display.description || "",
                    },
                  ],
                },
              };
            }
            break;

          case "text":
            // If it's a text response, extract the text from results
            if (data.results && data.results.length > 0) {
              const firstResult = data.results[0];
              const textKey = Object.keys(firstResult)[0]; // Usually "Message"
              const textValue = String(firstResult[textKey]);

              assistantContent = {
                type: "text",
                data: { text: textValue },
              };
            }
            break;

          case "table":
            // Check first for simple text messages formatted as tables
            const simpleTextCheck = isSimpleTextResponse(data.results);
            if (simpleTextCheck.isSimple) {
              assistantContent = {
                type: "text",
                data: { text: simpleTextCheck.text },
              };
            } else if (
              data.results &&
              Array.isArray(data.results) &&
              data.results.length > 0
            ) {
              const headers = Object.keys(data.results[0]);
              const rows = data.results.map(
                (row: Record<string, string | number>) =>
                  headers.map((header) => String(row[header]))
              );

              assistantContent = {
                type: "table",
                data: {
                  headers: headers,
                  rows: rows,
                },
              };
            }
            break;

          case "barChart":
            if (
              data.results &&
              Array.isArray(data.results) &&
              data.results.length > 0
            ) {
              const chartData = data.results.map(
                (item: Record<string, string | number>) => ({
                  name: String(item[Object.keys(item)[0]]),
                  value: parseFloat(String(item[Object.keys(item)[1]])),
                })
              );

              assistantContent = {
                type: "barChart",
                data: {
                  title: data.display.title || "Chart",
                  data: chartData,
                  xAxisLabel: Object.keys(data.results[0])[0],
                  yAxisLabel: Object.keys(data.results[0])[1],
                },
              };
            }
            break;

          case "pieChart":
            if (
              data.results &&
              Array.isArray(data.results) &&
              data.results.length > 0
            ) {
              const chartData = data.results.map(
                (item: Record<string, string | number>) => ({
                  name: String(item[Object.keys(item)[0]]),
                  value: parseFloat(String(item[Object.keys(item)[1]])),
                })
              );

              assistantContent = {
                type: "pieChart",
                data: {
                  title: data.display.title || "Distribution",
                  data: chartData,
                },
              };
            }
            break;

          case "list":
            if (data.results && Array.isArray(data.results)) {
              // Format results as list items
              const items = data.results.map(
                (item: Record<string, string | number>) =>
                  Object.entries(item)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ")
              );

              assistantContent = {
                type: "list",
                data: {
                  title: data.display.title || "List",
                  items: items,
                },
              };
            }
            break;

          default:
            // If we don't have a specific handler for this display type,
            // fall back to a text display with an explanation
            assistantContent = {
              type: "text",
              data: {
                text: `${data.display.title || "Results"}\n\n${
                  data.results && Array.isArray(data.results)
                    ? JSON.stringify(data.results, null, 2)
                    : "No result data available"
                }\n\n(Display type "${
                  data.display.displayType
                }" received but may need additional configuration to display properly)`,
              },
            };
        }
      } else if (data.analysis) {
        // Fall back to text format if displayData is not available
        if (typeof data.analysis === "string") {
          assistantContent = {
            type: "text",
            data: { text: data.analysis },
          };
        } else if (typeof data.analysis === "object") {
          assistantContent = {
            type: "text",
            data: {
              text: `Analysis Result:\n\n${JSON.stringify(
                data.analysis,
                null,
                2
              )}`,
            },
          };
        }
      } else if (data.content) {
        // Fall back to content if analysis is not available
        if (typeof data.content === "string") {
          assistantContent = {
            type: "text",
            data: { text: data.content },
          };
        } else if (typeof data.content === "object") {
          assistantContent = {
            type: "text",
            data: {
              text: `Analysis Result:\n\n${JSON.stringify(
                data.content,
                null,
                2
              )}`,
            },
          };
        }
      }

      // Add assistant message with the properly formatted response
      const assistantMessage: ChatMessage = {
        id: messageId + "-response",
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Stop streaming on error too
      stopStreaming();
      console.error("Error fetching analysis response:", error);

      // Display error message if API call fails
      const errorMessage: ChatMessage = {
        id: messageId + "-error",
        role: "assistant",
        content: {
          type: "text",
          data: {
            text: "I'm sorry, I encountered an error processing your data analysis request. Please try again later.",
          },
        },
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Save current chat to history
  const saveCurrentChatToHistory = () => {
    // Only save if there are messages
    if (messages.length > 0) {
      // Generate a new unique ID
      const newChatId = Math.random().toString(36).substring(2, 15);

      // Get the last assistant message as preview
      const lastAssistantMsg = [...messages]
        .reverse()
        .find((msg) => msg.role === "assistant");

      // Ensure preview is a string
      let preview: string = "No response yet";
      if (lastAssistantMsg) {
        preview = getMessagePreview(lastAssistantMsg.content);
      }

      // Extract first few words from first message as the title
      const firstMessage = messages.find((msg) => msg.role === "user");
      let title: string = "New Conversation";

      if (firstMessage) {
        const titleContent =
          typeof firstMessage.content === "string"
            ? firstMessage.content
            : getMessagePreview(firstMessage.content);

        // Trim title if it's too long
        title =
          titleContent.length > 30
            ? titleContent.substring(0, 30) + "..."
            : titleContent;
      }

      // Create new chat history entry
      const newChatHistory: ChatHistory = {
        id: newChatId,
        title,
        preview,
        date: new Date(),
      };

      // Add to beginning of chat history
      chatHistoryData.unshift(newChatHistory);
    }
  };

  // Function to export the conversation
  const exportConversation = useCallback(() => {
    if (!messages.length) return;

    const conversationData = messages.map((msg) => ({
      role: msg.role,
      content:
        typeof msg.content === "string"
          ? msg.content
          : JSON.stringify(msg.content, null, 2),
      timestamp: msg.timestamp,
    }));

    const exportData = JSON.stringify(conversationData, null, 2);
    const blob = new Blob([exportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-analysis-conversation-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [messages]);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Main Chat Panel */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h1 className="font-medium text-xl text-center flex-1">
            College Data Analysis Assistant
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowHistoryPanel(!showHistoryPanel)}
            aria-label="Toggle history"
            className="text-gray-500 hover:bg-gray-100"
          >
            {showHistoryPanel ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Button>
        </div>

        {messages.length === 0 ? (
          // Empty state - centered content like Grok with centered input field
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-xl text-center mb-20">
              <h2 className="text-2xl font-medium mb-3">Good evening.</h2>
              <p className="text-xl text-gray-600 mb-12">
                How can I help you today?
              </p>

              {/* Input field centered in the page */}
              <div className="mt-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="relative"
                >
                  <div className="flex items-center relative">
                    <input
                      className="w-full py-3.5 px-5 pr-14 rounded-xl border border-gray-300 shadow-sm focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-gray-400 text-base"
                      placeholder="What do you want to know?"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <div className="absolute right-3 flex items-center gap-2">
                      <Button
                        type="submit"
                        size="icon"
                        className="rounded-lg w-9 h-9 bg-gray-700 hover:bg-gray-600 text-white"
                        disabled={!inputValue.trim() || isProcessing}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 12L20 12M20 12L14 6M20 12L14 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Suggestion Cards */}
            <div className="w-full max-w-2xl">
              <div className="text-sm font-medium mb-2 text-gray-700">
                Suggestions
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestionPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer p-3"
                    onClick={() => handleSendMessage(prompt.prompt)}
                  >
                    <div className="font-medium text-sm text-gray-700 mb-1">
                      {prompt.title}
                    </div>
                    <p className="text-xs text-gray-600">
                      {prompt.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-16 flex justify-center">
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-2 text-sm flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 4V12M6 12H14M6 12L18 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  DeepSearch
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-2 text-sm flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 12L11 14L15 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Think
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Conversation active state
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 pb-2 space-y-6">
              <div className="w-full">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-6 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.role === "user"
                          ? "flex flex-row-reverse"
                          : "flex"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="mt-1 mr-3 flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm border border-gray-200 shadow-sm">
                            AI
                          </div>
                        </div>
                      )}
                      <div
                        className={`${
                          message.role === "user"
                            ? "bg-gray-700 text-white py-3.5 px-5 rounded-2xl rounded-tr-sm shadow-sm"
                            : "bg-white py-3.5 px-5 rounded-2xl rounded-tl-sm text-gray-700 shadow-sm"
                        }`}
                      >
                        {/* Check if it's a visualization and apply specific styles */}
                        {typeof message.content !== "string" &&
                        (message.content.type === "barChart" ||
                          message.content.type === "pieChart") ? (
                          <div className="space-y-4">
                            {/* Show text summary before the chart */}
                            <div className="text-[15px] leading-relaxed whitespace-pre-wrap mb-2">
                              {message.content.type === "pieChart"
                                ? "This chart shows the distribution of data across different categories."
                                : "This chart displays values for different categories."}
                            </div>
                            <div className="min-w-[350px] max-w-[500px] w-full overflow-hidden">
                              <DynamicDisplay
                                type={message.content.type}
                                data={{
                                  ...message.content.data,
                                  noBorder: true,
                                }}
                              />
                            </div>
                          </div>
                        ) : typeof message.content !== "string" &&
                          message.content.type === "table" ? (
                          <div className="space-y-4">
                            {/* Show text summary before the table */}
                            <div className="text-[15px] leading-relaxed whitespace-pre-wrap mb-2">
                              Here&apos;s the tabular data showing the requested
                              information.
                            </div>
                            <div className="min-w-[350px] max-w-full overflow-x-auto">
                              <DynamicDisplay
                                type={message.content.type}
                                data={{
                                  ...message.content.data,
                                  noBorder: true,
                                }}
                              />
                            </div>
                          </div>
                        ) : typeof message.content !== "string" &&
                          message.content.type === "cards" ? (
                          <div className="space-y-4">
                            {/* Show text summary before the cards */}
                            <div className="text-[15px] leading-relaxed whitespace-pre-wrap mb-2">
                              Here&apos;s a summary of the key information:
                            </div>
                            <div className="w-full rounded-lg">
                              <DynamicDisplay
                                type={message.content.type}
                                data={{
                                  ...message.content.data,
                                  noBorder: true,
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
                            {typeof message.content === "string" ? (
                              message.content
                            ) : (
                              <DynamicDisplay
                                type={message.content.type}
                                data={{
                                  ...message.content.data,
                                  noBorder: true,
                                }}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading state with streaming text */}
                {isProcessing && (
                  <div className="flex justify-start mb-6">
                    <div className="flex max-w-[80%]">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm border border-gray-200 shadow-sm">
                          AI
                        </div>
                      </div>
                      <div className="bg-white py-4 px-5 rounded-2xl rounded-tl-sm shadow-sm min-w-[120px]">
                        {/* Show streaming text if available */}
                        {isStreaming && processingSteps.length > 0 ? (
                          <ProcessingSteps
                            steps={processingSteps}
                            currentIndex={currentStepIndex}
                            key={`steps-${
                              processingSteps.filter((s) => s.completed).length
                            }-${currentStepIndex}`}
                          />
                        ) : (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-300"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Export button */}
                {messages.length > 0 && !isProcessing && (
                  <div className="flex justify-center mb-6">
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-2 text-sm flex items-center gap-2"
                      onClick={exportConversation}
                    >
                      <DownloadIcon className="h-4 w-4" />
                      Export Conversation
                    </Button>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area - Fixed at the bottom */}
            <div className="p-4 pb-6 border-t border-gray-200 bg-gradient-to-t from-gray-50 to-white">
              <div className="max-w-4xl mx-auto">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="relative"
                >
                  <div className="flex items-center relative">
                    <input
                      className="flex-1 py-3.5 px-5 pr-14 rounded-xl border border-gray-300 shadow-sm focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-gray-400 text-base"
                      placeholder="What do you want to know?"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <div className="absolute right-3 flex items-center gap-2">
                      <Button
                        type="submit"
                        size="icon"
                        className="rounded-lg w-9 h-9 bg-gray-700 hover:bg-gray-600 text-white"
                        disabled={!inputValue.trim() || isProcessing}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 12L20 12M20 12L14 6M20 12L14 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right Panel - Chat History */}
      <div
        className={`${
          showHistoryPanel ? "block" : "hidden"
        } w-72 border-l border-gray-200 bg-white overflow-y-auto`}
      >
        <div className="sticky top-0 bg-white z-10">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-lg">Conversations</h2>
          </div>
          <div className="p-3">
            <Button
              className="w-full justify-center items-center h-9 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-normal gap-1.5 text-sm rounded-md"
              variant="outline"
              onClick={() => {
                // Save current chat before starting a new one
                saveCurrentChatToHistory();
                setMessages([]);
                setSelectedChat(null);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              New Chat
            </Button>
          </div>
        </div>

        {/* Chat History List */}
        <div className="px-3 pt-2 pb-20">
          <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
            Recent
          </div>
          <div className="space-y-1">
            {chatHistoryData.map((chat) => (
              <div
                key={chat.id}
                className={`px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors ${
                  selectedChat === chat.id ? "bg-gray-100" : ""
                }`}
                onClick={() => {
                  setSelectedChat(chat.id);
                  // Create simulated chat messages
                  const simulatedMessages: ChatMessage[] = [
                    {
                      id: `${chat.id}-user-1`,
                      role: "user",
                      content: chat.title,
                      timestamp: new Date(chat.date.getTime() - 60000),
                    },
                    {
                      id: `${chat.id}-assistant-1`,
                      role: "assistant",
                      content: chat.preview,
                      timestamp: chat.date,
                    },
                  ];
                  setMessages(simulatedMessages);
                }}
              >
                <div className="font-medium text-sm truncate flex items-center">
                  {chat.title}
                  {chat.unread && (
                    <span className="ml-2 h-2 w-2 rounded-full bg-gray-500 inline-block"></span>
                  )}
                </div>
                <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                  {chat.preview}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
