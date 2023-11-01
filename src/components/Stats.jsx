import React, { useState, useEffect } from "react";
import "../components/stats.css";
import { supabase } from "../client";
import Grogu from "../assets/Grogu.png";

const Stats = ({ data }) => {
  const [crewmates, setCrewmates] = useState([]);
  const [forceUsersCount, setForceUsersCount] = useState([]);
  const [avgAge, setAvgAge] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    setCrewmates(data);

    const fetchForceUsers = async () => {
      const { data } = await supabase
        .from("Crew")
        .select("force_sensitive")
        .eq("force_sensitive", true);
      const NoOfForceUsers = data.length;
      setForceUsersCount(NoOfForceUsers);
    };
    fetchForceUsers();
    const fetchAverageAge = async () => {
      const { data } = await supabase.from("Crew").select("age");
      const totalAge = data.reduce((sum, crewmate) => sum + crewmate.age, 0);
      const avgAge = totalAge / data.length;

      setAvgAge(avgAge);
    };
    fetchAverageAge();
    const fetchMaleCount = async () => {
      const { data } = await supabase
        .from("Crew")
        .select("sex")
        .eq("sex", "Male");
      setMaleCount(data.length);
    };
    fetchMaleCount();
    const fetchFemaleCount = async () => {
      const { data } = await supabase
        .from("Crew")
        .select("sex")
        .eq("sex", "Female");
      setFemaleCount(data.length);
    };
    fetchFemaleCount();
  }, [data]);

  const progressBarWidth = Math.min(forceUsersCount * 20, 100);

  return (
    <>
      <div className="statsContainer">
        <h4>Stats:</h4>
        <h5 className="stats"># of force users: {forceUsersCount} </h5>
        <h5 className="stats">Squadron's Average age: {avgAge.toFixed(2)}</h5>
        <h5 className="stats">Male Count: {maleCount}</h5>
        <h5 className="stats">Female Count: {femaleCount}</h5>
        <h4 className="mt-5">Success Meter:</h4>

        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${progressBarWidth}%` }}
            role="progressbar"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p style={{ fontSize: "15px" }}>
          (spoiler - having 5 force users your team <br /> will get you 100%
          success rate <br /> unlocking a special hero to your team!)
        </p>

        {forceUsersCount >= 5 ? (
          <>
            <img src={Grogu} alt="Grogu" width={250} className="grogu" />
            <p style={{ fontSize: "15px" }}>
              - I sense the force is strong with you guys.{" "}
            </p>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Stats;
