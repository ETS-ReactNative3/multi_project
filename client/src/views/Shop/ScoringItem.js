import React, { useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Label,Input,FormGroup,CardFooter,Badge,Pagination,PaginationItem,PaginationLink  } from 'reactstrap';

const ScoringItem=()=> {
  const[ownerState,setOwnerState] = useState([
    { name:'کیفیت ساخت',lable:''},
    { name:'ارزش خرید به نسبت قیمت',lable:''},
    { name:'نوآوری',lable:''},
    { name:'امکانات و قابلیت ها',lable:''},
    { name:'سهولت استفاده',lable:''},
    { name:'طراحی و ظاهر',lable:''},
  ]);
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
                    <strong>معیارهای نحوه امتیاز دهی <span style={{color:'blue'}}>گوشی موبایل</span> </strong>
                </CardHeader>
                <CardBody>
                  <Col xs="12">
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
                  </Col>
                </CardBody>
                <CardFooter>
                    <Button type="submit" size="sm" color="primary" onClick={onSubmitForm}><strong>ویرایش</strong> </Button>
                </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  
}

export default ScoringItem;
