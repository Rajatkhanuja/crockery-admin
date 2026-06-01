import { useEffect, useState } from 'react';

export default function AddProductModal({
  showModal,
  setShowModal,
  getProducts,
  editProduct,
  setEditProduct,
}) {

  const [title, setTitle] = useState('');

  const [originalPrice, setOriginalPrice] =
    useState('');

  const [price, setPrice] = useState('');

  const [stock, setStock] = useState('');

  const [category, setCategory] = useState('');

  const [description, setDescription] =
    useState('');

  const [image1, setImage1] = useState('');

  const [image2, setImage2] = useState('');

  const [image3, setImage3] = useState('');

  const [image4, setImage4] = useState('');

  const [image5, setImage5] = useState('');

  const [isNewIn, setIsNewIn] = useState(false);

  const [isSale, setIsSale] = useState(false);

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] =
    useState('');

  // AUTO FILL EDIT DATA

  useEffect(() => {

    if (editProduct) {

      setTitle(editProduct.title || '');

      setOriginalPrice(
        editProduct.originalPrice || ''
      );

      setPrice(editProduct.price || '');

      setStock(editProduct?.stock?.toString() || '');

      setCategory(editProduct.category || '');

      setDescription(
        editProduct.description || ''
      );

      setImage1(editProduct.images?.[0] || '');

      setImage2(editProduct.images?.[1] || '');

      setImage3(editProduct.images?.[2] || '');

      setImage4(editProduct.images?.[3] || '');

      setImage5(editProduct.images?.[4] || '');

      setIsNewIn(editProduct.isNewIn);

      setIsSale(editProduct.isSale);

    }

  }, [editProduct]);

  // RESET FORM

  const resetForm = () => {

    setTitle('');

    setOriginalPrice('');

    setPrice('');

    setStock('');

    setCategory('');

    setDescription('');

    setImage1('');

    setImage2('');

    setImage3('');

    setImage4('');

    setImage5('');

    setIsNewIn(false);

    setIsSale(false);

    setEditProduct(null);

  };

  // ADD / UPDATE PRODUCT
