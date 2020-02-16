import React,{useEffect, useContext, useState} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Spinner, Progress,Badge } from 'reactstrap';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';

import classes from './comment.module.css';
const CommentInfo =(props)=> {
    const {commentid} = props.match.params;
    if(!commentid){
        props.history.replace('/comments')
    }
    const {dispatch} = useContext(AuthContext);
    const token =  GetToken();
    const [comment,setComment] = useState(null);
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
              query getAllComment($page : Int, $limit : Int, $productId : ID, $commentId : ID) {
                getAllComment(page : $page, limit : $limit, productId : $productId, commentId : $commentId) {
                  user {
                  fname,
                  lname
                  },
                  product {
                    fname
                  },
                  survey {
                    survey {
                      name
                    },
                    value
                  },
                  title,
                  description,
                  negative,
                  positive,
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
                  "productId": null,
                  "commentId": commentid
                }
          }
        }).then((result) => {
          if(result.data.errors){
            dispatch({type:'logout',payload:props});
          }
          else{
            const {getAllComment} = result.data.data;
            setComment(getAllComment[0]);
            setLoading(false);
            console.log(getAllComment[0]);
          }
         
        }).catch(error=>{
          console.log(error)
        }); 
    },[])

    const getStatusSuervay = (val)=>{
        switch (val) {
            case "1":
                return 'خیلی بد';
            case "2":
                return 'بد';
            case "3":
                return 'معمولی';
            case "4":
                return 'خوب';
            case "5":
                return 'عالی';
            default:
                break;
        }
    }

    const getBadge = (status) => {
        return status ? 'success' : 'danger'
      }

    return (  
      <div className="animated fadeIn">
      {
         
          comment ?
          <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
              {comment.title}
              </CardHeader>
              <CardBody>
                <Row>
                    <Col xl="4">
                        <ul className={classes.CommentsUserShopping}>
                            <li>
                               <p>{comment.user.fname+comment.user.lname}</p> 
                                {/* <div className={classes.CommentsBuyerBadge}>خریدار</div> */}
                             </li>
                            <li>
                                <div className={classes.cell}>
                                    در تاریخ {new Date(comment.createdAt).toLocaleDateString('fa-IR')}
                                </div>
                            </li>
                        </ul>
                        {/* <div className={classes.c_message_light__opinion_positive}>
                            <i className="fa fa-thumbs-o-up fa-lg "></i> خرید این محصول را توصیه می‌کنم
                        </div>
                        <ul className={classes.CommentsUserShopping}>
                            <li>
                                <p>رنگ:</p>
                                <div className={classes.cellColor} style={{backgroundColor:'black'}}></div>
                            </li>
                            <li>
                            فروشنده : <span style={{color:'#1ca2bd',fontWeight:'bold'}}>دی جی کالا</span>
                            </li>
                        </ul> */}
                        <Badge color={getBadge(comment.check)}>
                              {comment.check ?'تایید شده': 'تایید نشده'}
                        </Badge>
                    </Col>
                    <Col xl="8">
                        <p className={classes.comment_description}>
                            {comment.description}
                        </p>
                        <div className={classes.comments_likes}>
                            موافقین و مخالفین نظر: 
                            <div className={classes.btn_like}>
                                <i className="fa fa-thumbs-o-up fa-lg "></i> {comment.like}
                            </div>
                            <div className={classes.btn_like}>
                                <i className="fa fa-thumbs-o-down fa-lg "></i> {comment.dislike}
                            </div>
                        </div>

                         <div class={classes.c_comments_evaluation}>
                            <div class={classes.c_comments_evaluation_positive}>
                                <span style={{color: '#00bfd6'}}>نقاط قوت</span>
                                <ul>
                                    {
                                        comment.positive.map((item,index)=>
                                            <li key={index}><i className="fa fa-circle fa"></i>{item}</li>
                                        )
                                    }  
                                </ul>
                            </div> 
                         </div>
                         <div class={classes.c_comments_evaluation}>
                            <div class={classes.c_comments_evaluation_positive}>
                                <span style={{color: '#ff637d'}}>نقاط ضعف</span>
                                <ul>
                                    {
                                        comment.negative.map((item,index)=>
                                            <li key={index}><i className="fa fa-circle fa"></i>{item}</li>
                                        )
                                    }  
                                </ul>
                            </div> 
                         </div>   

                        <div className={classes.c_comments_summary_box}>
                            <ul className={classes.c_comments_item_rating}>
                            {
                                comment.survey.map((item,index)=>
                                <li key={index}>
                                    <p>{item.survey.name}:</p>
                                    <Row>
                                        <Col xl="8">
                                            <Progress value={item.value} max="5" /> 
                                        </Col>
                                        <Col xl="4">
                                             <span>{getStatusSuervay(item.value)}</span>
                                        </Col>
                                        
                                    </Row>  
                                </li>
                                )
                            }
                               
                                
                            </ul>
                        </div>
                    </Col>
                </Row>
                
              </CardBody>
              
            </Card>
          </Col>
        </Row>
          :
          <center><Spinner /></center>
      }
        
      </div>
    )
  
}

export default CommentInfo;
