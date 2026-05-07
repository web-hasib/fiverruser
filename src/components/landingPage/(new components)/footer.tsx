import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-[#0B0F19] pt-16 pb-8">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-5 lg:pr-8">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo-for-new-nav.png"
                width={200}
                height={60}
                alt="MedAI Pro"
                className="object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm lg:text-lg">
              AI-powered medical documentation assistant designed for doctors,
              nurses, and clinical teams. Turn patient conversations and documents
              into structured notes, referral letters, and actionable tasks — securely
              and efficiently.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h4 className="text-white font-medium text-base lg:text-xl mb-6">Feature</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Home</Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Product</Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">How it Work</Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Security</Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Pricing</Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-white font-medium text-base lg:text-xl mb-6">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">About Us!</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Contact Us!</Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Testimonials</Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-white font-medium text-base lg:text-xl mb-6">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/term-condition" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm lg:text-base">Compliance & GDPR</Link>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-white font-medium text-base lg:text-xl mb-6">Contact Info</h4>
              <ul className="space-y-4">
                <li>
                  <p className="text-gray-400 text-sm lg:text-base mb-1">Email:</p>
                  <a href="mailto:support@medscribe.ai" className="text-[#00a8ff] hover:text-blue-400 transition-colors text-sm lg:text-base">support@medscribe.ai</a>
                </li>
                <li>
                  <p className="text-gray-400 text-sm lg:text-base mb-1 mt-4">Business Inquiries</p>
                  <a href="mailto:contact@medscribe.ai" className="text-[#00a8ff] hover:text-blue-400 transition-colors text-sm lg:text-base">contact@medscribe.ai</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2026 MedScribe AI. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5 fill-current" />
            </Link>
            <Link href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5 fill-current" />
            </Link>
            <Link href="#" className="text-white hover:text-gray-300 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 fill-current" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
