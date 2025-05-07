import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { backendUrl } from '../App' 
import axios from 'axios';
import { toast } from 'react-toastify';





const Add = () => {


  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState("");
  const [description,setDescription] =  useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);


  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("images",image1)
      image2 && formData.append("images",image2)
      image3 && formData.append("images",image3)
      image4 && formData.append("images",image4)


      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(backendUrl+"/product/add", formData,{
        headers: { token: token }

      })

     

      toast.success("Product added successfully!");

      if(response.data.success){
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }

      } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className='p-6 w-full min-h-screen'> {/* 👈 yeh parent add kar */}
      
      {
        loading ? ( 
          <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div> {/* 👈 simple spinner */}
          </div>
        ) :
      
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
          <p className='mb-2'>Upload Image</p>
          <div className='flex gap-2 flex-wrap'>
            <label htmlFor='image1'>
              <img className='w-20 cursor-pointer' src={ !image1 ? assets.upload_area : URL.createObjectURL(image1)} />
              <input onChange={(e)=>setImage1(e.target.files[0])}  type='file' id='image1' hidden />
            </label>
            <label htmlFor='image2'>
              <img className='w-20 cursor-pointer' src={ !image2 ? assets.upload_area : URL.createObjectURL(image2)} />
              <input onChange={(e)=>setImage2(e.target.files[0])} type='file' id='image2' hidden />
            </label>
            <label htmlFor='image3'>
              <img className='w-20 cursor-pointer' src={ !image3 ? assets.upload_area : URL.createObjectURL(image3)} />
              <input onChange={(e)=>setImage3(e.target.files[0])}  type='file' id='image3' hidden />
            </label>
            <label htmlFor='image4'>
              <img className='w-20 cursor-pointer' src={ !image4 ? assets.upload_area : URL.createObjectURL(image4)} />
              <input onChange={(e)=>setImage4(e.target.files[0])}  type='file' id='image4' hidden />
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input onChange={(e)=> setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type here' />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e)=> setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2'  placeholder='Write content here' />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

          <div>
            <p className='mb-2'>Product category</p>
            <select onChange={(e)=> setCategory(e.target.value)} className='w-full px-3 py-2'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Sub category</p>
            <select onChange={(e)=> setSubCategory(e.target.value)} className='w-full px-3 py-2'>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Product Price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type='number' placeholder='230'/>
          </div>

        </div>

        <div>
          <p className='mb-2'>Product sizes</p>
          <div className='flex gap-3'>
            <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter( item => item !== "S") : [...prev, "S"])}>
              <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
            </div>
            <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter( item => item !== "M") : [...prev, "M"])}>
              <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
            </div>
            <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter( item => item !== "L") : [...prev, "L"])}>
              <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
            </div>
            <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter( item => item !== "XL") : [...prev, "XL"])}>
              <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
            </div>
            <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter( item => item !== "XXL") : [...prev, "XXL"])}>
              <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
            </div>
          </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} type='checkbox' id='bestseller' />
          <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
        </div>

        <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

      </form>
    }
    </div>
  )
}

export default Add
