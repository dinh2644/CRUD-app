import React, { useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import more from "../assets/more.png";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import four from "../assets/four.png";
import five from "../assets/five.png";
import six from "../assets/six.png";

const Card = (props) => {
  const [forceSensitive, setForceSensitive] = useState(props.force_sensitive);

  const randomPic = () => {
    const pics = [one, two, three, four, five, six];
    const random = Math.floor(Math.random() * pics.length);
    return pics[random];
  };

  return (
    <div
      className="Card"
      style={{
        boxShadow: `rgba(0, 0, 0, 0.16) 0px 1px 4px, ${props.color} 0px 0px 0px 3px`,
      }}
    >
      <Link to={"/barracks/" + props.id}>
        <img
          alt="View this crew"
          src={randomPic()}
          width={90}
          className="rebelLogo"
          title="View this crew"
          style={{ marginLeft: "35px", marginBottom: "10px" }}
        />
      </Link>
      <Link to={"editRebel/" + props.id}>
        <img
          alt="Update this crew"
          src={more}
          className="moreButton"
          title="Update this crew"
        />
      </Link>
      <div className="info">
        <h4>
          Name: <span className="infoProps">{props.name}</span>
        </h4>
        <h5>
          Age: <span className="infoProps">{props.age}</span>
        </h5>
        <h5>
          Sex: <span className="infoProps">{props.sex}</span>
        </h5>
        <h5>
          Force sensitive:{" "}
          <span className="infoProps">
            {forceSensitive === true ? "Yes" : "No"}
          </span>{" "}
        </h5>
        <h5>
          Role: <span className="infoProps">{props.role}</span>
        </h5>
      </div>
    </div>
  );
};

export default Card;
