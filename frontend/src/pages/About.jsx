import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
<div className='px-4 sm:px-10 lg:px-20 py-12 bg-white'>
  <div className='text-3xl font-semibold text-center border-t pt-8 mb-12'>
    <Title text1={'ABOUT'} text2={'US'} />
  </div>

  <div className='flex flex-col md:flex-row items-center gap-28'>
    {/* Left Image */}
    <img
      className='w-full md:max-w-[450px] h-auto  shadow-md'
      src={assets.about_img}
      alt="About Us"
    />

    {/* Right Text Box with Fixed Width */}
    <div className='text-gray-500 text-left text-base leading-relaxed max-w-[714px] w-full space-y-4'>
      <p>
        Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online.
        Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and
        purchase a wide range of products from the comfort of their homes.
      </p>
      <p>
        Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater
        to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an
        extensive collection sourced from trusted brands and suppliers.
      </p>
      <p className='font-semibold text-gray-800'>Our Mission</p>
      <p>
        Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to
        providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and
        beyond.
      </p>
    </div>

  </div>

  <div className='mt-16 text-xl py-4'> 
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
  </div>

  <div className='flex flex-col md:flex-row text-sm mb-20'>
    <div className='border w-[500px] h-[300px] flex flex-col justify-center px-10 md:px-16'>
      <b className='mb-2'>Quality Assurance:</b>
      <p className='text-gray-600'>
        We meticulously select and vet each product to ensure it meets our stringent quality standards.
      </p>
    </div>

    <div className='border w-[500px] h-[300px] flex flex-col justify-center px-10 md:px-16'>
      <b className='mb-2'>Convenience:</b>
      <p className='text-gray-600'>
        With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
      </p>
    </div>

    <div className='border w-[500px] h-[300px] flex flex-col justify-center px-10 md:px-16'>
      <b className='mb-2'>Exceptional Customer Service:</b>
      <p className='text-gray-600'>
        Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
      </p>
    </div>
  </div>

  <NewsletterBox/>


</div>

  
  
  )
}

export default About
