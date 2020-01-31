import React,{useState, useEffect, useContext} from 'react';
import { Card, CardBody, CardHeader,CardFooter, Col, Row, FormGroup,Label,Input,Button,Table, Spinner  } from 'reactstrap';
import axios from 'axios';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
const Seller = (props)=>{
    const [title,setTitle] = useState('');
    const [lable,setLable] = useState('');
    const [mainSubTitleValue,setMainSubTitleValue] = useState('');
    const [mainSubTitleFromServer,setMainSubTitleFromServe] = useState([]);
    const [loading,setLoading] = useState(false);
    const {dispatch} = useContext(AuthContext);
    const token =  GetToken();
    useEffect(()=>{
        dispatch({type:'check',payload:props});
        axios({
            url: '/',
            method: 'post',
            headers:{'token':`${token}`},
            data: {
              query: `
              query getAllCategory($page : Int, $limit : Int, $mainCategory : Boolean, $parentCategory : Boolean, $catId : ID) {
                getAllCategory(input : {page : $page, limit : $limit, mainCategory : $mainCategory, parentCategory : $parentCategory, catId : $catId}) {
                  _id,
                  name,
                  label,
                  parent {
                    name
                  }
                }
              }      
                `,
                variables :{
                    "page": 1,
                    "limit": 10,
                    "mainCategory": true,
                    "parentCategory": false,
                    "catId": null
                }
          }
        }).then((result) => {
          if(result.data.errors){
            dispatch({type:'logout',payload:props});
          }
          
            setMainSubTitleFromServe(result.data.data.getAllCategory)
          
        }).catch(error=>{
          console.log(error)
        });      
    },[])
    const handleMainSubTitle=(event)=>{
        setMainSubTitleValue(event.target.value)
    }
    const handleTitle =(event)=>{
        setTitle(event.target.value)
    }
    const handleLable =(event)=>{
        setLable(event.target.value)
    }
    const handleSubmit =()=>{
    }
    
return(
<div className="animated fadeIn">
    <Row>
     <Col xl={12}>
        <Card>
            <CardHeader>
                    <i className="fa fa-align-justify"></i> اضافه کردن فروشنده
            </CardHeader>
            <CardBody>
                        <FormGroup row className="my-0">
                        <Col xs="3">
                                <FormGroup>
                                    <Label htmlFor="category"> دسته اصلی</Label>
                                    <Input type="select" name="category"
                                    id="category"
                                    onChange={handleMainSubTitle}
                                    value={mainSubTitleValue}
                                    >
                                        <option ></option>
                                        {
                                            mainSubTitleFromServer.map((item,index)=>{
                                                return(<option key={index} value={item._id}>{item.name}</option>)
                                            })
                                        }
                                    
                                        
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="4">
                                <FormGroup>
                                    <Label htmlFor="title">عنوان</Label>
                                    <Input type="text" id="title"
                                    placeholder="عنوان را وارد کنید"
                                    value={title}
                                    onChange={handleTitle}
                                    required/>
                                </FormGroup>
                            </Col>
                            <Col xs="5">
                                <FormGroup>
                                    <Label htmlFor="description">توضیحات</Label>
                                    <Input type="text" id="description"
                                    placeholder="در صورت نیاز توضیحات را وارد کنید"
                                    value={lable}
                                    onChange={handleLable}
                                    />
                                    </FormGroup>
                            </Col>
                            
                        </FormGroup>
            </CardBody>
            <CardFooter>
                    <Button type="submit" size="sm" 
                    color="primary"
                    onClick={handleSubmit}
                    >
                        <strong>ثبت</strong> 
                    </Button>
            </CardFooter>
        </Card>
        <Card>
                <CardHeader>                   
                        <strong>لیست فروشنده ها</strong>
                </CardHeader>
                <CardBody>
                    {
                        loading ?<center ><Spinner animation="border" role="status" /></center>
                        
                     :
                      <Table responsive >
                      <thead>
                          <tr>
                              <th>نام دسته</th>
                              <th>نام فروشنده</th>
                              <th>عملیات</th>                                
                          </tr>
                      </thead>                              
                        <tbody>
                            <tr >
                                <td></td>
                                <td></td>
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
                    }                    
                </CardBody>
            </Card>
      </Col>
    </Row>
</div>
)
}
export default Seller;