import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import tripService from "../../services/tripService";
import clientService from "../../services/clientService";
import TripTimeline from "../base/TripTimeline";
import styled from "styled-components";
import LocationMap from "../base/LocationMap";

const StyledErrorMessage = styled.span`
  color: red;
`;

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
  const [datesSelected, setDatesSelected] = useState(false);
  const [availableUsers, setAvailableUsers] = useState(users);
  const [numberOfPauses, setNumberOfPauses] = useState(0);
  const [validDates, setValidDates] = useState(true);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const getAvailableUsers = async () => {
      if (startDate && endDate) {
        let currentUserId = localStorage.getItem("CurrentUserId");
        if (currentUserId) {
          setDatesSelected(true);

          let result = await clientService.getAvailableUsers(
            currentUserId,
            startDate
              .toLocaleString()
              .replaceAll("/", "%2F")
              .replaceAll(",", "%2C")
              .replaceAll(":", "%3A"),
            endDate
              .toLocaleString()
              .replaceAll("/", "%2F")
              .replaceAll(",", "%2C")
              .replaceAll(":", "%3A")
          );

          setAvailableUsers(result);
          if (!showUsers) {
            let existentUser = result.find((x) => x.userId === userId);
            if (!existentUser) {
              setValidDates(false);
            } else {
              setValidDates(true);
            }
          }
        }
      }
    };
    getAvailableUsers();

    //eslint-disable-next-line
  }, [startDate, endDate]);

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
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={saveTrip}
          autoFocus
          disabled={!validDates}
        />
      </div>
    );
  };

  const updateEndDate = () => {
    if (startDate && duration) {
      var dateMillis = startDate.getTime();

      //JavaScript doesn't have a "time period" object, so I'm assuming you get it as a string
      var timePeriod = duration.toLocaleTimeString("it-IT"); //I assume this is 15 minutes, so the format is HH:MM:SS

      var parts = timePeriod.split(/:/);
      var timePeriodMillis =
        parseInt(parts[0], 10) * 60 * 60 * 1000 +
        parseInt(parts[1], 10) * 60 * 1000 +
        parseInt(parts[2], 10) * 1000;
      var drivingPeriodMillis = 4 * 60 * 60 * 1000 + 30 * 60 * 1000;

      let numberPauses = parseInt(
        timePeriodMillis / drivingPeriodMillis - 1,
        10
      );
      setNumberOfPauses(numberPauses);

      if (numberPauses >= 0) {
        timePeriodMillis = timePeriodMillis + numberPauses * 45 * 60 * 1000;
      }

      // if (parseInt(parts[0], 10) === 13) {
      //   timePeriodMillis = timePeriodMillis + 11 * 60 * 60 * 1000;
      // }

      var newDate = new Date();
      newDate.setTime(dateMillis + timePeriodMillis);

      setEndDate(newDate);
    } else {
      setEndDate("");
      setNumberOfPauses(0);
    }
  };

  const setAddress = (data) => {
    setCountry(data.country || "");
    setRegion(data.region || "");
    setCity(data.locality || "");
    setStreet(data.street || "");
    let moreInfo = "";
    if (data.number) {
      moreInfo = `street number ${data.number}, `;
    }
    if (data.name) {
      moreInfo = moreInfo + data.name;
    }
    setMore(moreInfo);
  };

  return (
    <Dialog
      header="Add new trip"
      visible={visible}
      onHide={onHide}
      breakpoints={{ "960px": "75vw" }}
      style={{ width: "50vw", height: "fit-content" }}
      footer={renderFooter}
    >
      <div className="grid">
        <div className={startDate && endDate ? "col-4" : "col-6"}>
          <span className="p-float-label mt-4" style={{ marginBottom: "20px" }}>
            <Calendar
              id="startDate"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.value);
              }}
              onHide={updateEndDate}
              showTime
              // hourFormat="12"
              maxDate={endDate}
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
              onHide={updateEndDate}
              timeOnly
              showSeconds
              stepMinute={1}
            />
            <label htmlFor="duration">Duration</label>
          </span>
          {numberOfPauses > 0 && (
            <span>
              In this trip there will be {numberOfPauses}{" "}
              {numberOfPauses > 1 ? "stops" : "stop"}!
            </span>
          )}
          <span className="p-float-label mt-4" style={{ marginBottom: "20px" }}>
            <Calendar
              id="endDate"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.value);
              }}
              minDate={startDate}
              onHide={() => {
                if (duration && endDate) {
                  var dateMillis = endDate.getTime();

                  //JavaScript doesn't have a "time period" object, so I'm assuming you get it as a string
                  var timePeriod = duration.toLocaleTimeString("it-IT"); //I assume this is 15 minutes, so the format is HH:MM:SS

                  var parts = timePeriod.split(/:/);
                  var timePeriodMillis =
                    parseInt(parts[0], 10) * 60 * 60 * 1000 +
                    parseInt(parts[1], 10) * 60 * 1000 +
                    parseInt(parts[2], 10) * 1000;
                  var drivingPeriodMillis = 4 * 60 * 60 * 1000 + 30 * 60 * 1000;

                  let numberPauses = parseInt(
                    timePeriodMillis / drivingPeriodMillis - 1,
                    10
                  );
                  setNumberOfPauses(numberPauses);

                  if (numberPauses >= 0) {
                    timePeriodMillis =
                      timePeriodMillis + numberPauses * 45 * 60 * 1000;
                  }

                  var newDate = new Date();
                  newDate.setTime(dateMillis - timePeriodMillis);

                  setStartDate(newDate);
                } else {
                  setStartDate("");
                  setNumberOfPauses(0);
                }
              }}
              showTime
              // hourFormat="12"
              showIcon
            />
            <label htmlFor="endDate">End date</label>
          </span>
          {!showUsers && !validDates && (
            <StyledErrorMessage>Invalid dates!</StyledErrorMessage>
          )}
          <span className="p-float-label mt-4">
            <InputText
              style={{ width: "100%" }}
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <label htmlFor="country">Country</label>
          </span>
          {showUsers && datesSelected && (
            <span className="p-float-label mt-4" style={{ marginTop: "20px" }}>
              <Dropdown
                style={{ width: "100%" }}
                id="users"
                value={selectedUser}
                options={availableUsers}
                onChange={(e) => setSelectedUser(e.target.value)}
                optionLabel="userName"
                optionValue="userId"
              />
              <label htmlFor="users">Users</label>
            </span>
          )}
        </div>
        <div className={startDate && endDate ? "col-4" : "col-6"}>
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
          <span
            className="p-float-label mt-4"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <InputText
              style={{ width: "100%" }}
              id="more"
              value={more}
              onChange={(e) => setMore(e.target.value)}
            />
            <label htmlFor="more">More info</label>
          </span>
          <span style={{ marginTop: "20px" }}>
            <Button
              className="p-button-text"
              icon="pi pi-map-marker"
              onClick={() => {
                setShowMap(true);
              }}
              label="Choose on map"
            />
          </span>
        </div>
        {startDate && endDate && (
          <div className="col-4">
            <TripTimeline
              startDate={startDate}
              endDate={endDate}
              duration={duration}
            />
          </div>
        )}
      </div>
      <Dialog
        visible={showMap}
        onHide={() => {
          setShowMap(false);
        }}
        style={{ width: "90vh" }}
        footer={
          <div>
            <Button
              label="Done"
              icon="pi pi-check"
              onClick={() => setShowMap(false)}
            />
          </div>
        }
      >
        <LocationMap isSelectable={true} setAddressInfo={setAddress} />
      </Dialog>
    </Dialog>
  );
};

export default AddTrip;
