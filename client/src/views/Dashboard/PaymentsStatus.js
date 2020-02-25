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
    
const PaymentsStatus = (props)=>{
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  const [loading,setLoading] = useState(true)
  const [chartData,setChartData] = useState({
    labels: [],
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
        query paymenPricetAtDay {
          paymenPricetAtDay {
            day,
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
      const {paymenPricetAtDay} = result.data.data;
      const arrayHolder = {...chartData};
      paymenPricetAtDay.map(item=>{
        arrayHolder.labels.push(item.day);
        arrayHolder.datasets[0].data.push(item.count)
      })
      setChartData(arrayHolder);
      setLoading(false)
    }
   
  }).catch(error=>{
     console.log(error)
  });

  },[])
    return(
        
        <Col xs="6" sm="6" lg="6">
            <Card>
                <CardHeader>
                  پرداختی های ده روز گذشته
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                   {loading? <Spinner /> : <Line data={chartData} options={options} />} 
                  </div>
                </CardBody>
            </Card>
          </Col>
    )
}
export default React.memo(PaymentsStatus)