import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table,  } from 'reactstrap';

import ordersData from './OrdersData'

function UserRow(props) {
  const user = props.user
  const orderLinlk = `/users/orders/${user.id}/order/${user.orderNumber}`
 const geyBadgeDelivery = (deliveryTime) =>{
  return deliveryTime === 'تحویل شده' ? 'success' :
      deliveryTime === 'در حال پردازش' ? 'warning' :
        deliveryTime === 'لغو شده' ? 'danger' :
            'primary'
  }
  const geyBadgePaymentOpreations = (paymentOperations) =>{
    return paymentOperations === 'پرداخت شده' ? 'success' :
       paymentOperations === 'لغو شده' ? 'danger' :
              'primary'
    }
  return (
    <tr key={user.id.toString()}>
      <th scope="row">{user.id}</th>
      <td>{user.orderNumber}</td>
      <td>{user.dateOrder}</td>
      <td><Badge color={geyBadgeDelivery(user.deliveryTime)}>{user.deliveryTime}</Badge></td>
      <td>{user.amountPayable}</td>
      <td>{user.totalAmount} تومان</td>
      <td><Badge color={geyBadgePaymentOpreations(user.paymentOperations)}>{user.paymentOperations}</Badge></td>
      
      <td><Link to={orderLinlk}><i className="fa fa-chevron-left fa-lg mt-10"  ></i></Link></td>
    </tr>
  )
}

class Orders extends Component {

  render() {

    const orderList = ordersData.filter((user) => user.id < 20)

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
                      <th scope="col">#</th>             
                      <th scope="col">شماره سفارش</th>            
                      <th scope="col"> تاریخ ثبت سفارش</th>
                      <th scope="col">زمان تحویل سفارش</th>
                      <th scope="col">مبلغ قابل پرداخت</th>
                      <th scope="col">مبلغ کل</th>
                      <th scope="col">عملیات پرداخت</th>
                      <th scope="col">جزئیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderList.map((user, index) =>
                      <UserRow key={index} user={user}/>
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
}

export default Orders;
