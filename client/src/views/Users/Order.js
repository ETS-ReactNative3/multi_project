import React, { useEffect,useState,useContext } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button  } from 'reactstrap';
import '../Orders/Order.css';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const OrderDetails =(props)=>{
    const {orderNumber} = props.match.params;
    if(!orderNumber){
        props.history.replace('/')
    }
    const {dispatch} = useContext(AuthContext);
    const token =  GetToken();
    const [order,setOrder] = useState(null);
    const [status,setStatus] = useState(null);
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
              product {
                fname,
                ename,
                image
              }
              payment,
              resnumber,
              attribute {
                seller {
                  name
                },
                warranty {
                  name
                },
                discount,
                color,
                price
              },
              discount,
              count,
              price,
              ,
              orderStatus{
                name,
                _id
              },
              receptor {
                fname,
                lname,
                address,
                phone
              },
              createdAt
            }
          }  
            `,
            variables :{
                "orderId": orderNumber      
            }
      }
    }).then((result) => {
      if(result.data.errors){
        //dispatch({type:'logout',payload:props});
        toast.error(result.data.errors)
      }
      else{
        const {getAllPayment} =result.data.data;
        if(getAllPayment)
        {
            setOrder(getAllPayment[0])
        }
        
      }
     
    }).catch(error=>{
       toast.error(error)
    });


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
            image,
          }
        } 
          `
    }
  }).then((result) => {
    if(result.data.errors){
      
      toast.error(result.data.errors)
    }
    else{
     const{getAllOrderStatus} = result.data.data;
      setStatus(getAllOrderStatus); 
    }
   
  }).catch(error=>{
    console.log(error)
  });

    },[])
    return (
      <div className="animated fadeIn">
      {
          order?
          <Row>
          <Col xl={12}>
            <div className="form-group">
                <ToastContainer />
            </div>
              <Card>
                <CardHeader>
                    <h3>سفارش {order._id}</h3>
                    <h6>ثبت شده در تاریخ {new Date(order.createdAt).toLocaleDateString('fa-IR')}</h6>
                </CardHeader>
                <CardBody className="CardBody" >
                    <Row>
                        <Col>
                            تحویل گیرنده : {order.receptor.fname} {order.receptor.lname} 
                            
                        </Col>
                        <Col>
                            شماره تماس تحویل گیرنده : {order.receptor.phone}
                            
                        </Col>
                    </Row> 
                </CardBody>
                <CardBody className="CardBody">
                    <Row>
                        <Col>
                        آدرس تحویل گیرنده: {order.receptor.address}                  
                        </Col>
                        <Col>
                        تعداد محصولات مرسوله : {order.count}
                        </Col>
                    </Row>
                </CardBody>
                <CardBody className="CardBody">
                    <Row>
                        <Col>
                        مبلغ قابل پرداخت:
                        ۰                        
                        </Col>
                        <Col>
                        مبلغ کل:
                        {order.price} تومان   
                        </Col>
                    </Row>
                </CardBody>
              </Card>
              <h6>مرسوله ۱ از ۱</h6>
              <Card>
                <CardHeader>
                    <h6>تحویل به مامور ارسال</h6>
                </CardHeader>
                <CardBody>
                    <Row>
                      {
                        status.map((item)=>{
                          
                          return(
                        <Col key={item._id} className="status-order">
                            <img 
                             src={require(`${process.env.REACT_APP_PUBLIC_URL}${item.image}`)}
                             className={`status-img ${order.orderStatus._id===item._id? 'is-active':null}`}
                             alt="pic"
                              />  
                            <span style={order.orderStatus._id===item._id?{color:'#000'}:null}>{item.name}</span>  
                        </Col>
                          )
                        })
                      }
                        
                       
                    </Row>
                </CardBody>
                <CardBody className="CardBody">
                    <Row>
                        <Col>
                        کد مرسوله: {order._id.substr(18,24)}                        
                        </Col>
                        <Col>
                        زمان تحویل: -  
                        </Col>
                    </Row>
                </CardBody>
                <CardBody className="CardBody">
                    <Row>
                        <Col>
                        نحوه ارسال سفارش: پست پیشتاز با ظرفیت اختصاصی برای دیجی کالا
                        </Col>
                        <Col>
                        هزینه ارسال : رایگان
                        </Col>
                    </Row>
                </CardBody>
                <CardBody className="CardBody">
                    <Row>
                        <Col style={{textAlign:'center'}}>
                        مبلغ این مرسوله: {order.price} تومان
                        </Col>
                        
                    </Row>
                </CardBody>
                
              </Card>
              <Card>
                <CardBody>
                    <Table responsive>
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>نام محصول</th>
                        <th>تعداد</th>
                        <th>قیمت واحد</th>
                        <th>قیمت کل</th>
                        <th>تخفیف</th>
                        <th>قیمت نهایی</th>
                        <th>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>
                          <img 
                          src={require(`${process.env.REACT_APP_PUBLIC_URL}${order.product.image[0]}`)} 
                          alt={order.product.image[0]}
                          className="Preview"
                            />
                        </td>
                        <td className="sp-span">
                        
                          <span>{order.product.fname}</span>
                          <span>فروشنده : {order.attribute[0].seller.name}</span>
                          <span className="box-shape">
                            رنگ : {' '} 
                            <span style={{background:order.attribute[0].color}} className="shape"></span>
                             </span>
                        </td>
                        <td>{order.count}</td>
                        <td>
                        {order.attribute[0].price} تومان
                        </td>
                        <td>
                        {order.attribute[0].price * order.count} تومان
                        </td>
                        <td>{((order.attribute[0].price * order.count)-order.price)/100} %</td>
                        <td>{order.price} تومان</td>
                        <td>   <Button block color="primary">مشاهده نظرات</Button></td>
                    </tr>
                    </tbody>
                    </Table>
                  </CardBody>
              </Card>
          </Col>
        </Row>
        :null
      }
        
      </div>
    )
  
}

export default OrderDetails;
