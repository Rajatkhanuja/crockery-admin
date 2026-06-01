import React from 'react';

export default function AdminPanelScreen({
  setIsLoggedIn,
  setCurrentPage,
}) {

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (

    <div className="bg-[#F5F7FA] min-h-screen">

      {/* Header */}

      <div className="bg-white shadow-md px-4 sm:px-8 py-5 flex items-center justify-between">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          KS MART ADMIN
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}

      <div className="p-4 sm:p-8">

        {/* Welcome Card */}

        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl">

          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Welcome To Admin Panel 🔥
          </h2>

          <p className="text-sm sm:text-lg opacity-90 max-w-2xl">
            Manage products, categories, orders, users,
            sales, new arrivals and complete KS MART
            ecommerce system from here.
          </p>

        </div>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          {/* PRODUCTS */}

          <div
            onClick={() => setCurrentPage('products')}
            className="bg-white rounded-3xl p-6 shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300"
          >

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Products
            </h3>

            <p className="text-gray-500 text-sm">
              Manage all products
            </p>

          </div>

          {/* CATEGORIES */}

          <div
            onClick={() => setCurrentPage('categories')}
            className="bg-white rounded-3xl p-6 shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300"
          >

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Categories
            </h3>

            <p className="text-gray-500 text-sm">
              Manage categories
            </p>

          </div>

          {/* ORDERS */}

          <div
            onClick={() => setCurrentPage('orders')}
            className="bg-white rounded-3xl p-6 shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300"
          >

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Orders
            </h3>

            <p className="text-gray-500 text-sm">
              Manage customer orders
            </p>

          </div>

         {/* SALES */}

<div
  onClick={() => setCurrentPage('sales')}
  className="bg-white rounded-3xl p-6 shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300"
>

  <h3 className="text-lg font-bold text-gray-800 mb-2">
    Sales
  </h3>

  <p className="text-gray-500 text-sm">
    Track total sales
  </p>

</div>        </div>

      </div>

    </div>

  );
}