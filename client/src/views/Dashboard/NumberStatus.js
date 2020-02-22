import React,{useEffect, useState} from 'react';
import {
    Card,
    Col,
    CardHeader,
    CardBody,
    CardFooter,
    Row
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import classes from './Dashboard.module.css';
//Line
const line = {
    labels: ['24', '25', '26', '27', '28', '29', '30', '01', '02' , '03'],
    datasets: [
      {
        label: 'پرداختی',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40, 22, 41, 15],
      },
    ],
  };
  
  const options = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false
  }
    
const NumberStatus = (props)=>{

    return(
        
        <Col xs="6" sm="6" lg="6">
        <Card>
          <CardHeader>
            تعداد پرداختی های ده روز گذشته
          </CardHeader>
          <CardBody>
            <div className="chart-wrapper">
              <Line data={line} options={options} />
            </div>
          </CardBody>
          <CardFooter>
            <Row>
              <Col xs="4" sm="4" lg="4" className={classes.show_info_line_chart}>
                <span>دریافتی امروز</span>
                <span> 1000000 تومان</span>
              </Col>
              <Col xs="4" sm="4" lg="4" className={classes.show_info_line_chart}>
                <span> تعداد پرداختی ها</span>
                <span> 1112</span>
              </Col>
              <Col xs="4" sm="4" lg="4" className={classes.show_info_line_chart} style={{border:'0'}}>
                <span>دریافت کل</span>
                <span> 25000000 تومان</span>
              </Col>
            </Row>
          </CardFooter>
        </Card>
    </Col>
    )
}
export default React.memo(NumberStatus)