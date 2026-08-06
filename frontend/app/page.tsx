"use client"

import Header from '@/components/Header';
import InputBar from '@/components/InputBar';
import MessageArea from '@/components/MessageArea';
import React, { useState } from 'react';

interface SearchInfo {
  stages: string[];
  query: string;
  urls: string[];
}

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  type: string;
  isLoading?: boolean;
  searchInfo?: SearchInfo;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: '👋 Hello! I\'m SearchFlow AI. Ask me anything and I\'ll search the web for the best answers.',
      isUser: false,
      type: 'message'
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [checkpointId, setCheckpointId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim() || isProcessing) return;

    setIsProcessing(true);
    const newMessageId = messages.length > 0 ? Math.max(...messages.map(msg => msg.id)) + 1 : 1;
    const userInput = currentMessage;

    setMessages(prev => [
      ...prev,
      {
        id: newMessageId,
        content: userInput,
        isUser: true,
        type: 'message'
      }
    ]);
    setCurrentMessage("");

    const aiResponseId = newMessageId + 1;
    setMessages(prev => [
      ...prev,
      {
        id: aiResponseId,
        content: "",
        isUser: false,
        type: 'message',
        isLoading: true,
        searchInfo: {
          stages: [],
          query: "",
          urls: []
        }
      }
    ]);

    try {
      let url = `https://perplexity-api.onrender.com/chat_stream/${encodeURIComponent(userInput)}`;
      if (checkpointId) {
        url += `?checkpoint_id=${encodeURIComponent(checkpointId)}`;
      }

      const eventSource = new EventSource(url);
      let streamedContent = "";
      let searchData: SearchInfo | null = null;

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'checkpoint') {
            setCheckpointId(data.checkpoint_id);
          }
          else if (data.type === 'content') {
            streamedContent += data.content;
            setMessages(prev =>
              prev.map(msg =>
                msg.id === aiResponseId
                  ? { ...msg, content: streamedContent, isLoading: false }
                  : msg
              )
            );
          }
          else if (data.type === 'search_start') {
            const newSearchInfo = {
              stages: ['searching'],
              query: data.query,
              urls: []
            };
            searchData = newSearchInfo;
            setMessages(prev =>
              prev.map(msg =>
                msg.id === aiResponseId
                  ? { ...msg, searchInfo: newSearchInfo, isLoading: false }
                  : msg
              )
            );
          }
          else if (data.type === 'search_results') {
            try {
              const urls = typeof data.urls === 'string' ? JSON.parse(data.urls) : data.urls;
              const newSearchInfo = {
                stages: searchData ? [...searchData.stages, 'reading'] : ['reading'],
                query: searchData?.query || "",
                urls: urls
              };
              searchData = newSearchInfo;
              setMessages(prev =>
                prev.map(msg =>
                  msg.id === aiResponseId
                    ? { ...msg, searchInfo: newSearchInfo, isLoading: false }
                    : msg
                )
              );
            } catch (err) {
              console.error("Error parsing search results:", err);
            }
          }
          else if (data.type === 'end') {
            if (searchData) {
              const finalSearchInfo = {
                ...searchData,
                stages: [...searchData.stages, 'writing']
              };
              setMessages(prev =>
                prev.map(msg =>
                  msg.id === aiResponseId
                    ? { ...msg, searchInfo: finalSearchInfo, isLoading: false }
                    : msg
                )
              );
            }
            eventSource.close();
            setIsProcessing(false);
          }
        } catch (error) {
          console.error("Error parsing event data:", error);
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        setIsProcessing(false);
        if (!streamedContent) {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === aiResponseId
                ? { ...msg, content: "😕 Oops! Something went wrong. Please try again.", isLoading: false }
                : msg
            )
          );
        }
      };

    } catch (error) {
      console.error("Error setting up EventSource:", error);
      setIsProcessing(false);
      setMessages(prev => [
        ...prev,
        {
          id: aiResponseId + 1,
          content: "🔌 Connection error. Please check your internet and try again.",
          isUser: false,
          type: 'message',
          isLoading: false
        }
      ]);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen p-4 md:p-6">
      <div className="w-full max-w-5xl h-[92vh] md:h-[88vh] glass rounded-3xl shadow-2xl glow flex flex-col overflow-hidden border border-white/30">
        <Header />
        <MessageArea messages={messages} />
        <InputBar 
          currentMessage={currentMessage} 
          setCurrentMessage={setCurrentMessage} 
          onSubmit={handleSubmit}
          isProcessing={isProcessing}
        />
      </div>
    </main>
  );
}