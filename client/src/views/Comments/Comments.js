import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table,  } from 'reactstrap';
const Comments =(props)=> {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
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
                        <td></td>
                        <td></td>
                        <td ></td>
                        <td></td>
                        <td></td>
                        <td ></td>
                        <td></td>
                        <td></td>
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
