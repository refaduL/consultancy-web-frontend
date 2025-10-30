// The full fix applied:
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to slightly solidify navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "Services", "Universities", "About", "Contact"];

  // Helper function to render a NavLink item and get access to isActive
  const NavItem = ({ item }) => (
    <NavLink
      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
    >
      {({ isActive }) => {
        const underlineClasses = isActive 
          ? "w-full opacity-100" 
          : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100";
          
        return (
          <span 
            className={`relative text-[15px] font-medium tracking-wide transition-all duration-300 group cursor-pointer ${
              isActive
                ? "text-primary-700"
                : "text-gray-700 hover:text-primary-600"
            }`}
          >
            {item}
            
            <span 
              className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300 ${underlineClasses}`}
            ></span>
          </span>
        );
      }}
    </NavLink>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md py-3"
          : "bg-white/60 backdrop-blur-lg shadow-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          EduGlobal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            // Use the helper component to correctly access isActive
            <NavItem key={item} item={item} />
          ))}

          {/* CTA button */}
          <Link
            to="/consultation"
            className="ml-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-300 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            Free Consultation
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-primary-600 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-5 py-6 bg-white/80 backdrop-blur-xl border-t border-gray-200 shadow-soft">
          {navLinks.map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-base font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-primary-700 font-bold"
                    : "text-gray-700 hover:text-primary-500"
                }`
              }
            >
              {item}
            </NavLink>
          ))}

          <Link
            to="/consultation"
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-300 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.05] transition-all duration-300"
          >
            Free Consultation
          </Link>
        </div>
      </div>
    </nav>
  );
}