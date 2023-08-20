import { CartItem } from "../utils/types";

export default function useConvertMoneyToNumber(data: CartItem[]): string {
    // Number(data[0].total.substring(1))
    console.log(data.length);
    if (data.length > 0) {
        return data.map((item) => Number(item.total.substring(1))).reduce((prev, current) => prev + current).toFixed(2);
    }
    else {
        console.log('null')
        return '0';
    }
}