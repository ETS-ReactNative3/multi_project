import React, { useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Label,Input,FormGroup,CardFooter,Collapse,Pagination,PaginationItem,PaginationLink  } from 'reactstrap';

const Specifications=()=> {
    const [subCategoryFromServer,setSubCategoryFromServer] = useState([
        {id:1, name:'گوشی موبایل'},
        {id:2,name:'واقعیت مجازی'},
        {id:3.,name:'مچ بند و ساعت هوشمند'},
        {id:4,name:'لوازم جانبی دوربین'},
        {id:5,name:'لپ تاب'},
        {id:6,name:'تبلت '},
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
                        
                        
                        <Col xs="6">
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
                        <Col xs="6">
                            <FormGroup>
                            <Label htmlFor="title">عنوان</Label>
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
                            <th>عنوان</th>
                            
                            <th>عملیات</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>گوشی موبایل</td>
                            <td>
                                مشخصات کلی
                            </td>
                            
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

export default Specifications;
