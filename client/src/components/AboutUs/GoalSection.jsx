import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import goal_img from "../../assets/goal_img.png";
import { Link } from "react-router-dom";
import useInView from "../../hooks/useInView";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

const GoalSection = forwardRef((props, ref) => {
  const [inViewRef, inView] = useInView({ triggerOnce: true });
  const { t } = useTranslation(); // Use the hook to access translations

  return (
    <div ref={ref} className="hero sm:py-16 bg-base-300">
      <div ref={inViewRef} className="hero-content grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: "-100vw" }}
          animate={inView ? { x: 0 } : { x: "-100vw" }}
          transition={{ type: "spring", stiffness: 50 }}
          className="hidden md:block"
        >
          <img src={goal_img} alt="Goal" />
        </motion.div>
        <motion.div
          initial={{ x: "-100vw" }}
          animate={inView ? { x: 0 } : { x: "-100vw" }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <h1
            className="text-5xl font-bold leading-normal"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("goal.about_title")} {/* Use the translation key */}
          </h1>
          <div className="block md:hidden">
            <img src={goal_img} alt="Goal" className="w-1/2 h-auto mx-auto" />
          </div>
          <p
            className="py-6 text-xl sm:text-3xl"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("goal.about_text")} {/* Use the translation key */}
          </p>

          <Link
            to={"/"}
            className="btn btn-neutral w-1/2 text-xl mt-4 mb-16"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("goal.about_button")} {/* Use the translation key */}
          </Link>
        </motion.div>
      </div>
    </div>
  );
});

export default GoalSection;
