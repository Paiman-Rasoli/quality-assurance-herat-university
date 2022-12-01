import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL;

export async function httpPostTeacher(data) {
  console.log("date", data);

  const response = await fetch(`${API_URL}/teacher`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export const deleteTeacher = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/teacher`, {
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

export const httpPutTeacher = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/teacher`, {
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
