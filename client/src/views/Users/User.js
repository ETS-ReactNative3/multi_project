import React, { useState, useEffect, useContext } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Spinner } from 'reactstrap';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const User =(props)=> {
 const {id} =props.match.params;
 if(!id){
   props.history.replace('/dashboard')
 }
 const {dispatch} = useContext(AuthContext);
 const [user,setUser] = useState([]);
 const [loading,setLoading] = useState(false);
 const token =  GetToken();
 useEffect(()=>{
  dispatch({type:'check',payload:props});
  setLoading(true)
  axios({
    url: '/',
    method: 'post',
    headers:{'token':`${token}`},
    data: {
      query: `
      query getAllUsers($userId : ID) {
        getUsers(userId : $userId) {
          _id,
          fname,
          lname,
          phone,
          code,
          number,
          birthday,
          gender,
          email,
          verify,
        }
      }
        `,
        variables :{
          "userId":id  
      }
  }
}).then((result) => {
  if(result.data.errors){
    dispatch({type:'logout',payload:props});
    toast.error(result.data.errors[0].message);
  }
  else{
    const {getUsers} = result.data.data;
    setUser(getUsers[0]);
    
    setLoading(false)
  }
 
}).catch(error=>{
  console.log(error)
});
},[])
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
          <div className="form-group">
                <ToastContainer />
          </div>
          {
             loading && !user ? <center><Spinner /></center> :
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i></strong>
              </CardHeader>
              <CardBody>
                  <Row>
                    <Col>
                      نام :
                    </Col>
                    <Col>
                    {
                      user.fname
                    }
                    </Col>
                    <Col>
                      نام خانوادگی :
                    </Col>
                    <Col>
                    {
                      user.lname
                    }
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
                      شماره تماس :
                    </Col>
                    <Col>
                    {
                      user.phone
                    }
                    </Col>
                    <Col>
                       کد پستی :
                    </Col>
                    <Col>
                    {
                      user.code ?  user.code : '**'
                    }
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
                      شماره ثابت :
                    </Col>
                    <Col>
                    {
                      user.number ? user.number : '**'
                    }
                    </Col>
                    <Col>
                        تاریخ تولد :
                    </Col>
                    <Col>
                    {
                      user.birthday ?  user.birthday : '**'
                    }
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
                       جنسیت :
                    </Col>
                    <Col>
                    {
                      user.gender ? user.gender : '**'
                    }
                    </Col>
                    <Col>
                         ایمیل :
                    </Col>
                    <Col>
                    {
                      user.email ?  user.email : '**'
                    }
                    </Col>
                  </Row>
              </CardBody>
            </Card>
          }
            
          </Col>
        </Row>
      </div>
    )
  
}

export default React.memo(User);
