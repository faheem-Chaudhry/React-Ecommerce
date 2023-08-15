import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface detail {
  name: string,
  price: string,
  image: string,
  quantity: number
}
interface ord{
  id:string,
  email: string,
  amount: number,
  details: detail[]
}

const OrderDetail = () => {
  const navigate = useNavigate();
  const { detail_id } = useParams<{detail_id?:string}>();
  const [order, setOrder] = useState<ord[]>([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/orders.json"
      );
      const data = await response.json();
      console.log(data);
      const DATA = [];
      for (const key in data) {
        if (key === detail_id) {
          DATA.push({
            id: key,
            email: data[key].email,
            amount: data[key].grandTotal,
            details: data[key].details,
          });
        }
      }
      // console.log(DATA.details);
      setOrder(DATA);
    }
    fetchData();
  }, []);
  const detailsHandler = () => {
    navigate(-1);
  };
  return (
    <React.Fragment>
      <table>
        <tr>
          <th>Email</th>
          <th>Grand Total</th>
          <th>Details</th>
        </tr>
        <tbody>
          {order.map((cat) => {
            return (
              <tr>
                <td>{cat.email}</td>
                <td>{cat.amount}</td>
                <td>
                  <button
                    onClick={() => {
                      detailsHandler();
                    }}
                  >
                    Details
                  </button>
                </td>

                {cat.details.map((detail, index) => {
                  return (
                    <tr>
                      <td>
                        <b>Name: </b>
                        {detail.name}
                      </td>
                      <td>
                        <img height="50px" width="100px" src={detail.image} />
                      </td>
                      <td>
                        <b>Price: </b>
                        {detail.price}
                      </td>
                      <td>
                        <b>Quantity: </b>
                        {detail.quantity}
                      </td>
                    </tr>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default OrderDetail;
