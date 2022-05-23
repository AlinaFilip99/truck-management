import React from "react";
import { SpeedDial } from "primereact/speeddial";
import { Tooltip } from "primereact/tooltip";
import styled from "styled-components";

const StyledLabel = styled.div`
  margin-bottom: 10px;
  align-self: center;
  margin-right: 5px;
  font-weight: 500;
`;

const StyledSpeedDial = styled.div`
  .speed-dial {
    .access-button {
      width: 40px;
      height: 40px;
      // padding: 5px;
      color: #7057d5;
      .p-button-icon {
        font-size: 14px;
      }
    }
    .p-speeddial-action {
      width: 35px;
      height: 35px;
      // background: #656fa8; || #885afa
      background: #6f5ac5;
      color: #fff;
    }
  }
`;

const Footer = () => {
  const renderImage = (source, url) => {
    return (
      <div style={{ padding: "5px" }}>
        <img
          alt="logo"
          src={source}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width="30"
          height="30"
          style={{ cursor: "pointer" }}
          className="mr-2"
          onClick={() => {
            window.open(url, "_blank");
          }}
        ></img>
      </div>
    );
  };

  const items = [
    {
      label: "Black & White",
      icon: "pi pi-stop-circle",
      command: () => {
        var pageWallpapers = document.getElementById("root");

        if (pageWallpapers.style.filter == "grayscale(100%)") {
          pageWallpapers.style.filter = "unset";
        } else {
          pageWallpapers.style.filter = "grayscale(100%)";
        }
      },
    },
    {
      label: "Invert",
      icon: "pi pi-sort-alt",
      command: () => {
        var pageWallpapers = document.getElementById("root");

        if (pageWallpapers.style.filter == "invert(100%)") {
          pageWallpapers.style.filter = "unset";
        } else {
          pageWallpapers.style.filter = "invert(100%)";
        }
      },
    },
    {
      label: "Sepia",
      icon: "pi pi-palette",
      command: () => {
        var pageWallpapers = document.getElementById("root");

        if (pageWallpapers.style.filter == "sepia(100%)") {
          pageWallpapers.style.filter = "unset";
        } else {
          pageWallpapers.style.filter = "sepia(100%)";
        }
      },
    },
    {
      label: "Blur",
      icon: "pi pi-eye-slash",
      command: () => {
        var pageWallpapers = document.getElementById("root");

        if (pageWallpapers.style.filter == "blur(2px)") {
          pageWallpapers.style.filter = "unset";
        } else {
          pageWallpapers.style.filter = "blur(2px)";
        }
      },
    },
    {
      label: "Less saturation",
      icon: "pi pi-moon",
      command: () => {
        var pageWallpapers = document.getElementById("root");

        if (pageWallpapers.style.filter == "saturate(0.5)") {
          pageWallpapers.style.filter = "unset";
        } else {
          pageWallpapers.style.filter = "saturate(0.5)";
        }
      },
    },
    {
      label: "Italic font style",
      icon: "pi pi-info",
      command: () => {
        var pageWallpapers = document.getElementById("root");

        if (pageWallpapers.style.fontStyle == "italic") {
          pageWallpapers.style.fontStyle = "unset";
        } else {
          pageWallpapers.style.fontStyle = "italic";
        }
      },
    },
    {
      label: "Refresh",
      icon: "pi pi-refresh",
      command: () => {
        var pageWallpapers = document.getElementById("root");

        pageWallpapers.style.filter = "unset";
        pageWallpapers.style.fontStyle = "unset";
      },
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "absolute",
        bottom: "0px",
        width: "100%",
        backgroundColor: "lavender",
        boxShadow: "inset 0 4px 6px rgb(0 0 0 / 18%)",
        padding: "10px",
      }}
    >
      <StyledSpeedDial style={{ display: "flex" }}>
        <StyledLabel>Accessibility options:</StyledLabel>
        <div>
          <Tooltip target=".speed-dial .p-speeddial-action" position="top" />
          <SpeedDial
            model={items}
            direction="right"
            transitionDelay={80}
            showIcon="pi pi-users"
            hideIcon="pi pi-times"
            className="speed-dial"
            buttonClassName="access-button p-button-outlined"
            // buttonStyle={{ width: "auto", height: "100%", padding: "5px" }}
          />
        </div>
      </StyledSpeedDial>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <StyledLabel>Visit out social media pages:</StyledLabel>
        {renderImage(
          "https://www.freepnglogos.com/uploads/facebook-logo-13.png",
          "https://www.facebook.com/"
        )}
        {renderImage(
          "https://www.freepnglogos.com/uploads/instagram-logos-png-images-free-download-5.png",
          "https://www.instagram.com/"
        )}
        {renderImage(
          "https://www.freepnglogos.com/uploads/linkedin-logo-design-30.png",
          "https://www.linkedin.com/feed/"
        )}
      </div>
    </div>
  );
};

export default Footer;
