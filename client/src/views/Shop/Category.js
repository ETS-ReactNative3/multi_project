import React, { useContext, useEffect,useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Label,Input,FormGroup,CardFooter,Pagination,PaginationItem,PaginationLink,Spinner  } from 'reactstrap';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios'
const Category =(props)=> {
    const [title,setTitle] = useState('');
    const [lable,setLable] = useState('');
    const [mainSubTitleFromServer,setMainSubTitleFromServe] = useState([]);
    const [subTitleFromServer,setSubTitleFromServe] = useState([]);
    const [mainCategory,setMainCategory] = useState(false);
    const [parentCategory,setParentCategory] = useState(false);
    const [catId,setCatId] = useState(null);
    const [mainSubTitleValue,setMainSubTitleValue] = useState('');
    const [subTitleValue,setSubTitleValue] = useState('');
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState('')
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
                    "mainCategory": mainCategory,
                    "parentCategory": parentCategory,
                    "catId": catId
                }
          }
        }).then((result) => {
          if(result.data.errors){
            dispatch({type:'logout',payload:props});
          }
          
          else if(mainCategory){
            setMainSubTitleFromServe(result.data.data.getAllCategory)
          }
          else if(parentCategory){
            setSubTitleFromServe(result.data.data.getAllCategory)
          }
        }).catch(error=>{
          console.log(error)
        });      
    },[mainCategory])
    useEffect(()=>{
        dispatch({type:'check',payload:props});
        setLoading(true);
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
                    "limit": 30,
                    "mainCategory": false,
                    "parentCategory": false,
                    "catId": null
                }
          }
        }).then((result) => {
          if(result.data.errors){
            dispatch({type:'logout',payload:props});
          }
            setResult(result.data.data.getAllCategory);  
          setLoading(false);
        }).catch(error=>{
          console.log(error)
        });      
    },[isSubmit])
   
   
    const handleTitle =(event)=>{
        setTitle(event.target.value)
    }
    const handleLable =(event)=>{
        setLable(event.target.value)
    }
    const handleMainSubTitle=(event)=>{
        setCatId(event.target.value);
        setMainCategory(false);
        setParentCategory(true);
        setMainSubTitleValue(event.target.value)
    }
    const handleSubTitleValue=(event)=>{
        setSubTitleValue(event.target.value)
    }
    const handleSubmit =()=>{
        let parent=null;
        if(mainSubTitleValue!=='' && subTitleValue===''){
            parent = mainSubTitleValue
        }
        else if(mainSubTitleValue!=='' &&subTitleValue!==''){
            parent = subTitleValue
        }
        console.log( parent)
        axios({
            url: '/',
            method: 'post',
            headers:{'token':`${token}`},
            data: {
              query: `
               mutation addcategory($name : String!, $label : String, $parent : ID) {
                   category(input : { name : $name, label : $label, parent : $parent}) {
                     status
                   }
                 }     
                `,
                variables : {
                  "name" : title,
                  "label" : lable,
                  "parent" : parent
                }
          }
        }).then((result) => {
            if(result.data.errors){
                console.log(result.data.errors);
                //setMessage('ثبت اطلاعات با مشکل مواجه شده است');            
            }
            setIsSubmit(!isSubmit);
            
        }).catch(error=>console.log(error));
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12} xs={12} md={12}>
              <Card>
                <CardHeader>         
                    <strong> اضافه کردن دسته بندی جدید</strong>
                    <br />
                    <span style={{color:'red'}}>{message}</span>
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
                             onBlur={()=>setMainCategory(true)}
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
                        <Col xs="3">
                        <FormGroup>
                            <Label htmlFor="subcategory">زیردسته</Label>
                            <Input type="select" name="subcategory" 
                             id="subcategory"
                             value={subTitleValue}
                             onChange={handleSubTitleValue}
                            >
                                <option ></option>
                                {
                                    subTitleFromServer.map((item,index)=>{
                                        return(<option key={index} value={item._id}>{item.name}</option>)
                                    })
                                }
                            </Input>
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
                        <strong>لیست دسته بندی ها</strong>
                </CardHeader>
                <CardBody>
                    {
                        loading ?<center ><Spinner animation="border" role="status" /></center>
                        
                     :
                      <Table responsive >
                      <thead>
                          <tr>
                              <th>نام دسته</th>
                              <th>والد</th>
                              <th>عملیات</th>                                
                          </tr>
                      </thead>
                      
                          
                        <tbody>
                        {
                            
                            result.map(item=>{
                                return(
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>
                                    
                                    {item.parent ? item.parent.name: "دسته اصلی"}
                                    
                                </td>
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
                                )
                                
                            })
                        }
                   
                     
                    </tbody>
                      
                      
                  </Table>
                    }
                    
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
