import { toast } from "react-toastify";
// import { API_URL } from "./requests";

const API_URL = process.env.REACT_APP_API_URL;

export async function httpPostDepartment(data) {
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

export async function httpPutDepartment(data) {
  const response = await fetch(`${API_URL}/department`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export const deleteDepartment = async function (id) {
  let response;

  try {
    response = await fetch(`${API_URL}/department`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(id),
    });
    console.log("delete department", response);
  } catch (error) {
    console.log("login error", error);
    toast.error("لطفا ارتباط با سرور را چک نمایید");
  }

  return response;
};
