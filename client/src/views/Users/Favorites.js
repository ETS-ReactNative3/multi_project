import React, { useState, useEffect, useContext  } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table,Spinner  } from 'reactstrap';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Order.css'

const UserRow = (props) =>{
  const favorite = props.favorite;
  
  return (
    <tr key={favorite._id} className="favorite-item">
      <td>
      <span>{favorite.product.fname}</span>
      <span>{favorite.product.ename}</span>
      </td>
      <td>
          <img 
          src={`${process.env.REACT_APP_PUBLIC_URL}${favorite.product.original}`} 
          alt={favorite.product.original}
          className="Prieview"
           /></td>
      <td>{favorite.product.rate ? favorite.product.rate :'0'}</td>
      <td>
          <span className="color-peoduct" style={{background:favorite.product.attribute[0].color}}>
          
          </span>
      
      </td>
      
      <td>{favorite.product.attribute[0].price} تومان</td>
    </tr>
  )
}

const Favorites =(props)=> {
    const {userid} =props.match.params;
    if(!userid){
      props.history.replace('/dashboard')
    }
    const {dispatch} = useContext(AuthContext);
    const [favorites,setFavorites] = useState([]);
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
              _id
              fname,
              lname,
              comment {
                _id
                title,
                like {
                  _id
                },
                dislike {
                  _id
                },
                createdAt,
                check,
                product {
                  _id
                }
              },
              favorite {
                _id,
                product{
                  fname,
                  ename,
                  original,
                  rate,
                  attribute{
                    color,
                    price
                  }
                }
              },
              payment {
                _id
              }
            }
          }


         
            `,
            variables :{
              "userId":userid  
          }
      }
    }).then((result) => {
      if(result.data.errors){
        dispatch({type:'logout',payload:props});
        toast.error(result.data.errors[0].message);
      }
      else{
        setFavorites(result.data.data.getUsers);
        console.log(result.data.data.getUsers);
        setLoading(false)
      }
     
    }).catch(error=>{
      console.log(error)
    });
    },[])

    if(loading)
    { 
      return(
      <div className="animated fadeIn">
        <center><Spinner /></center>
      </div>
      )   
    }
    else {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col xl={12}>
            <div className="form-group">
                  <ToastContainer />
            </div>
            
              
                 {
                    favorites.map((favorite)=>
                    <Card key={favorite._id}>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i> محصولات مورد علاقه  { ' '}
                        <small className="text-muted">{`${favorite.fname} ${favorite.lname}` }</small>
                      </CardHeader>
                      <CardBody>
                        <Table responsive  hover>
                          <thead>
                            <tr >                                   
                              <th scope="col">نام محصول</th>          
                              <th scope="col">عکس</th>
                              <th scope="col">امتیاز</th>
                              <th scope="col">رنگ</th>
                              <th scope="col">قیمت</th>
                              
                            </tr>
                          </thead>
                          <tbody>
                            
                            {
                             
                             favorite.favorite.map((item) =>
                               <UserRow key={item._id} favorite={item}/>
                                )
                            }
                          </tbody>
                        </Table>
                      </CardBody>
                      </Card>
                    )
                 }
               
             
           
            
             
            </Col>
          </Row>
        </div>
      )
    }
    
  
}

export default React.memo(Favorites);
