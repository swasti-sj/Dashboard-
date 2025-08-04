import React, { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.pageYOffset > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    show && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed", bottom: "40px", right: "40px",
          padding: "12px 16px", fontSize: "18px",
          backgroundColor: "#5c4033", color: "#fff",
          border: "none", borderRadius: "4px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)", cursor: "pointer",
          transition: "opacity 0.3s ease"
        }}
      >
        ↑ Top
      </button>
    )
  );
};

export default BackToTopButton;
