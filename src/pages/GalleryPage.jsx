import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Mothma from "../assets/Mothma.png";
import Stats from "../components/Stats";

const Gallery = (props) => {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    setCrewmates(props.data);
  }, [props.data]);

  return (
    <>
      <div className="container">
        <div className="row ">
          {crewmates && crewmates.length > 0 ? (
            crewmates.map((crewmate, index) => (
              <div
                className="col-3 d-flex"
                key={index}
                style={{ width: "300px" }}
              >
                <Card
                  id={crewmate.id}
                  name={crewmate.name}
                  age={crewmate.age}
                  sex={crewmate.sex}
                  force_sensitive={crewmate.force_sensitive}
                  role={crewmate.role}
                  color={crewmate.color}
                />
              </div>
            ))
          ) : (
            <h2 style={{ color: "white" }}>
              Boi if you dont recruit some members now{" "}
              <img src={Mothma} alt="Mon Mothma" width={100} />
            </h2>
          )}
        </div>
      </div>
      <Stats data={crewmates} />
    </>
  );
};

export default Gallery;
