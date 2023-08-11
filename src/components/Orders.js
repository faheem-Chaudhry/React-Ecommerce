import React, { useEffect, useState } from "react";
import OrderDetail from "./OrderDetail";
import { useNavigate } from "react-router-dom";

const Orders = (props) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [detailId, setDetailId] = useState("");
  const [hideDetail, setHideDetail] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [onlyDetails, setOnlyDetails] = useState(false);
  const [showOnce, setShowOnce] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://react-http-8f78d-default-rtdb.firebaseio.com/ecommerce/orders.json"
      );
      const data = await response.json();
      console.log(data);
      const DATA = [];
      for (const key in data) {
        DATA.push({
          id: key,
          email: data[key].email,
          amount: data[key].grandTotal,
          details: data[key].details,
        });
      }
      console.log(DATA.details);
      setOrder(DATA);
    }
    fetchData();
  }, []);
  console.log("Order: ", order);
  console.log("order details", order.details);

  const detailsHandler = (Id) => {
    navigate(`detail/${Id}`)
    console.log("detailid", detailId);
    console.log("hideid", hideDetail);
    if (Id === hideDetail) {
      console.log("true true");
      setDetailId("");
      setHideDetail("");
      setShowDetails(true);
      setOnlyDetails(false);
      setShowOnce(false);
      return;
    }
    setHideDetail(Id);
    console.log("detailId", Id);
    setDetailId(Id);
    setShowDetails(false);
    setOnlyDetails(true);
    setShowOnce(true);
    // if((detailId === hideDetail) && detailId !== ''){
    //     console.log('true true')
    //     setDetailId('');
    //     setHideDetail('');
    //     setShowDetails(true);
    // }
  };
  const detailTable = (Id) => {};
  return (
    <React.Fragment>
      <table border="2px">
        {!onlyDetails && <tr>
          <th>Email</th>
          <th>Grand Total</th>
          <th>Details</th>
        </tr>}
        <tbody>
          {order.map((cat) => {
            return (
              <tr>
                {!onlyDetails && (
                  <React.Fragment>
                    {" "}
                    <td>{cat.email}</td>
                    <td>{cat.amount}</td>
                    <td>
                      <button
                        onClick={() => {
                          detailsHandler(cat.id);
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </React.Fragment>
                )}
                {onlyDetails && hideDetail === cat.id?<tr> 
                       
                       <td><b>Email: </b>{cat.email}</td>
                        {console.log('india',showOnce)}
                          <td><b>Grand Total: </b>{cat.amount}</td>
                          <td>
                            <button
                              onClick={() => {
                                detailsHandler(cat.id);
                              }}
                            >
                              Details
                            </button>
                            {/* {setShowOnce(false)} */}
                          </td></tr>:<tr></tr>
                }
                {!showDetails &&
               
                  cat.details.map((detail, index) => {
                   
                        // <React.Fragment>
                        //   {console.log('pakistan')}
                        //   <td>{cat.email}</td>
                        //   <td>{cat.amount}</td>
                        //   <td>
                        //     <button
                        //       onClick={() => {
                        //         detailsHandler(cat.id);
                        //       }}
                        //     >
                        //       Details
                        //     </button>
                        //   </td>
                        // </React.Fragment>
                     
                    return detailId === cat.id ? (
                        
                      <tr>
                        {/* <td>{cat.email}</td>
                        {console.log('india',showOnce)}
                          <td>{cat.amount}</td>
                          <td>
                            <button
                              onClick={() => {
                                detailsHandler(cat.id);
                              }}
                            >
                              Details
                            </button>
                            
                          </td> */}
                        <td><b>Name: </b>{detail.name}</td>
                        <td>
                          <img height="50px" width="100px" src={detail.image} />
                        </td>
                        <td><b>Price: </b>{detail.price}</td>
                        <td><b>Quantity: </b>{detail.quantity}</td>
                      </tr>
                    ) : (
                      <tr></tr>
                    );
                    //  {setDetailId('')}
                  })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default Orders;
