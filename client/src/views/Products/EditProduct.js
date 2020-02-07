import React,{useState, useEffect, useContext} from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup,Label,Input,Button,Spinner } from 'reactstrap';
import axios from 'axios';
import {checkFileSize , checkMimeType} from '../Media/Funcs';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classes from './product.module.css';
const EditProduct = (props)=>{
  const [name,setName] = useState('');
  const [englishName,setEnglishName] = useState('');
  const [categoryName,setCategoryName] = useState('');
  const [subCategoryName,setSubCategoryName] = useState('');
  const [thirdCategoryName,setThirdCategoryName] = useState('');
  const [message,setMessage] = useState('');
  const [subCatId,setSubCatId] = useState(null);
  const [brands,setBrands] = useState([]);
  const [brandId,setBrandId] = useState(null);
  const [brandName,setBrandName] = useState('')
  const [specs,setSpecs] = useState([]);
  const [info,setInfo] = useState([]);
  const [thirdSubCatId,setThirdSubCatId] = useState(null);
  const [description,setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageServer,setImageServer] = useState(null);
  const [file, setFile] = useState('');
  const [loading,setLoading] = useState(false);
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  useEffect(()=>{  
    const {productid} = props.match.params;
    if(!productid){
      props.history.replace('/products')
    }
    dispatch({type:'check',payload:props});
    setLoading(true)
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        query getProduct($page : Int, $limit : Int, $productId : ID) {
          getProduct(page : $page, limit : $limit, productId : $productId){
            _id,
            fname,
            ename,           
            brand {
              _id,
              name
            },
            rate,          
            image,
            attribute{
              _id,
              seller {
                  _id,
                  name,
              },
              warranty{
                _id,
                name
              },
              color,
              discount,
              stock,
              price
            },
            description,
            category{
              _id,
              name,
              parent {
                _id,
                name
                parent {
                  _id,
                	name
                }
              }
            },
            details {
              _id,
              value,
              label,
              p_details {
                _id,
                name,               
                specs {
                  specs

                }
              }
            }
        }  
      }  
          `,
          variables :{
            "page": 1,
            "limit": 10,
            "productId": productid
          }
    }
  }).then((result) => {
    if(result.data.errors){
      toast.error('خطا در دریافت اطلاعات  محصولات')
    }
    else{
      const {getProduct} = result.data.data;
      console.log(getProduct[0]);
      setName(getProduct[0].fname);
      setEnglishName(getProduct[0].ename);
      setBrandId(getProduct[0].brand._id);
      setBrandName(getProduct[0].brand.name);
      setImageServer(getProduct[0].image[0]);
      setDescription(getProduct[0].description);
      setInfo(getProduct[0].attribute);
      let specId=null;
      if(getProduct[0].category.parent.parent){
        setCategoryName(getProduct[0].category.parent.parent.name);
        setSubCategoryName(getProduct[0].category.parent.name);
        setThirdCategoryName(getProduct[0].category.name);
        specId =getProduct[0].category.parent._id;
      }
      else if(!getProduct[0].category.parent.parent){
        setCategoryName(getProduct[0].category.parent.name);
        setSubCategoryName(getProduct[0].category.name);
        specId =getProduct[0].category._id
      }
      axios({
        url: '/',
        method: 'post',
        headers:{'token':`${token}`},
        data: {
          query: `
          query addProductInfo($categoryId : ID, $getSubCategory : Boolean!, $subCategoryId : ID){
            getAddProductInfo(categoryId : $categoryId, getSubCategory : $getSubCategory, subCategoryId : $subCategoryId) {
              specs {
                _id,
                specs,
                details {
                  _id,
                  name
                }
              },
            }
          }      
            `,
            variables :{
              "categoryId": null,
              "getSubCategory": true,
              "subCategoryId": specId
            }
      }
      }).then((result) => {
        if(result.data.errors){
          setMessage('خطا در دریافت اطلاعات مشخصات')
        }
        else{
          const {specs}= result.data.data.getAddProductInfo ;     
          const productDetailes =    getProduct[0].details; 

          for(var i=0;i<specs.length;i++){
            for(var j=0;j<specs[i].details.length;j++)
            {             
                for(let c=0;c<productDetailes.length;c++){
                  if(productDetailes[c].p_details._id  == specs[i].details[j]._id)
                  {
                    specs[i].details[j].value=productDetailes[c].value;
                    specs[i].details[j].label=productDetailes[c].label;
                  }

                  
                }
            }
              
          }
          console.log(specs);
          setSpecs(specs); 
        }
      
      }).catch(error=>{
        console.log(error)
      })     
      
      setLoading(false)
    }
             
  }).catch(error=>{
    console.log(error)
  })
  },[])
  

  const nameHandler = (event)=>{
    setName(event.target.value)
  }
  const englishNameHandler = (event)=>{
    setEnglishName(event.target.value)
  }
  


  const handleChangeSpecName=(event,specId,id)=>{
    const tempSpecs ={...specs[specId]}
    const tempSpecsDetail = {...tempSpecs.details[id]};
    tempSpecsDetail.value = event.target.value;
    const newstate = [...specs];
    newstate[specId].details[id] = tempSpecsDetail
    setSpecs(newstate);
  }
  const handleChangeSpecLable =(event,specId,id)=>{
    const tempSpecs ={...specs[specId]}
    const tempSpecsDetail = {...tempSpecs.details[id]};
    tempSpecsDetail.label = event.target.value;
    const newstate = [...specs];
    newstate[specId].details[id] = tempSpecsDetail;
    setSpecs(newstate);
  }
 
  
  const brandHandler = (event)=>{
    setBrandId(event.target.value)
  }
  


  const descriptionHandler=(event,editor)=>{
    const data = editor.getData();
    setDescription(data);
  }
  const handleChangePicture= (e)=>{   
    setImageServer(null);
    if(checkMimeType(e) &&   checkFileSize(e))
    {
      setFile(e.target.files[0]);
      const  preview= URL.createObjectURL(e.target.files[0]);
      setImage(preview);
    }
    
    
  }
  const addProductHandler =()=>{
    let IDforServer = null;
    if(thirdSubCatId){
      IDforServer = thirdSubCatId;
    }
    else{
      IDforServer = subCatId;
    }
    const SpecArray =[];
    specs.map(spec=>{
      spec.details.map(item=>{
        SpecArray.push({
          p_details:item._id,
          value:item.value,
          label:item.label
        })
        })
      }
    )
      // console.log(name);
      // console.log(englishName);
      // console.log(IDforServer);
      // console.log(brandId);
      console.log(info);
      // console.log(description);
      // console.log(SpecArray);
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        mutation addProduct($fname : String!, $ename : String!, $category : ID!, $brand : ID!, $attribute : [InputAttribute], $description : String!, $details : [InputDetails!]!, $image : [String]) {
          product(input : {fname : $fname, ename : $ename, category : $category, brand : $brand, attribute : $attribute, description : $description, details : $details, image : $image }) {
            status,
            message
          }
        }     
          `,
          variables :{
            "fname" : name,
            "ename": englishName,
            "category" : IDforServer,
            "brand": brandId,
            "attribute": info,
            "description": description,
            "details": SpecArray
          }
    }
  }).then((result)=>console.log(result.data.data))
  .catch((error)=>console.log(error));
  
   }
    if(loading)
    {
      return(<center><Spinner /></center>)
    }
    
    else
    return(
        <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <div className="form-group">
              <ToastContainer />
            </div>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> ویرایش کردن محصول
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
                      <Label htmlFor="mainCategory">دسته اصلی</Label>
                      <Input
                       type="select" 
                       name="mainCategory" 
                       id="mainCategory" 
                      // onChange={categoryHandler}
                       disabled
                       >
                        <option >{categoryName}</option>                
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="ccyear">زیر دسته</Label>
                      <Input 
                       type="select"
                       name="ccyear"
                       id="ccyear" 
                       //onChange={subCategoryHandler}
                       disabled
                      >
                      <option>{subCategoryName}</option>
                                       
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor=" thirddubcategory">زیر دسته دوم</Label>
                      <Input 
                        type="select" 
                        name="thirddubcategory" 
                        id="thirddubcategory"
                        //onChange={thirdSubCategoryHandler}
                        disabled
                      >
                      <option>{thirdCategoryName}</option> 
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="ccyears">برند</Label>
                      <Input 
                       type="select" 
                       name="ccyears" 
                       id="ccyears"
                       onChange={brandHandler}
                       vlaue={brandId}
                       >
                      {brandId ?<option>{brandName}</option>:
                        
                              brands.map((item,index)=>{
                                  return(<option key={index} value={item._id}>{item.name}</option>)
                               })
                          }  
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <hr style={{marginTop:'19px'}} />
                {
                  //show item entered
                  info.map((item,index)=>
                  {         
                    let lableId = `lable-${item._id}`          
                    return(
                    <Row key={index}>
                      <Col xs="2">
                          <FormGroup>
                              <Label for={lableId}>فروشنده</Label>
                              <Input
                              type="text"
                              name={lableId}
                              id={lableId}
                              value={item.seller.name}
                              disabled
                              
                              />
                          </FormGroup>
                      </Col>
                      <Col xs="2">
                          <FormGroup>
                              <Label for={lableId}>گارانتی</Label>
                              <Input
                              type="text"
                              name={lableId}
                              id={lableId}
                              value={item.warranty.name}
                              disabled
                             
                              />
                          </FormGroup>
                      </Col>
                      <Col xl="2">
                        <FormGroup>
                            <Label for={lableId}>رنگ</Label>
                          <Input
                                type="text"
                                name={lableId}
                                id={lableId}
                                value={item.color}
                                disabled
                                />
                        </FormGroup>
                      </Col>
                      <Col xs="1">
                          <FormGroup>
                              <Label for={lableId}>تعداد</Label>
                              <Input
                              type="text"
                              name={lableId}
                              id={lableId}
                              value={item.stock}
                              disabled
                             
                              />
                          </FormGroup>
                      </Col>
                      <Col xs="2">
                          <FormGroup>
                              <Label for="exampleNumber">قیمت</Label>
                              <Input
                              type="text"
                              name={lableId}
                              id={lableId}
                              value={item.price}
                              disabled
                            
                              />
                          </FormGroup>
                      </Col>
                      <Col xs="2">
                          <FormGroup>
                              <Label for="exampleNumber">درصد تخفیف</Label>
                              <Input
                              type="text"
                              name="number"
                              id="exampleNumber"
                              value={item.discount}
                              disabled
                             
                              />
                          </FormGroup>
                      </Col>
                      <Col xs="1" style={{display:'flex',justifyContent:'center',alignItems:'flex-end'}}>
                        
                    </Col>
                    </Row>
                    )
                  }
                    
                  )
                }
                
                {
                  //show specs item
                  specs.map((spec,idx)=>
                    <Card key={spec._id}> 
                      <CardHeader>
                        {spec.specs}
                      </CardHeader>
                      <CardBody>
                          {
                            spec.details.map((item,index)=>
                            {
                              const Id = `name-${item._id}`;
                              const LabelId = `label-${item._id}`;
                              return(
                                <Row key={item._id}>
                                <Col xl="4">
                                  <FormGroup>
                                  <Input 
                                    type="text" 
                                    disabled
                                    value={item.name} 
                                  />
                                  </FormGroup>
                                </Col>
                                <Col xl="4">
                                  <FormGroup>
                                  <Input 
                                    type="text" 
                                    value={item.value} 
                                    id={Id}
                                    name={Id}
                                    onChange={(event)=>handleChangeSpecName(event,idx,index)}
                                    
                                  />
                                  </FormGroup>
                                </Col>
                                <Col xl="4">
                                  <FormGroup>
                                  <Input 
                                    type="text" 
                                    value={item.label} 
                                    id={LabelId}
                                    name={LabelId}
                                    onChange={(event)=>handleChangeSpecLable(event,idx,index)}
                                    placeholder="توضیحات در صورت نیاز"
                                  />
                                  </FormGroup>
                                </Col>
                              </Row> 
                              )
                            }  
                            )
                          }
                      </CardBody>
                  </Card>
                  )
                }
                <Row>
                  <Col xl="12">
                    <FormGroup>
                        <Label for="ckEditor">توضیحات</Label>
                        <CKEditor
                          editor={ ClassicEditor }
                          data={description}
                          dir="rtl"
                          onChange={ ( event, editor ) => descriptionHandler(event, editor)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl="8">
                    <FormGroup>
                    <Label htmlFor="file-multiple-input">
                        {
                          imageServer ?<div className={classes.fileSelection}>ویرایش عکس</div>:
                          <div className={classes.fileSelection}>انتخاب عکس</div>
                        }
                        
                    </Label>
                        <Input type="file" id="file-multiple-input"
                            name="file-multiple-input"  
                            onChange={handleChangePicture}
                                  /> 
                    </FormGroup>
                  </Col>
                  <Col xl="4">
                    {
                      imageServer ?<img src={require(`${process.env.REACT_APP_PUBLIC_URL}${imageServer}`)} alt={imageServer} className={classes.preview} />:
                      image ? <img src={ image } alt={image} className={classes.preview} />:null
                      }
                  </Col>
                </Row>
                <Row>
                  <Button color="success" size="lg" block onClick={addProductHandler}>ویرایش  محصول</Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
}
export default EditProduct;