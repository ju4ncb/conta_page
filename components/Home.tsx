import React from "react";

const Home = () => {
  return (
    <u
      className="home_button bi bi-house-fill"
      onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();
        window.location.href = "/";
      }}
    ></u>
  );
};

export default Home;
