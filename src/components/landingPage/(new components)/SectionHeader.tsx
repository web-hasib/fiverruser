"use client";
import React from "react";
import { cn } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlightedText?: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
  icon?: React.ReactNode;
  br?: boolean;
}

export const SectionHeader = ({
  badge,
  title,
  highlightedText,
  description,
  className,
  align = "center",
  icon,
  br = false,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-1 sm:gap-3 lg:gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            scale: { type: "spring", stiffness: 400, damping: 25 },
          }}
          className="inline-block p-[2px] rounded-full bg-[linear-gradient(109.89deg,#102FEC_11.07%,#05B1D5_88.3%)] 
                     shadow-sm hover:shadow-md group cursor-pointer"
        >
          <Badge
            variant="outline"
            className="px-5 py-3 text-base font-semibold uppercase tracking-[0.125em] 
                       text-blue-600 bg-white rounded-full border-0 
                       flex items-center gap-3 transition-colors duration-300"
          >
            {/* Larger & Better Icon */}
            <motion.span 
              className="text-2xl inline-block"
              whileHover={{ rotate: 6, scale: 1.1 }}
            >
              {icon}
            </motion.span>

            <span>{badge}</span>
          </Badge>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl mt-4 sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 max-w-6xl"
      >
        {title}
        {br && <br />}
        <span className="bg-[linear-gradient(109.89deg,#102FEC_11.07%,#05B1D5_88.3%)] bg-clip-text text-transparent">
          {highlightedText}
        </span>
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[14px] md:text-xl w-[90%] sm:w-[70%] md:w-[80%] max-w-4xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};