import React,{useEffect, useState} from 'react';
import {
    Card,
    Col,
    CardHeader,
    CardBody
} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
const bar = {
    labels: ['فروردین', 'اردیبهشت', 'خرداد ', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذز', 'دی ', 'بهمن', 'اسفند'],
    datasets: [
      {
        label: 'تعداد کاربران',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [21, 81, 72, 45, 34, 14, 40, 75, 34,53, 10, 88],
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
    
const UsersStatus = (props)=>{

    return(
        
        <Col xs="6" sm="6" lg="6">
           <Card>
            <CardHeader>
              تعداد کاربران
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar} options={options} />
              </div>
            </CardBody>
          </Card>
          </Col>
    )
}
export default React.memo(UsersStatus)