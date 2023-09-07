import { useState } from "react";
import { UserProfileType } from "../utils/types";
import { getUserProfile } from "../utils/fetchApi";

export default async function useQuery() {

    const [data, setData] = useState<UserProfileType | {}>();
    const [status, setStatus] = useState<'loading' | 'success' | 'error' | undefined>();
    const [errorMsg, setErrorMsg] = useState('');


    try {
        const res = await getUserProfile();
        if (!(res instanceof Error)) {
            setData(res);
        }
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
