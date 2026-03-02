import React from 'react';

export const PrivacySection = () => {
  return (
    <section 
      className="py-16 px-4 sm:py-20 bg-cover bg-center relative"
      style={{ backgroundImage: 'url("/why-choose.png")' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 to-blue-100/80"></div>
      
      <div className="max-w-5xl mx-auto relative z-10 ">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl overflow-hidden">
          <div className="flex justify-between items-center">
            {/* Left Content */}
            <div className="md:w-1/3 text-center md:text-left mb-6 md:mb-0">
              <div className="w-12 h-12 mb-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12c0 4.418-4.418 8-10 8-5.582 0-10-3.582-10-8s4.418-8 10-8 10 3.582 10 8z"></path>
                    <path d="M21 12a9 9 0 1 1-18 0"></path>
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                Designed with <br /> Privacy at <br /> the Core.
              </h2>
              
              <p className="text-gray-600 text-sm max-w-md">
                Every interaction is built to protect patient privacy, ensuring compliance without compromising clinical efficiency.
              </p>
            </div>
            
            {/* Center Image - Exactly as requested */}
            <div className="md:w-1/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center mb-6 md:mb-0">
              <div className="w-72 h-110 rounded-t-full rounded-b-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src="/doctor.jpg" 
                  alt="Doctor and patient" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Right Features */}
            <div className="md:w-1/3 pl-0 md:pl-8">
              <ul className="space-y-4">
                {[
                  "No raw patient data stored",
                  "Encrypted data handling",
                  "No identifiable data sent externally",
                  "Audit-ready logging"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-3 mt-1 flex-shrink-0">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};