import React, { useEffect,useState,useContext } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button  } from 'reactstrap';
import './Order.css';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';
import Artboard from '../../assets/img/status/0eab59b0.svg';
import OrderConfirmation from '../../assets/img/status/d5d5e1d2.svg';
import OrderPreparation from '../../assets/img/status/3db3cdeb.svg';
import Eccentricity from '../../assets/img/status/332b9ff1.svg';
import GetInTheCenter from '../../assets/img/status/d599fbb2.svg';
import Delivery from '../../assets/img/status/d599fbb2.svg';
const OrderDetails =(props)=>{
    const {orderNumber} = props.match.params;
    if(!orderNumber){
        props.history.replace('/')
    }
    const {dispatch} = useContext(AuthContext);
    const token =  GetToken();
    const [order,setOrder] = useState(null)
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
              }
              payment,
              resnumber,
              attribute {
                seller {
                  name
                },
                warranty {
                  name
                }
              },
              discount,
              count,
              price,
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
        console.log(result.data.errors)
      }
      else{
        const {getAllPayment} =result.data.data;
        console.log(getAllPayment);
        setOrder(getAllPayment[0])
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
                        <Col>
                            <img src={Artboard} className="status" alt="pic" />  
                            <span>در صف بررسی</span>  
                        </Col>
                        <Col>
                            <img src={OrderConfirmation} className="status is-active"   alt="pic"/>
                            <span className="is-active">تایید سفارش</span>
                        </Col>
                        <Col>
                            <img src={OrderPreparation} className="status"  alt="pic" />
                            <span>آماده‌سازی سفارش</span>
                        </Col>
                        <Col>
                            <img src={Eccentricity} className="status"  alt="pic" />
                            <span>خروج از مرکز پردازش</span>
                        </Col>
                        <Col>
                            <img src={GetInTheCenter} className="status"   alt="pic"/>
                            <span>دریافت در مرکز توزیع </span>
                        </Col>
                        <Col>
                            <img src={Delivery} className="status"  alt="pic" />
                            <span>تحویل به مامور ارسال</span>
                        </Col>
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
                        مبلغ این مرسوله: ۱۱۱,۵۰۰ تومان
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
                        <td><img src="https://dkstatics-public.digikala.com/digikala-products/179110.jpg?x-oss-process=image/resize,m_lfit,h_150,w_150/quality,q_80" alt="pic" /></td>
                        <td>کیف لپ تاپ فراسو FNC470
                        سرویس ویژه دیجی کالا: 7 روز تضمین بازگشت کالا
                        فروشنده : دیجی‌کالا
                        رنگ : مشکی
                        </td>
                        <td>1</td>
                        <td>
                        ۱۱۱,۵۰۰ تومان
                        </td>
                        <td>
                        ۱۱۱,۵۰۰ تومان
                        </td>
                        <td>0</td>
                        <td>۱۱۱,۵۰۰ تومان</td>
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
