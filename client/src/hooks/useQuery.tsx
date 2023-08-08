import { useState } from "react";
import { UserProfileStateContext } from "../utils/types";
import { getUserProfile } from "../utils/fetchApi";

export default async function useQuery() {

    const [data, setData] = useState<UserProfileStateContext>();
    const [status, setStatus] = useState<'loading' | 'success' | 'error' | undefined>();
    const [errorMsg, setErrorMsg] = useState('');


    try {
        const res = await getUserProfile();
        setData(res);
        setStatus('success');
    } catch (e: any) {
        setStatus('error');
        setErrorMsg(e.message)
    }

    if (status === 'loading') {
        return <span>loading...</span>
    }

    if (status === 'error') {
        return <span>Error: {errorMsg}</span>
    }

    return data;
}
