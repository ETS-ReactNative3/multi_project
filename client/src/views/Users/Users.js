import React, { useState, useEffect, useContext  } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table,Spinner,Button  } from 'reactstrap';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserRow =(props) =>{
  const user = props.user;
  const userLink = `/users/userinfo/${user._id}`;
  const orderLink =`users/orders/${user._id}`;
  const commentLink = `users/comments/${user._id}`;
  const favotitesLink = `users/favotites/${user._id}`;
  const getBadge = (status) => {
    return status ? 'success' : 'danger' 
  }

  return (
    <tr key={user._id}>
      
      <td >
        <Link to={orderLink}>
        <Button type="submit" size="sm" color="warning">
          <i className="fa fa-shopping-bag fa-lg mt-10" style={{color:'#FFF'}} ></i>
        </Button>
        </Link>
      </td>
      <td>
        <Link to={favotitesLink}>
          <Button size="sm" color="danger">
            <i className="fa fa-heart-o fa-lg mt-10" ></i>
          </Button>
        </Link>
      </td>
      <td>
        <Link to={commentLink}> 
          <Button size="sm" color="primary">
            <i className="fa fa-comments fa-lg mt-10"></i>
          </Button>        
        </Link>
      </td>
      <td><Link to={userLink}>{user.phone}</Link></td>
      <td>{user.fname}</td>
      <td>{user.lname}</td>
      <td>{user.code ? user.code : '**' }</td>
      <td>{user.number ? user.number :'**' }</td>
      <td>{user.email ? user.email : '**'}</td>
      <td><Link to={userLink}><Badge color={getBadge(user.verify)}>{user.verify ? 'تایید شده' : 'تایید نشده'}</Badge></Link></td>
    </tr>
  )
}

const Users =(props) =>{
  
    const {dispatch} = useContext(AuthContext);
    const [users,setUsers] = useState([]);
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
              "userId":null  
          }
      }
    }).then((result) => {
      if(result.data.errors){
        dispatch({type:'logout',payload:props});
        toast.error(result.data.errors[0].message);
      }
      else{
        const {getUsers} = result.data.data;
        setUsers(getUsers);
        setLoading(false)
      }
     
    }).catch(error=>{
      console.log(error)
    });
    },[])

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
          <div className="form-group">
                <ToastContainer />
          </div>
          {
            loading ? <center><Spinner /></center> :
            <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">شماره تماس</th>
                    <th scope="col">نام</th>
                    <th scope="col">نام خانوادگی</th>
                    <th scope="col">کد پستی</th>
                    <th scope="col">تلفن ثابت</th>
                    <th scope="col">ایمیل</th>
                    <th scope="col">وضعیت</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) =>
                    <UserRow key={user.phone} user={user}/>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          }
           
          </Col>
        </Row>
      </div>
    )
  }


export default React.memo(Users);
