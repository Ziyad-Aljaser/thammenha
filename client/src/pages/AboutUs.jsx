// AboutUs.jsx
import React from "react";
import Layout from "../components/Layout/Layout";
import AboutSection from "../components/AboutUs/AboutSection";
import GoalSection from "../components/AboutUs/GoalSection";
import useSmoothScroll from "../hooks/useSmoothScroll";
import TeamMemberCard from "../components/Team/TeamMemberCard";

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

export default function AboutUs() {
  const [targetRef, handleButtonClick] = useSmoothScroll();

  return (
    <Layout>
      <AboutSection handleButtonClick={handleButtonClick} />
      <div className="my-10">
        <h2 className="text-3xl font-bold text-center mb-6">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              image={member.image}
              name={member.name}
              major={member.major}
              linkedin={member.linkedin}
              className="m-4" // Correctly pass margin class here
            />
          ))}
        </div>
      </div>

      <GoalSection ref={targetRef} />
    </Layout>
  );
}
