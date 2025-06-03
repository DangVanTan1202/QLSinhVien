'use client';

import { useRef } from 'react';
import emailjs from 'emailjs-com';
import { FaFacebook, FaYoutube, FaPhoneAlt } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

const ContactPage = () => {
  const form = useRef();
  const router = useRouter();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_avw86bk',
        'template_ohonn6m',
        form.current,
        '-aV4hAOZCBU6JIypp'
      )
      .then(
        () => {
          alert('Đã gửi tin nhắn thành công!');
          e.target.reset();
        },
        (error) => {
          console.error(error.text);
          alert('Gửi thất bại, vui lòng thử lại.');
        }
      );
  };
  return (
    <div className="bg-gradient-to-br from-blue-100 to-sky-100 min-h-screen">
      {/* Header */}
      <header className="w-full bg-cyan-600 text-white shadow-md py-4 px-8 flex justify-between items-center fixed top-0 z-10">
        <h1 className="text-2xl font-bold">Hệ Thống Quản Lý Sinh Viên</h1>
        <nav className="space-x-6">
          <Button variant="ghost" className="text-white" onClick={() => router.push('/homePage')}>Home</Button>
          <Button variant="ghost" className="text-white" onClick={() => router.push('/login')}>Đăng nhập</Button>
        </nav>
      </header>

      <div className="pt-28 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-left text-red-800 mb-12">Liên hệ với chúng tôi</h1>

        {/* Mạng xã hội */}
        <div className="flex justify-left gap-10 mb-14">
          <a href="https://www.facebook.com/https.192.168.4.1.00000000000000000000000000000000" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-600 hover:text-blue-800 text-4xl hover:scale-110 transition-transform" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-red-600 hover:text-red-800 text-4xl hover:scale-110 transition-transform" />
          </a>
          <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer">
            <SiZalo className="text-blue-500 hover:text-blue-700 text-4xl hover:scale-110 transition-transform" />
          </a>
          <a href="tel:0123456789">
            <FaPhoneAlt className="text-green-600 hover:text-green-800 text-4xl hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Bản đồ + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Bản đồ */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3300430071226!2d109.21528237500698!3d13.75895968663367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f6cebf252c49f%3A0xa83caa291737172f!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBRdXkgTmjGoW4!5e0!3m2!1svi!2s!4v1684497529834!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* Form */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-white p-8 rounded-2xl shadow-md border border-gray-300 space-y-6"
          >
            <h2 className="text-2xl font-semibold text-center text-blue-700">Gửi tin nhắn</h2>

            <div>
              <label className="block text-gray-600 mb-1">Họ tên</label>
              <input
                type="text"
                name="from_name"
                required
                placeholder="Nhập họ tên"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email của bạn</label>
              <input
                type="email"
                name="from_email"
                required
                placeholder="Nhập email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email người nhận</label>
              <input
                type="email"
                name="to_email"
                required
                placeholder="Email người nhận"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Tin nhắn</label>
              <textarea
                name="message"
                rows="5"
                required
                placeholder="Nhập nội dung tin nhắn..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold w-full py-3 rounded-md transition"
            >
              Gửi liên hệ
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ContactPage;
