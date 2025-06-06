"use client";
import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "liên hệ",
    link: "/lienHe",
  },
];
const Navbar = () => {
  return (
     // Thanh navbar có gradient xanh và đổ bóng
    <div className="bg-gradient-to-r from-[#029aa2] to-[#036986] shadow-md text-white">
      <div className="container mx-auto py-2 px-4">
        <div className="flex justify-between items-center">
          {/* Logo section */}
          <div data-aos="fade-down" data-aos-once="true">
            <a
              href="#"
              className="flex items-center text-decoration-none  text-white font-bold text-2xl gap-2"
            >
              <Image
                src="/nonsv-removebg-preview.png"
                alt="Logo"
                width={70}
                height={70}
              />
              Quản lý sinh viên
            </a>
          </div>

          {/* Link section */}
          <div
            data-aos="fade-down" // hiệu ứng hiện xuống
            data-aos-once="true"
            data-aos-delay="300"// trễ 300ms
            className="flex justify-between items-center gap-4"
          >
             {/* Menu chỉ hiện trên màn hình >= sm */}
            <ul className="hidden sm:flex list-none items-center gap-4">
              {Menu.map((menu) => (
                <li key={menu.id}>
                  <a
                    href={menu.link}
                    className="font-bold no-underline text-white hover:text-blue-700 py-2 px-4"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {menu.name}
                  </a>
                </li>
              ))}
            </ul>
            <Link href="/login">
              <button className="bg-red-600 text-white flex items-center gap-2 px-4 py-2 rounded-xl">
                Đăng nhập
                <FaUserCircle
                  className="text-white"
                  style={{ fontSize: "1.25rem" }}
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
