import { toast } from "react-toastify";
// import { API_URL } from "./requests";

const API_URL = process.env.REACT_APP_API_URL;

// Load faculties and return as JSON.
export async function httpPostQuestion(data) {
  const response = await fetch(`${API_URL}/question`, {
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
export async function httpPutQuestion(data) {
  console.log("dfata😀😀", data);

  const response = await fetch(`${API_URL}/question`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export const deleteQuestion = async function (id) {
  let response;
  try {
    response = await fetch(`${API_URL}/question?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log("delete", response);
  } catch (error) {
    console.log("login error", error);
    toast.error("لطفا ارتباط با سرور را چک نمایید");
  }

  return response;
};
