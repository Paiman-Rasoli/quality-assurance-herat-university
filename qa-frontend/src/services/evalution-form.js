import { toast } from "react-toastify";
import { ToastMsg } from "../components/TaostMsg";
// import { API_URL } from "./requests";

const API_URL = process.env.REACT_APP_API_URL;

// Load current form and return as JSON.
export async function httpPostForm(data) {
  const response = await fetch(`${API_URL}/form/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  return response;
}

// Load faculties and return as JSON.
export async function httpPutFaculties(data) {
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

export const deleteFaculty = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/faculty`, {
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
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }

  return response;
};

export const httpGetForm = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/form/find?formId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    // console.log("GET FORM", response);
  } catch (error) {
    // console.log("login error", error);
    toast.error(<ToastMsg text={"لطفا ارتباط با سرور را چک نمایید"} />);
  }

  return response;
};

export async function httpPostAnswres(data) {
  const response = await fetch(`${API_URL}/answer/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  return response;
}
