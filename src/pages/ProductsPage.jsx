import { useEffect, useState } from 'react';

import AddProductModal from '../components/AddProductModal';

export default function ProductsPage({
  setCurrentPage,
}) {

  const [showModal, setShowModal] =
    useState(false);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editProduct, setEditProduct] =
    useState(null);

  // GET PRODUCTS

  const getProducts = async () => {

    try {

      const response = await fetch(
        'https://crockery-backend-3jqm.onrender.com/api/products'
      );

      const data = await response.json();

      setProducts(data);

      setLoading(false);

    } catch (error) {

  console.log(error);

  setLoading(false);

}
  };

  // DELETE PRODUCT

  const deleteProduct = async (id) => {

    try {

      await fetch(
          `https://crockery-backend-3jqm.onrender.com/api/products/delete/${id}`,
        {
          method: 'DELETE',
        }
      );

      getProducts();

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    getProducts();

  }, []);

  return (

    <div className="bg-[#F5F7FA] min-h-screen p-4 sm:p-8">

      {/* TOP BAR */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all products
          </p>

        </div>

        {/* BUTTONS */}

        <div className="flex gap-3">

          <button
            onClick={() => {

              setEditProduct(null);

              setShowModal(true);

            }}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-2xl font-semibold transition-all duration-300"
          >
            + Add Product
          </button>

          <button
            onClick={() => setCurrentPage('dashboard')}
            className="bg-black text-white px-5 py-3 rounded-2xl font-semibold"
          >
            Back
          </button>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 overflow-hidden">

        {loading ? (

          <div className="h-[300px] flex items-center justify-center">

            <h2 className="text-2xl font-bold text-gray-400">
              Loading...
            </h2>

          </div>

        ) : products.length === 0 ? (

          <div className="h-[300px] flex items-center justify-center">

            <h2 className="text-2xl font-bold text-gray-400">
              No Products Yet 😄
            </h2>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead>

                <tr className="border-b border-gray-200">

                  <th className="text-left py-4 px-4">
                    Image
                  </th>

                  <th className="text-left py-4 px-4">
                    Product Name
                  </th>

                  <th className="text-left py-4 px-4">
                    Category
                  </th>

                  <th className="text-left py-4 px-4">
                    Price
                  </th>

                  <th className="text-left py-4 px-4">
                    Discount
                  </th>

                  <th className="text-left py-4 px-4">
                    Status
                  </th>

                  <th className="text-left py-4 px-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {products.map((product) => (

                  <tr
                    key={product._id}
                    className="border-b border-gray-100"
                  >

                    {/* IMAGE */}

                    <td className="py-4 px-4">

                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="w-20 h-20 rounded-2xl object-cover"
                      />

                    </td>

                    {/* TITLE */}

                    <td className="py-4 px-4 font-semibold">

                      {product.title}

                    </td>

                    {/* CATEGORY */}

                    <td className="py-4 px-4">

                      {product.category}

                    </td>

                    {/* PRICE */}

                    <td className="py-4 px-4">

                      <div className="flex flex-col">

                        <span className="font-bold text-cyan-600">
                          ₹{product.price}
                        </span>

                        <span className="line-through text-gray-400 text-sm">
                          ₹{product.originalPrice}
                        </span>

                      </div>

                    </td>

                    {/* DISCOUNT */}

                    <td className="py-4 px-4">

                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-bold">

                        {product.discountPercentage}% OFF

                      </span>

                    </td>

                    {/* STATUS */}

                    <td className="py-4 px-4">

                      <div className="flex gap-2 flex-wrap">

                        {product.isNewIn && (

                          <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">

                            NEW IN

                          </span>

                        )}

                        {product.isSale && (

                          <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">

                            SALE

                          </span>

                        )}

                      </div>

                    </td>

                    {/* ACTIONS */}

                    <td className="py-4 px-4">

                      <div className="flex gap-3">

                        <button
                          onClick={() => {

                            setEditProduct(product);

                            setShowModal(true);

                          }}
                          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteProduct(product._id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* MODAL */}

      <AddProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        getProducts={getProducts}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
      />

    </div>
  );
}