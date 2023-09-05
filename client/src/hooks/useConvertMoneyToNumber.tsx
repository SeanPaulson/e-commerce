import { CartItem } from "../utils/types";

export default function useConvertMoneyToNumber(data: CartItem[] | string): string {
    if (data[0] && data instanceof Array) {
        //TODO bug NaN when total is over a 1000
        return data.map((item) => Number(item.total.substring(1))).reduce((prev, current) => prev + current).toFixed(2);
    }
    else if (data instanceof String) {
        return Number(data.substring(1)).toFixed(2);
    }
    else {
        return '0';
    }
}