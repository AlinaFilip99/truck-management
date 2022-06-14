import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import TripTimeline from "../base/TripTimeline";
import tripService from "../../services/tripService";
import styled from "styled-components";
import clientService from "../../services/clientService";
import LocationMap from "../base/LocationMap";

const StyledErrorMessage = styled.span`
  color: red;
`;

const EditTrip = ({
  visible,
  onHide,
  reload,
  trip,
  showUsers,
  users,
  showAll,
}) => {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [more, setMore] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [numberOfPauses, setNumberOfPauses] = useState(0);
  const [validDates, setValidDates] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [initialStartDate, setInitialStartDate] = useState("");
  const [initialEndDate, setInitialEndDate] = useState("");

  useEffect(() => {
    const getAvailableUsers = async () => {
      if (selectedUser) {
        let currentUserId = localStorage.getItem("CurrentUserId");
        if (currentUserId) {
          try {
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

            let existentUser = result.find((x) => x.userId === selectedUser);
            if (
              existentUser ||
              (startDate >= initialStartDate && endDate <= initialEndDate)
            ) {
              setValidDates(true);
            } else {
              setValidDates(false);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    };
    getAvailableUsers();
    //eslint-disable-next-line
  }, [selectedUser, startDate, endDate]);

  useEffect(() => {
    if (trip) {
      setCountry(trip.country);
      setRegion(trip.region);
      setCity(trip.city);
      setStreet(trip.street);
      setMore(trip.moreAddress);
      let duration = new Date();
      let numbers = trip.duration.split(":");
      duration.setHours(
        parseInt(numbers[0]),
        parseInt(numbers[1]),
        parseInt(numbers[2])
      );
      setDuration(duration);
      setStartDate(new Date(trip.startDateTime));
      setEndDate(new Date(trip.endDateTime));
      setInitialStartDate(new Date(trip.startDateTime));
      setInitialEndDate(new Date(trip.endDateTime));
      setSelectedUser(trip.userId);
    }
    //eslint-disable-next-line
  }, [trip]);

  const saveTrip = () => {
    tripService
      .editTrip({
        tripId: trip.tripId,
        userId: showUsers ? selectedUser : trip.userId,
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
      header="Edit trip"
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
              showTime
              showIcon
              maxDate={endDate}
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
              disabled={!showAll}
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
              disabled={!showAll}
              showTime
              showIcon
            />
            <label htmlFor="endDate">End date</label>
          </span>
          {!validDates && (
            <StyledErrorMessage>Invalid dates!</StyledErrorMessage>
          )}
          {showAll && (
            <>
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
                <span
                  className="p-float-label mt-4"
                  style={{ marginTop: "20px" }}
                >
                  <Dropdown
                    style={{ width: "100%" }}
                    id="users"
                    value={selectedUser}
                    options={users}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    optionLabel="userName"
                    optionValue="userId"
                  />
                  <label htmlFor="users">Users</label>
                </span>
              )}
            </>
          )}
        </div>
        {showAll && (
          <>
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
              <span
                className="p-float-label mt-4"
                style={{ marginTop: "20px" }}
              >
                <InputText
                  style={{ width: "100%" }}
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <label htmlFor="city">City</label>
              </span>
              <span
                className="p-float-label mt-4"
                style={{ marginTop: "20px" }}
              >
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
          </>
        )}
        {startDate && endDate && (
          <div className="col-4">
            <TripTimeline
              startDate={startDate}
              duration={duration.toLocaleTimeString("it-IT")}
              setEndTime={setEndDate}
              setPauses={setNumberOfPauses}
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

export default EditTrip;
