import React from 'react'
import { assets, infoList } from '../../assets/assets'
import Image from 'next/image'

const About = () => {
  return (
    <div id='about' className='w-full px-[3%] py-10 scroll-mt-20 '>
      <h4 className='text-left mb-2 text-lg font-Ovo'>Introduction of our team</h4>
      <h2 className='text-left text-5xl font-Ovo'>About Us</h2>
      <div>
        <div className='flex w-full flex-col lg:flex-row items-left gap-20 my-20'>
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
        <div className='w-11/12 max-w-3xl text-left mx-auto h-screen flex flex-col items-start justify-left gap-2 pl-8 -ml-4 pt-20'>
        {/* Description */}
        <p className='mb-10 max-w-2xl font-Ovo'>
          We are a multidisciplinary team of two Electrical Engineering students and two Computer Engineering students. 
          For our Senior Design Project, we have developed an integrated warehousing data collection system mounted on a UAV. 
          Our main goal is to automate the data collection and counting processes in warehouses to promote safer work environments.
        </p>

        {/* List */}
        <ul className='w-full'>
          <li className='flex items-start gap-4 mb-6 font-Ovo'>
            <Image src={assets.problem} alt="light" width={200} height={100} className="flex-none" />
            <div>
              <h3>Problem Statement</h3>
              <p>
                Some warehouse operations are heavily reliant on manual processes
                such as manual scanning and climbing elevated storage areas. Which 
                impose safety risks, increase labor costs, and introduce preventable downtime.
              </p>
            </div>
          </li>
          <li className='flex items-start gap-4 mb-6'>
            <Image src={assets.solution} alt="Image description 2" width={200} height={100} className="flex-none" />
            <div>
              <h3>Our Solution</h3>
              <p>To promote safer working envivronments for warehouse workers we are proposing 
                an AI-based program to detect, count, and classify inventory, mounted on an automated UAV.
              </p>
            </div>
          </li>
          <li className='flex items-start gap-4 mb-4'>
            <Image src={assets.Tools} alt="Image description 3" width={200} height={100} className="flex-none" />
            <div>
              <h3>Our Tools</h3>
              <p>We have used a wide collection of tools to approach this project. Some of which include
                 Python, TensorFlow, MobileSSD, Node.js and Next.js, CSS, HTML, and Ardupilot.
              </p>
            </div>
          </li>
          {/* Add more list items as needed */}
        </ul>
      </div>
      </div>
    </div>
  )
}

export default About
