import React,{useEffect, useState} from 'react';
import {
    Card,
    CardBody,
    Col
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
const brandPrimary = getStyle('--primary')
// Card Chart 1
const cardChartData = {
    labels: ['فروردین', 'اردیبهشت', 'خرداد ', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذز', 'دی ', 'بهمن', 'اسفند'],
    datasets: [
      {
        label: 'محصول',
        backgroundColor: brandPrimary,
        borderColor: 'rgba(255,255,255,.55)',
        data: [21, 81, 72, 45, 34, 14, 40, 75, 34,53, 10, 88],
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
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    }
  }
const NumberProducts = (props)=>{

    return(
        
        <Col xs="12" sm="6" lg="4">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                
                <div className="text-value">8.823</div>
                <div> تعداد محصولات</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData} options={cardChartOpts} height={70} />
              </div>
            </Card>
          </Col>
    )
}
export default React.memo(NumberProducts)