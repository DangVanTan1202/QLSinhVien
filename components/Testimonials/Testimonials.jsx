import React from 'react';
import Slider from 'react-slick';

const TestimonialData = [
  {
    id: 1,
    name: 'Anh an',
    text: 'Phần mềm giúp tôi nhập điểm và theo dõi lớp học nhanh chóng hơn rất nhiều. Giao diện đơn giản, dễ sử dụng',
    img: 'https://picsum.photos/101/101',
  },
  {
    id: 2,
    name: 'Chị linh',
    text: 'LPhần mềm giúp tôi nhập điểm và theo dõi lớp học nhanh chóng hơn rất nhiều. Giao diện đơn giản, dễ sử dụng',
    img: 'https://picsum.photos/102/102',
  },
  {
    id: 3,
    name: 'Anh cường',
    text: 'Phần mềm giúp tôi nhập điểm và theo dõi lớp học nhanh chóng hơn rất nhiều. Giao diện đơn giản, dễ sử dụng',
    img: 'https://picsum.photos/104/104',
  },
  {
    id: 5,
    name: 'Chị dung',
    text: 'Phần mềm giúp tôi nhập điểm và theo dõi lớp học nhanh chóng hơn rất nhiều. Giao diện đơn giản, dễ sử dụng',
    img: 'https://picsum.photos/103/103',
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Một số đánh giá từ người dùng thử nghiệm</h1>
        </div>

        {/* Testimonial Slider */}
        <Slider {...settings}>
          {TestimonialData.map((data) => (
            <div key={data.id} className="flex justify-center py-4">
              <div className="bg-white shadow-lg rounded-xl p-6 relative max-w-xs text-center mx-3">
                {/* Avatar */}
                <div className="mb-4">
                  <img
                    src={data.img}
                    alt={data.name}
                    className="rounded-full mx-auto w-20 h-20 object-cover"
                  />
                </div>
                {/* Text */}
                <p className="text-gray-600 text-sm mb-3">{data.text}</p>
                <h5 className="text-lg font-semibold text-gray-800">{data.name}</h5>

                {/* Quote icon (top right corner) */}
                <div className="absolute top-2 right-4 text-5xl text-gray-200 select-none pointer-events-none">
                  ,,
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
