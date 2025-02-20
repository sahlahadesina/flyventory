import React from 'react'
import { assets, infoList } from '@/assets/assets'
import Image from 'next/image'

const About = () => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-left mb-2 text-lg font-Ovo'>Introduction of our team</h4>
      <h2 className='text-left text-5xl font-Ovo'>About Us</h2>
      <div>
        <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
          <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
            <Image 
              src={assets.group} 
              alt="users" 
              className='rounded-2xl' 
              width={300}    // Set width to 300px
              height={300}   // Set height to 300px (adjust to desired size)
            />
        </div>
        </div>
        <div className='flex-1'>
          <p className='mb-10 max-w-2xl font-Ovo'>
            We are a multidiciplinary team of two Electrical engineering students and two Computer Engineering students. 
            For our Senior Design Project we have developed an integrated warehousing data collection system mounted on a UAV. 
            Our main goal is to automate the data collection and counting processes in warehouses to promote safer work environments.
          </p>

            <ul className='flex-1'>
              <li>
                <Image src={assets.admin3} alt="Image description 1" width={100} height={100} />
                <h3>Your Title 1</h3>
                <p>Your paragraph text for the first item goes here.</p>
              </li>
              <li>
                <Image src={assets.admin3} alt="Image description 2" width={100} height={100} />
                <h3>Your Title 2</h3>
                <p>Your paragraph text for the second item goes here.</p>
              </li>
              <li>
                <Image src={assets.admin3} alt="Image description 3" width={100} height={100} />
                <h3>Your Title 3</h3>
                <p>Your paragraph text for the third item goes here.</p>
              </li>
              {/* Add more list items as needed */}
            </ul>

        </div>
      </div>
    </div>
  )
}

export default About
