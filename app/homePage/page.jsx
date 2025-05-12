"use client";
import React, { useEffect } from "react";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import Services from "@/components/Service/Service";
import Banner from "@/components/Banner/Banner";
import AppStore from "@/components/AppStore/AppStore";
import Testimonials from "@/components/Testimonials/Testimonials";
import Footer from "@/components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function HomePage() {
  useEffect(() => {
    AOS.init({
      offset: 100, // Khoảng cách từ trên trang để bắt đầu hiệu ứng
      duration: 700, // Thời gian hiệu ứng (ms)
      easing: "ease-in", // Kiểu chuyển động của hiệu ứng
      delay: 100, // Độ trễ của hiệu ứng (ms)
    });
    AOS.refresh(); // Làm mới AOS khi thay đổi
  }, []);
  return (
    <div className="bg-light">
      <Navbar />
      <Hero />
      <Services />
      <Banner />
      <AppStore />
      <Testimonials />
      <Footer />
    </div>
  );
}
