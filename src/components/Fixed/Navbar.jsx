import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Add Items", path: "/add" },
        { name: "View-Items", path: "/seeAll" },
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <nav className="bg-white/70 backdrop-blur-md shadow-sm font-light fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-1 pl-4 lg:pl-0">
                    <div className="bg-gray-900 text-white px-2 text-base md:text-lg tracking-wider">
                        AMRR
                    </div>
                    <span className="text-gray-800 font-semibold text-lg hidden  md:block">TechSols</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-sm font-medium hover:underline ${isActive ? "underline text-gray-900" : "text-gray-700"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className="block text-sm font-medium text-gray-700 hover:underline"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
