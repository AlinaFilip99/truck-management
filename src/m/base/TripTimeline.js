import React, { useEffect, useState } from "react";
import { Timeline } from "primereact/timeline";

const TripTimeline = ({ startDate, endDate, duration }) => {
  const [tripEvents, setTripEvents] = useState([]);

  useEffect(() => {
    if (startDate && endDate && duration) {
      let start = new Date(startDate);
      let end = new Date(endDate);
      let tripDuration = new Date(duration);
      let events = [
        {
          status: "Drive",
          date: `${
            start.getMonth() + 1
          }/${start.getDate()} ${start.getHours()}:${start.getMinutes()}`,
        },
      ];

      if (tripDuration.getHours() === 4 && tripDuration.getMinutes() === 30) {
        events.push({
          status: "Arrive",
          date: `${
            end.getMonth() + 1
          }/${end.getDate()} ${end.getHours()}:${end.getMinutes()}`,
        });
        setTripEvents(events);
        return;
      }

      var drivingPeriodMillis = 4 * 60 * 60 * 1000 + 30 * 60 * 1000;
      //   var maxDrivingPeriodMillis = 13 * 60 * 60 * 1000;
      //   let totalPeriodMillis = 0;
      while (
        start < end &&
        end.getTime() - start.getTime() > drivingPeriodMillis
      ) {
        // let isLongPause = true;
        start.setHours(start.getHours() + 4);

        // totalPeriodMillis = totalPeriodMillis + 4 * 60 * 60 * 1000;
        // if (totalPeriodMillis !== maxDrivingPeriodMillis) {
        start.setMinutes(start.getMinutes() + 30);
        //   totalPeriodMillis = totalPeriodMillis + 30 * 60 * 1000;
        //   isLongPause = false;
        // }

        events.push({
          status: "Pause",
          date: `${
            start.getMonth() + 1
          }/${start.getDate()} ${start.getHours()}:${start.getMinutes()}`,
        });
        // if (isLongPause) {
        //   start.setHours(start.getHours() + 11);
        // } else {
        start.setMinutes(start.getMinutes() + 45);
        // }

        events.push({
          status: "Drive",
          date: `${
            start.getMonth() + 1
          }/${start.getDate()} ${start.getHours()}:${start.getMinutes()}`,
        });
      }

      events.push({
        status: "Arrive",
        date: `${
          end.getMonth() + 1
        }/${end.getDate()} ${end.getHours()}:${end.getMinutes()}`,
      });
      setTripEvents(events);
    }
    //eslint-disable-next-line
  }, [startDate, endDate]);

  return (
    <>
      <Timeline
        value={tripEvents}
        // layout="horizontal"
        align="alternate"
        opposite={(item) => item.date}
        content={(item) => item.status}
      />
    </>
  );
};

export default TripTimeline;
