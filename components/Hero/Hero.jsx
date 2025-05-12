import React from 'react';
import Link from "next/link";
const Hero = () => {
  return (
    // Container chính căn giữa nội dung, có nền tối và chiều cao tối thiểu
    <div className="flex justify-center items-center text-white min-h-[550px] bg-[#2f2f2f]">
      <div className="max-w-7xl w-full px-4 py-12">
        {/* Chia làm 2 cột: trái (text), phải (ảnh); chuyển thành 1 cột trên màn hình nhỏ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/*nội dung văn bản*/}
          <div className="flex flex-col justify-center items-center sm:items-start text-center sm:text-left order-2 sm:order-1">
            <h1
              data-aos="fade-up"  // hiệu ứng hiện lên từ dưới
              data-aos-once="true"  // chỉ chạy hiệu ứng một lần
              className="text-4xl md:text-5xl font-bold"
            >
              Quản lý-

              <span
                data-aos="zoom-out"  // hiệu ứng thu phóng chữ
                data-aos-delay="300"  // trễ 300ms sau khi <h1> xuất hiện
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
            data-aos="zoom-in" // hiệu ứng phóng to khi hiện ra
            data-aos-duration="300" // thời gian chạy hiệu ứng 300ms
            className="flex justify-center items-center relative order-1 sm:order-2"
          >
            <img
              data-aos-once="true" // hiệu ứng chỉ chạy 1 lần
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
