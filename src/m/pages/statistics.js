import React, { useState, useEffect } from "react";
import AppLayout from "../base/Layout";
import { Card } from "primereact/card";
import clientService from "../../services/clientService";
import tripService from "../../services/tripService";

const Statistics = () => {
  const [trucks, setTrucks] = useState([]);
  const [trips, setTrips] = useState([]);
  const [averageTime, setAverageTime] = useState("");

  useEffect(() => {
    const loadData = async () => {
      let userId = localStorage.getItem("CurrentUserId");
      if (userId) {
        let resultTrucks = await clientService.getTruckAccounts(userId);
        if (resultTrucks) {
          setTrucks(resultTrucks);
        }
        let resultTrips = await tripService.getAll(userId);
        if (resultTrips) {
          setTrips(resultTrips);
        }

        let resultTime = getAverageTime(
          resultTrips.map((x) => {
            return x.duration;
          })
        );
        setAverageTime(resultTime);
      }
    };
    loadData();
  }, []);

  const getAverageTime = (times) => {
    var count = times.length;
    var timesInSeconds = [];
    // loop through times
    for (var i = 0; i < count; i++) {
      // parse
      var pieces = times[i].split(":");
      var ampm = pieces[2].split(" ");
      var hrs = Number(pieces[0]);
      var mins = Number(pieces[1]);
      var secs = Number(ampm[0]);
      // find value in seconds of time
      var totalSecs = hrs * 60 * 60;
      totalSecs += mins * 60;
      totalSecs += secs;
      // add to array
      timesInSeconds[i] = totalSecs;
    }
    // find average timesInSeconds
    var total = 0;
    console.log(timesInSeconds);
    for (var j = 0; j < count; j++) {
      total = total + Number(timesInSeconds[j]);
    }
    var avg = Math.round(total / count);
    console.log("avg secs: " + avg);
    // turn seconds back into a time
    var avgMins = Math.floor(avg / 60);
    var avgSecs = avg - 60 * avgMins;
    var avgHrs = Math.floor(avgMins / 60);
    console.log("hours: " + avgHrs);
    avgMins = avgMins - 60 * avgHrs;
    // add leading zeros for seconds, minutes
    avgSecs = ("0" + avgSecs).slice(-2);
    avgMins = ("0" + avgMins).slice(-2);

    return avgHrs + ":" + avgMins + ":" + avgSecs;
  };

  return (
    <AppLayout>
      <div
        style={{
          width: "76%",
          minWidth: "760px",
          display: "inline-block",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <Card>
          <>statistics</>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Statistics;
