import React,{useEffect, useState, useContext} from 'react';
import {
    Card,
    CardBody,
    Col,
    Spinner
} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
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
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
}
const NumberUser = (props)=>{
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  const [chartData,setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'کاربر',
        backgroundColor: 'rgba(255,255,255,.3)',
        borderColor: 'transparent',
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
        query userAtmonth {
          userAtmonth {
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
      const {userAtmonth  } = result.data.data;
      const arrayHolder = {...chartData};
      userAtmonth.map(item=>{
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
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <div className="text-value">9.823</div>
                <div>تعداد کاربران </div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              {chartData.labels.length !==0 ? <Bar data={chartData} options={cardChartOpts} height={70} /> : <Spinner />}
              </div>
            </Card>
          </Col>
    )
}
export default React.memo(NumberUser)