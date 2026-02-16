import Link from "next/link";
import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-700 to-blue-50 pt-12 pb-8 mx-4 rounded-t-3xl mt-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl p-6 sm:p-8">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Logo */}
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mr-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12c0 4.418-4.418 8-10 8-5.582 0-10-3.582-10-8s4.418-8 10-8 10 3.582 10 8z"></path>
                    <path d="M21 12a9 9 0 1 1-18 0"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Center: CTA */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Ready to See Medical AI Done Right?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl">
                Experience a secure, compliant AI platform designed for real clinical workflows.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                  Request a Demo
                </button>
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>
          
          {/* Social & Links */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <Link href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Privacy & Policy</Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">GDPR</Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Security</Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">How it work</Link>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© CAMERA-PRO Hungary Kft.</p>
            <p>Secure Medical AI Platform . 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
};