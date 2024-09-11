// Updated Code in AboutUs.jsx
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import { useTranslation } from "react-i18next";
import Layout from "../components/Layout/Layout";
import AboutSection from "../components/AboutUs/AboutSection";
import GoalSection from "../components/AboutUs/GoalSection";
import useSmoothScroll from "../hooks/useSmoothScroll";
import TeamMemberCard from "../components/Team/TeamMemberCard";

import EsraaImage from "../assets/team/esraa_img.jpg";
import YasserImage from "../assets/team/yasser_img.jpeg";
import RefalImage from "../assets/team/refal_img.jpg";

import ahmedImg from "../assets/team/ahmed_img.jpeg";
import FaisalImg from "../assets/team/faisal_img.jpeg";
import ZiyadImg from "../assets/team/ziyad_img.jpeg";
import SalmanImg from "../assets/team/salman_img.jpeg";

import TuwaiqImage from "../assets/Tuwaiq_background.png";

import TuwaiqLogo from "../assets/tuwaiq_logo.jpg"; // Import the image for Tuwaiq

// Tuwaiq Sponsor Details
const tuwaiq = {
  image: TuwaiqLogo,
  nameKey: "about_us.sponsor_name", // Using the translation key for Tuwaiq Academy
  majorKey: "about_us.sponsor_description", // Using the translation key for Education Administration Programs
  linkedin:
    "https://www.linkedin.com/company/tuwaiqacademy/posts/?feedView=all",
};

const teamMembers = [
  {
    image: ZiyadImg,
    nameKey: "about_us.team_members.ziyad_name",
    majorKey: "about_us.team_members.software_engineer",
    linkedin: "https://www.linkedin.com/in/johndoe/",
  },
  {
    image: ahmedImg,
    nameKey: "about_us.team_members.ahmed_name",
    majorKey: "about_us.team_members.data_scientist",
    linkedin: "https://www.linkedin.com/in/ahmad-alsubhi-7087a5313/",
  },
  {
    image: SalmanImg,
    nameKey: "about_us.team_members.salman_name",
    majorKey: "about_us.team_members.data_scientist",
    linkedin: "https://www.linkedin.com/in/salmangassem/",
  },
  {
    image: FaisalImg,
    nameKey: "about_us.team_members.faisal_name",
    majorKey: "about_us.team_members.computer_scientist",
    linkedin: "https://www.linkedin.com/in/faisalmcs/",
    website: "https://tuwaiq.edu.sa/", // Tuwaiq's website
  },
];

// Esraa Madhi's Details
const esraa = {
  image: EsraaImage,
  nameKey: "about_us.educator_name",
  majorKey: "about_us.educator_major",
  linkedin: "https://www.linkedin.com/in/esraamadi/",
};

// Instructors' Details
const instructors = [
  {
    image: YasserImage,
    nameKey: "about_us.instructors.yasser_name",
    majorKey: "about_us.instructors.assistant_instructor",
    linkedin: "https://www.linkedin.com/in/yasser-almubaddil/",
  },
  {
    image: RefalImage,
    nameKey: "about_us.instructors.refal_name",
    majorKey: "about_us.instructors.assistant_instructor",
    linkedin: "https://www.linkedin.com/in/refalalboqami/",
  },
];

const AboutUs = forwardRef((props, ref) => {
  const [targetRef, handleButtonClick] = useSmoothScroll();
  const { t } = useTranslation();

  // Animation variants for the sponsor card
  const sponsorVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  };

  // Animation variants for the educator
  const educatorVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  };

  // Define animation variants for the instructors
  const instructorsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        staggerChildren: 0.2, // Staggering effect for children
      },
    },
  };

  // Animation variants for staggered appearance
  const teamVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        staggerChildren: 1, // 1 second delay between each card
      },
    },
  };

  // Individual card animation with slow appearance
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2, // 2 seconds duration for slow appearance
      },
    },
  };

  return (
    <Layout>
      <AboutSection handleButtonClick={handleButtonClick} />
      <GoalSection ref={targetRef} />
      <div
        id="meet-our-team"
        className="bg-base-300 py-16"
        style={{ fontFamily: "'El Messiri', sans-serif" }}
      >
        <h2 className="text-4xl font-bold text-center">
          {t("about_us.main_title")}
        </h2>
      </div>

      <div
        className="bg-base-300"
        style={{ fontFamily: "'El Messiri', sans-serif" }}
      >
        {/* Tuwaiq Sponsor Section */}
        <h2 className="text-3xl font-bold text-center">
          {t("about_us.sponsor_title")}
        </h2>
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 px-6 md:px-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sponsorVariants}
        >
          <TeamMemberCard
            image={tuwaiq.image}
            name={t(tuwaiq.nameKey)} // Correctly using the translation function
            major={t(tuwaiq.majorKey)} // Correctly using the translation function
            linkedin={tuwaiq.linkedin}
            className="m-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          />
          <figure className="m-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <img
              src={TuwaiqImage}
              alt="Tuwaiq Academy"
              className="w-full h-auto object-cover rounded-lg"
            />
          </figure>
        </motion.div>

        {/* Educator Sponsor Section */}
        <h2 className="text-3xl font-bold text-center py-6">
          {t("about_us.educator_title")}
        </h2>
        <motion.div
          className="flex justify-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={educatorVariants}
        >
          <TeamMemberCard
            image={esraa.image}
            name={t(esraa.nameKey)}
            major={t(esraa.majorKey)}
            linkedin={esraa.linkedin}
            className="m-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/4"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          />
        </motion.div>

        {/* Instructors Sponsor Section */}
        <h2 className="text-3xl font-bold text-center py-6">
          {t("about_us.instructors_title")}
        </h2>
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={instructorsVariants}
        >
          {instructors.map((instructor, index) => (
            <TeamMemberCard
              key={index}
              image={instructor.image}
              name={t(instructor.nameKey)}
              major={t(instructor.majorKey)}
              linkedin={instructor.linkedin}
              className="m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-24"
              style={{ fontFamily: "'El Messiri', sans-serif" }}
            />
          ))}
        </motion.div>

        {/* Team Sponsor Section */}
        <h2 className="text-3xl font-bold text-center mb-6">
          {t("about_us.team_title")}
        </h2>
        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={teamVariants}
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={cardVariants}>
              <TeamMemberCard
                image={member.image}
                name={t(member.nameKey)}
                major={t(member.majorKey)}
                linkedin={member.linkedin}
                className="m-4"
                style={{ fontFamily: "'El Messiri', sans-serif" }}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-center items-center py-16">
          <Link
            to={"/"}
            className="btn btn-neutral w-1/2 text-xl"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("about_us.back_button")}
          </Link>
        </div>
      </div>
    </Layout>
  );
});

export default AboutUs;
