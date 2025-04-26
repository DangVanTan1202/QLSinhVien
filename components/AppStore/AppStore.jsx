import React from "react";
import Image from "next/image";

const AppStore = () => {
  return (
    <div
      className="py-10 w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/qlsv5.png')` }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center">
          {/* Text + App Store Buttons */}
          <div
            data-aos="fade-up"
            data-aos-duration="300"
            className="w-full sm:w-1/2 text-center sm:text-left mb-6 sm:mb-0"
          >
            <h1 className="text-2xl sm:text-3xl font-semibold text-pink-500 opacity-90 mb-4">
              Liên hệ với chúng tôi qua
            </h1>
            <div className="flex justify-center sm:justify-start items-center gap-4">
              <a href="#">
                <Image
                  src="/facebook.png"
                  alt="facebook"
                  width={150}
                  height={50}
                />
              </a>
              <a href="#">
                <Image
                  src="/youtube.png"
                  alt="youtube"
                  width={150}
                  height={50}
                />
              </a>
              <a href="#">
                <Image
                  src="/zalo.png"
                  alt="zalo"
                  width={150}
                  height={50}
                />
              </a>
            </div>
          </div>

          {/* Google Maps - Right Column */}
          <div className="w-full sm:w-1/2 flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3300430071226!2d109.21528237500698!3d13.75895968663367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f6cebf252c49f%3A0xa83caa291737172f!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBRdXkgTmjGoW4!5e0!3m2!1svi!2s!4v1684497529834!5m2!1svi!2s"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppStore;
