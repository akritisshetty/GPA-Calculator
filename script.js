let studentName = "";
let subjects = [];
let semesters = [];
let editIndex = -1;

function proceedTo(type) {
  studentName = document.getElementById("studentName").value.trim();
  if (!studentName) {
    alert("Please enter your name.");
    return;
  }
  document.getElementById("sgpaStudentName").textContent = "Student: " + studentName;
  document.getElementById("cgpaStudentName").textContent = "Student: " + studentName;
  showSection(type);
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goBack() {
  document.getElementById("studentName").value = "";
  showSection("landing");
}

// SGPA logic
function addSubject() {
  const subject = document.getElementById("subject").value;
  const grade = document.getElementById("grade").value;
  const credit = parseInt(document.getElementById("credit").value);

  if (!subject || !grade || isNaN(credit)) {
    alert("Fill all fields correctly.");
    return;
  }

  const subjectData = { subject, grade, credit };

  if (editIndex === -1) {
    subjects.push(subjectData);
  } else {
    subjects[editIndex] = subjectData;
    editIndex = -1;
    document.querySelector("#sgpaForm button").textContent = "Add";
  }

  updateSubjectList();
  document.getElementById("sgpaForm").reset();
}

function updateSubjectList() {
  const tbody = document.getElementById("subjectList");
  tbody.innerHTML = "";
  subjects.forEach((s, i) => {
    tbody.innerHTML += `<tr>
      <td>${s.subject}</td>
      <td>${s.grade}</td>
      <td>${s.credit}</td>
      <td>
        <button onclick="editSubject(${i})">Edit</button>
        <button onclick="deleteSubject(${i})">Delete</button>
      </td>
    </tr>`;
  });
}

function editSubject(index) {
  const item = subjects[index];
  document.getElementById("subject").value = item.subject;
  document.getElementById("grade").value = item.grade;
  document.getElementById("credit").value = item.credit;
  editIndex = index;
  document.querySelector("#sgpaForm button").textContent = "Update";
}

function deleteSubject(index) {
  subjects.splice(index, 1);
  updateSubjectList();
  if (editIndex === index) {
    document.getElementById("sgpaForm").reset();
    editIndex = -1;
    document.querySelector("#sgpaForm button").textContent = "Add";
  }
}

function getGradePoint(grade) {
  const map = { O: 10, A: 9, B: 8, C: 7, D: 6, F: 0 };
  return map[grade] || 0;
}

function calculateSGPA() {
  let totalPoints = 0;
  let totalCredits = 0;
  subjects.forEach(s => {
    totalPoints += getGradePoint(s.grade) * s.credit;
    totalCredits += s.credit;
  });
  const sgpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  document.getElementById("sgpaResult").textContent = sgpa;
}

// CGPA logic
function addSemester() {
  const sgpa = parseFloat(document.getElementById("cgpaInput").value);
  if (isNaN(sgpa)) {
    alert("Enter valid SGPA.");
    return;
  }
  semesters.push(sgpa);
  updateSemesterList();
  document.getElementById("cgpaForm").reset();
}

function updateSemesterList() {
  const tbody = document.getElementById("semesterList");
  tbody.innerHTML = "";
  semesters.forEach((sgpa, i) => {
    tbody.innerHTML += `<tr><td>${i + 1}</td><td>${sgpa}</td></tr>`;
  });
}

function calculateCGPA() {
  const total = semesters.reduce((a, b) => a + b, 0);
  const cgpa = semesters.length ? (total / semesters.length).toFixed(2) : "0.00";
  document.getElementById("cgpaResult").textContent = cgpa;
}

