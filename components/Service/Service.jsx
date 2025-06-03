import React from 'react';
import Image from 'next/image';

const ServicesData = [
  {
    id: 1,
    img: '/admin1.png',
    name: 'admin',
    description:
      'Quản lý tài khoản , môn học , giảng viên và duyệt bảng điểm.',
    aosDelay: '100',   // Thời gian trễ hiệu ứng AOS
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
       {/* Thẻ đánh dấu vị trí để cuộn tới section này */}
      <span id="services"></span>
      <div className="py-10 bg-sky-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl font-bold text-orange-500">Các thành phần trong trang web</h1>
          </div>
          {/* Services Card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
             {/* Lặp qua từng phần tử trong ServicesData để hiển thị thẻ */}
            {ServicesData.map((service) => (
              <div
                key={service.id}   // key giúp React định danh phần tử
                data-aos="fade-up"  // Hiệu ứng cuộn hiện lên
                data-aos-delay={service.aosDelay}  // Trễ hiệu ứng theo giá trị từ mảng
                className="flex justify-center"
              >
                 {/* Thẻ dịch vụ - có bo góc, đổ bóng, padding */}
                <div className="bg-white shadow-lg rounded-xl w-full max-w-xs text-center p-6 relative overflow-hidden">
                  {/* Hình ảnh */}
                  <div className="flex justify-center -mt-10">
                    <Image
                      src={service.img}
                      alt={service.name}  // Alt hiển thị khi ảnh lỗi
                      width={400}
                      height={128}
                      className="object-contain transition-transform duration-300"
                      style={{
                        transform: 'translateY(-20px)',   // Dịch chuyển ảnh lên trên một chút
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
