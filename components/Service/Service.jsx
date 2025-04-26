import React from 'react';
import Image from 'next/image';

const ServicesData = [
  {
    id: 1,
    img: '/admin1.png',
    name: 'admin',
    description:
      'Quản lý tài khoản , môn học , giảng viên và duyệt bảng điểm.',
    aosDelay: '100',
  },
  {
    id: 2,
    img: '/teacher.png',
    name: 'giảng viên',
    description:
      'quản lý sinh viên và nộp bảng điểm',
    aosDelay: '300',
  },
  {
    id: 3,
    img: '/student.png',
    name: 'sinh viên',
    description:
      'xem điểm của mình',
    aosDelay: '500',
  },
];

const Services = () => {
  return (
    <>
      <span id="services"></span>
      <div className="py-10 bg-sky-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl font-bold text-orange-500">Các thành phần trong trang web</h1>
          </div>

          {/* Services Card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {ServicesData.map((service) => (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={service.aosDelay}
                className="flex justify-center"
              >
                <div className="bg-white shadow-lg rounded-xl w-full max-w-xs text-center p-6 relative overflow-hidden">
                  {/* Hình ảnh */}
                  <div className="flex justify-center -mt-10">
                    <Image
                      src={service.img}
                      alt={service.name}
                      width={400}
                      height={128}
                      className="object-contain transition-transform duration-300"
                      style={{
                        transform: 'translateY(-20px)',
                      }}
                    />
                  </div>

                  {/* Nội dung */}
                  <h5 className="text-xl font-semibold mt-2">{service.name}</h5>
                  <p className="text-gray-500 text-sm mt-2">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
