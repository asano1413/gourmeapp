import React from 'react';
import { FaGithub, FaFacebook, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-cyan-50 text-blue-600 py-6">
      <div className="container mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
        {/* 左側のリンク */}
        <div className="mb-4 md:mb-0 ml-6">
          <p className="mb-2">
            <a href="/terms" className="underline hover:text-blue-800 transition-colors duration-300">
              利用規約
            </a>
          </p>
          <p className="text-gray-800">
            コンタクト先：
            <a
              href="mailto:mit2471509@stu.o-hara.ac.jp"
              className="underline text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              mit2471509@stu.o-hara.ac.jp
            </a>
          </p>
        </div>

        {/* 中央のソーシャルリンク */}
        <div className="flex space-x-4 mb-4 md:mb-0 md:mr-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-colors duration-300"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-500 transition-colors duration-300"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-300 transition-colors duration-300"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* コピーライト */}
      <div className="text-center text-gray-600 mt-6">
        <p>© 2025 GourmeApp</p>
      </div>
    </footer>
  );
}
