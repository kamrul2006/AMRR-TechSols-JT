import { Link } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center px-6 py-12">
            {/* Icon */}
            <AiOutlineWarning className="text-red-500 text-6xl mb-4 animate-bounce" />

            {/* Heading */}
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
                Oops! Something went wrong
            </h1>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                The page you're looking for doesn't exist or an unexpected error occurred.
            </p>

            {/* Go Home Button */}
            <Link
                to="/"
                className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition"
            >
                Go back home
            </Link>
        </div>
    );
};

export default ErrorPage;
