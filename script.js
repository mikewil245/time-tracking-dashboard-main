let timeTrackData;

function apiFetch() {
  fetch("./data.json")
    .then((Response) => {
      if (!Response.ok) {
        throw new Error("Network response was not ok");
      }
      return Response.json();
    })
    .then((data) => {
      timeTrackData = data;
      // UI updates with the fetched data.
      updateTimeTrackUI("daily"); // Default to daily on load
    });
}
apiFetch();

let categoryContainers = document.querySelectorAll(
  ".work, .play , .study , .exercise , .social , .self-care"
);

function updateTimeTrackUI(timeframe) {
  timeTrackData.forEach((element) => {
    let normalizedText = element.title.toLowerCase().replace(" ", "-");

    categoryContainers.forEach((category) => {
      if (category.classList.contains(normalizedText)) {
        let workHours = category.querySelector(".work-hours");
        let previousWorkHours = category.querySelector(".previous-work-hours");

        // Update hours based on the selected timeframe
        workHours.innerText = `${element.timeframes[timeframe].current}hrs`;
        previousWorkHours.innerText = `Last Week - ${element.timeframes[timeframe].previous}hrs`;
      }
    });
  });
}

let dailyBtn = document.getElementById("daily");
let weeklyBtn = document.getElementById("weekly");
let monthlyBtn = document.getElementById("monthly");

// Event listeners for button clicks
dailyBtn.addEventListener("click", () => {
  updateActiveTimeframe(dailyBtn);
  updateTimeTrackUI("daily");
});

weeklyBtn.addEventListener("click", () => {
  updateActiveTimeframe(weeklyBtn);
  updateTimeTrackUI("weekly");
});

monthlyBtn.addEventListener("click", () => {
  updateActiveTimeframe(monthlyBtn);
  updateTimeTrackUI("monthly");
});

// Function to add active class to the clicked button
function updateActiveTimeframe(activeBtn) {
  // Remove 'active' class from all buttons
  dailyBtn.classList.remove("active");
  weeklyBtn.classList.remove("active");
  monthlyBtn.classList.remove("active");

  // Add 'active' class to the clicked button
  activeBtn.classList.add("active");
}
