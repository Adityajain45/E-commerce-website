import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');

  const {navigate,backendUrl,token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:"",
  })

  const onChangeHandler = (event) => {
    setFormData((prevData) =>({
      ...prevData,
      [event.target.name]: event.target.value
    }))
  }

  const initPay = (order) => {
     const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency: order.currency,
      name:'Order Payment',
      description:'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler:async (response) =>{
        console.log(response)
        try {
          
          const { data } = await axios.post(backendUrl+'/order/verifyRazorpay',response,{header:{token}})

          if(data.success) {
            navigate('/orders')
            setCartItems({})
          }

        } catch (error) {
          console.log(error)
          toast.error(error)
        }
      }


    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      
      let orderItems = []
        
      for(const items in cartItems) {
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0 ){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        
        address:formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        
      }

      switch(method){

        // API Calls for COD
        case 'cod':
        const response = await axios.post(backendUrl + '/order/place', orderData,{headers:{token}})
         console.log(response.data.success)
        if(response.data.success){
          setCartItems({})
          navigate('/orders')
        }else {   
          toast.error(response.data.message)
        } 
        break;

        default:
        break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/order/stripe', orderData,{headers:{token}})
          console.log(responseStripe.data.success)
          if( responseStripe.data.success){
            const { session_url} = responseStripe.data
            window.location.replace(session_url)
            
          }else {  
            console.log("kk") 
            toast.error(response.data.message)
          } 
        break;

        case 'razorpay':

        const responseRazorpay = await axios.post(backendUrl + '/order/razorpay',orderData,{headers:{token}})
          if(responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)
          }
        break;

      }

    } catch (error) {
      console.error("Order Placement Error:", error);
      toast.error(error.message)
    }
  }



  


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-10 lg:px-20'>
      {/* ----------LEFT Side---------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px] '>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        <div className='flex gap-3'>
          <input required name="firstName"  value={formData.firstName} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Enter first name' />
          <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
        </div>
        <input required name="email" value={formData.email} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Enter address' />
        <input required name="street" value={formData.street} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
        <div className='flex gap-3'>
          <input required name="city" value={formData.city} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
          <input required name="state" value={formData.state} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required  name="zipCode" value={formData.zipCode} onChange={onChangeHandler} className='borer border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zip code' />
          <input required  name="country" value={formData.country} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
        </div>
        <input required name="phone" value={formData.phone} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='Number' placeholder='Phone' />
      </div>

      {/* -------------Right Side --------------- */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* ------------ Payment Method Selection---------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=> setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} />
            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASE ON DELIVERY</p>
            </div>
          </div> 

          <div className='w-full text-end mt-8'>
              <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
      
    </form>
  )
}

export default PlaceOrder


// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import axios from 'axios';

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadOrderData = async () => {
//     try {
//       setLoading(true);
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       const response = await axios.post(backendUrl + '/order/userorders', {}, {
//         headers: { token }
//       });

//       if (response.data.success) {
//         let allOrderItem = [];
//         response.data.orders.forEach((order) => {
//           order.items.forEach((item) => {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.PaymentMethod;
//             item['date'] = order.date;
//             allOrderItem.push(item);
//             console.log(item);
//           });
//         });

//         setOrderData(allOrderItem.reverse());
//       }
//     } catch (error) {
//       console.error("Order Load Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   return (
//     <div className='border-t pt-16 px-4 sm:px-10 lg:px-20'>
//       <div className='text-2xl'>
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>

//       <div>
//         {loading ? (
//           <div className='text-center py-10'>
//             <p className='text-lg font-medium'>Loading your orders...</p>
//           </div>
//         ) : orderData.length === 0 ? (
//           <div className='text-center py-10'>
//             <p className='text-xl font-semibold'>Your order history is empty 🛒</p>
//             <p className='text-gray-500 mt-2'>Start shopping and place your first order!</p>
//           </div>
//         ) : (
//           orderData.map((item, index) => (
//             <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:item-center md:justify-between gap-4'>
//               <div className='flex item-start gap-6 text-sm'>
//                 <img className='w-16 sm:w-20' src={item.image[0]} />
//                 <div>
//                   <p className='sm:text-base font-medium'>{item.name}</p>
//                   <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
//                     <p>{currency} {item.price}</p>
//                     <p>Quantity: {item.quantity}</p>
//                     <p>Size: {item.size}</p>
//                   </div>
//                   <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()} </span> </p>
//                   <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod} </span> </p>
                 
//                 </div>
//               </div>

//               <div className='md:w-1/2 flex justify-between items-center'>
//                 <div className='flex items-center gap-2'>
//                   <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                   <p className='text-sm md:text-base'>{item.status}</p>
//                 </div>
//                 <button onClick={loadOrderData} className='border px-4 py-1 md:py-2 text-sm font-medium rounded-sm'>Track Order</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;
