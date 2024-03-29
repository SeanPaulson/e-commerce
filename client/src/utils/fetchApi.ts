import {
  LoaderFunction,
  LoaderFunctionArgs,
} from "react-router";
import { Inputs } from "../components/loginModal/LoginModal";
import {
  CartItem,
  CustomParams,
  OrderDetailsList,
  OrdersList,
  ProductType,
  UserProfileType,
} from "./types";
let API_URL = 'https://localhost:3001'
if (import.meta.env.PROD) {
   API_URL = 'https://e-commerce-server-ceon.onrender.com'
}

export const login = async function ({ email, password }: Inputs) {
  try {
    const data = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: 'include'
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

export const logout = async function () {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (res.status === 200) {
      return res;
    } else return res;
  } catch (e: any) {
    //TODO find a way to handle logout errors
    console.log(e);
    return e;
  }
}

export const getUserProfile = async function (): Promise<Partial<UserProfileType> | Error> {
  try {
    const data = await fetch(`${API_URL}/users/profile`, {
      method: "GET",
      credentials: 'include',
    });
    if (data.status === 200) {
      return await data.json();
    } else {
      throw Error();
    }
  } catch (error: any) {
    return error;
  }
};

export const updateUserProfile = async function (data: Partial<UserProfileType> | FormData) {
  try {
    const res = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        Accept: "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
if (res.status === 200) {
  return res
} else {
  throw Error(`${res.statusText}`);
}

  } catch (error: any) {
    return error
  }
}

export const getProductById = async function (
  id: LoaderFunctionArgs | string
): Promise<ProductType | never> {
  try {
    const res = await fetch(`${API_URL}/product/${id}`);
    if (res.ok) {
      const jdata: Array<ProductType> = await res.json();
      return jdata[0];
    }
    throw Error("No data");
  } catch (error: any) {
    console.log(error);
    return error;
  }
} satisfies LoaderFunction;

export const getFeaturedProducts = async function (): Promise<
  ProductType[] | never
> {
  try {
    const res = await fetch(`${API_URL}/product`);
    if (res.ok) {
      const jdata: Array<ProductType> = await res.json();
      return jdata;
    }
    throw Error("No data");
  } catch (error: any) {
    console.log(error);
    return error;
  }
} satisfies LoaderFunction;

export const getProductsByCategory = async function (
  id: LoaderFunctionArgs | string
): Promise<ProductType[] | never> {
  try {
    const res = await fetch(`${API_URL}/product/category/${id}`);
    if (res.ok) {
      const jdata: Array<ProductType> = await res.json();
      return jdata;
    }
    throw Error("No data");
  } catch (error: any) {
    console.log(error);
    return error;
  }
} satisfies LoaderFunction;

export const getUserCart = async function (): Promise<CartItem[] | never> {
  try {
    const res = await fetch(`${API_URL}/cart`, { credentials: 'include' });
    if (res.ok) {
      const jdata: CartItem[] = await res.json();
      return jdata;
    }
    if (res.status === 401) {
      return [];
    }
    throw Error("No data");
  } catch (error: any) {
    console.log(error);
    return error;
  }
} satisfies LoaderFunction;

export const addItemToCart = async (id: number, quantity: number) => {
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        prod_id: id,
        quantity,
      }),
    });
    if (res.status === 201) {
      return await res.json();
    } else if (res.status === 401) {
      throw Error("Email or password is incorrect.");
    }
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const deleteCartItem = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        prod_id: id,
      }),
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const getUserOrderHistory = async function (): Promise<
  OrdersList[] | never
> {
  try {
    const res = await fetch(`${API_URL}/users/orders`, { credentials: 'include' });
    if (res.ok) {
      const jdata: OrdersList[] = await res.json();
      return jdata;
    }
    if (res.status === 401) {
      return [];
    }
    throw Error("No data");
  } catch (error: any) {
    console.log(error);
    return error;
  }
} satisfies LoaderFunction;

export const getOrderById = async function (
  args:
    | LoaderFunctionArgs
    | CustomParams
): Promise<OrderDetailsList[] | never> {
  try {
    const res = await fetch(`${API_URL}/users/orders/${args.params.id}`, {credentials: 'include'});
    if (res.ok) {
      const jdata: OrderDetailsList[] = await res.json();
      return jdata;
    }
    if (res.status === 404) {
      return [];
    }
    throw Error("No data");
  } catch (error: any) {
    console.log(error);
    return error;
  }
} satisfies LoaderFunction;

export const checkout = async () => {
  try {
    const res = await fetch(`${API_URL}/cart/checkout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });
    const jres = await res.json();
    return jres;
  } catch (error) {
    console.log(error);
    return error;
  }
};
