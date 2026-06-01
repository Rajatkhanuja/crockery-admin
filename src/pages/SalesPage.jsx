import React, { useEffect, useState } from 'react';
import axios from 'axios';



export default function SalesPage({ setCurrentPage }) {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const productsRes = await axios.get(
        'http://192.168.1.26:5000/api/products'
      );

      const ordersRes = await axios.get(
        'http://192.168.1.26:5000/api/orders'
      );

      setProducts(productsRes.data);
      setOrders(ordersRes.data);

    } catch (error) {

      console.log(error);

    }
  };

  const totalProducts = products.length;

  const inventoryValue = products.reduce(
    (total, product) =>
      total + (product.price * (product.stock || 0)),
    0
  );

  const confirmedOrders = orders.filter(
    (order) => order.status === 'Confirmed'
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === 'Delivered'
  ).length;

  const totalRevenue = orders
  
    .filter((order) => order.status === 'Delivered')
    .reduce(
      (total, order) => total + order.total,
      0
    );
    const totalOrders = confirmedOrders + deliveredOrders;

const deliveredPercent =
  totalOrders > 0
    ? (deliveredOrders / totalOrders) * 100
    : 0;
    const maxValue = Math.max(
  totalProducts,
  inventoryValue,
  totalRevenue,
  1
);

const productsPercent =
  (totalProducts / maxValue) * 100;

const inventoryPercent =
  (inventoryValue / maxValue) * 100;

const revenuePercent =
  (totalRevenue / maxValue) * 100;

  const chartData = [
    {
      name: 'Confirmed',
      value: confirmedOrders,
    },
    {
      name: 'Delivered',
      value: deliveredOrders,
    },
  ];

  const COLORS = ['#F59E0B', '#22C55E'];

  return (

    <div className="bg-[#F5F7FA] min-h-screen p-6">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold">
          Sales Dashboard
        </h1>

        <button
          onClick={() => setCurrentPage('dashboard')}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-xl"
        >
          Back
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Products
          </h3>

          <h2 className="text-3xl font-bold mt-2">
            {totalProducts}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Inventory Value
          </h3>

          <h2 className="text-3xl font-bold mt-2">
            ₹{inventoryValue.toLocaleString('en-IN')}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Confirmed Orders
          </h3>

          <h2 className="text-3xl font-bold mt-2 text-yellow-500">
            {confirmedOrders}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Delivered Orders
          </h3>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {deliveredOrders}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Revenue
          </h3>

          <h2 className="text-3xl font-bold mt-2 text-cyan-600">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </h2>
        </div>

      </div>

   <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

  <h2 className="text-2xl font-bold mb-8">
    Orders Overview
  </h2>

  <div className="flex flex-col items-center">

    <div
      style={{
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: `conic-gradient(
          #22C55E 0% ${deliveredPercent}%,
          #F59E0B ${deliveredPercent}% 100%
        )`,
      }}
    />

    <div className="flex gap-10 mt-8">

      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
        <span>
          Delivered ({deliveredOrders})
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
        <span>
          Confirmed ({confirmedOrders})
        </span>
      </div>

    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

  <div className="bg-white rounded-3xl p-8 shadow-lg text-center">

    <h2 className="text-xl font-bold mb-5">
      Products
    </h2>

    <div
      style={{
        width: 180,
        height: 180,
        borderRadius: '50%',
        margin: 'auto',
        background: `conic-gradient(
          #06B6D4 0% ${productsPercent}%,
          #9d1b1b ${productsPercent}% 100%
        )`,
      }}
    />

    <h3 className="text-3xl font-bold mt-5">
      {totalProducts}
    </h3>

  </div>

  <div className="bg-white rounded-3xl p-8 shadow-lg text-center">

    <h2 className="text-xl font-bold mb-5">
      Inventory Value
    </h2>

    <div
      style={{
        width: 180,
        height: 180,
        borderRadius: '50%',
        margin: 'auto',
        background: `conic-gradient(
          #8B5CF6 0% ${inventoryPercent}%,
          #E5E7EB ${inventoryPercent}% 100%
        )`,
      }}
    />

    <h3 className="text-3xl font-bold mt-5">
      ₹{inventoryValue.toLocaleString('en-IN')}
    </h3>

  </div>

  <div className="bg-white rounded-3xl p-8 shadow-lg text-center">

    <h2 className="text-xl font-bold mb-5">
      Revenue
    </h2>

    <div
      style={{
        width: 180,
        height: 180,
        borderRadius: '50%',
        margin: 'auto',
        background: `conic-gradient(
          #22C55E 0% ${revenuePercent}%,
          #8B5CF6 ${revenuePercent}% 100%
        )`,
      }}
    />

    <h3 className="text-3xl font-bold mt-5">
      ₹{totalRevenue.toLocaleString('en-IN')}
    </h3>

  </div>

</div>

  </div>

</div>

    </div>

  );
}