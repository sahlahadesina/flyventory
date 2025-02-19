import React from 'react';

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-left mx-auto h-screen flex flex-col items-start justify-center gap-2 pl-8 -ml-4'>
      {/* Title */}
      <h3 className='flex items-end gap-2 text-4xl md:text-5xl mb-2 font-Ovo text-blue-950'>
        Revolutionizing Warehouse Management with AI-Powered Drones
      </h3>

      {/* Description */}
      <p className='max-w-4xl font-Ovo mb-2 text-black'>
        For More Information About Our Project
      </p>

      {/* Button */}
      <div className='flex flex-col sm:flex-row items-start gap-2 mt-2'>
        <a
          href="#contact"
          className='px-10 py-3 border border-gray-500 rounded-full bg-blue-900 text-white hover:bg-blue-800 transition-colors duration-300'
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
};

export default Header;