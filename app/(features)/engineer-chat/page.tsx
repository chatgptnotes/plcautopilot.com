'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'user' | 'engineer' | 'system';
  content: string;
  timestamp: Date;
  engineerName?: string;
  engineerRole?: string;
}

interface Engineer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  availability: 'available' | 'busy' | 'offline';
  responseTime: string;
  rating: number;
  completedConsultations: number;
}

export default function EngineerChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      content: 'Welcome to PLCAutoPilot Expert Support! Describe your issue and we\'ll connect you with a specialist engineer.',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [currentEngineer, setCurrentEngineer] = useState<Engineer | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const availableEngineers: Engineer[] = [
    {
      id: 'eng-001',
      name: 'Dr. James Peterson',
      role: 'Senior PLC Engineer',
      specialty: 'Schneider Electric, Siemens',
      availability: 'available',
      responseTime: '< 2 min',
      rating: 4.9,
      completedConsultations: 1247,
    },
    {
      id: 'eng-002',
      name: 'Sarah Chen',
      role: 'Automation Specialist',
      specialty: 'Rockwell, Motion Control',
      availability: 'available',
      responseTime: '< 5 min',
      rating: 4.8,
      completedConsultations: 856,
    },
    {
      id: 'eng-003',
      name: 'Michael Rodriguez',
      role: 'Industrial Controls Expert',
      specialty: 'SCADA, HMI, Networking',
      availability: 'available',
      responseTime: '< 3 min',
      rating: 4.9,
      completedConsultations: 1532,
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectToEngineer = (engineer: Engineer) => {
    setCurrentEngineer(engineer);
    setIsConnected(true);

    const systemMsg: Message = {
      id: Date.now().toString(),
      sender: 'system',
      content: `Connected to ${engineer.name} (${engineer.role}). ${engineer.name} specializes in ${engineer.specialty}.`,
      timestamp: new Date(),
    };

    const welcomeMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'engineer',
      content: `Hi! I'm ${engineer.name}. I see you're working with PLCAutoPilot. How can I help you today? Are you having trouble with program generation, PLC selection, or something else?`,
      timestamp: new Date(),
      engineerName: engineer.name,
      engineerRole: engineer.role,
    };

    setMessages(prev => [...prev, systemMsg, welcomeMsg]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);
    setError(null);

    try {
      // Determine engineer type based on current engineer
      let engineerType = 'general-expert';
      if (currentEngineer?.id === 'eng-001') {
        engineerType = 'schneider-specialist';
      } else if (currentEngineer?.id === 'eng-002') {
        engineerType = 'rockwell-specialist';
      } else if (currentEngineer?.id === 'eng-003') {
        engineerType = 'scada-expert';
      }

      // Build message history for API (only user and engineer messages)
      const conversationHistory = messages
        .filter(m => m.sender === 'user' || m.sender === 'engineer')
        .map(m => ({
          sender: m.sender,
          content: m.content
        }));

      // Add current user message
      conversationHistory.push({
        sender: 'user',
        content: inputMessage
      });

      // Call Claude API
      const response = await fetch('/api/ai-engineer-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationHistory,
          engineerType,
          conversationContext: {
            projectType: 'PLC Programming',
            plcPlatform: currentEngineer?.specialty.split(',')[0] || 'General'
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get engineer response');
      }

      const data = await response.json();

      const engineerMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'engineer',
        content: data.message,
        timestamp: new Date(),
        engineerName: currentEngineer?.name,
        engineerRole: currentEngineer?.role,
      };

      setMessages(prev => [...prev, engineerMsg]);
    } catch (err: any) {
      console.error('Engineer chat error:', err);
      setError(err.message || 'Failed to get response from engineer. Please try again.');

      // Add error message to chat
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'system',
        content: `Error: ${err.message || 'Failed to get response. Please try again.'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Human-in-the-Loop Expert Support
              </h1>
              <p className="text-gray-600">
                Get real-time help from experienced PLC engineers - Automating the Automation
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Engineer Selection Panel */}
          {!isConnected && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Available Engineers</h2>
                <div className="space-y-4">
                  {availableEngineers.map(engineer => (
                    <div
                      key={engineer.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{engineer.name}</h3>
                          <p className="text-sm text-gray-600">{engineer.role}</p>
                        </div>
                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Specialty:</strong> {engineer.specialty}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          {engineer.rating} ({engineer.completedConsultations} sessions)
                        </span>
                        <span>Response: {engineer.responseTime}</span>
                      </div>
                      <button
                        onClick={() => connectToEngineer(engineer)}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Connect Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat Interface */}
          <div className={isConnected ? 'lg:col-span-2' : 'lg:col-span-2'}>
            <div className="bg-white rounded-lg shadow-md flex flex-col h-[600px]">
              {/* Chat Header */}
              {isConnected && currentEngineer && (
                <div className="border-b border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {currentEngineer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{currentEngineer.name}</h3>
                        <p className="text-sm text-gray-600">{currentEngineer.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm text-gray-600">Online</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white'
                          : message.sender === 'system'
                          ? 'bg-gray-100 text-gray-700 text-center w-full'
                          : 'bg-blue-50 text-gray-900'
                      }`}
                    >
                      {message.sender === 'engineer' && (
                        <div className="font-semibold text-sm mb-1">{message.engineerName}</div>
                      )}
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      <div className="text-xs mt-1 opacity-75">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.4s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <textarea
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      isConnected
                        ? 'Type your message... (Press Enter to send)'
                        : 'Connect with an engineer first...'
                    }
                    disabled={!isConnected}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none disabled:bg-gray-100"
                    rows={2}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!isConnected || !inputMessage.trim()}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  Response time: {currentEngineer?.responseTime || '< 5 min'} • Available 24/7
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            {isConnected && (
              <div className="mt-4 bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Link
                    href="/generator"
                    className="text-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm"
                  >
                    Program Generator
                  </Link>
                  <Link
                    href="/plc-selector"
                    className="text-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm"
                  >
                    PLC Selector
                  </Link>
                  <Link
                    href="/solutions/recommend"
                    className="text-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm"
                  >
                    Solutions
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Info Panel */}
          {isConnected && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Session Info</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Engineer:</strong> {currentEngineer?.name}</p>
                    <p><strong>Specialty:</strong> {currentEngineer?.specialty}</p>
                    <p><strong>Session Started:</strong> {new Date().toLocaleTimeString()}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Common Topics</h3>
                  <div className="space-y-2 text-sm">
                    <button
                      onClick={() => setInputMessage('I need help selecting a PLC for my project')}
                      className="w-full text-left px-3 py-2 bg-gray-50 rounded hover:bg-gray-100"
                    >
                      PLC Selection
                    </button>
                    <button
                      onClick={() => setInputMessage('I\'m getting an error in my PLC program')}
                      className="w-full text-left px-3 py-2 bg-gray-50 rounded hover:bg-gray-100"
                    >
                      Error Troubleshooting
                    </button>
                    <button
                      onClick={() => setInputMessage('How do I implement safety functions?')}
                      className="w-full text-left px-3 py-2 bg-gray-50 rounded hover:bg-gray-100"
                    >
                      Safety Systems
                    </button>
                    <button
                      onClick={() => setInputMessage('SCADA integration guidance needed')}
                      className="w-full text-left px-3 py-2 bg-gray-50 rounded hover:bg-gray-100"
                    >
                      SCADA/HMI Integration
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Resources</h3>
                  <div className="space-y-2 text-sm">
                    <a href="/resources/docs" className="block text-green-600 hover:underline">
                      Documentation
                    </a>
                    <a href="/resources/tutorials" className="block text-green-600 hover:underline">
                      Video Tutorials
                    </a>
                    <a href="/resources/examples" className="block text-green-600 hover:underline">
                      Code Examples
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
