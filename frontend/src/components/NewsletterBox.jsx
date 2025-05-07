import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler =(event)=>{
        event.preventDefault();
    }

  return (
<div className='text-center mt-20'>
  <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
  <p className='text-gray-400 mt-3'>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry
  </p>
  <form onSubmit={onSubmitHandler} className='flex items-center gap-4 mx-auto my-6 border pl-3 pr-1 w-fit'>
    <input
      type='email'
      placeholder='Enter your email'
      className='outline-none px-4 py-3 w-[400px]'
      required
    />
    <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
  </form>
</div>

  )
}

export default NewsletterBox

