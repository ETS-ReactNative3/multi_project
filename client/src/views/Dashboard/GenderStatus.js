import React,{useEffect, useState, useContext} from 'react';
import {
    Card,
    Col,
    Spinner,
    Progress
} from 'reactstrap';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';


  
const GenderStatus = (props)=>{
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  const [malePercent,setMalePercent] = useState(0);
  const [femalePercent,setFemalePercent] = useState(0);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    dispatch({type:'check',payload:props});
    setLoading(true)
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        query allUserCount {
          allUserCount {
            Male,
            Female
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
      const {allUserCount} = result.data.data;
      setMalePercent(allUserCount.Male);
      setFemalePercent(allUserCount.Female);
      setLoading(false);
     
    }
   
  }).catch(error=>{
     console.log(error)
  });

  },[])
    return(
        
        <Col xs="12" sm="12" lg="12">
        {
          loading  ? <Spinner />:
          <Card>       
          <ul style={{paddingTop:'28px'}}>
                    <div className="progress-group" style={{paddingLeft:'22px'}}>
                      <div className="progress-group-header">
                        <i className="icon-user progress-group-icon"></i>
                        <span className="title">مردان</span>
                        <span className="ml-auto font-weight-bold">{malePercent}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="warning" value={malePercent} />
                      </div>
                    </div>
                    <div className="progress-group mb-5" style={{paddingLeft:'22px'}}>
                      <div className="progress-group-header">
                        <i className="icon-user-female progress-group-icon"></i>
                        <span className="title">زنان</span>
                        <span className="ml-auto font-weight-bold">{femalePercent}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="warning" value={femalePercent} />
                      </div>
                    </div>

          </ul>
        </Card>
        }
             
          </Col>
    )
}
export default React.memo(GenderStatus)