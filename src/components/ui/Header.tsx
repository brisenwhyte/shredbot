import { useState } from "react";
import { Menu, X } from "lucide-react"; // for hamburger icons
import { Button } from "../../components/ui/button";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { text: "Lorem Ipsum", active: false },
    { text: "Lorem Ipsum", active: false },
    { text: "Lorem Ipsum", active: false },
    { text: "Lorem Ipsum", active: false },
  ];

  return (
    <div className="relative w-full  bg-[#17000d] overflow-x-hidden overflow-y-auto text-white">
      {/* Header Navigation */}
      <header className="w-full py-4">
        <img
          className="border-b border-[#7f0c21]/30 pb-4"
          alt="Eht"
          src="/eht60002.png"
        />
        <div className="container  flex items-center justify-between ">
          {/* Hamburger icon - only visible on mobile */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Navigation for large screens */}
          <nav className="hidden lg:flex space-x-8 relative top-3">
            <div className="flex space-x-4 border border-[#7f0c21] px-4 py-1">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "default" : "ghost"}
                  className={`text-xl tracking-wider ${
                    item.active
                      ? "bg-[#7f0c21] text-white font-inter text-xl"
                      : "text-[#7f0c21]"
                  }`}
                >
                  {item.text}
                </Button>
              ))}
            </div>
            <Button className="tracking-wider bg-[#cc0c34] text-white rounded-none font-inter text-xl relative top-1">
              Get Started
            </Button>
          </nav>
        </div>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="lg:hidden mt-4 px-4 space-y-4">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start tracking-wider ${
                  item.active
                    ? "bg-[#7f0c21] text-white font-inter text-xl"
                    : "text-[#7f0c21]"
                }`}
              >
                {item.text}
              </Button>
            ))}
            <Button className="w-full bg-[#cc0c34] text-white rounded-none font-inter text-xl">
              Get Started
            </Button>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
