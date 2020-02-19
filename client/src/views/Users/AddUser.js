import React, { Component } from 'react';
import {
   
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,   
    Form,
    FormGroup,
    FormText,  
    Input,
    Label,
    Row,
  } from 'reactstrap';




class AddUser extends Component {

  render() {

    

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="8" md="8">
            <Card>
              <CardHeader>
                <strong>فرم  اضافه کردن کاربر جدید</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">شماره همراه  <span style={{color:'red'}}>(*)</span></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="text-input" name="text-input" placeholder="شماره همراه" />
                      <FormText color="muted">شماره همراه.این فیلد منحصر به فرد است</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">نام  <span style={{color:'red'}}>(*)</span></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="نام"/>
                      <FormText className="help-block">لطفا نام کاربر را وارد کنید</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">نام خانوادگی <span style={{color:'red'}}>(*)</span></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="خانوادگی نام"/>
                      <FormText className="help-block">لطفا نام خانوادگی کاربر را وارد کنید</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">کد ملی   <span style={{color:'red'}}>(*)</span></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="text-input" name="text-input" placeholder=" کد ملی" />
                      <FormText color="muted">  کد ملی.این فیلد منحصر به فرد است</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">شماره تلفن ثابت  <span style={{color:'red'}}>(*)</span></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="text-input" name="text-input" placeholder="شماره تلفن ثابت" />
                      <FormText color="muted">لطفا شماره ثابت تلفن را وارد کنید.</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">پست الکترونیک  <span style={{color:'red'}}>(*)</span></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="email-input" name="email-input" placeholder="ایمیل " autoComplete="email"/>
                      <FormText className="help-block"> لطفا ایمیل کاربر را وارد کنید </FormText>
                    </Col>
                  </FormGroup>
                  
                  <FormGroup row className="my-0">
                        <Col md="3">
                        <Label htmlFor="email-input">تاریخ تولد <span style={{color:'red'}}>(*)</span></Label>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <Label htmlFor="day">روز</Label>
                                <Input type="select" name="select" id="select">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <Label htmlFor="day">ماه</Label>
                                <Input type="select" name="select" id="select">
                                    <option value="0">فروردین</option>
                                    <option value="1">اردیبهشت</option>
                                    <option value="2">خرداد</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <Label htmlFor="day">سال</Label>
                                <Input type="select" name="select" id="select">
                                    <option value="0">1320</option>
                                    <option value="1">1321</option>
                                    <option value="2">1322</option>
                                </Input>
                            </FormGroup>
                        </Col>   
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label>جنسیت</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="0" />
                        <Label className="form-check-label" check htmlFor="inline-radio1">زن</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="1" />
                        <Label className="form-check-label" check htmlFor="inline-radio2">مرد</Label>
                      </FormGroup>
                      
                    </Col>
                  </FormGroup>

                  <FormGroup row className="my-0">
                        <Col md="3">
                        <Label htmlFor="email-input">محل سکونت<span style={{color:'red'}}>(*)</span></Label>
                        </Col>
                        <Col md="5">
                            <FormGroup>
                                <Label htmlFor="state">استان</Label>
                                <Input type="select" name="select" id="select">
                                    <option value="0">خراسان جنوبی</option>
                                    <option value="1">خراسان شمالی</option>
                                    <option value="2">خراسان رضوی</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label htmlFor="زهفغ">شهر</Label>
                                <Input type="select" name="select" id="select">
                                    <option value="0">فردوس</option>
                                    <option value="1">بیرجند</option>
                                    <option value="2">سرایان</option>
                                </Input>
                            </FormGroup>
                        </Col>
                          
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">رمز عبور  <span style={{color:'red'}}>(*)</span></Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                      <FormText className="help-block">لطفا یک رمز عبور قوی وارد کنید</FormText>
                    </Col>
                  </FormGroup>
                 
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
            
          </Col>
          
        </Row>
      </div>
    )
  }
}

export default AddUser;
