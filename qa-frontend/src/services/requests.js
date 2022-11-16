export const API_URL = "http://localhost:1111/api";

// Load faculties and return as JSON.
async function httpPostFaculties(data) {
  const response = await fetch(`${API_URL}/faculty`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
// Load faculties and return as JSON.
async function httpPutFaculties(data) {
  const response = await fetch(`${API_URL}/faculty`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

async function httpPostDepartments(data) {
  console.log("date", data);

  const response = await fetch(`${API_URL}/department`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export { httpPostFaculties, httpPostDepartments, httpPutFaculties };

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAsImxldmVsIjp0cnVlLCJ1c2VybmFtZSI6Imhhcm9sZEBkZXYudG8ifSwiaWF0IjoxNjY1NzUyMjU0fQ.5v-S7f9bjFHE8prbSu1tdhZ380Xqa0a6t6a5hkCcRwg",
