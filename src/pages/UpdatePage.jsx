import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./updatePage.css";

const UpdatePage = ({ data }) => {
  const { id } = useParams();
  const crewmate = data.find((item) => String(item.id) === String(id));
  const [saberRoleDisabled, setSaberRoleDisabled] = useState(true);
  const [sexSelected, setSexSelected] = useState(true);
  const [roleSelected, setRoleSelected] = useState(true);

  // hold information for new updated inputs by user
  const [editedCrew, setEditedCrew] = useState({
    name: "",
    force_sensitive: false,
    role: "",
    age: 0,
    color: "#000000",
    sex: "",
  });

  //handle input changes
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setEditedCrew((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
    if (value === "") {
      if (name === "sex") {
        setSexSelected(true);
      } else if (name === "role") {
        setRoleSelected(true);
      }
    } else {
      if (name === "sex") {
        setSexSelected(false);
      } else if (name === "role") {
        setRoleSelected(false);
      }
    }
    if (name === "force_sensitive") {
      setSaberRoleDisabled(!checked);
      setEditedCrew((prev) => {
        const newRole = prev.role === "Saber Specialist" ? "" : prev.role;
        if (newRole === "") {
          setRoleSelected(true);
        }
        return { ...prev, role: newRole };
      });
    }
  };

  // handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editedCrew.age <= 0) {
      toast.error("Age cannot be 0 or negative!");
      return;
    }
    if (editedCrew.name === "") {
      toast.error("Name cannot be empty!");
      return;
    }
    if (sexSelected || roleSelected) {
      toast.error("Sex and role must be selected!");
      return;
    }

    const { error } = await supabase
      .from("Crew")
      .update([editedCrew])
      .eq("id", id);
    if (error) {
      console.log(error);
    } else {
      setEditedCrew({
        name: "",
        force_sensitive: false,
        role: "",
        age: 0,
        color: "#000000",
        sex: "",
      });

      localStorage.setItem("toast", "Crew member updated!");
      window.location = "/barracks";
    }
  };

  // handle delete post
  const handleDelete = async (event) => {
    event.preventDefault();

    const { error } = await supabase.from("Crew").delete().eq("id", id);

    if (error) {
      console.log(error);
    }
    localStorage.setItem("toast", "Crew member deleted!");
    window.location = "/barracks";
  };

  if (!crewmate) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1 className="updateRebel" style={{ width: "500px" }}>
        Update: {crewmate.name}{" "}
      </h1>
      <form className="updateRebel">
        {/* Name text*/}
        <div className="mb-2">
          <label htmlFor="nameInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={editedCrew.name}
            onChange={handleChange}
            placeholder={crewmate.name}
          />
        </div>
        {/* Age text*/}
        <div className="mb-2">
          <label htmlFor="ageInput" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="ageInput"
            name="age"
            value={editedCrew.age}
            onChange={handleChange}
          />
        </div>
        {/* Sex dropdown */}
        <label className="form-label">Sex</label>
        <select
          className="form-select mb-2"
          aria-label="Default select example"
          value={editedCrew.sex}
          onChange={handleChange}
          name="sex"
        >
          <option value="">Select Sex</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        {/* Force sensitive? switch*/}
        <div className="form-check form-switch">
          <label
            className="form-check-label mb-2"
            htmlFor="force_sensitiveInput"
          >
            Force sensitive?
          </label>
          <input
            className="form-check-input "
            type="checkbox"
            id="force_sensitiveInput"
            name="force_sensitive"
            value={editedCrew.force_sensitive}
            onChange={handleChange}
          />
        </div>
        {/* Role dropdown*/}
        <label className="form-label">Role</label>
        <select
          className="form-select"
          aria-label="Default select example"
          value={editedCrew.role}
          onChange={handleChange}
          name="role"
        >
          <option value="">Select Role</option>
          <option value="Saber Specialist" disabled={saberRoleDisabled}>
            Saber Specialist
          </option>
          <option value="Mandalorian">Mandalorian</option>
          <option value="Sharpshooter">Sharpshooter</option>
          <option value="Pilot">Pilot</option>
          <option value="Engineer">Engineer</option>
          <option value="Medic">Medic</option>
          <option value="Spy">Spy</option>
          <option value="Tactician">Tactician</option>
          <option value="Melee Combatant">Melee Combatant</option>
          <option value="Tech Specialists">Tech Specialists</option>
          <option value="Demolitions Expert">Demolitions Expert</option>
        </select>
        {/* Color */}
        <label htmlFor="colorInput" className="form-label">
          Aura
        </label>
        <input
          type="color"
          className="form-control form-control-color"
          id="colorInput"
          title="Choose your color"
          name="color"
          value={editedCrew.color}
          onChange={handleChange}
        ></input>
        <input
          type="submit"
          value="Submit"
          onClick={handleSubmit}
          className="submitBtn mt-4"
          title="All fields must be filled"
        />
        <input
          type="submit"
          value="Delete"
          onClick={handleDelete}
          className="submitBtn"
        />
      </form>
    </>
  );
};

export default UpdatePage;
