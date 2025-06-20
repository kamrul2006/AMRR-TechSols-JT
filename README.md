# Item Catalog Web App -- (AMRR TechSols)

A modern, user-friendly React application that allows users to **add** and **view** clothing/sports gear items with full details, image preview carousel, and an optional "Enquire" email feature.

---

## 📋 Assignment Overview

This project fulfills the following internship assignment criteria:

### ✅ Required Features

- **Two Pages**
  - `/add` – Form to add a new item
  - `/seAll` – List of all added items

- **Add Item Page**
  - Form inputs:
    - Item Name
    - Item Type (e.g. Shirt, Pant, Shoes, Sports Gear, etc.)
    - Item Description
    - Item Cover Image URL
    - Item Additional Image URLs (multiple)
  - Success message shown after submission: ✅ *"Item successfully added"*

- **View Items Page**
  - Displays:
    - Cover Image
    - Item Name
  - Clicking on an item:
    - Opens a **modal** with full details
    - Displays all images in a **carousel**
    - Includes an **"Enquire"** button

### ⭐ Bonus Features Implemented

- ✅ API integration:
- Fetches and adds items to a **live backend**:  
    `https://coffi-back.vercel.app/coffees`
- ✅ Carousel using `react-responsive-carousel`

---

## 🚀 Technologies Used

| Tech                 | Usage                         |
|----------------------|-------------------------------|
| React.js             | Frontend framework            |
| Tailwind CSS         | Styling                       |
| Axios                | API calls                     |
| React Router DOM     | Page navigation               |
| Headless UI          | Accessible Modal              |
| React Responsive Carousel | Image carousels         |

---

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/kamrul2006/item-catalog-app.git
cd item-catalog-app

# Install dependencies
npm install

# Start development server
npm run dev
````

---

## 🧪 API Endpoints

All items are stored and fetched from:

```
GET /coffees
POST /coffees
Base URL: https://coffi-back.vercel.app
```

Example item structure:

```json
{
  "name": "Running Shoes",
  "type": "Shoes",
  "description": "Lightweight and breathable",
  "coverImageUrl": "https://example.com/image.jpg",
  "additionalImageUrls": ["https://example.com/1.jpg", "https://example.com/2.jpg"]
}
```

---


## 👨‍💻 Author

**Kamrul Islam Apurba**
📧 Email: [kamrulislamapurba@gmail.com](mailto:kamrulislamapurba@gmail.com)

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

> ✨ Built for Internship Assignment with ❤️ and React


