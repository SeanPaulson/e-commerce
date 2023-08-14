import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';

export type UserProfileType = {
  id: Number;
  first_name: String;
  last_name: String;
  email_address: String;
  phone: String;
  address_line1?: String;
  address_line2?: String;
  city?: String;
  zip_code?: Number;
  country_code?: String;
  expires?: Date;
  provider?: String;
};

export type UserProfileStateContext = {
  userProfile: Partial<UserProfileType>
};

export type UsersType = {
  id: Number;
  first_name: String;
  last_name: String;
  email_address: String;
  phone?: String;
};


export type initialState = {
    initialState: null
}

export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  img_url: string
  category_id: number;
  modified_at: string | null;
  created: string | null;
}

export type CartItem = {
  user_id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  total: string;
  img_url: string;
  product_id: number
}

export enum ProductCategories  {
  "MENS CLOTHING" = "0",
  "WOMENS CLOTHING" = "1",
  "JEWELRY" = "2",
  "ELECTRONICS" = "3"

}

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<ReturnType<TLoaderFn>> extends Response | infer D
	? D
	: never;

