import React from "react";
import "./HomePage.css";
import Title from "../assets/title.png";

const HomePage = () => {
  return (
    <>
      <div className="container">
        <h1>
          <img src={Title} alt="" width={700} className="star-wars-header " />
        </h1>
        <h5 className="opening-crawl">
          Attention! It's the year 5 BBY, the age of the rebellion had just
          begun. With the all powerful Darth Vader on the rise, Chancellor Mon
          Mothma orders you to assemble a dedicated team of valiant rebels to
          stand against the oppressive Galactic Empire and bring forth a new era
          of hope and freedom for the galaxy.
        </h5>
      </div>
    </>
  );
};

export default HomePage;
