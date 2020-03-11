import React,{useEffect, useState, useContext} from 'react';
import {
    Card,
    CardBody,
    Col,
    CardHeader,
    Spinner
} from 'reactstrap';
import {  Doughnut } from 'react-chartjs-2';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';

  
  
const OrdersStatus = (props)=>{
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  const [chartData,setChartData] = useState({
    labels: [
    ],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#d34836',
          '#72cb93',
          '#2f353a',
          '#e4e5e6',
          '#000000'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      }],
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
        query allOrderStatus {
          allOrderStatus {
           order,
            count
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
      const {allOrderStatus  } = result.data.data;
      
      const arrayHolder = {...chartData};
      allOrderStatus.map(item=>{
        arrayHolder.labels.push(item.order);
        arrayHolder.datasets[0].data.push(item.count)
      })
      setChartData(arrayHolder);
      
  }
   
  }).catch(error=>{
     console.log(error)
  });

  },[])
    return(
        
        <Col xs="6" sm="6" lg="6">
            <Card>
              <CardHeader>
                وضعیت سفارشات
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                {chartData.labels.length !==0 ? <Doughnut data={chartData} />:<Spinner />}
                </div>
              </CardBody>
           </Card>
          </Col>
    )
}
export default React.memo(OrdersStatus)