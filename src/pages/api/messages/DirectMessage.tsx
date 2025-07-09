"use client";
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';

interface Message {
  id: number;
  content: string;
  sender: string;
  receiver: string;
  createdAt: string;
}

const DirectMessagePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // メッセージを取得する処理
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages/history');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          receiverId: 1, // 仮の受信者ID
        }),
      });

      if (response.ok) {
        setNewMessage('');
        // メッセージリストを更新
        const updatedMessages = await fetch('/api/messages/history');
        const data = await updatedMessages.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">ダイレクトメッセージ</h1>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              {messages.map((message: Message) => (
                <div key={message.id} className="flex flex-col">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm text-gray-600">{message.sender}</span>
                    <span className="text-xs text-gray-400">{new Date(message.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-800 mt-1">{message.content}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="メッセージを入力..."
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                送信
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DirectMessagePage;
