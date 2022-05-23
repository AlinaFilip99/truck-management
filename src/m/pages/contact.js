import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import axios from "axios";
import AppLayout from "../base/Layout";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const toast = useRef(null);

  const sendContact = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://formspree.io/f/xeqnldol",
      data: {
        name: name,
        email: email,
        message: message,
        subject: subject,
      },
    })
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Thank you, your message has been submitted.",
          life: 3000,
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.response.data.error,
          life: 3000,
        });
      });
  };

  const cardFooter = (
    <span>
      <Button label="Submit" onClick={sendContact} />
    </span>
  );

  return (
    <AppLayout>
      <Toast ref={toast} />
      <div
        style={{
          textAlign: "-webkit-center",
          marginTop: "50px",
          // height: "calc(100vh - 64px - 58px)",
        }}
      >
        <Card
          title="Contact form"
          style={{ width: "50%", marginBottom: "2em", minWidth: "400px" }}
          footer={cardFooter}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="p-float-label" style={{ width: "49%" }}>
              <InputText
                style={{ width: "100%" }}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="p-float-label" style={{ width: "49%" }}>
              <InputText
                style={{ width: "100%" }}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div
            className="p-float-label"
            style={{ width: "70%", marginTop: "15px", marginRight: "auto" }}
          >
            <InputText
              style={{ width: "100%" }}
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label htmlFor="subject">Subject</label>
          </div>
          <div className="p-float-label" style={{ marginTop: "15px" }}>
            <InputTextarea
              style={{ width: "100%" }}
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              cols={91}
              autoResize
            />
            <label htmlFor="message">Message</label>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ContactPage;
