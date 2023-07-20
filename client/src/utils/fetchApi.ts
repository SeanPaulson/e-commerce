import { Inputs } from "../components/loginModal/LoginModal";
export const login = async function ({ email, password }: Inputs) {
  try {
    const data = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(data);
    if (data.status === 202) {
      return data.json();
      //TODO
    } else if (data.status === 401) {
      throw Error("Email or password is incorrect.");
    } else if (data.status === 403) {
      throw Error("Email or password is incorrect.");
    }
  } catch (error) {
    return error;
  }
};
