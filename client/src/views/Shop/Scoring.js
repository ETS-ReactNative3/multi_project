import React, { useState,useEffect,useContext } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Label,Input,FormGroup,CardFooter,Pagination,PaginationItem,PaginationLink  } from 'reactstrap';
import classes from './scoring.module.css';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios'

const Scoring=(props)=> {
    const {dispatch} = useContext(AuthContext);
    const [allCategory,setAllCategory] = useState([]);
    const [subCategory,setSubCategory] = useState([]);
    const[ownerState,setOwnerState] = useState([]);
    const[subCategoryId,setSubCategoryId] = useState(null);
    const [mainCategory,setMainCategory] = useState(true);
    const [parentCategory,setParentCategory] = useState(false);
    const [message,setMessage] = useState('')
    const[ID,setID] = useState(null);
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
                }
              }      
                `,
                variables :{
                    "page": 1,
                    "limit": 30,
                    "mainCategory": mainCategory,
                    "parentCategory": parentCategory,
                    "catId": subCategoryId
                }
          }
        }).then((result) => {
            const {getAllCategory} = result.data.data;
            if(result.data.errors){
                setMessage('خطا در دریافت اطلاعات')
              }
           else if(mainCategory){
                setAllCategory(getAllCategory);
            }
            else if(parentCategory){
                console.log(getAllCategory);
                setSubCategory(getAllCategory);
            }
            
        }).catch(error=>{
          console.log(error)
        });
    },[subCategoryId])
 

  const getSubCategory =(event)=>{
    setSubCategoryId(event.target.value);
    console.log(subCategoryId);
    setMainCategory(false);
    setParentCategory(true);
    
    }
  const addField = ()=>{
      const newState = [...ownerState];
      newState.push({
          name:'',
          label:''
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
  const handleChangeLabel = (event,id)=>{
       
    const field={...ownerState[id]};
    //console.log(student);
    field.label=event.target.value;
    const newOwnerState = [...ownerState];
    newOwnerState[id]=field;
    setOwnerState(newOwnerState);
}
const getId=(event)=>{
    setID(event.target.value)
}
const onSubmitForm =()=>{
    if(ownerState.length===0){
        setMessage('حداقل باید یک مورد را وارد کنید');
        return false;
    }
    console.log(ownerState+' '+ID);
    axios({
        url: '/',
        method: 'post',
        headers:{'token':`${token}`},
        data: {
          query: `
          mutation addservey($category : ID!, $list : [Servey]!) {
            survey(input : { categroy : $category, list : $list}) {
              status,
              message
            }
          }     
            `,
            variables :{
                "category": ID,
                "list": ownerState
              }
      }
    }).then((result) => {
        console.log(result.data);
    }).catch(error=>{
      console.log(error)
    });

}
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12} xs={12} md={12}>
              <Card>
                <CardHeader>         
                    <strong>نحوه امتیاز دهی</strong>
                    <br />
                    <span style={{color:'red'}}>{message}</span>
                </CardHeader>
                <CardBody>
                    <FormGroup row className="my-0">
                      <Col xs="3">
                        <FormGroup>
                            <Label htmlFor="subcategory">دسته</Label>
                            <Input type="select" name="subcategory" id="subcategory" onChange={getSubCategory}>
                                <option ></option>
                                {
                                    allCategory.map((item)=><option key={item._id} value={item._id}>{item.name}</option>)
                                }
                                
                            </Input>
                            </FormGroup>
                      </Col>
                      <Col xs="3">
                        <FormGroup>
                            <Label htmlFor="subcategory">دسته</Label>
                            <Input type="select" name="subcategory" id="subcategory" onChange={getId}>
                                <option ></option>
                                {
                                    subCategory.map((item)=><option key={item._id} value={item._id}>{item.name}</option>)
                                }
                                
                                
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
                        const labelId = `label-${idx}`;
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
                                     id={labelId}
                                     name={labelId}
                                     value={val.label}
                                     onChange={(event)=>handleChangeLabel(event,idx)}
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
