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
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6">
              <Image
                src="/solution.png"
                alt="CAMERA-PRO Logo"
                width={24}
                height={24}
              />
            </div>

            <h3 className="text-3xl font-semibold text-[#1f1b2d] mb-4">
              Our Solution
            </h3>

            <p className="text-gray-700 leading-relaxed">
              A secure AI platform that assists clinicians while automatically anonymizing patient data before any AI processing.
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
