export const getEndDate = (startDate, durationString) => {
  if (!(startDate || durationString)) {
    return null;
  }
  let duration = new Date();
  let numbers = durationString.split(":");
  duration.setHours(
    parseInt(numbers[0]),
    parseInt(numbers[1]),
    parseInt(numbers[2])
  );

  var dateMillis = startDate.getTime();

  //JavaScript doesn't have a "time period" object, so I'm assuming you get it as a string
  var timePeriod = duration.toLocaleTimeString("it-IT"); //I assume this is 15 minutes, so the format is HH:MM:SS

  var parts = timePeriod.split(/:/);
  var timePeriodMillis =
    parseInt(parts[0], 10) * 60 * 60 * 1000 +
    parseInt(parts[1], 10) * 60 * 1000 +
    parseInt(parts[2], 10) * 1000;
  var drivingPeriodMillis = 4 * 60 * 60 * 1000 + 30 * 60 * 1000;

  let numberPauses = parseInt(timePeriodMillis / drivingPeriodMillis - 1, 10);

  if (numberPauses >= 0) {
    timePeriodMillis = timePeriodMillis + numberPauses * 45 * 60 * 1000;
  }

  var newDate = new Date();
  newDate.setTime(dateMillis + timePeriodMillis);

  return newDate;
};
