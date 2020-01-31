import React,{useState, useEffect, useContext} from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup,Label,Input,Button  } from 'reactstrap';
import axios from 'axios';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
const AddProduct = (props)=>{
  const [name,setName] = useState('');
  const [englishName,setEnglishName] = useState('');
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const[message,setMessage] = useState('');
  const [mainSubTitleFromServer,setMainSubTitleFromServe] = useState([]);
  const [mainCategory,setMainCategory] = useState(true);
  const [parentCategory,setParentCategory] = useState(false);
  const[catId,setCatId] = useState(null);
  const [subCatId,setSubCatId] = useState(null);
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
        setMessage('خطا در دریافت اطلاعات دسته بندی ها')
      }
      const {getAllCategory} = result.data.data;
      if(mainCategory){
        setMainSubTitleFromServe(getAllCategory)
      }
      else if(parentCategory){
        setSubCategory(getAllCategory);
      }            
    }).catch(error=>{
      console.log(error)
    });      
},[catId])

  const nameHandler = (event)=>{
    setName(event.target.value)
  }
  const englishNameHandler = (event)=>{
    setEnglishName(event.target.value)
  }
  const categoryHandler = (event)=>{
    setCatId(event.target.value);
    setMainCategory(false);
    setParentCategory(true);
  }
  const subCategoryHandler = (event)=>{
    setSubCatId(event.target.value);

  }

  
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
                        <Input 
                          type="text" 
                          id="name"
                          placeholder="نام محصول را وارد کنید"
                          required 
                          value={name}
                          onChange={nameHandler}
                        />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="10">
                        <FormGroup>
                        <Label htmlFor="ename">نام انگلیسی</Label>
                        <Input 
                          type="text" 
                          id="ename" 
                          placeholder="نام انگلیسی محصول را وارد کنید" 
                          required
                          value={englishName}
                          onChange ={englishNameHandler}
                         />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="ccmonth">دسته اصلی</Label>
                      <Input type="select" name="ccmonth" id="ccmonth" onChange={categoryHandler}>
                        <option></option>
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
                      <Label htmlFor="ccyear">زیر دسته</Label>
                      <Input type="select" name="ccyear" id="ccyear" onChange={subCategoryHandler}>
                      <option></option>
                        {
                              subCategory.map((item,index)=>{
                                  return(<option key={index} value={item._id}>{item.name}</option>)
                               })
                          }               
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
                      <Label htmlFor="ccyears">برند</Label>
                      <Input type="select" name="ccyears" id="ccyears">
                        <option>سونی</option>
                        <option>نیکون</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <hr style={{marginTop:'19px'}} />
                <Row>
                  <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="seller">فروشنده</Label>
                        <Input type="select" name="seller" id="ccyears">
                          <option>دیجی کالا</option>
                          <option>دی جی لند</option>
                        </Input>
                      </FormGroup>
                  </Col>
                  <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="seller">گارانتی</Label>
                        <Input type="select" name="seller" id="ccyears">
                          <option> 18 ماهه دریا</option>
                          <option> 24 ماهه سودا</option>
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
                <hr />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
}
export default AddProduct;