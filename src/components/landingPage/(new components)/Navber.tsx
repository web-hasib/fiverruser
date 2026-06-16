// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { LanguageSwitcher } from "../../google-translation/LanguageSwitcher";

// const navLinks = [
//   { name: "Home", href: "#home", active: true },
//   { name: "Security & Compliance", href: "#security" },
//   { name: "How It Works", href: "#HowItWorks" },
//   { name: "Features", href: "#features" },
//   { name: "Who It's For", href: "#who-its-for" },
// ];

// export default function Navbar() {
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSmoothScroll = (
//     e: React.MouseEvent<HTMLAnchorElement>,
//     href: string,
//   ) => {
//     if (href.startsWith("#")) {
//       e.preventDefault();
//       const targetId = href.substring(1);
//       const targetElement = document.getElementById(targetId);

//       if (targetElement) {
//         // Offset for fixed navbar height (64px)
//         const navbarHeight = 72;
//         const elementTop =
//           targetElement.getBoundingClientRect().top +
//           window.scrollY -
//           navbarHeight;
//         window.scrollTo({ top: elementTop, behavior: "smooth" });

//         // ✅ Update URL hash without page reload
//         window.history.pushState(null, "", href);
//       }

//       setIsOpen(false);
//     }
//   };

//   return (
//     <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200 py-2">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link href="/" className="flex-shrink-0">
//             <Image
//               src="/login-logo.png"
//               alt="Logo"
//               width={56}
//               height={56}
//               className="rounded-xl"
//             />
//           </Link>

//           {/* Desktop Nav */}
//           <div className="flex items-center px-2 py-2 md:bg-gray-300 rounded-full bg-opacity-60">
//             <div className="hidden md:flex items-center space-x-1">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   onClick={(e) => handleSmoothScroll(e, link.href)}
//                   className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
//                     link.active
//                       ? "bg-gray-900 text-white"
//                       : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="hidden md:flex items-center space-x-4">
//             <LanguageSwitcher />
//             <button
//               onClick={() => router.push("/login")}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
//             >
//               Sign In
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>

//         {/* Mobile Nav */}
//         {isOpen && (
//           <div className="md:hidden border-t border-gray-200 py-4 animate-in fade-in slide-in-from-top-4">
//             <div className="flex flex-col space-y-3">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   onClick={(e) => handleSmoothScroll(e, link.href)}
//                   className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
//                     link.active
//                       ? "bg-gray-900 text-white"
//                       : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//               <button
//                 onClick={() => router.push("/login")}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
//               >
//                 Sign In
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { LanguageSwitcher } from "../../google-translation/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "#home", active: true },
  { name: "Product", href: "#product", hasDropdown: true },
  { name: "How It Works", href: "#HowItWorks" },
  { name: "Security", href: "#security" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navbarHeight = 80;
        const elementTop =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;
        window.scrollTo({ top: elementTop, behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
      <div
        className={`w-full container mx-auto bg-[#0f111758] border border-white/10 rounded-full h-[72px] flex items-center justify-between px-6 transition-all duration-300 ${
          scrolled
            ? "shadow-2xl shadow-black/50 bg-[#0F1117]/95 backdrop-blur-md"
            : ""
        }`}
      >
        {/* Logo Section */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo-for-new-nav.png"
            alt="Logo"
            width={140}
            height={40}
            className=" rounded-xl"
          />
        </Link>

        {/* Navigation Links Middle Pill */}
        <div className="hidden lg:flex items-center bg-black/30 border border-white/5 rounded-full px-1.5 py-1.5 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                link.active
                  ? "bg-linear-to-r from-[#102FEC] to-[#05B1D5] text-white shadow-lg"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
              {link.hasDropdown && (
                <ChevronDown className="w-4 h-4 opacity-50" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden lg:block">
            <LanguageSwitcher className="bg-transparent! text-white! hover:bg-black/40! hover:text-white! border-transparent!" />
          </div>

          <motion.button
            onClick={() => router.push("/login")}
            whileHover="hover"
            whileTap="tap"
            className="hidden lg:flex items-center gap-3 bg-[#0F1117]/80 backdrop-blur-sm border border-white/10 rounded-full pl-6 pr-1.5 py-1.5 
             cursor-pointer relative overflow-hidden group 
             transition-all duration-300 shadow-xl"
          >
            {/* Liquid Glow Border (Unique Premium Touch) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-full">
              <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,#102FEC,#05B1D5,#102FEC)] animate-border-rotate opacity-30" />
            </div>

            <motion.span 
              variants={{
                hover: { x: -4 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="text-white text-sm font-bold transition-colors group-hover:text-white relative z-10"
            >
              Sign in 
            </motion.span>

            {/* Icon Container */}
            <motion.div
              variants={{
                hover: { x: 2, scale: 1.1 },
                tap: { scale: 0.95 }
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-10 h-10 bg-gradient-to-tr from-[#102FEC] to-[#05B1D5] rounded-full flex items-center justify-center 
                  shadow-lg relative z-10 transition-shadow duration-300 
                  group-hover:shadow-[0_0_20px_rgba(5,177,213,0.4)]"
            >
              <ArrowUpRight
                className="w-4.5 h-4.5 text-white transition-transform duration-500 group-hover:rotate-45"
                strokeWidth={3}
              />
            </motion.div>
          </motion.button>

          {/* Mobile menu Toggle */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 inset-x-4 bg-[#0F1117] border border-white/10 rounded-[32px] p-6 shadow-2xl lg:hidden z-60"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`text-lg font-medium px-4 py-3 rounded-2xl transition-colors ${
                    link.active
                      ? "bg-white/5 text-blue-400"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <div className="flex items-center justify-between px-4 pb-4">
                <LanguageSwitcher />
              </div>
              <button
                onClick={() => {
                  router.push("/login");
                  setIsOpen(false);
                }}
                className="w-full bg-linear-to-r from-[#102FEC] to-[#05B1D5] text-white py-4 rounded-2xl font-bold text-center active:scale-95 transition-transform"
              >
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
