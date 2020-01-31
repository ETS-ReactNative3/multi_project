import React from 'react';

import { Card, CardBody, CardHeader, Col, Row, FormGroup,Label,Input,Button  } from 'reactstrap';
const AddProduct = ()=>{
    return(
        <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> اضافه کردن محصول
              </CardHeader>
              <CardBody>
                <Row>
                    <Col xs="10">
                        <FormGroup>
                        <Label htmlFor="name">نام</Label>
                        <Input type="text" id="name" placeholder="نام محصول را وارد کنید" required />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="10">
                        <FormGroup>
                        <Label htmlFor="name">نام انگلیسی</Label>
                        <Input type="text" id="name" placeholder="نام انگلیسی محصول را وارد کنید" required />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="ccmonth">دسته اصلی</Label>
                      <Input type="select" name="ccmonth" id="ccmonth">
                        <option value="1">کالای دیجیتال</option>
                        <option value="2">مد و پوشاک</option>                   
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="ccyear">زیر دسته</Label>
                      <Input type="select" name="ccyear" id="ccyear">
                        <option>گوشی موبایل</option>
                        <option>دوربین</option>                  
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="ccyear">زیر دسته دوم</Label>
                      <Input type="select" name="ccyear" id="ccyear">
                        <option>دوربین عکاسی دیجیتال </option>
                        <option>دوربین ورزشی و فیلم برداری</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="ccyear">برند</Label>
                      <Input type="select" name="ccyear" id="ccyear">
                        <option>سونی</option>
                        <option>نیکون</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                    <Col xs="3">
                        <FormGroup>
                            <Label for="exampleColor">رنگ</Label>
                            <Input
                            type="color"
                            name="color"
                            id="exampleColor"
                            placeholder="color placeholder"
                            onChange={(event)=>console.log(event.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="2">
                        <FormGroup>
                            <Label for="exampleNumber">تعداد</Label>
                            <Input
                            type="number"
                            name="number"
                            id="exampleNumber"
                            placeholder="تعداد محصول"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="3">
                        <FormGroup>
                            <Label for="price">قیمت (تومان)</Label>
                            <Input
                            type="number"
                            name="price"
                            id="price"
                            placeholder=" قیمت محصول"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="3">
                        <FormGroup>
                            <Label for="priceOff">قیمت (تومان) با تخفیف</Label> 
                            <Input
                            type="number"
                            name="priceOff"
                            id="priceOff"
                            placeholder="قیمت محصول با تخفیف" 
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="1" style={{display:'flex',justifyContent:'center',alignItems:'flex-end'}}>
                        <FormGroup>
                            <Label></Label>
                            <Button color="danger" className="btn-pill">
                                 <i className="fa fa-plus fa-lg"></i>
                            </Button>
                        </FormGroup>
                    </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
}
export default AddProduct;