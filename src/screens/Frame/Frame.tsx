import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect, useState } from "react";
import Features from "../../components/ui/features";
import Header from "../../components/ui/Header";
import Signup from "../../components/ui/Signup";
import HowItWorksCarousel from "../../components/ui/imageswiper";

export const Frame = (): JSX.Element => {
  
  const STATE_MACHINE_NAME = "State Machine 1";
  const HOVER_INPUT = "hover";

  const { rive, RiveComponent } = useRive({
    src: "/shred_head.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });

  const hoverInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    HOVER_INPUT
  );

  const adjectives = ["Simplest", "Safest", "Fastest"];
  const [currentAdjectiveIndex, setCurrentAdjectiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdjectiveIndex((prevIndex) => (prevIndex + 1) % adjectives.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const animatedText = adjectives[currentAdjectiveIndex];

  // date and time 
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format the date and time
  const day = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
  const date = currentTime.toLocaleDateString();
  const time = currentTime.toLocaleTimeString();

  return (
    <div className="relative w-full h-screen bg-[#17000d] overflow-x-hidden overflow-y-auto text-white">
      {/* Header Navigation */}
      <header className="w-full py-4 flex ">
        <Header/>
      </header>

      {/* Main Logo Section */}
<section className="w-full bg-[#18040c] py-20 px-4">
  <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">

    {/* LEFT SECTION */}
    <div className="relative w-full lg:w-1/2 flex flex-col items-center text-center">
      {/* Red corner squares - Increased spacing on mobile */}
      <div className="absolute -top-2 -left-1 sm:top-0 sm:left-0 w-6 h-6 bg-[#ff003c]"></div>
      <div className="absolute -top-2 -right-1 sm:top-0 sm:right-0 w-6 h-6 bg-[#ff003c]"></div>
      <div className="absolute -bottom-4 -left-1 sm:bottom-0 sm:left-0 w-6 h-6 bg-[#ff003c]"></div>
      <div className="absolute -bottom-4 -right-1 sm:bottom-0 sm:right-0 w-6 h-6 bg-[#ff003c]"></div>

      <img
        src="/logo-text-shred.png"
        alt="Logo TEXT SHRED"
        className="w-2/3 max-w-[200px] sm:max-w-md sm:w-full"
      />

      <div className="mt-6 text-[#7f0c21] text-2xl lg:text-2xl font-inter transition-all duration-500 ease-in-out">
        The <span className="text-[#ff003c] font-semibold text-underline">{animatedText}</span> Telegram Trading Bot on Avalanche
      </div>

      <div className="mt-4 text-[#7f0c21] text-sm sm:text-lg max-w-sm sm:max-w-lg">
        Welcome to Shred.bot Your one and only goto bot to dominate on the Avalanche Chain  Snipe upcoming launches or trade tokens that are already live ; Shred is here to make you those big boy diamonds
      </div>
    </div>

    {/* RIGHT SECTION */}
    <div className="w-full lg:w-1/2 flex justify-center items-center gap-6">
      {/* Main Rive box with background GIF */}
      <div
        className="relative h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] overflow-hidden"
        onMouseEnter={() => hoverInput && (hoverInput.value = true)}
        onMouseLeave={() => hoverInput && (hoverInput.value = false)}
      >
        {/* Background GIF */}
        <img
          src="/shredheadbg.gif"
          alt="Background Animation"
          className="absolute inset-0 w-full h-full object-contain z-0"
        />

        {/* Rive animation on top */}
        <div className="absolute inset-0 z-10">
          <RiveComponent className="w-full h-full" />
        </div>
      </div>
    </div>
  </div>
</section>

<section className=" sm: top-0">
  <Signup/> 
</section>

      {/* Verification Section */}
<section className="container mx-auto my-4">
<div className="lg:grid lg:grid-cols-5 gap-4 sm:gap-12  flex overflow-x-auto flex-nowrap space-x-4 sm:space-x-0 px-2 sm:px-0">
  {/* Box 1 */}
  <Card className="w-32 sm:col-span-1 sm:w-48 shrink-0 bg-cyan-300 text-black flex items-center justify-center h-32 sm:h-40 rounded-none border-none">
    <CardContent className="text-center text-xs sm:text-xl font-inter tracking-widest p-0">
      TELEGRAM<br />BOT
    </CardContent>
  </Card>

  {/* Box 2 */}
  <Card className="w-32 sm:col-span-1 sm:w-48 shrink-0 bg-[#a0142f] text-[#ffb3b3] font-inter flex items-center justify-center h-32 sm:h-40 rounded-none border-none">
    <CardContent className="text-center text-sm sm:text-xl tracking-widest p-0">
      WEBAPP<br />(soon)
    </CardContent>
  </Card>

  {/* Box 3 */}
  <Card className="w-32 sm:col-span-1 sm:w-48 shrink-0 bg-[#a0142f] text-[#ffb3b3] font-inter flex items-center justify-center h-32 sm:h-40 rounded-none border-none">
    <CardContent className="text-center text-sm sm:text-xl tracking-widest p-0">
      APPLE STORE<br />(later)
    </CardContent>
  </Card>

  {/* Box 4 */}
  <Card className="w-36 sm:col-span-2 sm:w-72 shrink-0 bg-[#a0142f] text-white flex items-center h-32 sm:h-40 px-4 sm:px-6 rounded-none border-none">
    <CardContent className="text-left text-xs sm:text-sm tracking-wide space-y-1 sm:space-y-2 p-0">
      <p className="text-[#cccccc] font-inter sm:text-sm">
        Link verified <span className="text-white font-inter text-sm sm:text-xl">TELEGRAM</span> active
      </p>
      <p className="text-[#cccccc] font-inter text-xl sm:text-xl">
        Link verified <span className="text-white font-inter text-sm sm:text-xl">X</span> active
      </p>
    </CardContent>
  </Card>
</div>

  
  <div className="flex items-start justify-between mt-6 pt-4  font-inter text-sm text-[#ffb3b3] tracking-wide">
    {/* Left Side - Links */}
    <div className="flex flex-col space-y-1 text-[#8d3030] font-inter text-sm font-bold text-left w-1/2 leading-tight">
      <span>Welcome to ShredBot *</span>
      <span>Authorised Users only!</span>
      <span>New Users MUST notify Sys/Ops.</span>
    </div>

    {/* Right Side - Time Info */}
   <div className="flex flex-col items-end w-1/2 text-[#8d3030] font-bold tracking-widest leading-relaxed">
  <div>{day}</div>
  
    <span>{date}</span>
    <span>{time}</span>
  
</div>
  </div>

{/* Additional Pink Boxes Section */}
<div className="relative mt-8 flex justify-end pr-8 top-16">
  {/* Small pink box - modified for mobile */}
  <div className=" hidden lg:block  bg-[#CB0F31] h-64 w-1/2 absolute z-0 -top-24 right-12 sm:right-32 border-2 border-[#7F0C21] md:w-1/3 sm:w-1/2">
    <div className="border-b border-[#05FCFB] w-full h-8 flex justify-end items-center px-2 py-1">
      <button className="text-[#00bcd4] text-xl font-inter">X</button>
    </div>
    <div className="px-3 py-2">
      <p className="font-inter text-xs text-white leading-snug">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </p>
    </div>
  </div>

  {/* Main Pink Box with Lorem Ipsum Text - modified for mobile */}
  <div className="bg-[#ca0f30] text-white w-auto min-h-96 px-1 relative z-5  ml-8 sm:ml-0 md:w-3/4">
    <div className="border-b border-[#05FCFB] w-full flex justify-between items-center px-2 py-1">
      <h2 className="text-[#00bcd4] font-inter text-lg tracking-wider sm:text-base">About.exe</h2>
      <button className="text-[#00bcd4] font-inter text-xl sm:text-lg">X</button>
    </div>

    <div className="grid grid-cols-3 gap-8 text-sm p-4 sm:gap-4 sm:p-2">
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="space-y-8 text-center sm:space-y-8">
          <h3 className="text-xs font-inter tracking-wide sm:text-xl">Lorem Ipsum</h3>
          <p className="text-xs font-inter leading-relaxed opacity-90 sm:text-lg sm:leading-snug">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <button className="border border-white px-4 py-1 tracking-wide font-inter text-xs  hover:border-none hover:bg-none transition-colors duration-300 ease-out sm:px-2 sm:py-0.5 sm:text-lg">
            Lorem ipsum
          </button>
        </div>
      ))}
    </div>
  </div>
</div>


  {/* Bottom Section with Blue Image and Dark Boxes */}
  <div className="flex justify-end">
  <div className="grid grid-cols-3 gap-12 mt-8 relative left-0 sm:left-24 top-6 sm:top-0">
    {/* Left Side - Blue Binary/Matrix Image */}
    <div className="col-span-3  relative top-8  sm:col-span-2   lg:col-span-1 p-24   ">
      <div className="">
        <img src="/bluepaw.png" alt="" />
        </div>
      </div>
    

    {/* Right Side - Dark Boxes */}
    
<div className="hidden lg:flex col-span-2 space-y-4 relative z-10">
  {/* First Box (unchanged) */}
  <div className="bg-[#18040c] border border-[#760c1e] sm:w-1/2 min-h-80 text-[#760c1e] z-10">
    <div className="border-b border-[#05FCFB] w-full flex justify-end items-center px-2 py-1">
      <button className="text-[#00bcd4] text-xl font-bold">X</button>
    </div>
    <div className="text-xs font-inter leading-relaxed font-bold">
      <div className="text-[#e91e63] mb-2">SYSTEM STATUS</div>
      <div className="space-y-1 font-bold">
        <p>bro lorem ipsum</p>
      </div>
    </div>
  </div>

  {/* Second Box (updated positioning) */}
  <div className="absolute top-2/4 sm:top-1/4 sm:left-1/3 bg-[#18040c] border border-[#760c1e]  w-2/3 sm:w-1/2 sm:min-h-80 text-[#760c1e] z-20 shadow-lg">
    <div className="border-b border-[#05FCFB] w-full flex justify-end items-center px-2 py-1">
      <button className="text-[#00bcd4] text-xl font-bold">X</button>
    </div>
    <div className="text-xs font-inter leading-relaxed font-bold ">
      <div className="text-[#e91e63] mb-2">ACTIVE CONNECTIONS</div>
      <div className="space-y-1 font-bold">
        <div>TELEGRAM: 847 users online</div>
        <div>API CALLS: 12.3k/hour</div>
        <div>RESPONSE TIME: 0.23ms avg</div>
      </div>
      <button className="bg-[#e91e63] text-white px-3 py-1 text-xs mt-3 hover:bg-[#c2185b] transition-colors">
        MONITOR
      </button>
    </div>
  </div>
</div>
  </div>
  </div>
  <div className="flex justify-center items-center relative mt-16">
      <HowItWorksCarousel
      />
  </div>
</section>
<div className="h-16"></div> 


      {/* System Info Section */}
<section className="container mx-auto my-16">
  <div className="flex justify-between items-start">
    {/* Left Block */}
    <div className="w-1/3 flex flex-col items-start">
      <h4 className="text-[#7f0c21] font-inter font-bold text-md sm:text-4xl mb-8">Disk: Disk 2</h4>
      <div className="relative text-[#7f0c21] font-inter text-lg transform rotate-90 origin-left ">
        4e6576657220676f6e6e61206c657420796f7520646f776e
      </div>
    </div>

    {/* Center Block */}
    <div className="w-1/3 text-center">
      <h2 className="text-white mb-8 font-inter text-4xl">FEATURES</h2>
    </div>

    {/* Right Block */}
    <div className="w-1/3 flex flex-col items-end">
      <h4 className="text-[#7f0c21] font-inter font-bold text-md sm:text-4xl  mb-8">Escape: Files</h4>
      <div className="text-[#7f0c21] font-inter text-lg transform -rotate-90 origin-right">
        4e6576657220676f6e6e61206c657420796f7520646f776e
      </div>
    </div>
  </div>
</section>

<section className="relative -mt-24 md:mt-0 -mb-24 sm:mb-0">
  <div className="md:transform md:scale-90 transform scale-75 origin-top"> 
    <Features />
  </div>
</section>

<div className="h-0 md:h-16"></div> 
      {/* Footer */}
      <footer className="container mx-auto py-12 border-t border-[#7f0c21]/30">
        <div className="flex justify-between items-center">
          <div className="text-[#7f0c21] text-sm sm:text-xl ">
            Please select a command:
            <br />
            <br />
            <span className="text-white text-sm sm:text-xl">
              &gt;Telegram
              </span>
              <br />
            <span className="text-white text-sm sm:text-xl">
              &gt;X
            </span>
          </div>

          <img
            className="w-1/2"
            alt="Logo TEXT SHRED"
            src="/logo-text-shred.png"
          />
        </div>
      </footer>
    </div>
  );

};