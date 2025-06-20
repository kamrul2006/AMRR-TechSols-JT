import { useEffect, useState } from "react";
import axios from "axios";

const ViewItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all items on mount
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get("https://coffi-back.vercel.app/coffees");

                // ✅ Filter only items with web === "amrrkamrul"
                const filteredItems = res.data.filter(
                    item => item.web && item.web === "amrrkamrul"
                );

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
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-teal-600">
                All Uploaded Items
            </h2>

            {loading && (
                <div className="text-center text-gray-500">Loading items...</div>
            )}

            {error && (
                <div className="text-center text-red-500">{error}</div>
            )}

            {!loading && !error && items.length === 0 && (
                <div className="text-center text-gray-400">No items found.</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden transition hover:shadow-xl"
                    >
                        {/* Cover Image */}
                        <img
                            src={item.coverImageUrl}
                            alt={item.name}
                            className="w-full h-52 object-cover"
                        />

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-400 mb-1">
                                {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                                Type: <span className="font-medium">{item.type}</span>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                {item.description}
                            </p>
                        </div>

                        {/* Thumbnails */}
                        {item.additionalImageUrls?.length > 0 && (
                            <div className="flex flex-wrap gap-2 p-3 border-t dark:border-gray-700">
                                {item.additionalImageUrls.slice(0, 3).map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt="Additional"
                                        className="w-16 h-16 object-cover rounded border"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewItems;
