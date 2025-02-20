import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 text-blue-600 p-4 mt-6">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          <a href="/terms" className="underline">
            利用規約
          </a>
        </p>
        <p className="mb-2 text-gray-800">
          コンタクト先：
          <a href="mailto:mit2471509@stu.o-hara.ac.jp" className="underline text-blue-600">
            mit2471509@stu.o-hara.ac.jp
          </a>
        </p>
        <p>©2025 GourmeApp</p>
      </div>
    </footer>
  );
}