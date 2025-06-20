import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Swal from "sweetalert2";

// ----- ViewItems Component
const ViewItems = () => {
    // ----- State hooks for data, loading, error, and selected modal item
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");

    // ----- Fetch items from backend when component mounts
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get("https://coffi-back.vercel.app/coffees");
                const filtered = res.data.filter(item => item.web === "amrrkamrul");
                setItems(filtered);
                setFilteredItems(filtered);
            } catch (err) {
                console.error("Error fetching items:", err);
                setError("Failed to load items.");
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    // ----- Handle search & filter logic
    useEffect(() => {
        const result = items.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) &&
            (typeFilter === "All" || item.type === typeFilter)
        );
        setFilteredItems(result);
    }, [searchText, typeFilter, items]);

    // ----- Get unique types for filter dropdown
    const types = ["All", ...new Set(items.map(item => item.type))];

    return (
        <div className="max-w-7xl mx-auto px-4 pt-14 lg:pt-20">
            {/* ----- Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-center text-teal-600 dark:text-teal-400 mb-12">
                Uploaded Items
            </h2>

            {/* ----- Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center  mb-10">
                {/* ----- Search Bar */}
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                />

                {/* ----- Type Filter Dropdown */}
                <select
                    value={typeFilter}
                    onChange={e => setTypeFilter(e.target.value)}
                    className="w-full md:w-1/4 px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                >
                    {types.map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            {/* ----- Loading State */}
            {loading && (
                <p className="text-center text-teal-500 text-3xl h-[500px] flex items-center justify-center">
                    Loading...
                </p>
            )}

            {/* ----- Error State */}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* ----- Empty State */}
            {!loading && !error && filteredItems.length === 0 && (
                <p className="text-center text-gray-400 h-screen flex items-center justify-center">
                    No matching items found.
                </p>
            )}

            {/* ----- Item Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
                {filteredItems.map(item => (
                    <div
                        key={item._id}
                        onClick={() => setSelectedItem(item)}
                        className="bg-white/30 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl transition transform hover:scale-[1.02] cursor-pointer"
                    >
                        <img
                            src={item.coverImageUrl}
                            alt={item.name}
                            className="w-full h-52 object-cover rounded-t-2xl"
                        />
                        <div className="p-4 space-y-1">
                            <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-300">
                                {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ----- Modal Dialog for Item Details */}
            <Dialog open={!!selectedItem} onClose={() => setSelectedItem(null)} className="fixed inset-0 z-50 overflow-y-auto">

                {/* ----- Backdrop */}
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

                {/* ----- Modal Content Panel */}
                <div className="flex items-center justify-center min-h-screen px-4 py-8">
                    <Dialog.Panel className="relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-300 dark:ring-gray-700">

                        {/* ----- Close Button */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                        >
                            <AiOutlineClose className="w-6 h-6" />
                        </button>

                        {/* ----- Item Details */}
                        {selectedItem && (
                            <div className="p-6 md:p-10">

                                {/* ----- Modal Title */}
                                <h2 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">
                                    {selectedItem.name}
                                </h2>

                                {/* ----- Carousel for images */}
                                <Carousel
                                    showThumbs={false}
                                    infiniteLoop
                                    autoPlay
                                    showStatus={false}
                                    showArrows
                                    className="mb-6 rounded-xl overflow-hidden"
                                >
                                    <div>
                                        <img
                                            src={selectedItem.coverImageUrl}
                                            alt="Cover"
                                            className="object-cover h-80 md:h-[450px] w-full"
                                        />
                                    </div>
                                    {selectedItem.additionalImageUrls?.map((img, idx) => (
                                        <div key={idx}>
                                            <img
                                                src={img}
                                                alt={`Image ${idx}`}
                                                className="object-cover h-80 md:h-[450px] w-full"
                                            />
                                        </div>
                                    ))}
                                </Carousel>

                                {/* ----- Item Meta Info */}
                                <div className="space-y-4 text-gray-800 dark:text-gray-200">
                                    <p>
                                        <span className="font-semibold text-teal-600 dark:text-teal-400">Type:</span> {selectedItem.type}
                                    </p>
                                    <p className="text-lg leading-relaxed">{selectedItem.description}</p>
                                    <p className="text-sm text-right text-gray-500">
                                        Added on: {new Date(selectedItem.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                {/* ----- Enquire Button */}
                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => Swal.fire({
                                            icon: "success",
                                            title: "Thanks !",
                                            text: "Thanks for your Enquire.",
                                            confirmButtonColor: "#14b8a6",
                                        })}
                                        className="bg-gradient-to-r from-teal-500 to-green-400 hover:from-teal-600 hover:to-green-500 text-white px-6 py-2 rounded-xl text-lg shadow-md hover:shadow-lg transition"
                                    >
                                        Enquire
                                    </button>
                                </div>
                            </div>
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default ViewItems;
