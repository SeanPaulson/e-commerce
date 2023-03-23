export const queries = {
  schemas: {
    commerce: "commerce.",
  },
  tables: {
    user: "user",
    user_address: "user_address",
    user_payment: "user_payment",
  },
  profile: {
    firstName: "first_name",
    lastName: "last_name",
    email_address: "email_address",
    phone: "phone",
    address_line1: "address_line1",
    address_line2: "address_line2",
    city: "city",
    zip_code: "zip_code",
    country_code: "country_code",
    expires: "expires",
    provider: "provider",
  },
  updateProfileName: `UPDATE commerce.user SET first_name = $1 WHERE id = $2`,
};

