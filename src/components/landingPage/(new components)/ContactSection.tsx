"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { motion } from 'framer-motion';

export const ContactSection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  } as const;

  return (
    <section className="relative bg-[#020612] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Deep, glowing background gradient tailored to Figma's layer blur setup */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] bg-[#0084FF] rounded-full mix-blend-screen pointer-events-none"
        style={{
          filter: 'blur(250px)',
        }}
      />

      {/* Card container with exact thin bright borderline from Figma */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-2xl mx-auto bg-[#071329]/20 border-2 border-white/40 rounded-3xl p-8 sm:p-12 shadow-[0_4px_60px_-15px_rgba(0,132,255,0.1)]"
      >
        
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10 flex flex-col items-center">
          <div className="inline-flex items-center justify-center space-x-2 bg-linear-to-r from-[#03112E] to-[#0A1A3A] border border-[#505d7a] rounded-full px-4 py-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <span className="text-[10px] md:text-xs font-medium text-white tracking-widest uppercase">CONTACT US!</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-[#94A3B8] text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Have a question, feedback, or need assistance? Send us a message and our team will get back to you.
          </p>
        </motion.div>

        {/* Form */}
        <form className="space-y-5">
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label className="block text-xs md:text-sm text-[#8E9FBE]">Full Name</label>
            <input
              type="text"
              placeholder="eg: Dr. John Carter"
              className="w-full bg-[#1A2A47]/70 border border-transparent rounded-lg px-4 py-3 md:py-3.5 text-sm md:text-base text-gray-200 placeholder-[#475E88] focus:outline-none focus:ring-1 focus:ring-[#0084FF] focus:bg-[#1E3052] hover:border-gray-500/30 transition-colors"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1.5">
            <label className="block text-xs md:text-sm text-[#8E9FBE]">Email Address</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full bg-[#1A2A47]/70 border border-transparent rounded-lg px-4 py-3 md:py-3.5 text-sm md:text-base text-gray-200 placeholder-[#475E88] focus:outline-none focus:ring-1 focus:ring-[#0084FF] focus:bg-[#1E3052] hover:border-gray-500/30 transition-colors"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1.5">
            <label className="block text-xs md:text-sm text-[#8E9FBE]">Organization / Clinic (optional)</label>
            <input
              type="text"
              className="w-full bg-[#1A2A47]/70 border border-transparent rounded-lg px-4 py-3 md:py-3.5 text-sm md:text-base text-gray-200 placeholder-[#475E88] focus:outline-none focus:ring-1 focus:ring-[#0084FF] focus:bg-[#1E3052] hover:border-gray-500/30 transition-colors"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1.5">
            <label className="block text-xs md:text-sm text-[#8E9FBE]">Enter Subject</label>
            <input
              type="text"
              placeholder="Create organize details"
              className="w-full bg-[#1A2A47]/70 border border-transparent rounded-lg px-4 py-3 md:py-3.5 text-sm md:text-base text-gray-200 placeholder-[#475E88] focus:outline-none focus:ring-1 focus:ring-[#0084FF] focus:bg-[#1E3052] hover:border-gray-500/30 transition-colors"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1.5 text-left pb-2">
            <label className="block text-xs md:text-sm text-[#8E9FBE]">Message</label>
            <textarea
              rows={5}
              placeholder="Write message"
              className="w-full bg-[#1A2A47]/70 border border-transparent rounded-lg px-4 py-3 md:py-3.5 text-sm md:text-base text-gray-200 placeholder-[#475E88] focus:outline-none focus:ring-1 focus:ring-[#0084FF] focus:bg-[#1E3052] hover:border-gray-500/30 transition-colors resize-none"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              variant={'gradient'}
              size={'lg'}
              className='w-full h-12'
            >
              SEND MESSAGE 
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </form>

      </motion.div>
    </section>
  );
};

