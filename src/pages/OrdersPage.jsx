import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrdersPage({
  setCurrentPage,
}) {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {

    try {

      const { data } = await axios.get(
        'http://192.168.1.26:5000/api/orders'
      );

      setOrders(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchOrders();

  }, []);

  const markAsDelivered = async (id) => {

    try {

      await axios.put(
        `http://192.168.1.26:5000/api/orders/${id}/deliver`
      );

      fetchOrders();

    } catch (error) {

      console.log(error);

      alert('Failed to update status');

    }
  };

  if (loading) {

    return (

      <div className="p-8 text-center text-xl font-semibold">
        Loading Orders...
      </div>

    );
  }

  return (

    <div className="p-6 bg-[#F5F7FA] min-h-screen">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <button
          onClick={() => setCurrentPage('dashboard')}
          className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-xl font-semibold"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold">
          Customer Orders
        </h1>

      </div>

      {orders.length === 0 ? (

        <div className="bg-white p-6 rounded-xl shadow">
          No Orders Found
        </div>

      ) : (

        <div className="space-y-5">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-xl font-bold">
                    {order.name}
                  </h2>

                  <p className="text-gray-600">
                    📞 {order.phone}
                  </p>

                  <p className="text-gray-600 mt-1">
                    📍 {order.address}
                  </p>

                </div>

                <div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

              </div>

              <hr className="my-4" />

              <h3 className="font-bold text-lg mb-3">
                Products
              </h3>

              <div className="space-y-3">

                {order.items?.map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-4 border rounded-xl p-3"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>

                      <h4 className="font-semibold">
                        {item.name}
                      </h4>

                      <p>
                        Qty: {item.quantity}
                      </p>

                      <p>
                        ₹{item.price}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

              <div className="mt-5 flex justify-between items-center">

                <h3 className="text-xl font-bold">
                  Total: ₹{order.total}
                </h3>

                {order.status !== 'Delivered' && (

                  <button
                    onClick={() =>
                      markAsDelivered(order._id)
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold"
                  >
                    Mark As Delivered
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}