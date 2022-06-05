import React from "react";
import { Dialog } from "primereact/dialog";

const ViewTrip = ({ visible, onHide }) => {
  return (
    <Dialog
      header="Add new trip"
      visible={visible}
      onHide={onHide}
      breakpoints={{ "960px": "75vw" }}
      style={{ width: "50vw" }}
      //   footer={renderFooter}
    >
      {/* <div className="grid">
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
            {startDate && endDate && (
              <div className="col-4">
                <TripTimeline
                  startDate={startDate}
                  endDate={endDate}
                  duration={duration}
                />
              </div>
            )}
          </div> */}
    </Dialog>
  );
};

export default ViewTrip;
