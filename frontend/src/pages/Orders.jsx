import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl,token , currency} = useContext(ShopContext);
  console.log(token)
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadOrderData = async () => {
    try {
      if(!token){
        return null
      }

      const response = await axios.post(backendUrl + '/order/userorders',{},{headers:{token}})
      if(response.data.success){
        let allOrderItem = []
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrderItem.push(item);
          });
        });
        
        console.log(allOrderItem)
        setOrderData(allOrderItem.reverse())
       
      }
     

    } catch (error) {
      console.error("Order Load Error:", error);
    }
  }

  useEffect(()=> {
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-16 px-4 sm:px-10 lg:px-20'>
      
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {
         orderData.map((item,index)=>(
              <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:item-center md:justify-between gap-4'>
                  <div className='flex item-start gap-6 text-sm'>
                    <img className='w-16 sm:w-20' src={item.image[0]}/>
                    <div>
                      <p className='sm:text-base font-medium'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                        <p className='text-lg'>{currency} {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.size}</p>
                      </div>
                      <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>

                    </div>
                  </div>

                  <div className='md:w-1/2 flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p className='text-sm md:text-base'>{item.status}</p>
                    </div>
                    <button  onClick={loadOrderData} className='border px-4 py-1 md:py-2 text-sm font-medium rounded-sm'>Track Order</button>
                  </div>

              </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
