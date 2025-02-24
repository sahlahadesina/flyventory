import { assets } from '../../assets/assets.js'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'; // Import useRef

const Navbar = () => {

    const [isScroll, setIsScroll] = useState(false)
    const SideMenuRef = useRef(null);

    const openMenu = ()=>{
      SideMenuRef.current.style.transform = 'translateX(-16rem)'
    }

    const closeMenu = ()=>{
      SideMenuRef.current.style.transform = 'translateX(16rem)'
    }

    useEffect(() => {
      const handleScroll = () => {
        console.log(window.scrollY); // Debugging: Check if this logs the scroll position
        if (window.scrollY > 50) {
          setIsScroll(true);
        } else {
          setIsScroll(false);
        }
      };
    
      window.addEventListener('scroll', handleScroll);
    
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <>
      <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 
      flex items-center justify-between z-50 bg-blue bg-opacity-50 backdrop-blur-lg shadow-sm`}>
        <a href="#top">
            <Image  src={assets.Drone_website} alt="Logo" className='w-50' quality={100} width={200} height={100}/>
        </a>

        <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 order border-grey-500 bg-blue bg-opacity-50 shadow-sm`}>
         
          <li><a className='font-Ovo text-lg' href="#top">Home</a></li>
          <li><a className='font-Ovo text-lg' href="#features">Features</a></li>
          <li><a className='font-Ovo text-lg' href="#about">About Us</a></li>    
          <li><a className='font-Ovo text-lg' href="#how">How it Works</a></li>    
        </ul>

        <div className='flex item-center gap-4'>
            <button>
                <Image src={assets.moon_icon} alt="" className='w-6' />
            </button>
            <a href="#login" className='hidden lg:flex items-center gap-3 px-10
            py-2.5 border border-grey-500 rounded-full ml-4 font-Ovo'> Log in</a>

            <button className='block md:hidden ml-3' onClick={openMenu}>
            <Image src={assets.menu_black} alt="" className='w-6' />
            </button>
        </div>

        {/*mobile screen menu*/}
        <ul ref={SideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-screen bg-blue-50 transition duration-500'>
          <div className='absolute right-6 top-6' onClick={closeMenu}>
            <Image src={assets.close_black} alt = '' className='w-5 cursor-pointer'/> 
          </div>
          <li><a className='font-Ovo text-lg' onClick={closeMenu} href="#top">Home</a></li>
          <li><a className='font-Ovo text-lg' onClick={closeMenu} href="#features">Features</a></li>
          <li><a className='font-Ovo text-lg' onClick={closeMenu} href="#about">About Us</a></li>    
          <li><a className='font-Ovo text-lg' onClick={closeMenu} href="#how">How it Works</a></li>
        </ul>
    </nav>

    {/* Rightmost Background Image */}
    <div className="fixed right-0 top-0 w-1/2 h-screen -z-50 hidden md:block">
            <Image 
              src={assets.stack} 
              alt="Right Image" 
              layout="fill"
              objectFit="cover"
            />
          </div>

    </>
  )
}

export default Navbar
