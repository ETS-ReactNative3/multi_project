import React,{useEffect, useState} from 'react';
import {
    Card,
    CardBody,
    Col,
    CardHeader
} from 'reactstrap';
import {  Doughnut } from 'react-chartjs-2';


const doughnut = {
    labels: [
      'در حال پردازش',
      'در صف بررسی',
      'در حال آماده سازی',
      'خروج از مرکز پردازش',
      'تحویل شده'
    ],
    datasets: [
      {
        data: [300, 50, 100, 75, 25],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#d34836',
          '#72cb93'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      }],
  };
  
  
  
  
const OrdersStatus = (props)=>{

    return(
        
        <Col xs="6" sm="6" lg="6">
            <Card>
              <CardHeader>
                وضعیت سفارشات
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Doughnut data={doughnut} />
                </div>
              </CardBody>
           </Card>
          </Col>
    )
}
export default React.memo(OrdersStatus)