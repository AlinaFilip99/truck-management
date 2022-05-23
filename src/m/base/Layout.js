import React, { useState } from "react";
import Footer from "./Footer";
import MenuBar from "./MenuBar";

const AppLayout = ({ children, userId }) => {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") || "false"
  );

  return (
    <>
      <MenuBar isLogged={isLogged} userId={userId} />
      <div
        style={{
          overflowY: "scroll",
          maxHeight: "calc(100vh - 64px - 8px)",
          overflow: "auto",
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
