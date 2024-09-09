import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import Layout from "../components/Layout/Layout";
import AboutSection from "../components/AboutUs/AboutSection";
import GoalSection from "../components/AboutUs/GoalSection";
import useSmoothScroll from "../hooks/useSmoothScroll";
import TeamMemberCard from "../components/Team/TeamMemberCard";

import EsraaImage from "../assets/team/esraa_img.jpg";
import YasserImage from "../assets/team/yasser_img.jpg";
import RefalImage from "../assets/team/refal_img.jpg";

import ahmedImg from "../assets/team/ahmed_img.jpeg";
import FaisalImg from "../assets/team/faisal_img.jpeg";
import ZiyadImg from "../assets/team/ziyad_img.jpeg";
import SalmanImg from "../assets/team/salman_img.jpeg";

const teamMembers = [
  {
    image: ZiyadImg,
    nameKey: "about_us.team_members.ziayd_name",
    majorKey: "about_us.team_members.software_engineer",
    linkedin: "https://www.linkedin.com/in/johndoe/",
  },
  {
    image: ahmedImg,
    nameKey: "about_us.team_members.ahmed_name",
    majorKey: "about_us.team_members.data_scientist",
    linkedin: "https://www.linkedin.com/in/janesmith/",
  },
  {
    image: SalmanImg,
    nameKey: "about_us.team_members.salman_name",
    majorKey: "about_us.team_members.data_scientist",
    linkedin: "https://www.linkedin.com/in/alicejohnson/",
  },
  {
    image: FaisalImg,
    nameKey: "about_us.team_members.faisal_name",
    majorKey: "about_us.team_members.data_scientist",
    linkedin: "https://www.linkedin.com/in/bobbrown/",
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

  return (
    <Layout>
      <AboutSection handleButtonClick={handleButtonClick} />
      <GoalSection ref={targetRef} />
      <div
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
        <h2 className="text-3xl font-bold text-center mb-6">
          {t("about_us.educator_title")}
        </h2>
        <div className="flex justify-center mb-12">
          <TeamMemberCard
            image={esraa.image}
            name={t(esraa.nameKey)}
            major={t(esraa.majorKey)}
            linkedin={esraa.linkedin}
            className="m-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/4"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">
          {t("about_us.instructors_title")}
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {instructors.map((instructor, index) => (
            <TeamMemberCard
              key={index}
              image={instructor.image}
              name={t(instructor.nameKey)}
              major={t(instructor.majorKey)}
              linkedin={instructor.linkedin}
              className="m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              style={{ fontFamily: "'El Messiri', sans-serif" }}
            />
          ))}
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">
          {t("about_us.team_title")}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              image={member.image}
              name={t(member.nameKey)}
              major={t(member.majorKey)}
              linkedin={member.linkedin}
              className="m-4"
              style={{ fontFamily: "'El Messiri', sans-serif" }}
            />
          ))}
        </div>
        <div className="flex justify-center items-center py-16">
          <Link
            to={"/"}
            className="btn btn-neutral w-1/2 text-xl"
            style={{ fontFamily: "'El Messiri', sans-serif" }}
          >
            {t("goal.about_button")}
          </Link>
        </div>
      </div>
    </Layout>
  );
});

export default AboutUs;
