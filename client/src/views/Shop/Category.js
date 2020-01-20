import React, { useContext, useEffect,useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Label,Input,FormGroup,CardFooter,Pagination,PaginationItem,PaginationLink  } from 'reactstrap';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
const Category =(props)=> {

    const {dispatch} = useContext(AuthContext);
    useEffect(()=>{
        dispatch({type:'check',payload:props});
        const token =  GetToken();
        console.log(token)       
    },[])
    const [title,setTitle] = useState('');
    const [lable,setLable] = useState('');
    const [mainSubTitleFromServer,setMainSubTitleFromServe] = useState([]);
    const [subTitleFromServer,setSubTitleFromServe] = useState([]);
    const handleTitle =(event)=>{
        setTitle(event.target.value)
    }
    const handleLable =(event)=>{
        setLable(event.target.value)
    }
    const handleMainSubTitle=(event)=>{
        console.log(event.target.value);
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12} xs={12} md={12}>
              <Card>
                <CardHeader>         
                    <strong> اضافه کردن دسته بندی جدید</strong>
                </CardHeader>
                <CardBody>
                    <FormGroup row className="my-0">
                        <Col xs="3">
                            <FormGroup>
                            <Label htmlFor="title">عنوان</Label>
                            <Input type="text" id="title"
                             placeholder="عنوان را وارد کنید"
                             value={title}
                             onChange={handleTitle}
                             required/>
                            </FormGroup>
                        </Col>
                        <Col xs="3">
                            <FormGroup>
                            <Label htmlFor="description">توضیحات</Label>
                            <Input type="text" id="description"
                             placeholder="در صورت نیاز توضیحات را وارد کنید"
                             value={lable}
                             onChange={handleLable}
                              />
                            </FormGroup>
                        </Col>
                        <Col xs="3">
                            <FormGroup>
                            <Label htmlFor="category"> دسته اصلی</Label>
                            <Input type="select" name="category"
                             id="category"
                             onChange={handleMainSubTitle}
                              >
                                <option ></option>
                                {
                                    mainSubTitleFromServer.map((item,index)=>{
                                        return(<option key={index} value={item.id}>{item.name}</option>)
                                    })
                                }
                               
                                
                            </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="3">
                        <FormGroup>
                            <Label htmlFor="subcategory">زیردسته</Label>
                            <Input type="select" name="subcategory" id="subcategory">
                                <option ></option>
                                {
                                    subTitleFromServer.map((item,index)=>{
                                        return(<option key={index} value={item.id}>{item.name}</option>)
                                    })
                                }
                            </Input>
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
                            <th>نام دسته</th>
                            <th>مسیر دسته</th>
                            <th>عملیات</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>کالای دیجیتال</td>
                            <td>دسته اصلی</td>
                            <td>
                                <Row>
                                <Col xs="3">
                                     <Button type="submit" size="sm" color="primary"><strong>ویرایش</strong> </Button>
                                </Col>
                                <Col xs="3">
                                    <Button type="submit" size="sm" color="danger"><strong>حذف</strong> </Button>
                                </Col>
                                </Row>
                            </td>          
                         </tr>
                         <tr>
                            <td>گوشی موبایل</td>
                            <td> کالای دیجیتال / گوشی موبایل</td>
                            <td>
                                <Row>
                                <Col xs="3">
                                     <Button type="submit" size="sm" color="primary"><strong>ویرایش</strong> </Button>
                                </Col>
                                <Col xs="3">
                                    <Button type="submit" size="sm" color="danger"><strong>حذف</strong> </Button>
                                </Col>
                                </Row>
                            </td>          
                         </tr>
                         <tr>
                            <td>سامسونگ</td>
                            <td> کالای دیجیتال / گوشی موبایل / سامسونگ</td> 
                            <td>
                                <Row>
                                <Col xs="3">
                                     <Button type="submit" size="sm" color="primary"><strong>ویرایش</strong> </Button>
                                </Col>
                                <Col xs="3">
                                    <Button type="submit" size="sm" color="danger"><strong>حذف</strong> </Button>
                                </Col>
                                </Row>
                            </td>          
                         </tr>
                        </tbody>
                    </Table>
                    <Pagination>
                        <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                        <PaginationItem active>
                            <PaginationLink tag="button">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                        <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                    </Pagination>
                </CardBody>
              </Card>
          </Col>
        </Row>
      </div>
    )
  
}

export default Category;
