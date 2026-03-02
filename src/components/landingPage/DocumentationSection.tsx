import Image from "next/image";
import { AlertTriangle } from "lucide-react";

export default function DocumentationSection() {
  return (
    <section className="w-full bg-[#f4f4f6] py-16 mt-20 ">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1f1b2d] leading-tight">
            From Documentation Burden to <br />
            Clinical Efficiency
          </h2>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Medical documentation is time-consuming and compliance-heavy. 
            Our platform removes friction by combining secure AI with 
            automated data anonymization.
          </p>
        </div>

        {/* Card Container */}
       <div className="flex justify-beetwen md:max-w-3/4">
         <div className="bg-[#f3e9ea] rounded-2xl p-8 md:p-6 flex flex-col md:flex-row items-center gap-10">
          
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
                src="/doctor.jpg" // replace with your image path
                alt="Doctor reviewing clinical documentation"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
        <div className="hidden md:flex justify-center items-end md:ml-10 max-w-1/4 ">
            <Image
              src="/array.png" // replace with your image path
              alt="arrow"
              width={100}
              height={100}
              className="object-cover w-[200px]"
            />
        </div>
       </div>
      </div>
    </section>
  );
}
