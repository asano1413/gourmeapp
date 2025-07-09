import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; 2024 GourmeApp. All rights reserved.</p>
          </div>
          <div>
            <Link href="/terms" className="text-white hover:text-gray-300">利用規約</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
