import React, { useEffect, useState } from "react";
import { Timeline } from "primereact/timeline";

const TripTimeline = ({ startDate, duration, setEndTime, setPauses }) => {
  const [tripEvents, setTripEvents] = useState([]);

  useEffect(() => {
    if (startDate && duration) {
      let start = new Date(startDate);
      let end = new Date();
      let events = [
        {
          status: "Drive",
          date: `${
            start.getMonth() + 1
          }/${start.getDate()} ${start.getHours()}:${start.getMinutes()}`,
        },
      ];

      var timePeriod = duration;

      var parts = timePeriod.split(/:/);
      var timePeriodMillis =
        parseInt(parts[0], 10) * 60 * 60 * 1000 +
        parseInt(parts[1], 10) * 60 * 1000 +
        parseInt(parts[2], 10) * 1000;

      if (timePeriodMillis <= 4 * 60 * 60 * 1000 + 30 * 60 * 1000) {
        start.setTime(start.getTime() + timePeriodMillis);
        end.setTime(start.getTime());
        events.push({
          status: "Arrive",
          date: `${
            end.getMonth() + 1
          }/${end.getDate()} ${end.getHours()}:${end.getMinutes()}`,
        });
        setEndTime && setEndTime(end);
        setTripEvents(events);
        return;
      }

      let drivingHours;
      let prevDay = start.getDate();
      let pauses = 0;

      while (timePeriodMillis - (4 * 60 * 60 * 1000 + 30 * 60 * 1000) > 0) {
        start.setHours(start.getHours() + 4);
        start.setMinutes(start.getMinutes() + 30);
        timePeriodMillis =
          timePeriodMillis - (4 * 60 * 60 * 1000 + 30 * 60 * 1000);

        if (start.getDate() === prevDay) {
          drivingHours = drivingHours + 4.5;
        } else {
          drivingHours = 0;
          prevDay = start.getDate();
        }

        events.push({
          status: "Pause",
          date: `${
            start.getMonth() + 1
          }/${start.getDate()} ${start.getHours()}:${start.getMinutes()}`,
        });
        pauses++;

        if (drivingHours >= 9) {
          start.setHours(start.getHours() + 11);
        } else {
          start.setMinutes(start.getMinutes() + 45);
        }

        events.push({
          status: "Drive",
          date: `${
            start.getMonth() + 1
          }/${start.getDate()} ${start.getHours()}:${start.getMinutes()}`,
        });
      }
      start.setTime(start.getTime() + timePeriodMillis);
      end.setTime(start.getTime());

      events.push({
        status: "Arrive",
        date: `${
          end.getMonth() + 1
        }/${end.getDate()} ${end.getHours()}:${end.getMinutes()}`,
      });
      setEndTime && setEndTime(end);
      setTripEvents(events);
      setPauses && setPauses(pauses);
    }
    //eslint-disable-next-line
  }, [startDate, duration]);

  return (
    <>
      <Timeline
        value={tripEvents}
        align="alternate"
        opposite={(item) => item.date}
        content={(item) => item.status}
      />
    </>
  );
};

export default TripTimeline;
