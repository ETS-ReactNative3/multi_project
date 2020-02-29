import React, { useState, useContext } from 'react';
import  {AuthContext} from '../../../context/Auth/AuthContext';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Spinner } from 'reactstrap';
import axios from 'axios';
import Recaptcha from 'react-recaptcha';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import './Login.css'
const validateSchema = yup.object().shape({
  username: yup.string().min(11,'نام کاربری شما باید 11 عدد باشد').max(11,'نام کاربری شما باید حداکثر 11 رقم باشد').required("نام کاربری خود را وارد کنید"),
  password: yup.string().min(6,"Must be a valid email address").max(30,'too large').required("رمز عبور خود را وارد کنید"),
});
const Login =(props)=> {
  const [username,setUsername] = useState('');
  const[password,setPassword] = useState('');
  const[loading,setLoading] = useState(false);
  const[message,setMessage ] = useState('');
  const [isVerifed,setIsVerifed] = useState(false);
  const {dispatch} = useContext(AuthContext);
  
  
  const verifyCallback =(response)=>{
    if(response){
      setIsVerifed(true)
    }
    
  }
  
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>

                  <Formik 
                  initialValues={{username:'',password:''}}
                  validationSchema={validateSchema}
                  onSubmit={(values, { setSubmitting,resetForm }) => {
                    if(!isVerifed){
                      setMessage('من ربات نیستم را تیک بزنید');
                      return false;
                    }
                    setLoading(true);
                    axios({
                      url: '/',
                      method: 'post',
                      data: {
                        query: `
                        query {
                          login(input : { phone : "${values.username}", password : "${values.password}"}) {
                            token
                          }
                        }
                          `
                    }
                  }).then((result) => {
                    setLoading(false);
                    console.log(result.data);
                    if(result.data.data)
                    {
                      const {token} =result.data.data.login
                      //console.log(token);
                      dispatch({type:'login',payload:username,token:token});
                      props.history.replace('/dashboard');
                    }
                    else{
                      setMessage('نام کاربری یا رمز عبور اشتباه است');
                      setSubmitting(false);
                      resetForm();
                    }
                    
                  }).catch(error=>{
                    console.log(error)
                  });
                    }}
                  >
                    {
                        ({values, errors, touched, handleBlur, handleChange,handleSubmit, isSubmitting})=>(
                          <Form  onSubmit={handleSubmit}>
                              <h5 style={{color:'red'}}>{message}</h5>
                              <h1>ورود</h1>
                              <p className="text-muted">به پنل کاربری خود وارد شوید</p>
                              <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="icon-user"></i>
                                  </InputGroupText>
                                </InputGroupAddon>      
                                  <Input
                                    type="string"
                                    name="username" 
                                    id="username"
                                    placeholder="شماره همراه خود را وارد کنید"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    className={touched.username && errors.username? "has-error" : null}
                                    />
                                     
                              </InputGroup>
                              {errors.username && touched.username && <div className="error-msg">{errors.username}</div>}
                              <InputGroup className="mb-4">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="icon-lock"></i>
                                  </InputGroupText>
                                </InputGroupAddon>
                                  
                                <Input
                                  type="password"
                                  name="password" 
                                  id="password"
                                  placeholder="رمز عبور خود را وارد کنید"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.password}
                                  className={touched.password && errors.password? "has-error" : null}
                                  />
                                
                                </InputGroup>
                                {errors.password && touched.password && <div className="error-msg">{errors.password}</div>}
                                <InputGroup className="mb-4">
                                  <Recaptcha
                                    sitekey="6Ldy_NAUAAAAAH2QP9VbNDLwspMCfXK3Zs37hY6o"
                                    render="explicit"   
                                    verifyCallback={verifyCallback}
                                    hl= 'fa'
                                  />
                                </InputGroup>
                                <Row>
                                <Col xs="6">
                                {
                                  loading?<Spinner animation="border" />:
                                  <Button color="primary" className="px-4" type="submit">ورود</Button>
                                }
                                  
                                  
                                </Col>
                                
                                </Row>
                      </Form>
                        )
                    }

                </Formik>
                                  
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>پنل مدیریت فروشگاه</h2>
                       <hr />
                      ساخت اپلیکیشن فروشگاهی مشابه Digikala
                        <hr />
                      توسعه اپلیکیشن با استفاده از React Native
                        <hr />
                      توسعه پنل ادمین با استفاده از ReactJS
                      <hr />
                      استفاده از NodeJS برای توسعه سمت سرور
                      <hr />
                      استفاده از ساختار GraphQl برای API
                      
                     
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
