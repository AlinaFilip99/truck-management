import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import tripService from "../../services/tripService";

const AddTrip = ({ visible, onHide, reload, userId, showUsers, users }) => {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [more, setMore] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const saveTrip = () => {
    tripService
      .saveTrip({
        userId: showUsers ? selectedUser : userId,
        country: country,
        region: region,
        city: city,
        street: street,
        moreAddress: more,
        duration: duration.toLocaleTimeString("it-IT"),
        startDateTime: startDate.toLocaleString(),
        endDateTime: endDate.toLocaleString(),
      })
      .then((data) => {
        setCountry("");
        setRegion("");
        setCity("");
        setStreet("");
        setMore("");
        setDuration("");
        setStartDate("");
        setEndDate("");
        onHide();
        reload();
      });
  };

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={onHide}
          className="p-button-text"
        />
        <Button label="Save" icon="pi pi-check" onClick={saveTrip} autoFocus />
      </div>
    );
  };
  return (
    <Dialog
      header="Add new trip"
      visible={visible}
      onHide={onHide}
      breakpoints={{ "960px": "75vw" }}
      style={{ width: "50vw" }}
      footer={renderFooter}
    >
      <div
        className="p-d-flex p-jc-between"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5px",
        }}
      >
        <div className="col-5" style={{ marginRight: "20px", width: "48%" }}>
          <span className="p-float-label mt-4" style={{ marginBottom: "20px" }}>
            <Calendar
              id="startDate"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.value);
              }}
              showTime
              hourFormat="12"
              showIcon
            />
            <label htmlFor="startDate">Start date</label>
          </span>
          <span className="p-float-label mt-4" style={{ marginBottom: "20px" }}>
            <Calendar
              id="duration"
              style={{ width: "100%" }}
              value={duration}
              onChange={(e) => {
                setDuration(e.value);
              }}
              onHide={() => {
                if (startDate) {
                  var dateMillis = startDate.getTime();

                  //JavaScript doesn't have a "time period" object, so I'm assuming you get it as a string
                  var timePeriod = duration.toLocaleTimeString("it-IT"); //I assume this is 15 minutes, so the format is HH:MM:SS

                  var parts = timePeriod.split(/:/);
                  var timePeriodMillis =
                    parseInt(parts[0], 10) * 60 * 60 * 1000 +
                    parseInt(parts[1], 10) * 60 * 1000 +
                    parseInt(parts[2], 10) * 1000;

                  var newDate = new Date();
                  newDate.setTime(dateMillis + timePeriodMillis);

                  setEndDate(newDate);
                }
              }}
              timeOnly
              showSeconds
              stepMinute={1}
            />
            <label htmlFor="duration">Duration</label>
          </span>
          <span className="p-float-label mt-4" style={{ marginBottom: "20px" }}>
            <Calendar
              id="endDate"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.value);
              }}
              showTime
              hourFormat="12"
              showIcon
            />
            <label htmlFor="endDate">End date</label>
          </span>
          <span className="p-float-label mt-4">
            <InputText
              style={{ width: "100%" }}
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <label htmlFor="country">Country</label>
          </span>
          {showUsers && (
            <span className="p-float-label mt-4" style={{ marginTop: "20px" }}>
              <Dropdown
                style={{ width: "100%" }}
                id="users"
                value={selectedUser}
                options={users}
                onChange={(e) => setSelectedUser(e.target.value)}
                optionLabel="userName"
                optionValue="id"
              />
              <label htmlFor="users">Users</label>
            </span>
          )}
        </div>
        <div className="col-5" style={{ width: "48%" }}>
          <span className="p-float-label mt-4">
            <InputText
              style={{ width: "100%" }}
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
            <label htmlFor="region">Region</label>
          </span>
          <span className="p-float-label mt-4" style={{ marginTop: "20px" }}>
            <InputText
              style={{ width: "100%" }}
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="city">City</label>
          </span>
          <span className="p-float-label mt-4" style={{ marginTop: "20px" }}>
            <InputText
              style={{ width: "100%" }}
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <label htmlFor="street">Street</label>
          </span>
          <span className="p-float-label mt-4" style={{ marginTop: "20px" }}>
            <InputText
              style={{ width: "100%" }}
              id="more"
              value={more}
              onChange={(e) => setMore(e.target.value)}
            />
            <label htmlFor="more">More info</label>
          </span>
        </div>
      </div>
    </Dialog>
  );
};

export default AddTrip;
