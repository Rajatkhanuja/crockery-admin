import { useEffect, useState } from "react";

import menu1 from "../assets/menu1.webp";
import menu2 from "../assets/menu2.webp";
import menu3 from "../assets/menu3.webp";
import menu4 from "../assets/menu4.webp";
import menu5 from "../assets/menu5.webp";
import menu6 from "../assets/menu6.webp";
import menu7 from "../assets/menu7.webp";
import menu8 from "../assets/menu8.webp";
import menu9 from "../assets/menu9.webp";
import menu10 from "../assets/menu10.webp";
import menu11 from "../assets/menu11.webp";
import menu12 from "../assets/menu12.webp";
import menu13 from "../assets/menu13.webp";

export default function CategoriesPage({
  setCurrentPage,
  setEditProduct,
  setShowModal,
  showModal,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    { name: "New In", image: menu1 },
    { name: "Sale", image: menu2 },
    { name: "Dinner Set", image: menu13 },
    { name: "Cutlery", image: menu4 },
    { name: "Platters", image: menu5 },
    { name: "Bowls", image: menu6 },
    { name: "Cake Stands", image: menu7 },
    { name: "Trays", image: menu8 },
    { name: "Drinkware", image: menu9 },
    { name: "Glassware", image: menu10 },
    { name: "Heart Bowl", image: menu11 },
    { name: "Bar Tools", image: menu12 },
    { name: "Tablelinen", image: menu3 },
  ];

  // FETCH PRODUCTS

  const getProducts = async () => {
    try {
      const response = await fetch(
        "https://crockery-backend-3jqm.onrender.com/api/products"
      );

      const data = await response.json();

      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!showModal) {
    getProducts();
  }
}, [showModal]);
  // FILTER PRODUCTS

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : selectedCategory === "New In"
      ? products.filter((item) => item.isNewIn)
      : selectedCategory === "Sale"
      ? products.filter((item) => item.isSale)
      : products.filter(
          (item) =>
            item.category
              ?.toLowerCase()
              .trim() ===
            selectedCategory
              .toLowerCase()
              .trim()
        );

  // EDIT PRODUCT

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen">

      {/* TOP BAR */}

      <div className="bg-white shadow-sm px-3 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-50">

        <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
          Categories
        </h1>

        <button
          onClick={() => setCurrentPage("dashboard")}
          className="bg-black text-white px-4 py-2 rounded-xl text-xs sm:text-sm"
        >
          Back
        </button>

      </div>

      <div className="flex">

        {/* LEFT SIDEBAR */}

        <div className="w-[95px] sm:w-[120px] bg-white min-h-screen p-2 sm:p-3 overflow-y-auto border-r">

          <div
            onClick={() => setSelectedCategory("All")}
            className={`mb-3 rounded-2xl p-2 flex flex-col items-center cursor-pointer transition-all duration-300 border-2 ${
              selectedCategory === "All"
                ? "border-cyan-500 bg-cyan-50"
                : "border-transparent bg-white"
            }`}
          >
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gray-200 flex items-center justify-center text-xs sm:text-sm font-bold">
              ALL
            </div>

            <h2 className="text-[10px] sm:text-xs font-semibold text-center mt-2">
              All Products
            </h2>
          </div>

          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                setSelectedCategory(item.name)
              }
              className={`mb-3 rounded-2xl p-2 flex flex-col items-center cursor-pointer transition-all duration-300 border-2 ${
                selectedCategory === item.name
                  ? "border-cyan-500 bg-cyan-50"
                  : "border-transparent bg-white"
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl object-cover"
              />

              <h2 className="text-[10px] sm:text-xs font-semibold text-center mt-2 leading-tight">
                {item.name}
              </h2>
            </div>
          ))}
        </div>

        {/* PRODUCTS */}

        <div className="flex-1 p-2 sm:p-5">

          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <h2 className="text-2xl font-bold text-gray-500">
                Loading...
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">

              {filteredProducts.map((product) => (

                <div
                  key={product._id}
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                >

                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full h-32 sm:h-48 object-cover"
                  />

                  <div className="p-2 sm:p-4">

                    <h2 className="font-semibold sm:font-bold text-gray-800 text-xs sm:text-base line-clamp-2 min-h-[35px] sm:min-h-[48px]">
                      {product.title}
                    </h2>

                    <p className="text-cyan-600 font-bold mt-2 text-sm sm:text-lg">
                      ₹ {product.price}
                    </p>

                    <button
                      onClick={() =>
                        handleEdit(product)
                      }
                      className="w-full mt-3 bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300"
                    >
                      Edit
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}