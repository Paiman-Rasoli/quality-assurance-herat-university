import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

const login = async (data) => {
  let res;
  try {
    res = await fetch(apiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("login error", error);
    toast.error("لطفا ارتباط با سرور را چک نمایید");
  }
  return res;
};

const registerUser = async (data) => {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  // console.log("resonse", response);

  return response;
};

export { login, registerUser };
