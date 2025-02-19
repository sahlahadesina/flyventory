import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useRef } from 'react'; // Import useRef

const Navbar = () => {

    const SideMenuRef = useRef();

    const openMenu = ()=>{
      SideMenuRef.current.style.transform = 'translateX(-16rem)'
    }

    const closeMenu = ()=>{
      SideMenuRef.current.style.transform = 'translateX(16rem)'
    }

  return (
    <>
      <nav className="w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 
      flex items-center justify-between z-50">
        <a href="#top">
            <Image  src={assets.Drone_website} alt="Logo" className='w-150' quality={100}q   />
        </a>

        <ul className='hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white shadow-sm bg-opacity-50 border border-grey-500 rounded-full'>

         
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

        {/* Rightmost Background Image */}
        <div className="fixed right-0 top-0 w-1/2 h-screen -z-10 hidden md:block">
          <Image 
            src={assets.stack} 
            alt="Right Image" 
            layout="fill"
            objectFit="cover"
          />
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
    </>
  )
}

export default Navbar