const handleProduct = async () => {

  if (
    !title ||
    !originalPrice ||
    !price ||
    !category ||
    !image1
  ) {
    alert('Please fill all required fields');
    return;
  }

  try {

    setLoading(true);

    const response = await fetch(

      editProduct
         ? `https://crockery-backend-3jqm.onrender.com/api/products/update/${editProduct._id}`
  : 'https://crockery-backend-3jqm.onrender.com/api/products/add',

      {
        method: editProduct ? 'PUT' : 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({

          title,

          originalPrice: Number(originalPrice),

          price: Number(price),

          stock: Number(stock) || 0,

          category,

          description,

          images: [
            image1,
            image2,
            image3,
            image4,
            image5,
          ].filter(Boolean),

          isNewIn,

          isSale,

        }),

      }
    );

    const data = await response.json();

    console.log('Response:', data);

    if (!response.ok) {
      throw new Error(data.message);
    }

    setLoading(false);

    setSuccessMessage(

      editProduct
        ? 'Product Updated Successfully 🔥'
        : 'Product Added Successfully 🔥'

    );

    setShowModal(false);

    getProducts?.();

    resetForm();

    setTimeout(() => {

      setSuccessMessage('');

    }, 2000);

  } catch (error) {

    console.log(error);

    setLoading(false);

    alert(error.message || 'Something went wrong!');

  }
};

  if (!showModal && !successMessage) return null;

  return (

    <>

      {/* SUCCESS TOAST */}

      {successMessage && (

        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-[100]">

          <p className="font-semibold">
            {successMessage}
          </p>

        </div>

      )}

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">

          <div className="min-h-screen flex items-start sm:items-center justify-center p-3 sm:p-5">

            <div className="bg-white w-full max-w-3xl rounded-3xl p-5 sm:p-8 shadow-2xl my-5 max-h-[95vh] overflow-y-auto">

              {/* TOP */}

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">

                  {editProduct
                    ? 'Edit Product'
                    : 'Add Product'}

                </h2>

                <button
                  onClick={() => {

                    setShowModal(false);

                    resetForm();

                  }}
                  className="text-gray-500 text-3xl"
                >
                  ×
                </button>

              </div>

              {/* FORM */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="Product Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 rounded-2xl h-12 px-4 outline-none focus:border-cyan-500"
                />

              <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border border-gray-300 rounded-2xl h-12 px-4 outline-none focus:border-cyan-500 bg-white"
>
  <option value="">Select Category</option>

  <option value="Luxury Tray">Luxury Tray</option>
  <option value="Dinner Set">Dinner Set</option>
  <option value="Cutlery">Cutlery</option>
  <option value="Platters">Platters</option>
  <option value="Bowls">Bowls</option>
  <option value="Cake Stand">Cake Stand</option>
  <option value="Drinkware">Drinkware</option>
  <option value="GlassWare">GlassWare</option>
  <option value="Heart Bowl">Heart Bowl</option>
  <option value="Bar Tools">Bar Tools</option>
  <option value="Table linens">Table linens</option>
</select>
                <input
                  type="number"
                  placeholder="Original Price"
                  value={originalPrice}
                  onChange={(e) =>
                    setOriginalPrice(e.target.value)
                  }
                  className="border border-gray-300 rounded-2xl h-12 px-4 outline-none focus:border-cyan-500"
                />

                <input
                  type="number"
                  placeholder="Selling Price"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  className="border border-gray-300 rounded-2xl h-12 px-4 outline-none focus:border-cyan-500"
                />
                 <input
  type="number"
  placeholder="Stock Quantity"
  value={stock}
  onChange={(e) =>
    setStock(e.target.value)
  }
  className="border border-gray-300 rounded-2xl h-12 px-4 outline-none focus:border-cyan-500"
/> 
                <input
                  type="text"
                  placeholder="Image URL 1"
                  value={image1}
                  onChange={(e) =>
                    setImage1(e.target.value)
                  }
                  className="border border-gray-300 rounded-2xl h-12 px-4 outline-none focus:border-cyan-500"
                />

                <input
                  type="text"
                  placeholder="Image URL 2"
                  value={image2}
                  onChange={(e) =>
                    setImage2(e.target.value)
                  }
                  className="border border-gray-300 rounded-2xl h-12 px-4 outline-none focus:border-cyan-500"
                />

                <input
                  type="text"
                  placeholder="Image URL 3"
                  value={image3}
                  onChange={(e) =>
                    setImage3(e.target.value)
                  }
                  className="border border-gray-300 rounded-2xl h-12 px-4 outline-none focus:border-cyan-500"
                />

                <input
                  type="text"
                  placeholder="Image URL 4"
                  value={image4}
                  onChange={(e) =>
                    setImage4(e.target.value)
                  }
                  className="border border-gray-300 rounded-2xl h-12 px-4 outline-none focus:border-cyan-500"
                />

                <input
                  type="text"
                  placeholder="Image URL 5"
                  value={image5}
                  onChange={(e) =>
                    setImage5(e.target.value)
                  }
                  className="border border-gray-300 rounded-2xl h-12 px-4 outline-none focus:border-cyan-500"
                />

              </div>

              {/* DESCRIPTION */}

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full border border-gray-300 rounded-2xl p-4 mt-4 outline-none focus:border-cyan-500 h-32 resize-none"
              />

              {/* CHECKBOX */}

              <div className="flex gap-4 mt-5 flex-wrap">

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={isNewIn}
                    onChange={() =>
                      setIsNewIn(!isNewIn)
                    }
                  />

                  New In

                </label>

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={isSale}
                    onChange={() =>
                      setIsSale(!isSale)
                    }
                  />

                  Sale

                </label>

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 mt-8">

                <button
                  onClick={() => {

                    setShowModal(false);

                    resetForm();

                  }}
                  className="bg-gray-200 px-5 py-3 rounded-2xl font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={handleProduct}
                  className="bg-cyan-500 text-white px-5 py-3 rounded-2xl font-semibold"
                >

                  {loading
                    ? 'Please Wait...'
                    : editProduct
                      ? 'Update Product'
                      : 'Add Product'}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}