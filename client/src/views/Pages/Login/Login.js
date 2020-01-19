import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
const Login =()=> {
   useEffect(()=>{
    let data = {
      query : `
        mutation {
          register(input : { phone : "09154968751", password : "123456"}) {
            status,
            message
          }
        }
      `
  };

  let optitons = {
      method : 'POST',
      headers : { 
          'content-type' : 'application/json'
      },
      body : JSON.stringify(data)
  };

  let url = 'http://localhost:4000/graphql';

  fetch(url,optitons)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));

  },[])
  const handleLogin=()=>{
   
  }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>ورود</h1>
                      <p className="text-muted">به پنل کاربری خود وارد شوید</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="نام کاربری" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="رمز عبور" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                        <Link to="/dashboard">
                           <Button color="primary" className="px-4">ورود</Button>
                          </Link>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" onClick={handleLogin}>رمز عبور خود را فراموش کرده اید؟</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>پنل مدیریت فروشگاه</h2>
                      <p>🔰 ساخت اپلیکیشن فروشگاهی مشابه Digikala

                      🔸توسعه اپلیکیشن با استفاده از React Native
                      🔸توسعه پنل ادمین با استفاده از ReactJS
                      🔸استفاده از NodeJS برای توسعه سمت سرور
                      🔸استفاده از ساختار GraphQl برای API
                      </p>
                     
                        <a href="https://reactapp.ir"><Button color="primary" className="mt-3" active tabIndex={-1}>ثبت نام دوره</Button></a>
                      
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  
}

export default Login;
