import React, { forwardRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import goal_img from "../../assets/goal_img.png";
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

  // Function to handle scrolling to the "Meet Our Team" section slightly above
  const scrollToTeamSection = () => {
    const teamSection = document.getElementById("meet-our-team");
    if (teamSection) {
      const offsetTop = teamSection.offsetTop - 40; // Adjust 100px above the section
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div ref={ref} className="hero sm:py-16 bg-base-200">
      <div ref={inViewRef} className="hero-content grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={hasAnimated ? { opacity: 1, x: 0 } : {}} // Animate only if hasn't animated
          transition={{ type: "tween", duration: 2, ease: "easeOut" }} // Set duration to 2 seconds
          className="hidden md:block"
        >
          <img src={goal_img} alt="Goal" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={hasAnimated ? { opacity: 1, x: 0 } : {}} // Animate only if hasn't animated
          transition={{ type: "tween", duration: 1.5, ease: "easeOut" }} // Set duration to 2 seconds
        >
          <h1
            className="text-5xl font-bold leading-normal"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("goal.goal_title")}
          </h1>
          <div className="block md:hidden">
            <img src={goal_img} alt="Goal" className="w-1/2 h-auto mx-auto" />
          </div>
          <p
            className="py-6 text-xl sm:text-3xl"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("goal.goal_text")}
          </p>

          <button
            onClick={scrollToTeamSection}
            className="btn btn-neutral sm:text-xl w-1/2 mt-4 mb-16"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("goal.goal_button")}
          </button>
        </motion.div>
      </div>
    </div>
  );
});

export default GoalSection;
