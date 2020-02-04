import React, { useState, useEffect, useContext } from 'react';
import {Card,CardBody,CardHeader, Col, Row, Table, Button, Modal, ModalHeader,ModalBody,ModalFooter,Label,Input,FormGroup } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classes from './product.module.css';
import axios from 'axios';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
const Products =(props)=> {
  const {dispatch} = useContext(AuthContext);
    const token =  GetToken();
    const [message,setMessage] = useState('');
  useEffect(()=>{  
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        query getProduct($page : Int, $limit : Int, $productId : ID) {
          getProduct(page : $page, limit : $limit, productId : $productId){
            _id,
            fname,
            ename,           
            brand {
              name
            },
            attribute {
              seller {
                name
              }
            },
            rate,          
            image
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
      setMessage('خطا در دریافت اطلاعات  محصولات')
    }
    console.log(result.data)           
  }).catch(error=>{
    console.log(error)
  })
  },[])
  const[modal,setModal] = useState(false);
  const toggleLarge=()=> {
    setModal(!modal)
  }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> محصولات
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      
                      <th scope="col">نام محصول</th>
                      <th scope="col">عکس</th>
                      <th scope="col">برند</th>
                      <th scope="col">فروشندگان</th>         
                      <th scope="col">امتیاز</th>
                      <th scope="col">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={classes.productDetails}>
                      <td className={classes.bothname}>
                        <span>گوشی موبایل هوآوی مدل Y5 2019 AMN-LX9 دو سیم کارت ظرفیت 32 گیگابایت </span>
                        <span>Huawei Y5 2019 ALM-LX9 Dual SIM 32GB Mobile Phone</span>
                      </td>
                      <td>
                        <img src="https://dkstatics-public.digikala.com/digikala-products/114170147.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90" alt="pic" />
                      </td>
                      <td>هوآوی</td>
                      <td>
                        <i className="fa fa-eye fa-lg " onClick={toggleLarge}></i>
                      </td>
                      <td>4.6</td>
                      <td className={classes.opreation}>
                        <Button size="sm" color="primary"> 
                          <NavLink to="/products/1"> <i className="fa fa-edit fa-lg "></i></NavLink>
                        </Button>
                        <Button type="submit" size="sm" color="danger">
                          <i className="fa fa-trash fa-lg "></i>
                        </Button>
                      </td>
                    </tr>                   
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggleLarge}
                        className={'modal-lg ' + props.className}>
                    <ModalHeader toggle={toggleLarge}>فروشندگان</ModalHeader>
                    <ModalBody>
                        <Row>
                           <Col xl="4">
                            <FormGroup>
                                <Label htmlFor="seller">فروشنده</Label>
                                <Input
                                type="select"
                                name="seller"
                                id="seller"
                                //onChange={sellerHandler}
                                required
                                  >
                                    <option vlaue="123">دیجی کالا</option>
                                    <option vlaue="123">دیجی لند</option>
                                    </Input>
                              </FormGroup>
                           </Col>
                           <Col xl="4">
                            <FormGroup>
                                  <Label htmlFor="seller">فروشنده</Label>
                                  <Input
                                  type="select"
                                  name="seller"
                                  id="seller"
                                  //onChange={sellerHandler}
                                  required
                                    >
                                      <option vlaue="123">18 ماه دیجی کالا</option>
                                      <option vlaue="123">18 ماه ایساکو</option>
                                      </Input>
                                </FormGroup>
                           </Col>
                           <Col xl="4">
                            <FormGroup>
                                  <Label for="exampleColor">رنگ</Label>
                                  <Input
                                  type="color"
                                  name="color"
                                  id="exampleColor"
                                  placeholder="color placeholder"
                                  //onChange={colorHandler}
                                  required
                                  />
                              </FormGroup>
                           </Col>
                           <Col xl="2">
                            <FormGroup>
                                <Label for="exampleNumber">تعداد</Label>
                                <Input
                                type="number"
                                name="number"
                                id="exampleNumber"
                                placeholder="تعداد محصول"
                                value={2}
                                //onChange={numberOfProductsHandler}
                                required
                                />
                            </FormGroup>
                           </Col>
                           <Col xl="4">
                              <FormGroup>
                                  <Label for="price">قیمت (تومان)</Label>
                                  <Input
                                  type="number"
                                  name="price"
                                  id="price"
                                  placeholder=" قیمت محصول"
                                  value="1250000"
                                  //onChange={priceHandler}
                                  required
                                  />
                              </FormGroup>
                           </Col>
                           <Col xl="4">
                            <FormGroup>
                                <Label for="priceOff"> درصد تخفیف</Label> 
                                <Input
                                type="number"
                                name="priceOff"
                                id="priceOff"
                                placeholder="قیمت محصول با تخفیف" 
                                value="2"
                               // onChange={discountedPriceHandler}
                                required
                                />
                            </FormGroup>
                           </Col>
                           <Col xl="2" className={classes.deleteButton}>
                            <Button type="submit" size="lg" color="danger">
                              <i className="fa fa-trash fa-lg"></i>
                            </Button>
                           </Col>
                        </Row>
                        <hr />
                        <Row>
                           <Col xl="4">
                            <FormGroup>
                                <Label htmlFor="seller">فروشنده</Label>
                                <Input
                                type="select"
                                name="seller"
                                id="seller"
                                //onChange={sellerHandler}
                                required
                                  >
                                    <option vlaue="123">دیجی کالا</option>
                                    <option vlaue="123">دیجی لند</option>
                                    </Input>
                              </FormGroup>
                           </Col>
                           <Col xl="4">
                            <FormGroup>
                                  <Label htmlFor="seller">فروشنده</Label>
                                  <Input
                                  type="select"
                                  name="seller"
                                  id="seller"
                                  //onChange={sellerHandler}
                                  required
                                    >
                                      <option vlaue="123">18 ماه دیجی کالا</option>
                                      <option vlaue="123">18 ماه ایساکو</option>
                                      </Input>
                                </FormGroup>
                           </Col>
                           <Col xl="4">
                            <FormGroup>
                                  <Label for="exampleColor">رنگ</Label>
                                  <Input
                                  type="color"
                                  name="color"
                                  id="exampleColor"
                                  placeholder="color placeholder"
                                  //onChange={colorHandler}
                                  required
                                  />
                              </FormGroup>
                           </Col>
                           <Col xl="2">
                            <FormGroup>
                                <Label for="exampleNumber">تعداد</Label>
                                <Input
                                type="number"
                                name="number"
                                id="exampleNumber"
                                placeholder="تعداد محصول"
                                value={2}
                                //onChange={numberOfProductsHandler}
                                required
                                />
                            </FormGroup>
                           </Col>
                           <Col xl="4">
                              <FormGroup>
                                  <Label for="price">قیمت (تومان)</Label>
                                  <Input
                                  type="number"
                                  name="price"
                                  id="price"
                                  placeholder=" قیمت محصول"
                                  value="1250000"
                                  //onChange={priceHandler}
                                  required
                                  />
                              </FormGroup>
                           </Col>
                           <Col xl="4">
                            <FormGroup>
                                <Label for="priceOff"> درصد تخفیف</Label> 
                                <Input
                                type="number"
                                name="priceOff"
                                id="priceOff"
                                placeholder="قیمت محصول با تخفیف" 
                                value="2"
                               // onChange={discountedPriceHandler}
                                required
                                />
                            </FormGroup>
                           </Col>
                           <Col xl="2" className={classes.deleteButton}>
                            <Button type="submit" size="lg" color="danger">
                              <i className="fa fa-trash fa-lg"></i>
                            </Button>
                           </Col>
                        </Row>                          
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={toggleLarge}>ویرایش</Button>{' '}
                        <Button color="secondary" onClick={toggleLarge}>لغو</Button>
                    </ModalFooter>
                    </Modal>
      </div>
    )
  
}

export default Products;
