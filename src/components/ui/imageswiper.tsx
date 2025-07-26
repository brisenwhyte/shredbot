// src/components/HowItWorksCarousel.tsx
import React, { useState, useEffect } from "react";

const howItWorks = [
  {
    image: '/buy.png',
    title: 'Buy Instantly',
    text: 'Paste a Contract Address and press BUY — or set Limit Buy Orders for any new or live token.',
  },
  {
    image: '/position.png',
    title: 'Track Positions',
    text: 'View your ongoing trades, follow every entry, and track real-time PnL directly in the bot.',
  },
  {
    image: '/sell.png',
    title: 'Swift Sale',
    text: 'Sell manually, or let the bot handle it with your Stoploss or Take Profit orders set in advance.',
  },
];

const HowItWorksCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const n = howItWorks.length;

  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
    };
    
    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);
    
    return () => window.removeEventListener('resize', checkIfDesktop);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPopupOpen) {
        setIsPopupOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPopupOpen]);

  const handleNavigation = (inc: number) => {
    setCurrentIndex((prev) => (prev + inc + n) % n);
  };

  const togglePopup = () => {
    if (isDesktop) {
      setIsPopupOpen(!isPopupOpen);
    }
  };

  const closePopup = (e: React.MouseEvent) => {
    // Only close if clicking on the backdrop (not the image content)
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false);
    }
  };

  return (
    <div className='container mt-12 px-4 sm:px-6 lg:px-8'>
      <h2 className="text-[#ff003c] text-3xl sm:text-4xl lg:text-5xl font-inter text-center mb-12 tracking-tight">
        Shred Bot
      </h2>
      
      <div className="relative max-w-6xl mx-auto" style={{ '--n': n, '--k': currentIndex } as React.CSSProperties}>
        <div className="grid gap-2 grid-cols-1 grid-rows-[repeat(2,_max-content)_1fr_max-content]">
          {howItWorks.map((item, i) => {
            const isTop = i === currentIndex;
            
            return (
              <article 
                key={i}
                className="grid grid-cols-subgrid grid-rows-subgrid col-start-1 col-end-[-1] row-start-1 row-end-[-1] transition-all duration-800 ease-[cubic-bezier(1,-0.9,0,1.9)]"
                style={{ 
                  display: isTop ? 'grid' : 'none',
                } as React.CSSProperties}
              >
                <div className="flex flex-col items-center justify-center text-center gap-6 p-6 h-full">
                  <div className="relative w-full flex items-center justify-center">
                    {/* Previous button */}
                    <button 
                      onClick={() => handleNavigation(-1)}
                      aria-label="previous"
                      className="absolute -left-12 md:left-[-60px] rounded-full w-12 h-12 text-[#CB0F31] font-bold text-2xl flex items-center justify-center transition-colors duration-300 hover:bg-[rgba(203,15,49,0.4)] z-10"
                    >
                      <span className="absolute border-2 border-t-0 border-r-0 border-[currentColor] w-3 h-3 transform rotate-45 -translate-x-1/4"></span>
                    </button>
                    
                    {/* Image container */}
                    <div 
                      className={`relative rounded-xl overflow-hidden border-4 ${isTop ? 'border-[#ff003c]' : 'border-[#CB0F31]'} transition-all duration-500 hover:scale-105 hover:border-[#ff003c] bg-gradient-to-br from-[#12000a] to-[#1a0510] group w-full max-w-sm cursor-pointer lg:cursor-zoom-in`}
                      style={{ 
                        boxShadow: "0 20px 60px rgba(203, 15, 49, 0.3), 0 0 0 1px rgba(203, 15, 49, 0.1)",
                      }}
                      onClick={togglePopup}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff003c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-128 lg:h-[500px] object-fit sm:object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12000a]/80 via-transparent to-transparent"></div>
                    </div>
                    
                    {/* Next button */}
                    <button 
                      onClick={() => handleNavigation(1)}
                      aria-label="next"
                      className="absolute  -right-12 sm:right-0 md:right-[-60px] rounded-full w-12 h-12 text-[#CB0F31] font-bold text-2xl flex items-center justify-center transition-colors duration-300 hover:bg-[rgba(203,15,49,0.4)] z-10"
                    >
                      <span className="absolute border-2 border-t-0 border-r-0 border-[currentColor] w-3 h-3 transform -rotate-135 translate-x-1/4"></span>
                    </button>
                  </div>
                  
                  <div className="space-y-4 max-w-sm">
                    <h3 className="text-[#CB0F31] font-inter text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[#ffb3b3] font-inter text-sm sm:text-base lg:text-lg leading-relaxed opacity-90">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Image Popup */}
      {isPopupOpen && isDesktop && (
  <div 
    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    onClick={(e) => {
      // close only if clicked outside the popup content
      const target = e.target as HTMLElement;
      if (target.id === 'popup-backdrop') {
        setIsPopupOpen(false);
      }
    }}
    id="popup-backdrop"
  >
    <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setIsPopupOpen(false)}
        className="absolute -top-12 right-0 text-white text-4xl hover:text-[#ff003c] transition-colors"
        aria-label="Close popup"
      >
        &times;
      </button>
      <img
        src={howItWorks[currentIndex].image}
        alt={howItWorks[currentIndex].title}
        className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
      />
      <div className="mt-4 text-center text-white">
        <h3 className="text-xl font-bold">{howItWorks[currentIndex].title}</h3>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default HowItWorksCarousel;