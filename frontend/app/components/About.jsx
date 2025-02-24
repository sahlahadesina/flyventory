import React from 'react'
// import { assets } from '@/assets/assets'
import Image from 'next/image'
import { assets } from '../../assets/assets.js'

const About = () => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-left mb-2 text-lg font-Ovo'>Introduction of our team</h4>
      <h2 className='text-left text-5xl font-Ovo'>About Us</h2>
      <div>
        <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
            <Image src={assets.group} alt="users" className='w-20 rounded-3xl'/>
        </div>
        <div className='flex-1'>

        </div>
      </div>
    </div>
  )
}

export default About
