import { toast } from "react-toastify";
// import { API_URL } from "./requests";

const API_URL = process.env.REACT_APP_API_URL;

// Load faculties and return as JSON.
export async function httpPostSubject(data) {
  const response = await fetch(`${API_URL}/subject`, {
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
export async function httpPutSubject(data) {
  const response = await fetch(`${API_URL}/subject`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export const deleteSubject = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/subject`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(id),
    });
    console.log("delete", response);
  } catch (error) {
    console.log("login error", error);
    toast.error("لطفا ارتباط با سرور را چک نمایید");
  }

  return response;
};

export const updateSubject = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/subject`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(id),
    });
    console.log("delete", response);
  } catch (error) {
    console.log("login error", error);
    toast.error("لطفا ارتباط با سرور را چک نمایید");
  }

  return response;
};
