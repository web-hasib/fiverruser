import { AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function OurSolutionSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-14 md:mb-20">
      
      {/* Wrapper controls alignment */}
      <div className="flex lg:justify-end">
        
        {/* Card */}
        <div className="w-full lg:w-[70%]  bg-blue-100 rounded-2xl p-8 md:p-6 flex flex-col md:flex-row items-center gap-10">
          
          {/* Left Content */}
          <div className="flex-1">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6">
              <AlertTriangle className="text-red-500 w-6 h-6" />
            </div>

            <h3 className="text-3xl font-semibold text-[#1f1b2d] mb-4">
              The Problem
            </h3>

            <p className="text-gray-700 leading-relaxed">
              Medical professionals spend hours creating and restructuring 
              clinical documentation under strict compliance requirements.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full">
            <div className="relative w-full h-[300px] md:h-[350px] rounded-xl overflow-hidden">
              <Image
                src="/doctor.jpg"
                alt="Doctor reviewing clinical documentation"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
