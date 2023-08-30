import { LoaderFunction } from 'react-router-dom';


export type UserProfileType = {
  id: number;
  first_name: String;
  last_name: String;
  email_address: String;
  phone: String;
  address_line1?: String;
  address_line2?: String;
  city?: String;
  zip_code?: number;
  country_code?: String;
  expires?: Date;
  provider?: String;
  account_number?: String;
};

export type UserProfileStateContext = {
  userProfile: Partial<UserProfileType>
};

export type UsersType = {
  id: number;
  first_name: String;
  last_name: String;
  email_address: String;
  phone?: String;
};


export type initialState = {
    initialState: null
}

export type ProductType = {
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

export type OrdersList = {
  id: number;
  user_id: number;
  total: number;
}

export type OrderDetailsList = {
  created_at?: string;
  id: number;
  modified_at?: string;
  order_id: number;
  product_id: number;
  quantity: number;
}

export type CustomParams = {
  params: {[id: string]: string};
}