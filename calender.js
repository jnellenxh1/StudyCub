const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const modal = document.getElementById("event-modal");
const closeModal = document.querySelector(".close");
const saveEvent = document.getElementById("save-event");
const eventText = document.getElementById("event-text");

let currentDate = new Date();
let events = JSON.parse(localStorage.getItem("events")) || {};

function renderCalendar() {
    calendar.innerHTML = "";
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthYear.innerText = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        calendar.appendChild(emptyDiv);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.innerText = day;

        const eventKey = `${year}-${month}-${day}`;
        if (events[eventKey]) {
            const eventSpan = document.createElement("span");
            eventSpan.classList.add("event");
            eventSpan.innerText = events[eventKey];
            dayDiv.appendChild(eventSpan);

            eventSpan.addEventListener("click", () => {
                if (confirm(`Remove event: "${events[eventKey]}"?`)) {
                    delete events[eventKey];
                    localStorage.setItem("events", JSON.stringify(events));
                    renderCalendar();
                }
            });
        }

        dayDiv.addEventListener("click", () => openEventModal(year, month, day));

        calendar.appendChild(dayDiv);
    }
}

function openEventModal(year, month, day) {
    modal.style.display = "block";
    saveEvent.onclick = () => {
        const eventKey = `${year}-${month}-${day}`;
        events[eventKey] = eventText.value;
        localStorage.setItem("events", JSON.stringify(events));
        modal.style.display = "none";
        eventText.value = "";
        renderCalendar();
    };
}

prevMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

renderCalendar();
