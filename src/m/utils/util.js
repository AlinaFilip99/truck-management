export const getEndDate = (startDate, duration) => {
  // if (!(startDate || durationString)) {
  //   return null;
  // }
  // let duration = new Date();
  // let numbers = durationString.split(":");
  // duration.setHours(
  //   parseInt(numbers[0]),
  //   parseInt(numbers[1]),
  //   parseInt(numbers[2])
  // );

  // var dateMillis = startDate.getTime();

  // //JavaScript doesn't have a "time period" object, so I'm assuming you get it as a string
  // var timePeriod = duration.toLocaleTimeString("it-IT"); //I assume this is 15 minutes, so the format is HH:MM:SS

  // var parts = timePeriod.split(/:/);
  // var timePeriodMillis =
  //   parseInt(parts[0], 10) * 60 * 60 * 1000 +
  //   parseInt(parts[1], 10) * 60 * 1000 +
  //   parseInt(parts[2], 10) * 1000;
  // var drivingPeriodMillis = 4 * 60 * 60 * 1000 + 30 * 60 * 1000;

  // let numberPauses = parseInt(
  //   timePeriodMillis / drivingPeriodMillis - 1 > 0
  //     ? timePeriodMillis / drivingPeriodMillis - 1
  //     : 0,
  //   10
  // );

  // if (numberPauses >= 0) {
  //   timePeriodMillis = timePeriodMillis + numberPauses * 45 * 60 * 1000;
  // }

  // var newDate = new Date();
  // newDate.setTime(dateMillis + timePeriodMillis);

  // return { date: newDate, pauses: numberPauses };

  if (startDate && duration) {
    let start = new Date(startDate);
    let end = new Date();
    let tripDuration = new Date(duration);

    var timePeriod = tripDuration.toLocaleTimeString("it-IT"); //I assume this is 15 minutes, so the format is HH:MM:SS

    var parts = timePeriod.split(/:/);
    var timePeriodMillis =
      parseInt(parts[0], 10) * 60 * 60 * 1000 +
      parseInt(parts[1], 10) * 60 * 1000 +
      parseInt(parts[2], 10) * 1000;

    if (tripDuration.getHours() === 4 && tripDuration.getMinutes() === 30) {
      start.setTime(start.getTime() + timePeriodMillis);
      end.setTime(start.getTime());
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

      pauses++;

      if (drivingHours >= 9) {
        start.setHours(start.getHours() + 11);
      } else {
        start.setMinutes(start.getMinutes() + 45);
      }
    }
    start.setTime(start.getTime() + timePeriodMillis);
    end.setTime(start.getTime());

    return { date: end, pauses: pauses };
  }
};

export const getStartDate = (endDate, durationString) => {
  if (!(endDate || durationString)) {
    return null;
  }
  let duration = new Date();
  let numbers = durationString.split(":");
  duration.setHours(
    parseInt(numbers[0]),
    parseInt(numbers[1]),
    parseInt(numbers[2])
  );

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
    timePeriodMillis / drivingPeriodMillis - 1 > 0
      ? timePeriodMillis / drivingPeriodMillis - 1
      : 0,
    10
  );

  if (numberPauses >= 0) {
    timePeriodMillis = timePeriodMillis + numberPauses * 45 * 60 * 1000;
  }

  var newDate = new Date();
  newDate.setTime(dateMillis - timePeriodMillis);

  return { date: newDate, pauses: numberPauses };
};
