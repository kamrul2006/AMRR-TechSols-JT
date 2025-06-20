import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white border-t mt-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700">

                {/* Logo Section */}
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <div className="bg-gray-900 text-white px-3 py-1 font-bold text-lg tracking-wider">
                        AMRR
                    </div>
                    <span className="text-gray-800 font-semibold text-lg">TechSols</span>
                </div>

                {/* Footer Links */}
                <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/seeAll" className="hover:underline">See All</Link>
                    <Link to="/add" className="hover:underline">Add Items</Link>
                    <Link to="/contact" className="hover:underline">Contact Us</Link>
                </div>

                {/* Copyright */}
                <div className="text-gray-500 text-center md:text-right">
                    © {new Date().getFullYear()} Kamrul I. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
