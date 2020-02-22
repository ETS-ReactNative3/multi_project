import React,{useEffect, useState} from 'react';
import {
    Card,
    Col,
    CardHeader,
    CardBody
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
//Line2
const line = {
    labels: ['24', '25', '26', '27', '28', '29', '30', '01', '02' , '03'],
    datasets: [
      {
        label: 'مبلغ پرداختی',
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
        data: [1500000, 2000000, 1750000, 787000, 525000, 1250000, 5110000, 4440000, 5200000, 1000000],
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
    
const PaymentsStatus = (props)=>{

    return(
        
        <Col xs="6" sm="6" lg="6">
            <Card>
                <CardHeader>
                  پرداختی های ده روز گذشته
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Line data={line} options={options} />
                  </div>
                </CardBody>
            </Card>
          </Col>
    )
}
export default React.memo(PaymentsStatus)