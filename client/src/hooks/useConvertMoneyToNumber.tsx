import { CartItem } from "../utils/types";

export default function useConvertMoneyToNumber(data: CartItem[] | string): string {
    if (data[0] && data instanceof Array) {
        return data.map((item) => Number(item.total.substring(1).replace(/,/g, ""))).reduce((prev, current) => prev + current).toFixed(2);
    }
    else if (data instanceof String) {
        return Number(data.substring(1)).toFixed(2);
    }
    else {
        return '0';
    }
}