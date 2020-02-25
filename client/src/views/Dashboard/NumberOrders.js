import React,{useEffect, useState, useContext} from 'react';
import {
    Card,
    CardBody,
    Col,
    Spinner
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';


  
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
        }],
      yAxes: [
        {
          display: false,
        }],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  };

const NumberOrders = (props)=>{
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  const [chartData,setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'سفارش',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        data: [],
      },
    ],
  }
  
)
  useEffect(()=>{
    dispatch({type:'check',payload:props});
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        query paymentProveAtmonth {
          paymentProveAtmonth {
            month,
            value
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
      const {paymentProveAtmonth  } = result.data.data;
      const arrayHolder = {...chartData};
      paymentProveAtmonth.map(item=>{
        arrayHolder.labels.push(item.month);
        arrayHolder.datasets[0].data.push(item.value)
      })
      setChartData(arrayHolder);
    }
   
  }).catch(error=>{
     console.log(error)
  });

  },[])
    return(
        
        <Col xs="12" sm="6" lg="4">
        <Card className="text-white bg-warning">
          <CardBody className="pb-0">
            <div className="text-value">225</div>
            <div>تعداد سفارشات </div>
          </CardBody>
          <div className="chart-wrapper" style={{ height: '70px' }}>
          {chartData.labels.length !==0 ? <Line data={chartData} options={cardChartOpts} height={70} />:<Spinner />}
          </div>
        </Card>
      </Col>
    )
}
export default React.memo(NumberOrders)