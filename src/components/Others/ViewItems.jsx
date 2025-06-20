import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// ViewItems Component
const ViewItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    // Fetch filtered items from backend on mount
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get("https://coffi-back.vercel.app/coffees");
                const filteredItems = res.data.filter(item => item.web === "amrrkamrul");
                setItems(filteredItems);
            } catch (err) {
                console.error("Error fetching items:", err);
                setError("Failed to load items.");
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 pt-14 lg:pt-20">
            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-center text-teal-600 mb-12">
                Uploaded Items
            </h2>

            {/* Loading State */}
            {loading && <p className="text-center text-teal-500 text-3xl h-[500px] flex items-center justify-center">Loading...</p>}

            {/* Error State */}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Empty State */}
            {!loading && !error && items.length === 0 && (
                <p className="text-center text-gray-400 h-screen flex items-center justify-center">No items found.</p>
            )}

            {/* Grid of Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 h-fit mb-10">
                {items.map(item => (
                    <div
                        key={item._id}
                        onClick={() => setSelectedItem(item)}
                        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer group"
                    >
                        <img
                            src={item.coverImageUrl}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-4 space-y-2">
                            <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-400">
                                {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal with item details */}
            <Dialog
                open={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                className="fixed inset-0 z-50 overflow-y-auto"
            >
                {/* Backdrop */}
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

                {/* Modal Panel */}
                <div className="flex items-center justify-center min-h-screen px-4 py-8">
                    <Dialog.Panel className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl transition-all duration-300">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                        >
                            <AiOutlineClose className="w-6 h-6" />
                        </button>

                        {/* Item Details */}
                        {selectedItem && (
                            <div className="p-6 md:p-8">
                                {/* Title */}
                                <h2 className="text-2xl md:text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">
                                    {selectedItem.name}
                                </h2>

                                {/* Carousel */}
                                <Carousel
                                    showThumbs={false}
                                    infiniteLoop
                                    autoPlay
                                    showStatus={false}
                                    showArrows
                                    className="mb-6 rounded-lg overflow-hidden"
                                >
                                    <div>
                                        <img
                                            src={selectedItem.coverImageUrl}
                                            alt="Cover"
                                            className="object-cover h-72 md:h-96 w-full"
                                        />
                                    </div>
                                    {selectedItem.additionalImageUrls?.map((img, idx) => (
                                        <div key={idx}>
                                            <img
                                                src={img}
                                                alt={`Image ${idx}`}
                                                className="object-cover h-72 md:h-96 w-full"
                                            />
                                        </div>
                                    ))}
                                </Carousel>

                                {/* Details */}
                                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                                    <p>
                                        <span className="font-medium text-teal-600 dark:text-teal-400">Type:</span> {selectedItem.type}
                                    </p>
                                    <p className="text-lg leading-relaxed">{selectedItem.description}</p>
                                    <p className="text-sm text-right text-gray-500">
                                        Added: {new Date(selectedItem.createdAt).toLocaleString()}
                                    </p>
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
