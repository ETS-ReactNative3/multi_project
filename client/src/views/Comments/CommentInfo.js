import React from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Progress } from 'reactstrap';
import classes from './comment.module.css';
const CommentInfo =(props)=> {
    const {commentid} = props.match.params;
    if(!commentid){
        props.history.replace('/comments')
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
              شیک و خوش دست نسبت به قیمت
              </CardHeader>
              <CardBody>
                <Row>
                    <Col xl="4">
                        <ul className={classes.CommentsUserShopping}>
                            <li>
                               <p>حمید بختیاری داویجانی</p> 
                                <div className={classes.CommentsBuyerBadge}>خریدار</div>
                             </li>
                            <li>
                                <div className={classes.cell}>
                                    در تاریخ ۲۳ بهمن ۱۳۹۸
                                </div>
                            </li>
                        </ul>
                        <div className={classes.c_message_light__opinion_positive}>
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
                        </ul>
                    </Col>
                    <Col xl="8">
                        <p className={classes.comment_description}>سلام. امروز به دستم رسید با گارانتی مایکروتل گرفتم که خوشبختانه هدفون داخلش گذاشته بود به اضافه ی گلس بسیار ضعیف. اما همین که تکمیل بود بسیار جای شکرش باقیه. من رنگ آبیش رو خریدم به مناسبت روز مادر برای مادربزرگم.
توجه کنین دوستان این گوشی برای پدر ومادر ها و مادربزرگ و پدربزرگ ها و کلا سن بالا ها بسیار مناسب هستش. در کل برای کسانی مه فقط اینستا و تلگرام و واتس اپ میخوان داشته باشن نرماله. در غیر این صورت اصلا روو این مدل فکر نکنین چون با هنگ و کندی مواجه میشین.
                با تشکر از دیجی کالا.
                        </p>
                        <div className={classes.comments_likes}>
                            موافقین و مخالفین نظر: 
                            <div className={classes.btn_like}>
                                <i className="fa fa-thumbs-o-up fa-lg "></i> 22
                            </div>
                            <div className={classes.btn_like}>
                                <i className="fa fa-thumbs-o-down fa-lg "></i> 2
                            </div>
                        </div>
                        <div className={classes.c_comments_summary_box}>
                            <ul className={classes.c_comments_item_rating}>
                               <li>
                                    <p>کیفیت ساخت:</p>
                                    <Row>
                                        <Col xl="8">
                                            <Progress value="3" max="5" /> 
                                        </Col>
                                        <Col xl="4">
                                             <span>معمولی</span>
                                        </Col>
                                        
                                    </Row>  
                                </li>
                                <li>
                                    <p> نوآوری:</p>
                                    <Row>
                                        <Col xl="8">
                                            <Progress value="1" max="5" /> 
                                        </Col>
                                        <Col xl="4">
                                             <span>بد</span>
                                        </Col>
                                        
                                    </Row>  
                                </li>
                                <li>
                                    <p> ارزش خرید به نسبت قیمت:</p>
                                    <Row>
                                        <Col xl="8">
                                            <Progress value="5" max="5" /> 
                                        </Col>
                                        <Col xl="4">
                                             <span>عالی</span>
                                        </Col>
                                        
                                    </Row>  
                                </li>
                                <li>
                                    <p>نوآوری:</p>
                                    <Row>
                                        <Col xl="8">
                                            <Progress value="0" max="5" /> 
                                        </Col>
                                        <Col xl="4">
                                             <span>خیلی بد</span>
                                        </Col>   
                                    </Row>  
                                </li>
                                <li>
                                    <p>امکانات و قابلیت ها:</p>
                                    <Row>
                                        <Col xl="8">
                                            <Progress value="4" max="5" /> 
                                        </Col>
                                        <Col xl="4">
                                             <span> خوب</span>
                                        </Col>   
                                    </Row>  
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                
              </CardBody>
              
            </Card>
          </Col>
        </Row>
      </div>
    )
  
}

export default CommentInfo;
