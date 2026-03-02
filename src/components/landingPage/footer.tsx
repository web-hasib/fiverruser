import Link from "next/link";
import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-700 to-blue-50 pt-12 pb-8 mx-4 rounded-t-3xl mt-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl p-6 sm:p-8">
          {/* Main Content */}
         <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 lg:gap-12 items-start lg:items-center">
            {/* Left: Logo */}
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/logo.png"
                width={250}           // Matches approximate size in screenshot (~square icon)
                height={140}
                alt="CAMERA-PRO Logo"
                className="object-contain"
              />
            </div>

            {/* Center: Headline + Button */}
            <div className="text-center lg:text-left">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                Ready to See <br />
                Medical AI Done Right?
              </h3>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-lg transition-colors shadow-sm min-w-[180px]">
                  Request a Demo
                </button>

                {/* Single arrow button like in screenshot */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-lg transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Right: Description */}
            <div className="text-center lg:text-right">
              <p className="text-gray-700 text-base lg:text-lg leading-relaxed max-w-xs mx-auto lg:mx-0">
                Experience a secure, compliant AI <br />
                platform designed for real clinical <br />
                workflows.
              </p>
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
              <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Privacy & Policy</Link>
              <Link href="/term-condition" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Terms & Conditions</Link>
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