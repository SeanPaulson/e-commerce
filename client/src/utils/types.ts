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
