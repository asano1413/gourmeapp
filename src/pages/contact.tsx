import React, { useState } from "react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import AppLayout from "@/components/AppLayout";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setErrors] = useState<{ name: boolean; email: boolean; message: boolean }>({ name: false, email: false, message: false });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: name.trim() === "",
      email: !validateEmail(email),
      message: message.trim() === "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok && res.status === 201) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <AppLayout>
      <main className="flex-grow text-blue-500 text-center container mx-auto px-4 py-8 bg-gray-100">
        {submitted ? (
          <p className="text-green-500">お問い合わせありがとうございます。メッセージが送信されました。</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-12 rounded shadow-md">
            <div className="mb-4 1-full">
              <h1 className="text-3xl font-bold mt-6 mb-8">お問い合わせ</h1>
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">名前</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`text-gray-700 w-full px-3 py-2 border rounded-lg ${error.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {error.name && <p className="text-red-500 text-sm">名前を入力してください。</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">メールアドレス</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`text-gray-700 w-full px-3 py-2 border rounded-lg ${error.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {error.email && <p className="text-red-500 text-sm">有効なメールアドレスを入力してください。</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">問い合わせ内容</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`text-gray-700 w-full px-3 py-2 border rounded-lg ${error.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                rows={5}
                maxLength={1000}
                required
              />
              {error.message && <p className="text-red-500 text-sm">メッセージを入力してください。</p>}
            </div>
            <button type="submit" className="bg-sky-500 text-white mt-4 px-6 py-3 rounded hover:bg-sky-600 duration-500 ease-in-out">送信</button>
          </form>
        )}
      </main>
    </AppLayout>
  );
};

export default Contact;
