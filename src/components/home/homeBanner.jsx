import { Link } from "react-router-dom";

const HomeBanner = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 px-4">
            <div className="max-w-3xl text-center text-white">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
                    Welcome to <span className="text-teal-400">Item Showcase</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-8">
                    Add your items with images and details. View them in a stylish layout with modern design and interactions.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/add"
                        className="px-6 py-3 rounded-xl text-lg font-semibold bg-teal-500 hover:bg-teal-600 transition duration-300"
                    >
                        Add Items
                    </Link>
                    <Link
                        to="/seeAll"
                        className="px-6 py-3 rounded-xl text-lg font-semibold bg-white text-gray-900 hover:bg-gray-200 transition duration-300"
                    >
                        View All Items
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
