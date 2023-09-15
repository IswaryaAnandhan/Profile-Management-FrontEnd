import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState({
    age: 0,
    gender: "",
    dob: "",
    mobile: "",
  });

  const [formData, setFormData] = useState({
    age: 0,
    gender: "",
    dob: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:4000/api/auth/profile",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("myprofile"),
          },
        }
      );

      if (response.data.message === "Profile updated successfully") {
        alert("Profile updated successfully");
        setProfile(formData);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the profile");
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="row mt-3">
        <div className="col-md-6 mb-2">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Profile Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender:</label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth:</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile:</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2 ">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Current Profile Data</h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Age:</strong> {profile.age}
                </li>
                <li className="list-group-item">
                  <strong>Gender:</strong> {profile.gender}
                </li>
                <li className="list-group-item">
                  <strong>Date of Birth:</strong> {profile.dob}
                </li>
                <li className="list-group-item">
                  <strong>Mobile:</strong> {profile.mobile}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
