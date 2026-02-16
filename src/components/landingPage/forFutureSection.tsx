import React from 'react';

export const BuiltForFutureSection = () => {
  const features = [
    {
      id: 1,
      title: "New Specialties",
      description: "Easy onboarding",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 5.74"></path>
        </svg>
      )
    },
    {
      id: 2,
      title: "On-Prem AI",
      description: "Local deployment option",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12l3 3 6-6"></path>
          <path d="M19 19H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"></path>
        </svg>
      )
    },
    {
      id: 3,
      title: "Flexible Pricing",
      description: "Subscription tiers",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20m-6-6h12m-12 0l-3-3m18 3l-3-3m-12 0v-4m12 4v-4"></path>
        </svg>
      )
    },
    {
      id: 4,
      title: "Advanced Analytics",
      description: "Scalable reporting",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h8"></path>
          <path d="M12 14h8"></path>
          <path d="M12 8h8"></path>
          <path d="M12 2h8"></path>
          <path d="M12 20H4"></path>
          <path d="M12 14H4"></path>
          <path d="M12 8H4"></path>
          <path d="M12 2H4"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 px-4 sm:py-20 bg-cover bg-center" style={{ backgroundImage: 'url("/iamge-1.jpg")' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-black sm:text-4xl font-bold  mb-4">
            Built for the Future
          </h2>
          <p className=" max-w-2xl text-black mx-auto">
            Future-ready architecture
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div className='bg-white p-4 rounded-xl'>
                <div
              key={feature.id}
              className="bg-blue-50  rounded-xl p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 rounded-lg text-gray-600  flex items-center justify-center mb-3 ">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-black text-center mb-1">
                  {feature.title}
                </h3>
                <p className="text-blue-700 text-sm text-gray-500 text-center">
                  {feature.description}
                </p>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};