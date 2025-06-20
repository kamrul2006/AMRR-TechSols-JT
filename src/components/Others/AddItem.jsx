import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddItem = () => {
    const [loading, setLoading] = useState(false);
    const imgbbApiKey = "7209f16017b83e969bec0df14137f2dd";

    //------- Initial form state
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        web: "amrr",
        description: "",
        coverImage: null,
        additionalImages: [],
    });

    //---------- Handle input changes and file selections
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

    //-------- Upload a single image to ImgBB----
    const uploadImageToImgBB = async (imageFile) => {
        const form = new FormData();
        form.append("image", imageFile);

        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
            form
        );
        return res.data.data.url;
    };

    // --------Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // ---------Upload cover image
            const coverImageUrl = await uploadImageToImgBB(formData.coverImage);

            // -----------Upload additional images
            const additionalImageUrls = await Promise.all(
                formData.additionalImages.map((img) => uploadImageToImgBB(img))
            );

            // -----------Prepare final data object
            const itemData = {
                name: formData.name,
                type: formData.type,
                web: "amrrkamrul",
                description: formData.description,
                coverImageUrl,
                additionalImageUrls,
                createdAt: new Date(),
            };

            // -------------Post to backend
            await axios.post("https://coffi-back.vercel.app/coffees", itemData);

            // -------------Success modal
            Swal.fire({
                icon: "success",
                title: "Item Added!",
                text: "Your item has been successfully uploaded.",
                confirmButtonColor: "#14b8a6",
            });

            // -----------Reset form
            setFormData({
                name: "",
                type: "",
                web: "amrr",
                description: "",
                coverImage: null,
                additionalImages: [],
            });

            // -----------Reset file inputs
            document.getElementById("coverImageInput").value = "";
            document.getElementById("additionalImagesInput").value = "";

        } catch (error) {
            console.error("Image Upload or Submission Failed:", error);

            // -----------Error modal
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "There was an error uploading images or sending data.",
                confirmButtonColor: "#ef4444",
            });
        }

        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto lg:pt-20 py-14 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-teal-600">Add New Item</h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
            >
                {/*--------- Name */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
                        Item Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-teal-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* -------------Type */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
                        Item Type
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-teal-500 dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">Select Type</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Pant">Pant</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Sports Gear">Sports Gear</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* --------------Description */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
                        Item Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-teal-500 dark:bg-gray-800 dark:text-white"
                        rows="4"
                    ></textarea>
                </div>

                {/* -------------Cover Image */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
                        Cover Image
                    </label>
                    <input
                        id="coverImageInput"
                        type="file"
                        name="coverImage"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="w-full text-gray-700 dark:text-white border p-2 rounded"
                    />
                </div>

                {/* -----------Additional Images */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
                        Additional Images
                    </label>
                    <input
                        id="additionalImagesInput"
                        type="file"
                        name="additionalImages"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                        className="w-full text-gray-700 dark:text-white border p-2 rounded"
                    />
                </div>

                {/*------------ Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full md:w-auto text-white font-medium py-2 px-6 rounded transition duration-300 
                        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}
                >
                    {loading ? "Uploading..." : "Add Item"}
                </button>
            </form>
        </div>
    );
};

export default AddItem;
