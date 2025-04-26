import React from 'react';
import Link from "next/link";
const Hero = () => {
  return (
    <div className="flex justify-center items-center text-white min-h-[550px] bg-[#2f2f2f]">
      <div className="max-w-7xl w-full px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Text Content Section */}
          <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left order-2 sm:order-1">
            <h1
              data-aos="fade-up"
              data-aos-once="true"
              className="text-4xl md:text-5xl font-bold"
            >
              Quản lý-

              <span
                data-aos="zoom-out"
                data-aos-delay="300"
                className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-500 to-orange-500"
              >
                 dễ dàng-
              </span>{' '}
               tương lai vững vàng
            </h1>
            <div data-aos="fade-up" data-aos-delay="400">
            <Link href="/login">
              <button className="mt-4 py-2 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full hover:brightness-110 transition">
                quản lý sinh viên
              </button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div
            data-aos="zoom-in"
            data-aos-duration="300"
            className="flex justify-center items-center relative order-1 sm:order-2"
          >
            <img
              data-aos-once="true"
              src="/qlsv2.png"
              alt="qlsv"
              className="w-3/4 sm:w-full mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
