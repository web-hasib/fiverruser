import React from 'react';

export const WhoItsForSection = () => {
  const sections = [
    {
      id: 1,
      title: "Hospitals & Clinics",
      description: "Reduce documentation time and clinician burnout.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Private Practices",
      description: "Create structured reports without administrative overload.",
      image: "https://images.unsplash.com/photo-1584969327043-98f2a7e8b1e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Medical Organizations",
      description: "Maintain compliance while leveraging AI responsibly.",
      image: "https://images.unsplash.com/photo-1606220930742-64534e1b9c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-blue-700 to-blue-100 pt-16 pb-16 mx-4 rounded-3xl mt-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          Who It's For
        </h2>
        
        {/* Parent Card with White Background */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((section) => (
              <div 
                key={section.id}
                className="relative rounded-xl overflow-hidden h-[300px] sm:h-[350px] md:h-[400px]"
              >
                <div className="h-full">
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Absolute positioned text container */}
                <div className="absolute bottom-0 left-0 right-0 rounded-xl my-4 mx-4 bg-white p-2 sm:p-3">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};