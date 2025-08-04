// src/pages/LandingPage.jsx
import React from "react";
import DotGrid from "../Components/DotGrid";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" , background: "#060010"
}}>
      <DotGrid
        dotSize={10}
        gap={15}
        baseColor="#5227FF"
        activeColor="#5227FF"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
          Welcome to Dashbord Visualizer!
        </h1>
       <button
  onClick={() => navigate("/dashboard")}
  style={{
    padding: "12px 32px",
    backgroundColor: "#5227FF",
    color: "#fff",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#3e1cd9";
    e.target.style.transform = "scale(1.05)";
    e.target.style.boxShadow = "0 6px 18px rgba(82, 39, 255, 0.4)";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "#5227FF";
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
  }}
>
  Get Started
</button>

    
      </div>
    </div>
  );
};

export default LandingPage;
