// TeamMemberCard.jsx
import React from "react";
import { FaLinkedin } from "react-icons/fa";

const TeamMemberCard = ({ image, name, major, linkedin, className }) => {
  return (
    <div
      className={`card glass w-86 shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-lg ${className}`}
    >
      <figure>
        <img src={image} alt={name} className="w-full h-64 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{major}</p>
        <div className="card-actions justify-end">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            <FaLinkedin size={36} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
