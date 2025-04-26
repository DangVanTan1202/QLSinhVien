import React from 'react';
import Image from 'next/image';
import { GrSecure } from 'react-icons/gr';
import { IoFastFood } from 'react-icons/io5';
import { GiFoodTruck } from 'react-icons/gi';

const Banner = () => {
  return (
    <>
      <span id="about"></span>
      <div
        className="w-full"
        style={{
          backgroundImage: `url('/qlsv4.png')`, // dùng path ảnh trong public
          backgroundColor: '#270c03',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="min-h-screen flex justify-center items-center py-10">
          <div className="w-full max-w-7xl px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Image section */}
              <div className="flex justify-center md:w-1/2" data-aos="zoom-in">
                <Image
                  src="/qlsv3.png" // dùng ảnh từ public
                  alt="biryani img"
                  width={430}
                  height={430}
                  className="drop-shadow"
                />
              </div>

              {/* Text content section */}
              <div className="flex flex-col justify-center md:w-1/2 gap-4">
                <h1 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-black">
                  Linh hoạt với các quyền
                </h1>
                <p data-aos="fade-up" className="text-stone-500 text-sm">
                  khi admin tích chọn các quyền trong một chức năng thì người dùng mới có thể thực hiện được chức năng đó
                </p>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col gap-4 md:w-1/2">
                    <div
                      data-aos="fade-up"
                      className="flex items-center gap-3 text-red-800"
                    >
                      <GrSecure className="text-2xl bg-red-500 p-2 rounded-full" />
                      <span>admin</span>
                    </div>
                    <div
                      data-aos="fade-up"
                      data-aos-delay="300"
                      className="flex items-center gap-3 text-blue-500"
                    >
                      <IoFastFood className="text-2xl bg-yellow-500 p-2 rounded-full" />
                      <span>giảng viên</span>
                    </div>
                    <div
                      data-aos="fade-up"
                      data-aos-delay="500"
                      className="flex items-center gap-3 text-green-500"
                    >
                      <GiFoodTruck className="text-2xl bg-yellow-500 p-2 rounded-full" />
                      <span>sinh viên</span>
                    </div>
                  </div>
                  <div
                    data-aos="slide-left"
                    className="md:w-1/2 border-l-4 border-orange-600 pl-6"
                  >
                    <h1 className="text-xl font-semibold text-blue-800">dễ dàng sử dụng</h1>
                    <p className="text-sm text-indigo-700">
                      các chức năng trong trang web đều hiển thị một cách trực quan đơn giản dễ tiếp cận và sử dụng
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
