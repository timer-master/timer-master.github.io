// HOLIDAYS
const holidays = [
  "halloween",
  "diwali",
  "thanksgiving",
  "christmas",
  "newYear",
  "lunarNewYear",
  "valentines",
  "stPatricks",
  "easter",
  "memorialDay",
  "independenceDay",
  "laborDay",
  "hanukkah",
  "ramadan",
  "eidAlFitr",
  "eidAlAdha",
  "passover",
  "goodFriday"
];

const holidayDates = {
  halloween: new Date("2024-10-31"),
  diwali: new Date("2024-11-01"), // DATE VARIES
  thanksgiving: new Date("2024-11-28"), // DATE VARIES: Fourth Thursday of November in the US
  christmas: new Date("2024-12-25"),
  newYear: new Date("2025-01-01"),
  lunarNewYear: new Date("2025-02-10"), // DATE VARIES
  valentines: new Date("2025-02-14"),
  stPatricks: new Date("2025-03-17"),
  easter: new Date("2025-04-20"), // DATE VARIES: Easter Sunday
  memorialDay: new Date("2025-05-26"), // DATE VARIES: Last Monday of May
  independenceDay: new Date("2025-07-04"),
  laborDay: new Date("2025-09-01"), // DATE VARIES: First Monday of September
  hanukkah: new Date("2024-12-25"), // DATE VARIES
  ramadan: new Date("2025-03-28"), // DATE VARIES
  eidAlFitr: new Date("2025-04-27"), // DATE VARIES
  eidAlAdha: new Date("2025-06-05"), // DATE VARIES
  passover: new Date("2025-04-12"), // DATE VARIES
  goodFriday: new Date("2025-04-18") // DATE VARIES
};


// Set countdowns for each holiday:
function setHolidayCountdown(holidayName, holidayDate) {
  var countDownDate = holidayDate.getTime();

  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    // Time calculations
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display result
    document.getElementById(holidayName).innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // If time's up
    if (distance < 0) {
      clearInterval(x);
      document.getElementById(holidayName).innerHTML = "It is already " + holidayName + " (" + holidayDate.toDateString() + ")!";
    }
  }, 1000);
}

// Set countdown for each holiday
holidays.forEach((holidayName) => {
  setHolidayCountdown(holidayName, holidayDates[holidayName]);
});
