export type profileBodyReq = Record<string | profileKeys, String>;

export type profileKeys = 'first_name' | 'last_name' | 'email_address' | 'phone';
export type profile = {
    profileKeys: String,
    password?: String,
}