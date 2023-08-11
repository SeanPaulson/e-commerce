import { LoaderFunction } from 'react-router-dom';

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
  categoryId: number;
  createdAt: string | null;
  modifiedAt: string | null;
}



export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<ReturnType<TLoaderFn>> extends Response | infer D
	? D
	: never;