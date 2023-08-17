import { LoaderFunction, LoaderFunctionArgs } from "react-router";
import { Inputs } from "../components/loginModal/LoginModal";
import { CartItem, Product } from "./types";
export const login = async function ({ email, password }: Inputs) {
  try {
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
    if (data.status === 200) {
      return await data.json()
    } else {
      throw Error();
    }
  } catch (error: any) {
    return error;
  }
};

export const getProductById = (async function (id: LoaderFunctionArgs | string):Promise<Product | never> {
  try {
    const res = await fetch(`/api/product/${id}`);
    if (res.ok) {
      const jdata: Array<Product> = await res.json();
      return jdata[0];
    }
    throw Error('No data')
  } catch (error: any) {
    console.log(error);
    return error;
  }
}) satisfies LoaderFunction;

export const getFeaturedProducts = (async function ():Promise<Product[] | never> {
  try {
    const res = await fetch(`/api/product`);
    if (res.ok) {
      const jdata: Array<Product> = await res.json();
      return jdata;
    }
    throw Error('No data')
  } catch (error: any) {
    console.log(error);
    return error;
  }
}) satisfies LoaderFunction;

export const getProductsByCategory = (async function (id: LoaderFunctionArgs | string):Promise<Product[] | never> {
  try {
    const res = await fetch(`/api/product/category/${id}`);
    if (res.ok) {
      const jdata: Array<Product> = await res.json();
      return jdata;
    }
    throw Error('No data')
  } catch (error: any) {
    console.log(error);
    return error;
  }
}) satisfies LoaderFunction;

export const getUserCart = (async function ():Promise<CartItem[] | never> {
  try {
    const res = await fetch(`/api/cart`);
    console.log(res);
    if (res.ok) {
      const jdata:CartItem[] = await res.json();
      return jdata;
    } if (res.status === 401) {
      return []
    }
    throw Error('No data')
  } catch (error: any) {
    console.log(error);
    return error;
  }
}) satisfies LoaderFunction;

export const addItemToCart = async (id: number, quantity: number) => {
  try {
    const res = await fetch('/api/cart', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prod_id: id,
        quantity,
      }),
    });
    console.log(res);
    if (res.status === 201) {
      return await res.json();
    } else if (res.status === 401) {
      throw Error("Email or password is incorrect.");
    }
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

export const deleteCartItem = async (id: number) => {
  try {
    const res = await fetch('api/cart', {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prod_id: id
      })
    });
    console.log(res);
    return res;
  } catch(error: any) {
    console.log(error);
    return error;
  }
}