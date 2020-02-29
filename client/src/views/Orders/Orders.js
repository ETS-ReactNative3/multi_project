import React, { useEffect,useState,useContext } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Modal, ModalHeader,ModalBody,ModalFooter,Button,FormGroup,Input,Label  } from 'reactstrap';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';
import './Order.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AllOrders =(props)=>{
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  const [orders,setOrders] = useState([]);
  const [status,setStatus] = useState([]);
  const [modal,setModal] = useState(false);
  const [orderID,setOrderID] = useState(null);
  const [defaultStatus,setDefaultStatus] = useState(null);
  const [statusID,setStatusID] = useState(null);
  const [statusName,setStatusName] = useState('')
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
            },
            orderStatus{
              name,
              _id
            },    
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
      console.log(getAllPayment);
      setOrders(getAllPayment);

      axios({
        url: '/',
        method: 'post',
        headers:{'token':`${token}`},
        data: {
          query: `
          query getAllOrderStatus {
            getAllOrderStatus {
              _id,
              name,
            }
          } 
            `
      }
    }).then((result) => {
      if(result.data.errors){
        
        console.log(result.data.errors)
      }
      else{
       const{getAllOrderStatus} = result.data.data;
       setStatus(getAllOrderStatus);
       console.log(getAllOrderStatus);
      }
     
    }).catch(error=>{
      console.log(error)
    });
    }
   
  }).catch(error=>{
    console.log(error)
  });
  },[])

  const OrderRow =( props)=> {
  
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
        <td style={{display:'flex',alignItems:'center'}}>
          {item.orderStatus.name}
          <Badge color="danger" style={{padding:'inherit'}} onClick={()=>toggleLarge(item._id,item.orderStatus._id)}>
            <i className="fa fa-edit fa-lg"></i>
          </Badge>
        </td>
        <td><Badge color={geyBadgeDelivery('تحویل شده')}>تحویل شده</Badge></td>
        <td>{item.price} تومان</td>
        <td><Badge color={geyBadgePaymentOpreations(item.payment)}>{item.payment ?' پرداخت شده' : 'لغو شده'}</Badge></td>
        
        <td><Link to={orderLinlk}><i className="fa fa-chevron-left fa-lg mt-10"  ></i></Link></td>
      </tr>
    )
  }
  const toggleLarge = (orderId,statusId)=>{
    setModal(!modal);
    setOrderID(orderId);
    setDefaultStatus(statusId)
  }
  const changeStatus =(event,name)=>{
    setStatusID(event.target.value);
    setStatusName(name)
  }
  const updateStatus = ()=>{
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        mutation UpdatePayment($paymentId : ID!, $orderstatusId : ID!) {
          UpdatePayment(paymentId : $paymentId, orderstatusId : $orderstatusId) {
            status,
            message
          }
        } 
          `,
          variables :{
            "paymentId": orderID,
            "orderstatusId": statusID
          }
    }
  }).then((result)=>{
    if(result.data.errors){
      console.log(result.data.errors)
    }
    else{
      toast.success(result.data.data.UpdatePayment.message);
      const newOrder =[...orders];
      const newData = newOrder.filter((item)=>{
        const itemData = item._id;
        const textData = orderID;
        return itemData.indexOf(textData)>-1
      })
      newData[0].orderStatus.name = statusName;
      newData[0].orderStatus._id = statusID;
      setModal(false)
    }
  }).catch((error)=>{
    console.log(error)
  })
  }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <div className="form-group">
                <ToastContainer />
            </div>
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
                      <th scope="col">  وضعیت سفارش</th> 
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
        <Modal isOpen={modal} toggle={()=>setModal(!modal)}
                        className={'modal-primary ' + props.className}>
          <ModalHeader toggle={()=>setModal(!modal)}>تغییر وضعیت سفارش   {orderID}</ModalHeader>
                    <ModalBody>
                      <FormGroup row>                 
                      {
                        status.map((item)=>
                        {
                          let id = `radio-${item._id}`;
                          
                          return(
                            <Col md="12"  key={item._id} className="status">
                            <FormGroup check className="radio">
                              <Input className="form-check-input"
                              type="radio"
                                id={id}
                                name="radios"
                                value={item._id}
                                onChange={(e)=>changeStatus(e,item.name)}                           
                                />
                              <Label check className="form-check-label" htmlFor="radio1">{item.name}</Label>
                            </FormGroup>
                            </Col>
                          )
                        }
                        
                        )
                      }
                    </FormGroup>                              
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={updateStatus}>ویرایش</Button>{' '}
                        <Button color="secondary" onClick={()=>setModal(!modal)}>لغو</Button>
                    </ModalFooter>
        </Modal>

      </div>
    )
  
}

export default AllOrders;
