import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button  } from 'reactstrap';
import './Order.css';
import Artboard from '../../assets/img/status/0eab59b0.svg';
import OrderConfirmation from '../../assets/img/status/d5d5e1d2.svg';
import OrderPreparation from '../../assets/img/status/3db3cdeb.svg';
import Eccentricity from '../../assets/img/status/332b9ff1.svg';
import GetInTheCenter from '../../assets/img/status/d599fbb2.svg';
import Delivery from '../../assets/img/status/d599fbb2.svg';
class Order extends Component {

  render() {

    

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
              <Card>
                <CardHeader>
                    <h3>سفارش DKC-1721762</h3>
                    <h6>ثبت شده در تاریخ 12 شهریور 1393</h6>
                </CardHeader>
                <CardBody className="CardBody" >
                    <Row>
                        <Col>
                            تحویل گیرنده:
                            mahdi hasanzadeh
                        </Col>
                        <Col>
                            شماره تماس تحویل گیرنده:
                            ۰۹۱۵۶۶۷۶۱۹۸ 
                        </Col>
                    </Row> 
                </CardBody>
                <CardBody className="CardBody">
                    <Row>
                        <Col>
                        آدرس تحویل گیرنده:
                        3خراسان جنوبی، فردوس، ایران-خراسان جنوبی-فردوس-خیابان مطهری-مطهری                      
                        </Col>
                        <Col>
                        تعداد مرسوله:
                        ۱ مرسوله
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
                        ۱۱۱,۵۰۰ تومان   
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
                            <img src={Artboard} className="status" />  
                            <span>در صف بررسی</span>  
                        </Col>
                        <Col>
                            <img src={OrderConfirmation} className="status is-active" />
                            <span className="is-active">تایید سفارش</span>
                        </Col>
                        <Col>
                            <img src={OrderPreparation} className="status" />
                            <span>آماده‌سازی سفارش</span>
                        </Col>
                        <Col>
                            <img src={Eccentricity} className="status" />
                            <span>خروج از مرکز پردازش</span>
                        </Col>
                        <Col>
                            <img src={GetInTheCenter} className="status" />
                            <span>دریافت در مرکز توزیع </span>
                        </Col>
                        <Col>
                            <img src={Delivery} className="status" />
                            <span>تحویل به مامور ارسال</span>
                        </Col>
                    </Row>
                </CardBody>
                <CardBody className="CardBody">
                    <Row>
                        <Col>
                        کد مرسوله: 1161002                        
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
                        <td><img src="https://dkstatics-public.digikala.com/digikala-products/179110.jpg?x-oss-process=image/resize,m_lfit,h_150,w_150/quality,q_80" /></td>
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
      </div>
    )
  }
}

export default Order;
