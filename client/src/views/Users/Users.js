import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table,  } from 'reactstrap';

import usersData from './UsersData'

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`
  const orderLink =`users/orders/${user.id}`
  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.id.toString()}>
      <th scope="row">{user.id}</th>
      <td ><Link to={orderLink}><i className="fa fa-shopping-bag fa-lg mt-10" style={{color:'green'}}></i></Link></td>
      <td><Link to="#"><i className="fa fa-heart fa-lg mt-10"  style={{color:'red'}}></i></Link></td>
      <td><Link to="#"> <i className="fa fa-comments fa-lg mt-10"  style={{color:'black'}}></i></Link></td>
      <td><Link to={userLink}>{user.phoneNumber}</Link></td>
      <td>{user.name}</td>
      <td>{user.lastName}</td>
      <td>{user.nationalId}</td>
      <td>{user.phone}</td>
      <td>{user.email}</td>
      <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
      <td><i className="icon-ban"  ></i></td>
    </tr>
  )
}

class Users extends Component {

  render() {

    const userList = usersData.filter((user) => user.id < 20)

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
                      <th scope="col">ردیف</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col">شماره تماس</th>
                      <th scope="col">نام</th>
                      <th scope="col">نام خانوادگی</th>
                      <th scope="col">کدملی</th>
                      <th scope="col">تلفن ثابت</th>
                      <th scope="col">ایمیل</th>
                      <th scope="col">وضعیت</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
