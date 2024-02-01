//import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function TeamMemberList() {
  const [members, setMembers] = useState([
    { name: "명수", role: "Front-end Architect" },
    { name: "혜림", role: "Front-end Developer" },
    { name: "현정", role: "iOS Developer" },
    { name: "미리", role: "3D Web Developer" },
  ]);<br/>

  const removeMember = index => {
    const newMembers = members.filter((_, idx) => idx !== index);
    setMembers(newMembers);
  };

  return (
      <div>
        {members.map((member, index) => (
            <div key={index}>
              {member.name} - {member.role}
              <button onClick={() => removeMember(index)}>Remove</button>
            </div>
        ))}
      </div>
  );
}

export default TeamMemberList;
