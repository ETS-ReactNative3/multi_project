import React, { useState, useEffect, useContext } from 'react';
import {  Card, CardBody, CardHeader, Col, Row,Button,Label,Input,FormGroup,CardFooter,Spinner,Table,Pagination,PaginationItem,PaginationLink,Form  } from 'reactstrap';
import classes from './brand.module.css';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios'

const Brand =(props)=> {
    const [result, setResult] = useState([
    ]);
    const [loading, setLoading] = useState(false);
    const [categoryFromServer,setCategoryFromServer] = useState([]);
    const [subCategoryFromServer,setSubCategoryFromServer] = useState([]);
    const [arrayHolder,setArrayHolder] = useState([]);
    const [title,setTitle] = useState('');
    const [lable,setLable] = useState('');
    const [categoryValue,setCategoryValue] = useState('');
    const [message,setMessage] = useState('');
    const [image, setImage] = useState('');
    const [file, setFile] = useState('')
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
                }
              }      
                `,
                variables :{
                    "page": 1,
                    "limit": 30,
                    "mainCategory": true,
                    "parentCategory": false,
                    "catId": null
                }
          }
        }).then((result) => {
            const {getAllCategory} = result.data.data;
            setCategoryFromServer(getAllCategory);
        }).catch(error=>{
          console.log(error)
        }); 
        
        setLoading(true)
        axios({
            url: '/',
            method: 'post',
            headers:{'token':`${token}`},
            data: {
              query: `
              query getAllBrand($page : Int, $limit : Int, $category : ID, $getAll : Boolean) {
                getAllBrand(input : { page : $page, limit : $limit, category : $category, getAll : $getAll}) {
                  _id,
                  name,
                  category {
                    _id,
                    name
                  },
                  image,
                  label
                }
              }      
                `,
                variables :{
                    "getAll": true,
                    "category": null
                  }
          }
        }).then((result) => {
          const {getAllBrand} =result.data.data;
          console.log(getAllBrand);
          setLoading(false);
          setResult(getAllBrand);
        }).catch(error=>{
          console.log(error)
        });
        
    },[])
    
    const handleChange= (e)=>{   
         setFile(e.target.files[0]);
         const  preview= URL.createObjectURL(e.target.files[0]);
         setImage(preview);
    }
    
    const addSubCategory = (event)=>{    
        const categoryIndex = subCategoryFromServer.findIndex(subCategory=>{
            return subCategory._id==event.target.value;
        })
        //console.log(categoryIndex)
        const subCat = {...subCategoryFromServer[categoryIndex]};
        const tempArray =[...arrayHolder];       
        tempArray.push(subCat);
        setArrayHolder(tempArray);
       const response = [...subCategoryFromServer]  ;
       response.splice(categoryIndex,1);
       setSubCategoryFromServer(response)
    }
    const deleteSubCategory=(index,item)=>{
        const tempArray = [...arrayHolder];
        tempArray.splice(index,1);
        setArrayHolder(tempArray);
        const response = [...subCategoryFromServer];
        response.push(item);
        setSubCategoryFromServer(response)
    }
    const handleTitle =(event)=>{
        setTitle(event.target.value)
    }
    const handleLable =(event)=>{
        setLable(event.target.value)
    }
    const handleCategoryValue=(event)=>{
        setCategoryValue(event.target.value);
        //console.log(event.target.value)
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
                    "mainCategory": false,
                    "parentCategory": true,
                    "catId": event.target.value
                }
          }
        }).then((result) => {
            const {getAllCategory} = result.data.data;
            setSubCategoryFromServer(getAllCategory)
        }).catch(error=>{
          console.log(error)
        });
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
        const newArray =[];
        for(var i=0;i<arrayHolder.length;i++){
            newArray.push(arrayHolder[i]._id)
        }
           console.log(newArray);
           console.log(title);
           console.log(lable)
           console.log(file)
           
           
           let data = {
            query : `
                   mutation addBrand($category : [ID]!, $name : String!, $label : String, $image : Upload!){
                    brand(input : {category : $category, name : $name, label : $label, image : $image}) {
                        status
                    }
                    }
            `,
            variables : {
                "category" : newArray,
                "name" :title,
                "label" : lable,
                "image" : null,
            }
        };

        let map = {
            0 : ['variables.image'],
        }

        
        let formD = new FormData();
        formD.append('operations' , JSON.stringify(data));
        formD.append('map', JSON.stringify(map));
        formD.append(0, file, file.name);

        console.log(formD);

        let optitons = {
            method : 'POST',
            headers : { 
                'token' : `${token}`
            },
            body : formD
        };

        let url = 'http://localhost:4000/graphql';

        fetch(url,optitons)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));
        
      
        
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12} xs={12} md={12}>
            <Form  encType="multipart/form-data" onSubmit={handleSubmit}>
              <Card>
                <CardHeader>         
                    <strong> اضافه کردن  برند جدید</strong>
                    <br />
                    {message}
                </CardHeader>
                <CardBody>
                    <FormGroup row className="my-0">
                        <Col xs="6">
                            <FormGroup>
                            <Label htmlFor="title">عنوان</Label>
                            <Input type="text" id="title" 
                              placeholder="عنوان را وارد کنید"
                              value={title}
                              onChange={handleTitle}
                              required/>
                            </FormGroup>
                        </Col>
                        <Col xs="6">
                            <FormGroup>
                            <Label htmlFor="description">توضیحات</Label>
                            <Input type="text" id="description"
                             placeholder="در صورت نیاز توضیحات را وارد کنید"
                             value={lable}
                             onChange={handleLable}
                              />
                            </FormGroup>
                        </Col>
                        <Col xs="6">
                            <FormGroup>
                            <Label htmlFor="category"> دسته ها</Label>   
                            <Input type="select" name="subcategory" 
                                id="subcategory"
                                value={categoryValue}
                                onChange={handleCategoryValue}
                                >
                                <option ></option>
                                {
                                    categoryFromServer.map((item,index)=>{
                                        return(<option key={index} value={item._id}>{item.name}</option>)
                                    })
                                }
                            </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="6">
                            <FormGroup>
                            <Label htmlFor="category"> زیر دسته</Label>
                            <Input type="select" name="multiple-select"
                             id="multiple-select"
                             multiple
                             onChange={addSubCategory}
                              >
                              {
                                  subCategoryFromServer.map((subcat)=>{
                                      return(
                                        <option key={subcat._id} value={subcat._id}>{subcat.name}</option>
                                      )
                                  })
                              }
                                
                                
                            </Input>
                            </FormGroup>
                        </Col>
                        {
                           arrayHolder.length!==0 && <Col xs="6" className={classes.brandSection}>
                            
                            {
                                arrayHolder.map((item,index)=>{
                                    return(
                                     <div className={classes.brand}  key={item._id}>
                                     <span>{item.name} </span>
                                     <i className="fa fa-remove fa-lg " onClick={()=>deleteSubCategory(index,item)}></i>
                                     </div>
                                    )
                                })
                            }
                                
                            
                            </Col>
                        }
                        
                        <Col xs="6">
                                <Label htmlFor="file-multiple-input">
                                     <div className={classes.fileSelection}>انتخاب عکس</div>
                                </Label>
                                <Input type="file" id="file-multiple-input"
                                 name="file-multiple-input"  
                                 onChange={handleChange}
                                 
                                 /> 
                        
                        </Col>
                        
                        <Col xs="8">
                            {image ? <img src={ image } alt={image} className="Preview" />:null}
                             
                        </Col>
                    </FormGroup>
                </CardBody>
                <CardFooter>
                <Button type="submit" size="sm" color="primary" ><strong>ثبت</strong> </Button>
              </CardFooter>
              
              </Card>
              </Form>
              <Card>
                <CardHeader>                   
                        <strong>لیست برندها</strong>
                </CardHeader>
                <CardBody>
                    {
                        loading ?<center ><Spinner animation="border" role="status" /></center>
                        
                     :
                      <Table responsive >
                      <thead>
                          <tr>
                              <th>نام برند</th>
                              <th>دسته های مرتبط</th>
                              <th>عکس</th>
                              <th>توضیحات</th>
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
                                    
                                    {item.category.map(subCat=>
                                        <React.Fragment key={subCat._id}>
                                            <span >{subCat.name}</span><br />
                                        </React.Fragment>
                                      
                                        )
                                    }
                                    
                                </td>
                                <td><img src={`${process.env.REACT_APP_PUBLIC_URL}${item.image}`} alt={item.image}  className={classes.Preview}/></td>
                                <td>{item.label}</td>
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

export default Brand;
