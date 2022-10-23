const apiUrl = process.env.REACT_APP_API_URL;

const login = async (data) => {
  let res;
  try {
    res = await fetch(apiUrl + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("login error", error);
  }
  return res;
};

export { login };
