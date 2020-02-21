import React, { useState, useEffect, useContext  } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table,Spinner  } from 'reactstrap';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserRow = (props) =>{
  const payment = props.payment
  const orderLinlk = `/users/orders/order/${payment._id}`
  const geyBadgePaymentOpreations = (paymentOperations) =>{
    return paymentOperations ? 'success': 'danger'
    }
  return (
    <tr key={payment._id}>
      <td>{payment._id}</td>
      <td>{new Date(payment.createdAt).toLocaleDateString('fa-IR')}</td>
      <td>{payment.orderStatus.name}</td>
      <td>{payment.price} تومان</td>
      <td><Badge color={geyBadgePaymentOpreations(payment.payment)}>{payment.payment? 'پرداخت شده': 'لغو شده'}</Badge></td>
      
      <td><Link to={orderLinlk}><i className="fa fa-chevron-left fa-lg mt-10"  ></i></Link></td>
    </tr>
  )
}

const Favorites =(props)=> {
    const {userid} =props.match.params;
    if(!userid){
      props.history.replace('/dashboard')
    }
    const {dispatch} = useContext(AuthContext);
    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(false);
    const token =  GetToken();
    useEffect(()=>{
      dispatch({type:'check',payload:props});
      setLoading(true)
      axios({
        url: '/',
        method: 'post',
        headers:{'token':`${token}`},
        data: {
          query: `
          query getAllUsers($userId : ID) {
            getUsers(userId : $userId) {
              _id
              fname,
              lname,
    		  favorite {
                product {
                  attribute {
                    color
                  }
                }
              }
            }
          }
            `,
            variables :{
              "userId":userid  
          }
      }
    }).then((result) => {
      if(result.data.errors){
        dispatch({type:'logout',payload:props});
        toast.error(result.data.errors[0].message);
      }
      else{
        setOrders(result.data.data.getUsers);
        console.log(result.data.data.getUsers);
        setLoading(false)
      }
     
    }).catch(error=>{
      console.log(error)
    });
    },[])

    if(loading)
    { 
      return(
      <div className="animated fadeIn">
        <center><Spinner /></center>
      </div>
      )   
    }
    else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={12}>
            <div className="form-group">
                  <ToastContainer />
            </div>
            
              
                 {
                    orders.map((order)=>
                    <Card key={order._id}>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> محصولات مورد علاقه  { ' '}
                        <small className="text-muted">{`${order.fname} ${order.lname}` }</small>
                      </CardHeader>
                      <CardBody>
                        <Table responsive striped hover>
                          <thead>
                            <tr>
                                          
                              <th scope="col">شماره سفارش</th>            
                              <th scope="col"> تاریخ ثبت سفارش</th>
                              <th scope="col">وضعیت سفارش</th>
                              <th scope="col">مبلغ کل</th>
                              <th scope="col">عملیات پرداخت</th>
                              <th scope="col">جزئیات</th>
                            </tr>
                          </thead>
                          <tbody>
                            
                            {/* {
                             
                               order.payment.map((payment) =>
                               <UserRow key={payment._id} payment={payment}/>
                                )
                            } */}
                          </tbody>
                        </Table>
                      </CardBody>
                      </Card>
                    )
                 }
               
             
           
            
             
            </Col>
          </Row>
        </div>
      )
    }
    
  
}

export default React.memo(Favorites);
