import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CardInfoPageCSS.css";
import Rebel from "../assets/rebel.png";

const CardInfoPage = ({ data }) => {
  const { id } = useParams();
  const crewmate = data.find((item) => String(item.id) === String(id));

  const originalDate = crewmate ? String(crewmate.created_at) : "";
  const date = new Date(originalDate);

  const formattedDate = date.toLocaleString();

  if (!crewmate) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div
          className="card p-4"
          style={{
            boxShadow: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, ${crewmate.color} 0px 2px 6px 2px`,
          }}
        >
          <div className=" image d-flex flex-column justify-content-center align-items-center">
            {" "}
            <img src={Rebel} height="100" width="100" />
            <div className="name mt-3">{crewmate.name}</div>{" "}
            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
              {" "}
              <span>
                <i className="fa fa-copy"></i>
              </span>{" "}
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center mt-3 ">
              {" "}
            </div>
            <div className="crewmateProps">
              <span className="properties">Age:</span> {crewmate.age}
            </div>
            <div className="crewmateProps">
              {" "}
              <span className="properties">Role:</span> {crewmate.sex}
            </div>
            <div className="crewmateProps">
              <span className="properties">Force User:</span>{" "}
              {crewmate.force_sensitive === true ? "Yes" : "No"}
            </div>
            <div className="crewmateProps">
              <span className="properties">Role:</span> {crewmate.role}
            </div>
            <div className="crewmateProps " style={{ float: "right" }}>
              <span className="properties">Aura color:</span>{" "}
              <div
                style={{
                  backgroundColor: crewmate.color,
                  borderRadius: "50%",
                }}
              >
                <div className="color-box-text">COLOR</div>
              </div>
            </div>
            <div className=" px-2 rounded mt-4 date ">
              {" "}
              <div className="join">Joined {formattedDate}</div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInfoPage;
