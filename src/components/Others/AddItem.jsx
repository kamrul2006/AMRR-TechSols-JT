import { useState } from "react";

const AddItem = () => {
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
        coverImage: null,
        additionalImages: [],
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "coverImage") {
            setFormData({ ...formData, coverImage: files[0] });
        } else if (name === "additionalImages") {
            setFormData({ ...formData, additionalImages: [...files] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle data saving logic here
        console.log(formData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-6">Add New Item</h2>

            {success && (
                <div className="bg-green-100 text-green-800 text-sm px-4 py-3 rounded mb-4">
                    ✅ Item successfully added!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium mb-1">Item Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        required
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Item Type</label>
                    <select
                        name="type"
                        onChange={handleChange}
                        required
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
                    >
                        <option value="">Select Type</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Pant">Pant</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Sports Gear">Sports Gear</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">Item Description</label>
                    <textarea
                        name="description"
                        onChange={handleChange}
                        required
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
                        rows="4"
                    ></textarea>
                </div>

                <div>
                    <label className="block font-medium mb-1">Cover Image</label>
                    <input
                        type="file"
                        name="coverImage"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Additional Images</label>
                    <input
                        type="file"
                        name="additionalImages"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                        className="w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default AddItem;
