import { CartItem } from "../utils/types";

export default function useConvertMoneyToNumber(data: CartItem[] | string): string {
    if (data[0] && data instanceof Array) {
        return data.map((item) => item.total.substring(1)).reduce((prev, current) => prev + current);
    }
    else if (data instanceof String) {
        return Number(data.substring(1)).toFixed(2);
    }
    else {
        return '0';
    }
}