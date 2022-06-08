import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import TripTimeline from "../base/TripTimeline";
import styled from "styled-components";
import LocationMap from "../base/LocationMap";
import { Button } from "primereact/button";

const StyledLabel = styled.div`
  font-weight: 500;
  padding-bottom: 5px;
`;

const ViewTrip = ({ visible, onHide, data }) => {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (data) {
      setTrip(data);
    }
  }, [data]);

  return (
    <Dialog
      header={`Shipment #${trip?.tripId}`}
      visible={visible}
      onHide={onHide}
      breakpoints={{ "960px": "75vw" }}
      style={{ width: "50vw", height: "fit-content" }}
    >
      {trip && (
        <div className="grid">
          <div className="col-6">
            <div className="grid">
              <div className="col-6">
                <StyledLabel>Leave:</StyledLabel>
                <div>{trip.startDateTime}</div>
              </div>
              <div className="col-6">
                <StyledLabel>Arrive:</StyledLabel>
                <div>{trip.endDateTime}</div>
              </div>
              <div className="col-12">
                <StyledLabel>Driving for:</StyledLabel>
                <div>{trip.duration}</div>
              </div>
              <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                  <StyledLabel>Destination:</StyledLabel>
                  <div>
                    <Button
                      label="See it on maps"
                      className="p-button-link"
                      icon="pi pi-external-link"
                      iconPos="right"
                      onClick={() =>
                        window.open(
                          `http://maps.google.com/?q=${
                            trip.street +
                            ", " +
                            trip.moreAddress +
                            ", " +
                            trip.city +
                            ", " +
                            trip.region +
                            ", " +
                            trip.country
                          }`
                        )
                      }
                    />
                  </div>
                </div>
                <div>
                  {trip.street +
                    ", " +
                    trip.moreAddress +
                    ", " +
                    trip.city +
                    ", " +
                    trip.region +
                    ", " +
                    trip.country}
                </div>
              </div>
              <div className="col-12">
                <LocationMap
                  destination={
                    trip.street +
                    " " +
                    trip.city +
                    " " +
                    trip.region +
                    " " +
                    trip.country
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <StyledLabel>Timeline:</StyledLabel>
            <TripTimeline
              startDate={trip.startDateTime}
              endDate={trip.endDateTime}
              duration={trip.duration}
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default ViewTrip;
