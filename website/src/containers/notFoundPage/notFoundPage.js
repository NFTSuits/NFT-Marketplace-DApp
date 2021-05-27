import React from "react";
import { Typography } from "@material-ui/core";

const NotFoundPage = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        //mixBlendMode: "overlay",
        backgroundImage:
          "url('https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Error-Page.gif')",
      }}
    ></div>
  );
};

export default NotFoundPage;
