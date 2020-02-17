import React, { useEffect,useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table,  } from 'reactstrap';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';

function OrderRow(props) {
  
  const item = props.item
  const orderLinlk = `/orders/detail/${item._id}`;
 const geyBadgeDelivery = (deliveryTime) =>{
  return deliveryTime === 'تحویل شده' ? 'success' :
      deliveryTime === 'در حال پردازش' ? 'warning' :
        deliveryTime === 'لغو شده' ? 'danger' :
            'primary'
  }
  const geyBadgePaymentOpreations = (paymentOperations) =>{
    return paymentOperations  ? 'success' : 'danger'
     
    }
  return (
    <tr key={item._id}>  
      <td>{item._id}</td>
      <td>{item.user.fname} {item.user.lname}</td>
      <td>{new Date(item.createdAt).toLocaleDateString('fa-IR')}</td>
      <td><Badge color={geyBadgeDelivery('تحویل شده')}>تحویل شده</Badge></td>
      <td>{item.price} تومان</td>
      <td><Badge color={geyBadgePaymentOpreations(item.payment)}>{item.payment ?' پرداخت شده' : 'لغو شده'}</Badge></td>
      
      <td><Link to={orderLinlk}><i className="fa fa-chevron-left fa-lg mt-10"  ></i></Link></td>
    </tr>
  )
}

const AllOrders =(props)=>{
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  const [orders,setOrders] = useState([])
  useEffect(()=>{
    dispatch({type:'check',payload:props});
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        query getallpayment($orderId : ID) {
          getAllPayment(orderId : $orderId) {
            _id,
            user {
              fname,
              lname
            }       
            payment,
            count,
            price,
            createdAt
          }
        }  
          `,
          variables :{
              "orderId": null      
          }
    }
  }).then((result) => {
    if(result.data.errors){
      dispatch({type:'logout',payload:props});
    }
    else{
      const {getAllPayment} =result.data.data;
      setOrders(getAllPayment)
    }
   
  }).catch(error=>{
    console.log(error)
  });
  },[])
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <thead>
                    <tr>            
                      <th scope="col">شماره سفارش</th> 
                      <th scope="col">نام کاربر</th>             
                      <th scope="col"> تاریخ ثبت سفارش</th>
                      <th scope="col">زمان تحویل سفارش</th> 
                      <th scope="col">مبلغ کل</th>
                      <th scope="col">عملیات پرداخت</th>
                      <th scope="col">جزئیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item) =>
                      <OrderRow  item={item} key={item._id}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  
}

export default AllOrders;
