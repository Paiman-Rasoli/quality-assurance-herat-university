const API_URL = "http://localhost:1111/api";

// Load faculties and return as JSON.
async function httpPostFaculties(data) {
  console.log("date", data);

  const response = await fetch(`${API_URL}/faculty`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAsImxldmVsIjp0cnVlLCJ1c2VybmFtZSI6Imhhcm9sZEBkZXYudG8ifSwiaWF0IjoxNjY1NzUyMjU0fQ.5v-S7f9bjFHE8prbSu1tdhZ380Xqa0a6t6a5hkCcRwg",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export { httpPostFaculties };
