import React from "react";

export const BuiltForFutureSection = () => {
  const features = [
    {
      id: 1,
      title: "New Specialties",
      description: "Easy onboarding",
      icon: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M41.3333 29.3333C41.3333 24.1787 37.1547 20 32 20C26.8453 20 22.6667 24.1787 22.6667 29.3333C22.6667 34.488 26.8453 38.6667 32 38.6667C37.1547 38.6667 41.3333 34.488 41.3333 29.3333Z"
            stroke="#1B123D"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M41.2872 30.2664C42.1459 30.5267 43.0565 30.6667 44 30.6667C49.1547 30.6667 53.3333 26.488 53.3333 21.3333C53.3333 16.1787 49.1547 12 44 12C39.1603 12 35.1808 15.6837 34.7128 20.4003"
            stroke="#1B123D"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M29.2872 20.4003C28.8192 15.6837 24.8398 12 20 12C14.8453 12 10.6667 16.1787 10.6667 21.3333C10.6667 26.488 14.8453 30.6667 20 30.6667C20.9435 30.6667 21.8543 30.5267 22.7127 30.2664"
            stroke="#1B123D"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M58.6667 44.0001C58.6667 36.6363 52.1003 30.6667 44 30.6667"
            stroke="#1B123D"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M46.6667 52.0001C46.6667 44.6363 40.1003 38.6667 32 38.6667C23.8998 38.6667 17.3333 44.6363 17.3333 52.0001"
            stroke="#1B123D"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M20 30.6667C11.8998 30.6667 5.33334 36.6363 5.33334 44.0001"
            stroke="#1B123D"
            stroke-width="4"
            stroke-linecap="round"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "On-Prem AI",
      description: "Local deployment option",
      icon: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.668 24C24.4393 22.3256 21.6688 21.3333 18.6666 21.3333C18.2353 21.3333 17.8087 21.3538 17.3878 21.3939C10.6239 22.0375 5.33331 27.7341 5.33331 34.6667C5.33331 39.9443 8.39958 44.5056 12.8478 46.6667M43.3141 32C45.1429 29.7856 46.3341 27.0253 46.6069 24.0001C46.6464 23.561 46.6666 23.1162 46.6666 22.6667C46.6666 14.5665 40.1002 8 32 8C24.557 8 18.4089 13.5442 17.4603 20.7281M52.1696 46.6667C56.0288 44.6717 58.6666 40.644 58.6666 36C58.6666 29.5736 53.6149 24.3269 47.2658 24.0147"
            stroke="#1B123D"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M32 37.3333L32.6878 39.1919C33.5896 41.6293 34.0406 42.8479 34.9296 43.737C35.8187 44.6261 37.0374 45.077 39.4747 45.9789L41.3334 46.6666L39.4747 47.3543C37.0374 48.2562 35.8187 48.7071 34.9296 49.5962C34.0406 50.4853 33.5896 51.7039 32.6878 54.1413L32 55.9999L31.3123 54.1413C30.4104 51.7039 29.9595 50.4853 29.0704 49.5962C28.1814 48.7071 26.9627 48.2562 24.5254 47.3543L22.6667 46.6666L24.5254 45.9789C26.9627 45.077 28.1814 44.6261 29.0704 43.737C29.9595 42.8479 30.4104 41.6293 31.3123 39.1919L32 37.3333Z"
            stroke="#1B123D"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Flexible Pricing",
      description: "Subscription tiers",
      icon: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M55.8472 44.9293C54.0971 34.4239 44.7365 23.3578 40 18.7629H24C19.2634 23.3578 9.90295 34.4239 8.15271 44.9293C6.85047 52.7458 14.078 58.6695 22.1555 58.6695H41.8445C49.9219 58.6695 57.1496 52.7458 55.8472 44.9293Z"
            stroke="black"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M32 30.7348C29.0544 30.7348 26.6666 32.5217 26.6666 34.7255C26.6666 36.9295 29.0544 38.7161 32 38.7161C34.9456 38.7161 37.3333 40.503 37.3333 42.7068C37.3333 44.9108 34.9456 46.6974 32 46.6974M32 30.7348C34.3221 30.7348 36.2976 31.8455 37.0298 33.3953M32 30.7348V26.7444M32 46.6974C29.6778 46.6974 27.7024 45.5871 26.9701 44.0372M32 46.6974V50.6881"
            stroke="black"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24.0818 18.7616L18.7145 9.39629C18.7034 9.37693 18.7197 9.35336 18.7418 9.35677L26.7139 10.5895L32.0461 5.33848C32.0565 5.32816 32.0733 5.32827 32.0837 5.33872L37.2845 10.5895L45.2568 9.35675C45.2789 9.35333 45.2952 9.37683 45.284 9.39619L39.9603 18.7616"
            stroke="black"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Advanced Analytics",
      description: "Scalable reporting",
      icon: (
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M57.3333 12.0001C57.3333 14.9456 54.9456 17.3334 52 17.3334C49.0544 17.3334 46.6666 14.9456 46.6666 12.0001C46.6666 9.05456 49.0544 6.66675 52 6.66675C54.9456 6.66675 57.3333 9.05456 57.3333 12.0001Z"
            stroke="#1B123D"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M54.5896 25.082C54.6666 27.4402 54.6666 30.165 54.6666 33.3333C54.6666 44.6469 54.6666 50.3039 51.152 53.8186C47.6373 57.3333 41.9802 57.3333 30.6666 57.3333C19.3529 57.3333 13.6961 57.3333 10.1813 53.8186C6.66663 50.3039 6.66663 44.6469 6.66663 33.3333C6.66663 22.0195 6.66663 16.3627 10.1813 12.848C13.6961 9.33325 19.3529 9.33325 30.6666 9.33325C33.8349 9.33325 36.5597 9.33325 38.9178 9.41045"
            stroke="#1B123D"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path
            d="M17.3334 38.6667L24.7811 31.2189C25.8225 30.1776 27.511 30.1776 28.5523 31.2189L32.7811 35.4477C33.8224 36.4891 35.511 36.4891 36.5523 35.4477L44 28"
            stroke="#1B123D"
            stroke-width="4"
            stroke-linecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="py-16 px-4 sm:py-20 bg-cover bg-center"
      style={{ backgroundImage: 'url("/how-work.png")' }}
    >
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
            <div className="bg-white p-4 rounded-xl">
              <div
                key={feature.id}
                className="bg-blue-50  rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-12 h-12 rounded-lg text-gray-600  flex items-center justify-center mb-5 ">
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
