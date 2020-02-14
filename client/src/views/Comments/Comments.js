import React,{useEffect, useContext, useState} from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table ,Button,Spinner,Modal,ModalBody,ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';

const Comments =(props)=> {
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
          query getAllComment($page : Int, $limit : Int, $productId : ID) {
            getAllComment(page : $page, limit : $limit, productId : $productId) {
              _id
              user {
                fname,
                lname
              },
              product {
                fname
              },           
              title,
              like,
              dislike,
              createdAt,
              check  
            }
          }    
            `,
            variables :{
              "page": 1,
              "limit": 10,
              "productId": null
            }
      }
    }).then((result) => {
      if(result.data.errors){
        dispatch({type:'logout',payload:props});
      }
      else{
        const {getAllComment} = result.data.data;
        setComments(getAllComment);
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
                        let commentLink = `comments/comment/${item._id}`;
                        let date = new Date(item.createdAt)
                        date = date.toLocaleDateString('fa-IR');
                        return(
                        <tr key={item._id}>
                          <td>{item.product.fname}</td>
                          <td>{item.user.fname} {item.user.lname}</td>
                          <td >{date}</td>
                          <td>{item.title}</td>
                          <td>{item.like}</td>
                          <td >{item.dislike}</td>
                          <td>
                            <Badge color={getBadge(item.check)} onClick={()=>toggleLarge(item._id)}>
                              {item.check ?'تایید شده': 'تایید نشده'}
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

export default Comments;
