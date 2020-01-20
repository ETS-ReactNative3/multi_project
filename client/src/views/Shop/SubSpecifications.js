import React, { useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Label,Input,FormGroup,CardFooter } from 'reactstrap';

const SubSpecifications=()=> {
    const [subCategoryFromServer,setSubCategoryFromServer] = useState([
        {id:1, name:'گوشی موبایل'},
        {id:2,name:'واقعیت مجازی'},
        {id:3.,name:'مچ بند و ساعت هوشمند'},
        {id:4,name:'لوازم جانبی دوربین'},
        {id:5,name:'لپ تاب'},
        {id:6,name:'تبلت '},
    ])
    const [subTitleFromServer,setSubTitleFromServer] = useState([
        {id:1, name:'مشخصات کلی'},
        {id:2,name:'پردازنده'},
        {id:3.,name:'حافظه'},
        {id:4,name:'صفحه نمایش'},
        {id:5,name:'ارتباطات'},
        {id:6,name:'دوربین '},
        {id:7,name:'امکانات نرم افزاری '},
        {id:8,name:'  سایر مشخصات '},
    ])
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12} xs={12} md={12}>
              <Card>
                <CardHeader>         
                    <strong> مشخصات </strong>
                </CardHeader>
                <CardBody>
                    <FormGroup row className="my-0">
                        
                        
                        <Col xs="4">
                            <FormGroup>
                            <Label htmlFor="category"> دسته اصلی</Label>
                            <Input type="select" name="category" id="category">
                            {
                                  subCategoryFromServer.map((subcat)=>{
                                      return(
                                        <option key={subcat.id} value={subcat.id}>{subcat.name}</option>
                                      )
                                  })
                              }
                            </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="4">
                            <FormGroup>
                            <Label htmlFor="category"> عنوان اصلی</Label>
                            <Input type="select" name="category" id="category">
                            {
                                  subTitleFromServer.map((subcat)=>{
                                      return(
                                        <option key={subcat.id} value={subcat.id}>{subcat.name}</option>
                                      )
                                  })
                              }
                            </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="4">
                            <FormGroup>
                            <Label htmlFor="title">زیر عنوان</Label>
                            <Input type="text" id="title" placeholder="عنوان را وارد کنید"  required/>
                            </FormGroup>
                        </Col>
                        
                    </FormGroup>
                </CardBody>
                <CardFooter>
                <Button type="submit" size="sm" color="primary"><strong>ثبت</strong> </Button>
              </CardFooter>
              </Card>
              <Card>
                <CardHeader>                   
                        <strong>لیست دسته بندی ها</strong>
                </CardHeader>
                <CardBody>
                    <Table responsive >
                        <thead>
                        <tr>
                            <th> دسته</th>
                            <th>   عنوان اصلی</th>
                            <th>عنوان</th>
                            <th>عملیات</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>گوشی موبایل</td>
                            <td> مشخصات کلی </td>
                            <td>ابعاد</td>
                            <td>          
                              <Button type="submit" size="sm" color="danger" className="btn-pill"
                              >
                                ویرایش
                               </Button>  
                               
                            </td>                              
                         </tr> 
                         <tr>
                            <td>گوشی موبایل</td>
                            <td> مشخصات کلی </td>
                            <td>توضیحات سیم کارت</td>
                            <td>          
                              <Button type="submit" size="sm" color="danger" className="btn-pill"
                              >
                                ویرایش
                               </Button>  
                               
                            </td>                              
                         </tr>  
                         <tr>
                            <td>گوشی موبایل</td>
                            <td> مشخصات کلی </td>
                            <td>وزن</td>
                            <td>          
                              <Button type="submit" size="sm" color="danger" className="btn-pill"
                              >
                                ویرایش
                               </Button>  
                               
                            </td>                              
                         </tr>  
                         <tr>
                            <td>گوشی موبایل</td>
                            <td> مشخصات کلی </td>
                            <td>ساختار بدنه</td>
                            <td>          
                              <Button type="submit" size="sm" color="danger" className="btn-pill"
                              >
                                ویرایش
                               </Button>  
                               
                            </td>                              
                         </tr>   
                         <tr>
                            <td>گوشی موبایل</td>
                            <td> مشخصات کلی </td>
                            <td>ویژگی های خاص</td>
                            <td>          
                              <Button type="submit" size="sm" color="danger" className="btn-pill"
                              >
                                ویرایش
                               </Button>  
                               
                            </td>                              
                         </tr> 
                         <tr>
                            <td>گوشی موبایل</td>
                            <td> مشخصات کلی </td>
                            <td>تعداد سیم کارت~</td>
                            <td>          
                              <Button type="submit" size="sm" color="danger" className="btn-pill"
                              >
                                ویرایش
                               </Button>  
                               
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

export default SubSpecifications;
