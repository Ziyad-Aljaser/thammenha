import React from "react";
import { motion } from "framer-motion";
import about_img from "../../assets/about_us.png";

const AboutSection = ({ handleButtonClick }) => {
  return (
    <div className="hero py-8 sm:py-14 bg-base-300">
      <div className="hero-content grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
          className="order-2 ml-auto hidden md:block"
        >
          <img src={about_img} alt="About" />
        </motion.div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <h1
            className="text-5xl font-bold leading-normal"
            style={{ fontFamily: "'El Messiri', sans-serif", direction: "rtl" }}
          >
            من نحن
          </h1>
          <div className="block md:hidden">
            <img src={about_img} alt="About" className="w-1/2 h-auto mx-auto" />
          </div>
          <p
            className="py-6 text-xl sm:text-3xl"
            style={{ fontFamily: "'El Messiri', sans-serif", direction: "rtl" }}
          >
            اكتشف عالم تسعير السيارات المستعملة مع ثمنها. سهل، بسيط، ومفيد – نحن
            نجعل تقدير قيمة سيارتك أمراً سهلاً ودقيقاً
          </p>

          <button
            className="btn btn-neutral w-1/2 text-xl mt-4"
            style={{ fontFamily: "'El Messiri', sans-serif", direction: "rtl" }}
            onClick={handleButtonClick}
          >
            هدفنا
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
