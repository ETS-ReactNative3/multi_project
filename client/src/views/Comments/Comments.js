import React from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table ,Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
const Comments =(props)=> {
  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }
    return (
      <div className="animated fadeIn">
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
                    <tr>
                        <td>گوشی موبایل هوآوی مدل Y5 2019 AMN-LX9 دو سیم کارت ظرفیت 32 گیگابایت</td>
                        <td>امیرحسین حیاتی</td>
                        <td >22 بهمن 1398</td>
                        <td>ارزش خرید دارد</td>
                        <td>22</td>
                        <td >2</td>
                        <td><Badge color={getBadge('Banned')}>تایید نشده</Badge></td>
                        <td>
                          <Row>
                              <Col xs="3">
                                 <NavLink to='comments/comment/217'><Button type="submit" size="sm" color="primary"><i className="fa fa-info-circle"></i> </Button></NavLink>
                              </Col>
                              <Col xs="3">
                                <Button type="submit" size="sm" color="danger"><i className="fa fa-trash fa-lg"></i></Button>
                              </Col>
                           </Row>
                          
                          </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  
}

export default Comments;
