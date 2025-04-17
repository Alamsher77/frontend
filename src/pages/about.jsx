import React from "react";
import logo3 from '../asetes/logo3.webp'
const About = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-600">
      <div className="bg-white shadow-md  p-8 md:p-16 max-w-xl">
        <div className="text-center">
          <img
            src={logo3} alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h1 className="text-4xl font-semibold mb-2 text-gray-800">About Me</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Hi! I'm a web developer with a passion for creating beautiful and
            functional user experiences. I love exploring new technologies and
            solving problems. In my free time, you can find me reading, hiking,
            or working on side projects.
          </p>
        </div>
        
       
        
      </div> 
    </div>
  );
};

export default About;
