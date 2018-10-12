import "./Background.css";

import * as React from "react";

import backgroundJpg from "../assets/background.jpg";

export function Background(props: { message?: string }) {
  const style = {
    backgroundImage: `url(${backgroundJpg})`
  };
  return (
    <div className="background">
      <div className="background-effect background-image" style={style} />
      <div className="background-effect background-overlay" />
      <div className="background-effect background-shadow-gradient" />
    </div>
  );
}
