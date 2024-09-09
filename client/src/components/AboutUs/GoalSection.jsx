import React, { forwardRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import goal_img from "../../assets/goal_img.png";
import { Link } from "react-router-dom";
import useInView from "../../hooks/useInView";
import { useTranslation } from "react-i18next";

const GoalSection = forwardRef((props, ref) => {
  const [inViewRef, inView] = useInView({ triggerOnce: true });
  const { t } = useTranslation();
  
  // State to track if the animation has been triggered
  const [hasAnimated, setHasAnimated] = useState(false);

  // Effect to update state when inView is true
  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return (
    <div ref={ref} className="hero sm:py-16 bg-base-200">
      <div ref={inViewRef} className="hero-content grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={hasAnimated ? { opacity: 1, x: 0 } : {}} // Animate only if hasn't animated
          transition={{ type: "spring", stiffness: 50 }}
          className="hidden md:block"
        >
          <img src={goal_img} alt="Goal" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={hasAnimated ? { opacity: 1, x: 0 } : {}} // Animate only if hasn't animated
          transition={{ type: "spring", stiffness: 50 }}
        >
          <h1
            className="text-5xl font-bold leading-normal"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("goal.about_title")}
          </h1>
          <div className="block md:hidden">
            <img src={goal_img} alt="Goal" className="w-1/2 h-auto mx-auto" />
          </div>
          <p
            className="py-6 text-xl sm:text-3xl"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("goal.about_text")}
          </p>

          <Link
            to={"/"}
            className="btn btn-neutral w-1/2 text-xl mt-4 mb-16"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("goal.about_button")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
});

export default GoalSection;
