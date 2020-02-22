import React,{useEffect, useState} from 'react';
import {
    Card,
    CardBody,
    Col
} from 'reactstrap';
import { Line} from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';


const cardChartData = {
    labels: ['فروردین', 'اردیبهشت', 'خرداد ', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذز', 'دی ', 'بهمن', 'اسفند'],
    datasets: [
      {
        label: ' فروشنده',
        backgroundColor: 'rgba(255,255,255,.3)',
        borderColor: 'transparent',
        data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68],
      },
    ],
  };
  
  const cardChartOpts = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: false,
          barPercentage: 0.6,
        }],
      yAxes: [
        {
          display: false,
        }],
    },
  };
  
  
  
  
const NumberSeller = (props)=>{

    return(
        
        <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div className="text-value">225</div>
                <div>تعداد فروشنده ها </div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={cardChartData} options={cardChartOpts} height={70} />
              </div>
            </Card>
          </Col>
    )
}
export default React.memo(NumberSeller)