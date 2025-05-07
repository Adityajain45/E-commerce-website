import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const OrdersPage = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/order/list`, {}, {
        headers: { token }
      });
      
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/order/status`, {orderId, status:event.target.value},{
        headers:{token}
      })
      if(response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  } 


  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h3 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3">📦 All Orders</h3>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">⏳ Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">🛒 No orders found.</div>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 mb-8 hover:shadow-lg transition"
          >
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
              <div className="flex items-center gap-3">
                <img src={assets.parcel_icon} alt="Parcel" className="w-12" />
                <div>
                  <p className="font-semibold text-lg text-gray-800">Order #{index + 1}</p>
                  <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-gray-800 font-medium">
                  Total: <span className="text-green-600">{currency} {order.amount}</span>
                </p>
                <p className="text-sm text-gray-500">Items: {order.items.length}</p>
              </div>
            </div>

            {/* Order Grid */}
            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
              {/* Items */}
              <div className="space-y-1">
                <h4 className="font-semibold text-gray-800 mb-2">🛍️ Items Ordered</h4>
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    {item.name} × {item.quantity}
                    <span className="text-gray-500 text-xs"> ({item.size})</span>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="flex items-center h-full mb-8">
                <div className="space-y-1">
                  <h4 className="font-semibold text-gray-800 mb-2">📍 Shipping Address</h4>
                  <p>{order.address.firstName} {order.address.lastName}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state}</p>
                  <p>{order.address.country} - {order.address.zipCode}</p>
                  <p className="text-sm text-gray-500">📞 {order.address.phone}</p>
                </div>
              </div>


              {/* Payment and Status */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 mb-2">📦 Order Info</h4>
                <p>💳 Method: {order.PaymentMethod}</p>
                <p>✅ Payment: <span className={order.payment ? 'text-green-600' : 'text-red-500'}>
                  {order.payment ? 'Done' : 'Pending'}
                </span></p>
                <div className="mt-3">
                  <label className="block font-medium mb-1">🚚 Status</label>
                  <select
                    onChange={(event)=>statusHandler(event, order._id)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={order.status}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                 

                </div>
                
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
