import { Link, useOutletContext, useParams } from "react-router-dom";
import { OrdersList } from "../../utils/types";


export default function Order () {
    
    const data = useOutletContext<OrdersList[]>();
    const { id } = useParams();
  
    console.log(id);
    console.log(JSON.stringify(data));
    const index = data.findIndex((item) => {
      console.log("item in search: " + JSON.stringify(item));
      console.log("id: " + id);
      if (item.id === Number(id)) {
        return true;
      } else {
        return false;
      }
    });
    return <p>{`${data[index].id}`}</p>;
}