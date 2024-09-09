// AboutUs.jsx
import React from "react";
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
    name: "Ziyad Aljaser",
    major: "Software Engineer",
    linkedin: "https://www.linkedin.com/in/johndoe/",
  },
  {
    image: ahmedImg,
    name: "Ahmed",
    major: "Data Scientist",
    linkedin: "https://www.linkedin.com/in/janesmith/",
  },
  {
    image: SalmanImg,
    name: "Salman",
    major: "Data Scientist",
    linkedin: "https://www.linkedin.com/in/alicejohnson/",
  },
  {
    image: FaisalImg,
    name: "Faisal",
    major: "Data Scientist",
    linkedin: "https://www.linkedin.com/in/bobbrown/",
  },
];

// Esraa Madhi's Details
const esraa = {
  image: EsraaImage,
  name: "Esraa Madhi",
  major: "Data Scientist | AI Educator",
  linkedin: "https://www.linkedin.com/in/esraamadi/",
};

// Instructors' Details
const instructors = [
  {
    image: YasserImage,
    name: "Yasser Almubaddil",
    major: "Assistant Instructor",
    linkedin: "https://www.linkedin.com/in/yasser-almubaddil/",
  },
  {
    image: RefalImage,
    name: "Refal Alboqami",
    major: "Assistant Instructor",
    linkedin: "https://www.linkedin.com/in/refalalboqami/",
  },
];

export default function AboutUs() {
  const [targetRef, handleButtonClick] = useSmoothScroll();

  return (
    <Layout>
      <AboutSection handleButtonClick={handleButtonClick} />
      <GoalSection ref={targetRef} />
      <div className="bg-base-300 sm:py-16">
        <h2 className="text-4xl font-bold text-center">Meet Our Team</h2>
      </div>

      <div className="bg-base-300">
        <h2 className="text-3xl font-bold text-center mb-6">Our Educator</h2>
        <div className="flex justify-center mb-12">
          <TeamMemberCard
            image={esraa.image}
            name={esraa.name}
            major={esraa.major}
            linkedin={esraa.linkedin}
            className="m-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/4" // Adjusting width to make the card larger
          />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">Our Instructors</h2>
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {instructors.map((instructor, index) => (
            <TeamMemberCard
              key={index}
              image={instructor.image}
              name={instructor.name}
              major={instructor.major}
              linkedin={instructor.linkedin}
              className="m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" // Responsive widths for instructors
            />
          ))}
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">Our Team Members</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              image={member.image}
              name={member.name}
              major={member.major}
              linkedin={member.linkedin}
              className="m-4 mb-32"
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
