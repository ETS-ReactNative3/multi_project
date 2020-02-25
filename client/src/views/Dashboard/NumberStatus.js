import React,{useEffect, useState, useContext} from 'react';
import {
    Card,
    Col,
    CardHeader,
    CardBody,
    CardFooter,
    Row,
    Spinner
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import classes from './Dashboard.module.css';

import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';

  const options = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false
  }
    
const NumberStatus = (props)=>{
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  const [countallPay,setCounAllPay] = useState(0);
  const [allPay, seAllPay] = useState(0);
  const [countPayNow,setCountPayNow] = useState(0);
  const [chartData,setChartData] = useState({
    labels: [],
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
        data: [],
      },
    ],
  })
  useEffect(()=>{
    dispatch({type:'check',payload:props});
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        query paymentAtday {
          paymentAtDay {
            day {
              day,
              count
            },
            countallPay,
            allPay,
            countPayNow
          }
        } 
          `
    }
  }).then((result) => {
    if(result.data.errors){
      //dispatch({type:'logout',payload:props});
      console.log(result.data.errors)
    }
    else{
      const {day,countallPay,allPay,countPayNow} = result.data.data.paymentAtDay;
      setCounAllPay(countallPay);
      seAllPay(allPay);
      setCountPayNow(countPayNow)
      const arrayHolder = {...chartData};
      day.map(item=>{
        arrayHolder.labels.push(item.day);
        arrayHolder.datasets[0].data.push(item.count)
      })
      setChartData(arrayHolder);
    }
   
  }).catch(error=>{
     console.log(error)
  });

  },[])
  // console.log(chartData)
    return(
        
        <Col xs="6" sm="6" lg="6">
        <Card>
          <CardHeader>
            تعداد پرداختی های ده روز گذشته
          </CardHeader>
          {chartData.labels.length !==0 ?
          <>
          <CardBody>
            <div className="chart-wrapper">
              <Line data={chartData} options={options} />
            </div>
          </CardBody>
          <CardFooter>
            <Row>
              <Col xs="4" sm="4" lg="4" className={classes.show_info_line_chart}>
                <span>دریافتی امروز</span>
                <span> {countPayNow} تومان</span>
              </Col>
              <Col xs="4" sm="4" lg="4" className={classes.show_info_line_chart}>
                <span> تعداد پرداختی ها</span>
                <span> {countallPay}</span>
              </Col>
              <Col xs="4" sm="4" lg="4" className={classes.show_info_line_chart} style={{border:'0'}}>
                <span>دریافت کل</span>
                <span> {allPay} تومان</span>
              </Col>
            </Row>
          </CardFooter>
          </>
          :<Spinner />}
        </Card>
    </Col>
    )
}
export default React.memo(NumberStatus)