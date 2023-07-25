import { Inputs } from "../components/loginModal/LoginModal";
export const login = async function ({ email, password }: Inputs) {
  try {
    console.log(email + password);
    console.log(JSON.stringify({ email, password }));
    const data = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (data.status === 200) {
      return data.json();
    } else if (data.status === 401) {
      throw Error("Email or password is incorrect.");
    } else if (data.status === 403) {
      throw Error("Email or password is incorrect.");
    }
  } catch (error) {
    return error;
  }
};

export const getUserProfile = async function () {
  try {
      const data = await fetch(`/api/users/profile`, {
        method: "GET",
      });
      console.log(data);
      if (data.status === 200) {
        return data.json();
      } else {
        throw Error();
      }
    } catch (error) {
      return error;
    }
};
