import React, { useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Label,Input,FormGroup,CardFooter,Badge,Pagination,PaginationItem,PaginationLink  } from 'reactstrap';
import classes from './scoring.module.css';
import { Link } from 'react-router-dom';
const Scoring=()=> {

  const[ownerState,setOwnerState] = useState([]);
  const addField = ()=>{
      const newState = [...ownerState];
      newState.push({
          name:'',
          lable:''
      });
      setOwnerState(newState)
  }
  const handleChange = (event,id)=>{
   
     
      const field={...ownerState[id]};
      //console.log(student);
      field.name=event.target.value;
      const newOwnerState = [...ownerState];
      newOwnerState[id]=field;
      setOwnerState(newOwnerState);
  }
  const handleChangeLable = (event,id)=>{
   
     
    const field={...ownerState[id]};
    //console.log(student);
    field.lable=event.target.value;
    const newOwnerState = [...ownerState];
    newOwnerState[id]=field;
    setOwnerState(newOwnerState);
}
const onSubmitForm =()=>{
    console.log(ownerState)
}
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12} xs={12} md={12}>
              <Card>
                <CardHeader>         
                    <strong>نحوه امتیاز دهی</strong>
                </CardHeader>
                <CardBody>
                    <FormGroup row className="my-0">
                      <Col xs="3">
                        <FormGroup>
                            <Label htmlFor="subcategory">دسته</Label>
                            <Input type="select" name="subcategory" id="subcategory">
                                <option ></option>
                                <option>2018</option>
                                <option>2019</option>
                                <option>2020</option>
                                <option>2021</option>
                                <option>2022</option>
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                                <option>2026</option>
                            </Input>
                            </FormGroup>
                        </Col>
                        
                        <Col xs="2" className={classes.addButton}>
                            <Button color="danger" className="btn-pill" onClick={addField}>
                                <i className="fa fa-plus fa-lg"></i>
                            </Button>
                        </Col>  
                    </FormGroup>
                    {ownerState.map((val,idx)=>{
                        const scoreId = `name-${idx}`;
                        const lableId = `lable-${idx}`;
                        return(
                            <div  key={idx} style={{display:'flex'}}>
                                
                                
                                <Col xs="6">
                                    <FormGroup>
                                    <Label htmlFor="title">عنوان</Label>
                                    <Input
                                     type="text"
                                     id={scoreId}
                                     name={scoreId}
                                     placeholder="عنوان را وارد کنید" 
                                     value={val.name}
                                     onChange={(event)=>handleChange(event,idx)}
                                      required

                                      />
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                    <Label htmlFor="description">توضیحات</Label>
                                    <Input
                                     type="text"
                                     id={lableId}
                                     name={lableId}
                                     value={val.lable}
                                     onChange={(event)=>handleChangeLable(event,idx)}
                                      placeholder="در صورت نیاز توضیحات را وارد کنید"
                                       />
                                    </FormGroup>
                                </Col>
                            </div>
                        )
                    })}
                </CardBody>
                <CardFooter>
                    <Button type="submit" size="sm" color="primary" onClick={onSubmitForm}><strong>ثبت</strong> </Button>
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
                            <th>ردیف</th>
                            <th>نام دسته</th>
                            <th>عملیات</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>گوشی</td>
                            <td>
                                
                                <Col xs="6">
                                <Link to="/shop/scoring/1"> مشاهده معیار های امتیاز دهی </Link>
                                </Col>
                                
                                
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

export default Scoring;
