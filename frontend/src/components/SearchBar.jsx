// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { assets } from '../assets/assets';
// import { useLocation } from 'react-router-dom';

// const SearchBar = () => {
//     const {search, setSearch,showSearch, setShowSearch} = useContext(ShopContext);
//     const [visible,setVisible] = useState(false);
//     const location = useLocation();


//     useEffect(() => {
//        if(location.pathname.includes('collection')){
//          setVisible(true);
//        }else{
//         setVisible(false)
//        }
//     },[location])


//     return showSearch && visible ? (
//     <div className='border-t border-b bg-gray-50 text-center'>
//       <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
//         <input value={search} onChange={(e)=> setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type='text' placeholder='Search'/>
//         <img className='w-4' src={assets.search_icon}/>
//       </div>
//       <img onClick={()=> setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} />
//     </div>
//   ) : null
// }

// export default SearchBar
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-b bg-gray-50 text-center"
        >
          <div className="relative inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 backdrop-blur-md bg-white/30 shadow-md">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm"
              type="text"
              placeholder="Search"
            />
            <img className="w-4 cursor-pointer" src={assets.search_icon} alt="search" />
            <img
              onClick={() => {
                setShowSearch(false);
                setSearch('');
              }}
              className="w-3 ml-2 cursor-pointer"
              src={assets.cross_icon}
              alt="close"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
