import React,{useEffect, useContext, useState} from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table ,Button,Spinner,Modal,ModalBody,ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';

const UserComments =(props)=> {
  const {userid} =props.match.params;
 if(!userid){
   props.history.replace('/dashboard')
 }
  const {dispatch} = useContext(AuthContext);
  const [comments,setComments] = useState([]);
  const [loading,setLoading] = useState(false);
  const [modal,setModal] = useState(false);
  const [commentID,setCommentID] = useState(null)
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
                product {
                  fname
                },
                _id,
                title,
                like,
                dislike,
                createdAt,
                check  
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
      }
      else{
        const {getUsers} = result.data.data;
        console.log(getUsers);
        setComments(getUsers);
        setLoading(false);
      }
     
    }).catch(error=>{
      console.log(error)
    });      
},[])
  const getBadge = (status) => {
    return status ? 'success' : 'danger'
  }
  const toggleLarge=(id)=> {
    setCommentID(id);
    setModal(!modal)
  }
  const changeStatus =() =>{
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        mutation updateProductComment($commentId : ID!) {
          UpdateCommentProduct(commentId : $commentId) {
            status
          }
        }    
          `,
          variables :{
            "commentId": commentID
          }
    }
  }).then((result) => {
    if(result.data.errors){
      console.log('خطا در تغییر وضعیت')
    }
    else{
      const newComments =[...comments];
      const newData = newComments.filter((item)=>{
        const itemData = item._id;
        const textData = commentID;
        return itemData.indexOf(textData)>-1
      })
       
       newData[0].check = !newData[0].check;
      setComments(newData);
      setModal(false);
    }
   
  }).catch(error=>{
    console.log(error)
  });
  }
    return (
      <div className="animated fadeIn">
      {
        loading ? <center><Spinner /></center> :
        
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>نظرات <small className="text-muted">کاربران</small>
                
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>                    
                      <th scope="col">نام محصول</th>
                      <th scope="col"> کاربر</th>
                      <th scope="col">تاریخ ثبت نظر</th>
                      <th scope="col">عنوان</th>
                      <th scope="col">تعداد لایک</th>
                      <th scope="col">تعداد دیس لایک</th>
                      <th scope="col">وضعیت</th>
                      <th scope="col">عملیات </th>                     
                    </tr>
                  </thead>
                  <tbody>
                    {
                      comments.map((item)=>
                      {
                          return(
                            item.comment.map((comment)=>{
                              let commentLink = `commentDetails/${comment._id}`;
                              let date = new Date(comment.createdAt)
                              date = date.toLocaleDateString('fa-IR');
                             
                              return(
                                <tr key={comment._id}>
                                  <td>{comment.product.fname}</td>
                                  <td>{item.fname} {item.lname}</td>
                                  <td >{date}</td>
                                  <td>{comment.title}</td>
                                  <td>{comment.like}</td>
                                  <td >{comment.dislike}</td>
                                  <td>
                                    <Badge color={getBadge(comment.check)} onClick={()=>toggleLarge(comment._id)}>
                                      {comment.check ?'تایید شده': 'تایید نشده'}
                                    </Badge>
                                    </td>
                                  <td>
                                    <Row>
                                        <Col xs="3">
                                          <NavLink to={commentLink}><Button type="submit" size="sm" color="primary"><i className="fa fa-info-circle"></i> </Button></NavLink>
                                        </Col>
                                        <Col xs="3">
                                          <Button type="submit" size="sm" color="danger"><i className="fa fa-trash fa-lg"></i></Button>
                                        </Col>
                                    </Row>
                                    
                                    </td>
                                </tr>
                                )
                            })
                          )
                         
                          })
                    }
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      }
        
        <Modal isOpen={modal} toggle={toggleLarge} className={'mr ' + props.className}>
                    <ModalBody>
                      آیا مطمئن به تغییر وضعیت این نظر هستید؟
                                               
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={changeStatus}> تغییر وضعیت</Button>{' '}
                        <Button color="secondary" onClick={toggleLarge}>لغو</Button>
                    </ModalFooter>
                    </Modal>

      </div>
    )
  
}

export default UserComments;
