'use client';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import apiClient from '@/app/lib/api-client';

let socket;

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null); // ✅ added state
  const messagesEndRef = useRef(null);

  const AI_USER_ID = process.env.NEXT_PUBLIC_AI_USER_ID || '';

  useEffect(() => {
    socket = io('http://65.1.112.2:7000', {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    const userData = typeof window !== 'undefined' && localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      socket.emit('addUser', user._id);
      loadChatHistory(user._id);
    }

    socket.on('newMessage', (newMessage) => {
      console.log('Received new AI message:', newMessage);
      setIsTyping(false);
      setMessages((prev) => {
        const messageExists = prev.some(msg => msg._id === newMessage._id);
        if (messageExists) return prev;
        return [...prev, newMessage];
      });
    });

    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('connect_error');
        socket.off('newMessage');
        socket.disconnect();
      }
    };
  }, []);

  const loadChatHistory = async (userId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://65.1.112.2:7000/api/v2/message/get-messages/${AI_USER_ID}`,
        { withCredentials: true }
      );
      const messagesData = res.data.messages || res.data || [];
      const convId = res.data.conversationId || (messagesData[0] && messagesData[0].conversationId); // ✅ capture conversationId

      setMessages(messagesData);
      setConversationId(convId || null); // ✅ store conversationId
    } catch (error) {
      console.error('Error loading chat history:', error);
      setMessages([]);
      setConversationId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !currentUser?._id) return;

    const messageToSend = message.trim();
    setMessage('');
    setIsTyping(true);

    const optimisticMessage = {
      _id: `temp-${Date.now()}`,
      message: messageToSend,
      senderId: currentUser._id,
      recieverId: AI_USER_ID,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
      Sender: `${currentUser.fullName} (${currentUser.username})`,
      Message: messageToSend
    };

    setMessages(prev => [...prev, optimisticMessage]);

    try {
      const response = await axios.post(
        `http://65.1.112.2:7000/api/v2/message/send-message/${AI_USER_ID}`,
        { message: messageToSend },
        { withCredentials: true }
      );

      const realMessage = response.data;
      setMessages(prev =>
        prev.map(msg =>
          msg._id === optimisticMessage._id ? {
            ...realMessage,
            Sender: `${currentUser.fullName} (${currentUser.username})`,
            Message: messageToSend
          } : msg
        )
      );
    } catch (error) {
      console.error('Error sending message to AI:', error);
      setIsTyping(false);
      setMessages(prev => prev.filter(msg => msg._id !== optimisticMessage._id));
      setMessage(messageToSend);
    }
  };

  const getMessageSenderId = (msg) => {
    let senderId = null;

    if (msg.Sender) {
      const senderMatch = msg.Sender.match(/^([^(]+)/);
      senderId = senderMatch ? senderMatch[1].trim() : msg.Sender;
    } else if (msg.senderId) {
      senderId = typeof msg.senderId === 'object' ? msg.senderId._id : msg.senderId;
    }

    return senderId;
  };

  const getMessageText = (msg) => {
    return msg.Message || msg.message || msg.text || msg.content || '';
  };

  const isAIMessage = (msg) => {
    const senderId = msg.senderId || getMessageSenderId(msg);
    return String(senderId) === String(AI_USER_ID);
  };

  const clearChat = async () => {
    if (!conversationId) {
      setMessages([]);
      return;
    }
    try {
      await apiClient.patch(
        `http://65.1.112.2:7000/api/v2/message/clear-conversation/${conversationId}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Error clearing conversation:', error);
    }
    setMessages([]);
    setConversationId(null);
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
  };

  if (!currentUser) {
    return (
      <div className="w-[800px] mx-auto mt-16 h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-gray-500 text-lg">Please log in to chat with the AI</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[800px] mx-auto mt-16 h-[600px] flex flex-col shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 font-semibold flex items-center">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 text-white">
          🤖
        </div>
        <div>
          <div className="text-lg">AI Assistant</div>
          <div className="text-xs opacity-75">
            {socket?.connected ? 'Online' : 'Connecting...'}
          </div>
        </div>
        <div className="ml-auto">
          <button
            onClick={clearChat}
            className="px-3 py-1 bg-white/20 rounded-full text-xs hover:bg-white/30 transition-colors"
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-blue-50 to-purple-50 p-4 space-y-3">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse text-gray-500">Loading chat history...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Welcome to AI Chat!</h3>
              <p className="text-gray-500 mb-4">Ask me anything. I'm here to help!</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['What can you do?', 'Tell me a joke', 'Help me with coding'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => {
              const senderId = getMessageSenderId(msg);
              const currentUserIdentifier = currentUser?.username || currentUser?._id;
              const isMyMessage = String(senderId) === String(currentUserIdentifier);
              const messageText = getMessageText(msg);
              const isAI = isAIMessage(msg);

              return (
                <div
                  key={msg._id || `msg-${idx}`}
                  className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${isMyMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 ${
                      isMyMessage
                        ? 'bg-blue-500'
                        : isAI
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : 'bg-gray-500'
                    }`}>
                      {isMyMessage ? (currentUser.fullName || 'U').charAt(0).toUpperCase() : '🤖'}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-2 rounded-2xl shadow-sm ${
                        isMyMessage
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : isAI
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 rounded-bl-md border border-purple-200'
                            : 'bg-gray-200 text-gray-800 rounded-bl-md'
                      } ${msg.isOptimistic ? 'opacity-75' : ''}`}
                    >
                      <p className="break-words whitespace-pre-wrap">{messageText}</p>
                      {msg.createdAt && (
                        <p className="text-xs opacity-75 mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {msg.isOptimistic && <span className="ml-1">⏳</span>}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500">
                    🤖
                  </div>
                  <div className="px-4 py-2 rounded-2xl shadow-sm bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 rounded-bl-md border border-purple-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex p-4 bg-white border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message to AI..."
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={loading || !socket?.connected}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 rounded-r-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          disabled={loading || !message.trim() || !socket?.connected}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
