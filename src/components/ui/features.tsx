import React, { useState } from 'react';

const Features = () => {
  const [features] = useState([
    { id: 1, title: "Feature 1", active: true },
    { id: 2, title: "Feature 2", active: false },
    { id: 3, title: "Feature 3", active: false },
    { id: 4, title: "Feature 4", active: false }
  ]);

  const unicodeString = "\u0046\u0065\u0061\u0074\u0075\u0072\u0065\u0020\u0031";

  return (
    <div className="min-h-2/3 bg-[#18040c] flex items-center justify-center sm:pb-20">
      <section className="container  relative min-h-[300px] md:min-h-[600px] max-w-4xl ">
        {/* Feature Stack */}
        <div className="relative w-full h-full flex items-center justify-center">
          {features.map((feature, index) => {
            // Calculate diagonal offset - mobile has smaller offset
            const offset = (features.length - index - 1) * (window.innerWidth < 768 ? 20 : 60);
            const zIndex = features.length - index;
            
            return (
              <div
                key={feature.id}
                className={`absolute w-full md:w-3/4 h-64 md:h-96 p-4 md:p-6 backdrop-blur-sm font-inter bg-black/20 border-2 transition-all duration-300 ${
                  feature.active 
                    ? "border-[#0abbbd] shadow-[0_0_20px_rgba(11,187,189,0.5)] text-[#0abbbd]" 
                    : "border-[#7f0c21] text-[#7f0c21] opacity-80"
                }`}
                style={{ 
                  left: `${offset}px`,
                  top: `${offset}px`,
                  zIndex: zIndex
                }}
              >
                {/* Date - Top Right */}
                {feature.active && (
                  <div className="absolute top-4 md:top-6 right-4 md:right-6 text-[#0abbbd] text-sm md:text-lg font-mono">
                    Date:{" "}
                    <span className="text-[#05fcfb] animate-pulse">
                      {new Date().getDate().toString().padStart(2, '0')}
                    </span>
                    /
                    <span className="text-[#05fcfb] animate-pulse">
                      {(new Date().getMonth() + 1).toString().padStart(2, '0')}
                    </span>
                    /
                    <span className="text-[#05fcfb] animate-pulse">
                      {new Date().getFullYear()}
                    </span>
                  </div>
                )}

                {/* Feature Title */}
                <div className="text-left  md:text-2xl mb-4 md:mb-6 tracking-wider font-inter text-lg">
                  {feature.title}
                </div>

                {/* Active Feature Content */}
                {feature.active && (
                  <div className="text-center mt-4 md:mt-8 space-y-4 md:space-y-6">
                    {/* Lorem Ipsum */}
                    <div className="text-[#0abbbd] text-xs md:text-sm leading-relaxed max-w-xs mx-auto opacity-90">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                      ipsum suspendisse ultrices gravida.
                    </div>

                    {/* Unicode String */}
                    <div className="text-[#0abbbd] text-sm md:text-base mt-4 md:mt-6 font-inter pt-2 md:pt-4">
                      <span>\u0046\u0065\u0061\u0074\u0075\u0072\u0065\</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Data Display Section */}
        <div className="relative mt-64 md:mt-96 w-full p-2 md:p-4 -bottom-24 md:-bottom-48">
          <div className="flex flex-col md:flex-row items-center justify-between h-full">
            {/* Left side - Image, blue box, and crypto data */}
            <div className="flex flex-col w-full md:w-auto ">
              <div className="flex items-center space-x-8 md:space-x-4">
                <img src="7oI.png" alt="" className="w-32 md:w-64 h-32 md:h-64 object-contain" />
                <div className="bg-[#0abbbd] px-12 md:px-36 py-8 md:py-16"></div>
              </div>
              <div className=" font-inter text-xs mt-2 md:mt-4 overflow-x-auto relative top-8 md:top-0">
                <div className="text-[#0abbbd] flex justify-between min-w-[300px]">
                  <span>BTC/USDT------------------------------------------------------100000</span>
                </div>
                <div className="text-[#0abbbd] flex justify-between min-w-[300px]">
                  <span>ETH/USDT--------------------------------------------------------- 2500</span>
                </div>
                <div className="text-[#0abbbd] flex justify-between min-w-[300px]">
                  <span>AVAX/USDT---------------------------------------------------------20</span>
                </div>
              </div>
            </div>

            {/* Right side box */}
            <div className="flex items-end relative -top-44 left-20 md:top-12 mt-4 md:mt-0">
              <div className="w-2 md:w-3 px-12 md:px-24 py-16 md:py-36 bg-[#0abbbd]"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;