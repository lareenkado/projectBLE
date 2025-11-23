// עדכון ערך הרדיוס ליד ה-slider
const radiusRange = document.getElementById("radiusRange");
const radiusValue = document.getElementById("radiusValue");
if (radiusRange && radiusValue) {
  const updateRadiusText = () => {
    radiusValue.textContent = radiusRange.value + " m";
  };
  radiusRange.addEventListener("input", updateRadiusText);
  updateRadiusText();
}

// נתוני דוגמה לטבלה (סטטיים רק להמחשה)
const sampleAttendance = [
  { name: "Mona Saad", id: "S12345", status: "present", time: "08:32" },
  { name: "Adam Levi", id: "S12346", status: "late", time: "08:41" },
  { name: "Sara Cohen", id: "S12347", status: "present", time: "08:29" },
  { name: "Yousef N.", id: "S12348", status: "absent", time: "-" }
];

const tableBody = document.getElementById("attendanceTableBody");
if (tableBody) {
  sampleAttendance.forEach((row) => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = row.name;
    tr.appendChild(tdName);

    const tdId = document.createElement("td");
    tdId.textContent = row.id;
    tr.appendChild(tdId);

    const tdStatus = document.createElement("td");
    const badge = document.createElement("span");
    badge.classList.add("badge");

    if (row.status === "present") {
      badge.classList.add("badge-present");
      badge.textContent = "Present";
    } else if (row.status === "late") {
      badge.classList.add("badge-late");
      badge.textContent = "Late";
    } else {
      badge.classList.add("badge-absent");
      badge.textContent = "Absent";
    }
    tdStatus.appendChild(badge);
    tr.appendChild(tdStatus);

    const tdTime = document.createElement("td");
    tdTime.textContent = row.time;
    tr.appendChild(tdTime);

    tableBody.appendChild(tr);
  });
}

// מערכת טוסטים פשוטה
const toastContainer = document.getElementById("toastContainer");

function showToast(message) {
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = "toast";

  const span = document.createElement("span");
  span.className = "toast-message";
  span.textContent = message;

  const btn = document.createElement("button");
  btn.className = "toast-close";
  btn.textContent = "×";

  btn.addEventListener("click", () => {
    toast.remove();
  });

  toast.appendChild(span);
  toast.appendChild(btn);
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// כפתורי התחלת וסיום סשן
const startBtn = document.getElementById("startSessionBtn");
const endBtn = document.getElementById("endSessionBtn");
const sessionNameInput = document.getElementById("sessionName");
const deviceSelect = document.getElementById("deviceSelect");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    const name = sessionNameInput && sessionNameInput.value.trim()
      ? sessionNameInput.value.trim()
      : "Unnamed session";

    const device =
      deviceSelect && deviceSelect.value !== "none"
        ? deviceSelect.options[deviceSelect.selectedIndex].text
        : "no device selected";

    showToast(`Session started: ${name} · ${device}`);
  });
}

if (endBtn) {
  endBtn.addEventListener("click", () => {
    showToast("Session ended and attendance saved.");
  });
}

// Collapse / expand sidebar (desktop)
const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
if (sidebar && sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
}
