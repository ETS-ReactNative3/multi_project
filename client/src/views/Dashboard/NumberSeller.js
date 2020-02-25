import React,{useEffect, useState,useContext} from 'react';
import {
    Card,
    CardBody,
    Col,
    Spinner
} from 'reactstrap';
import { Line} from 'react-chartjs-2';
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
  };
  
  
  
  
const NumberSeller = (props)=>{
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  const [sum,setSum] = useState(0);
  const [chartData,setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'فروشنده',
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
        query sellerAtmonth {
          sellerAtmonth {
           month,,
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
      const {sellerAtmonth  } = result.data.data;
      const arrayHolder = {...chartData};
      let sum = 0;
      sellerAtmonth.map(item=>{
        sum += item.value;
        arrayHolder.labels.push(item.month);
        arrayHolder.datasets[0].data.push(item.value)
      })
      setSum(sum)
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
                <div className="text-value">{sum}</div>
                <div>تعداد فروشنده ها </div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
              {chartData.labels.length !==0 ?<Line data={chartData} options={cardChartOpts} height={70} />:<Spinner />}
              </div>
            </Card>
          </Col>
    )
}
export default React.memo(NumberSeller)