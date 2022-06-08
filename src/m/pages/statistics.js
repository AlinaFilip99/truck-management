import React, { useState, useEffect } from "react";
import AppLayout from "../base/Layout";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import clientService from "../../services/clientService";
import tripService from "../../services/tripService";
import styled from "styled-components";

const StyledLabel = styled.div`
  color: darkgray;
  font-size: smaller;
`;

const StyledStatisticLabel = styled.div`
  font-weight: 500;
  padding-bottom: 5px;
  color: dimgray;
`;

const StyledNumber = styled.div`
  color: dimgrey;
  font-size: x-large;
`;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  .card-title {
    text-align: start;
    color: #a3a0d2;
  }
`;

const Statistics = () => {
  const [trucks, setTrucks] = useState([]);
  const [trips, setTrips] = useState([]);
  const [averageTime, setAverageTime] = useState("");
  const [trucksTripData, setTrucksTripData] = useState();

  const [tripsPerDayData, setTripsPerDayData] = useState();

  const [doneInTimeData, setDoneInTimeData] = useState();

  const basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  const lightOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
        position: "bottom",
      },
    },
  };

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

        let finishedTrips = resultTrips.filter((x) => x.isFinished === true);

        let resultTime = getAverageTime(
          finishedTrips.map((x) => {
            return x.duration;
          })
        );
        setAverageTime(resultTime);

        getTrucksTripData(resultTrucks, resultTrips);
        getTripsPerDayData(resultTrips);
        getDoneInTimeData(resultTrips);
      }
    };
    loadData();
    //eslint-disable-next-line
  }, []);

  const getAverageTime = (times) => {
    var count = times.length;
    if (count === 0) {
      return "";
    }
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

    let timeString = "";
    if (avgHrs && avgHrs !== 0) {
      timeString = timeString + avgHrs + "h";
    }
    if (avgMins && avgMins !== "00") {
      timeString = timeString + " " + avgMins + "m";
    }
    if (avgSecs && avgSecs !== "00") {
      timeString = timeString + " " + avgSecs + "s";
    }

    return timeString;
  };

  const getTrucksTripData = (resultTrucks, resultTrips) => {
    let totalShipments = [];
    let totalFinishedShipments = [];
    let totalUnfinishedShipments = [];
    resultTrucks.forEach((truck) => {
      totalShipments.push(
        resultTrips.filter((x) => x.userId === truck.userId).length
      );
    });

    resultTrucks.forEach((truck) => {
      totalFinishedShipments.push(
        resultTrips.filter(
          (x) => x.userId === truck.userId && x.isFinished === true
        ).length
      );
    });

    resultTrucks.forEach((truck) => {
      totalUnfinishedShipments.push(
        resultTrips.filter(
          (x) => x.userId === truck.userId && x.isFinished === false
        ).length
      );
    });

    let trucksTripDataChart = {
      labels: resultTrucks.map((x) => {
        return x.userName;
      }),
      datasets: [
        {
          label: "Finished shipments",
          backgroundColor: "#a58ef1", //#bdbdf7",
          data: totalFinishedShipments,
        },
        {
          label: "Unfinished shipments",
          backgroundColor: "#f18e92", //#f7bdc8",
          data: totalUnfinishedShipments,
        },
        {
          label: "Total shipments",
          backgroundColor: "#8ea8f1", //#bdccf7",
          data: totalShipments,
        },
      ],
    };

    setTrucksTripData(trucksTripDataChart);
  };

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const getTripsPerDayData = (resultTrips) => {
    let tripsPerStartDate = [];
    let startDates = resultTrips
      .map((x) => {
        return x.startDateTime.split(",")[0];
      })
      .filter(onlyUnique);

    startDates.forEach((date) => {
      tripsPerStartDate.push(
        resultTrips.filter((x) => x.startDateTime.split(",")[0] === date).length
      );
    });

    let tripsPerDayChartData = {
      labels: startDates,
      datasets: [
        {
          label: "Shipments started per day",
          data: tripsPerStartDate,
          fill: false,
          borderColor: "#7192f0", //#42A5F5",
          tension: 0.4,
        },
      ],
    };

    setTripsPerDayData(tripsPerDayChartData);
  };

  const getDoneInTimeData = (resultTrips) => {
    let finishedTrips = resultTrips.filter((x) => x.isFinished === true);
    let finishedOnTime = finishedTrips.filter((x) => x.isDoneInTime === true);
    let doneInTimeChartData = {
      labels: ["Done in time", "Done late"],
      datasets: [
        {
          data: [
            finishedOnTime.length,
            finishedTrips.length - finishedOnTime.length,
          ],
          backgroundColor: ["#f1e368", "#36A2EB"],
          hoverBackgroundColor: ["#f1e368", "#36A2EB"],
        },
      ],
    };
    console.log(doneInTimeChartData);
    setDoneInTimeData(doneInTimeChartData);
  };

  const renderStatisticNumber = (data, icon, label) => {
    return (
      <>
        <StyledNumber>{data}</StyledNumber>
        <StyledLabel>
          {icon} {label}
        </StyledLabel>
      </>
    );
  };

  return (
    <AppLayout>
      <div
        style={{
          width: "76%",
          //   minWidth: "760px",
          display: "inline-block",
          marginTop: "20px",
          // marginBottom: "40px",
        }}
      >
        <StyledCard
          title={<div className="card-title">General shipments info</div>}
        >
          <div className="grid">
            <div className="col-9" style={{ paddingBottom: "unset" }}>
              <div className="grid" style={{ height: "100%" }}>
                {averageTime && (
                  <div className="col-12">
                    {renderStatisticNumber(
                      averageTime,
                      <i className="pi pi-clock" />,
                      "average time"
                    )}
                  </div>
                )}
                <div className="col-6">
                  {renderStatisticNumber(
                    trips.filter((x) => x.isFinished === true).length,
                    <i className="pi pi-send" />,
                    "shipments finished"
                  )}
                </div>
                <div className="col-6">
                  {renderStatisticNumber(
                    trucks.length,
                    <i className="pi pi-car" />,
                    "trucks assigned"
                  )}
                </div>
              </div>
            </div>
            <div className="col-3">
              {doneInTimeData && (
                <>
                  <StyledStatisticLabel style={{ float: "left" }}>
                    Un/finished on time:
                  </StyledStatisticLabel>
                  <Chart
                    type="doughnut"
                    data={doneInTimeData}
                    options={lightOptions}
                    style={{
                      position: "relative",
                      width: "70%",
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </StyledCard>
        <StyledCard
          title={<div className="card-title">Trucks shipments info</div>}
        >
          {trucksTripData && (
            <div>
              <Chart type="bar" data={trucksTripData} options={basicOptions} />
            </div>
          )}
        </StyledCard>
        <StyledCard
          title={<div className="card-title">Number of shipments in time</div>}
        >
          {tripsPerDayData && (
            <div>
              <Chart
                type="line"
                data={tripsPerDayData}
                options={basicOptions}
              />
            </div>
          )}
        </StyledCard>
      </div>
    </AppLayout>
  );
};

export default Statistics;
