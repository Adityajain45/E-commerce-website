import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='px-4 sm:px-10 lg:px-20'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 sm:gap-14 my-10 mt-40 text-sm'>
        <div>
          <img src={assets.logo} alt='Logo' className='mb-5 w-32' />
          <p className='text-gray-600 max-w-md'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      {/* Full-width bottom section */}
      <hr className='border-gray-300' />
      <p className='py-5 text-sm text-center text-gray-600'>
        © 2025 forever.com - All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
