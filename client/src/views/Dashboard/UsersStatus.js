import React,{useEffect, useState, useContext} from 'react';
import {
    Card,
    CardBody,
    Col,
    Spinner,
    CardHeader
} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
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
    
const UsersStatus = (props)=>{
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  const [chartData,setChartData] = useState( {
    labels: [],
    datasets: [
      {
        label: 'تعداد کاربران',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
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
        
        <Col xs="6" sm="6" lg="6">
           <Card>
            <CardHeader>
              تعداد کاربران
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
              {chartData.labels.length !==0 ? <Bar data={chartData} options={options} />: <Spinner />}
              </div>
            </CardBody>
          </Card>
          </Col>
    )
}
export default React.memo(UsersStatus)