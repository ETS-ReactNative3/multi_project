import React,{useEffect, useState} from 'react';
import {
    Card,
    CardBody,
    Col
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
const brandInfo = getStyle('--info')
// Card Chart 2
const cardChartData = {
    labels: ['فروردین', 'اردیبهشت', 'خرداد ', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذز', 'دی ', 'بهمن', 'اسفند'],
    datasets: [
      {
        label: 'کامنت',
        backgroundColor: brandInfo,
        borderColor: 'rgba(255,255,255,.55)',
        data: [78, 81, 85, 45, 34, 12, 40, 25, 34,53, 32, 88],
        
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
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },
  
        }],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, cardChartData.datasets[0].data) - 5,
            max: Math.max.apply(Math, cardChartData.datasets[0].data) + 5,
          },
        }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  };
  
  
const NumberComments = (props)=>{

    return(
        
        <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <div>تعداد کامنت ها</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData} options={cardChartOpts} height={70} />
              </div>
            </Card>
          </Col>
    )
}
export default React.memo(NumberComments)