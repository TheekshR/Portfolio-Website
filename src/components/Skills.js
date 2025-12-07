import React from "react";
import { 
  FaReact, FaNodeJs, FaJava, FaPhp 
} from "react-icons/fa";
import { 
  SiMongodb, SiFirebase, SiMui, SiHtml5, SiCss3, SiJavascript, SiC, SiCplusplus, SiMysql, SiFigma, SiKotlin
} from "react-icons/si";
import "../styles/Skills.css";

const skills = [
  { icon: <FaReact />, name: "React" },
  { icon: <FaNodeJs />, name: "Node.js" },
  { icon: <SiMongodb />, name: "MongoDB" },
  { icon: <SiFirebase />, name: "Firebase" },
  { icon: <SiMui />, name: "Material UI" },
  { icon: <SiHtml5 />, name: "HTML" },
  { icon: <SiCss3 />, name: "CSS" },
  { icon: <SiJavascript />, name: "JavaScript" },
  { icon: <FaJava />, name: "Java" },
  { icon: <SiKotlin />, name: "Kotlin" },
  { icon: <SiC />, name: "C" },
  { icon: <SiCplusplus />, name: "C++" },
  { icon: <FaPhp />, name: "PHP" },
  { icon: <SiMysql />, name: "MySQL" },
  {icon: <SiFigma />, name: "Figma" }
];

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <h2>SKILLS</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            {skill.icon}
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
