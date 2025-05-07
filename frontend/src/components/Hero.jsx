// import React from 'react'
// import {assets} from '../assets/assets'

// const Hero = () => {
//   return (
//     <div className='flex flex-col sm:flex-row border border-gray-400'>
//       {/* Hero Left Side */}
//       <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
//         <div className="text-[#414141] text-center sm:text-left">
//           {/* Bestseller Section */}
//           <div className="flex items-center gap-2 justify-center sm:justify-start">
//             <p className="w-10 md:w-12 h-[2px] bg-[#414141]"></p>
//             <p className="font-semibold text-sm md:text-base tracking-wide">OUR BESTSELLERS</p>
//           </div>

//           {/* Heading */}
//           <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed ">
//             Latest Arrivals
//           </h1>

//           {/* Shop Now Section */}
//           <div className="flex items-center gap-2 justify-center sm:justify-start mt-3">
//             <p className="font-semibold text-sm md:text-base uppercase tracking-wide cursor-pointer hover:underline">
//               SHOP NOW
//             </p>
//             <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
//           </div>
//         </div>
//       </div>


//     {/* Hero Right Side  */}
//     <img className='w-full sm:w-1/2 ' src={assets.hero_img}/>

//   </div>
//   )
// }

// export default Hero








import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='px-4 sm:px-10 lg:px-20'>
      <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
          <div className="text-[#414141] text-center sm:text-left">
            {/* Bestseller Section */}
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <p className="w-10 md:w-12 h-[2px] bg-[#414141]"></p>
              <p className="font-semibold text-sm md:text-base tracking-wide">OUR BESTSELLERS</p>
            </div>

            {/* Heading */}
            <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
              Latest Arrivals
            </h1>

            {/* Shop Now Section */}
            <div className="flex items-center gap-2 justify-center sm:justify-start mt-3">
              <p className="font-semibold text-sm md:text-base uppercase tracking-wide cursor-pointer hover:underline">
                SHOP NOW
              </p>
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            </div>
          </div>
        </div>

        {/* Hero Right Side */}
        <img className='w-full sm:w-1/2 object-cover' src={assets.hero_img} alt="Hero" />
      </div>
    </div>
  )
}

export default Hero
