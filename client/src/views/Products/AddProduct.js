import React,{useState, useEffect, useContext} from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup,Label,Input,Button,CustomInput } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {checkFileSize , checkMimeType} from '../Media/Funcs';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import classes from './product.module.css';
const AddProduct = (props)=>{
  const [name,setName] = useState('');
  const [englishName,setEnglishName] = useState('');
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [message,setMessage] = useState('');
  const [mainSubTitleFromServer,setMainSubTitleFromServe] = useState([]);
  const [mainCategory,setMainCategory] = useState(true);
  const [parentCategory,setParentCategory] = useState(false);
  const [catId,setCatId] = useState(null);
  const [subCatId,setSubCatId] = useState(null);
  const [sellers,setSellers] = useState([]);
  const [warranty,setWarranty] = useState([]);
  const [brands,setBrands] = useState([]);
  const [brandId,setBrandId] = useState(null)
  const [thirdSubCategory,setThirdSubCategory] = useState([]);
  const [specs,setSpecs] = useState([]);
  const [info,setInfo] = useState([]);
  const [sellerId,setSellerId] = useState(null);
  const [warrantyId,setWarrantyId] = useState(null);
  const [color,setColor] = useState('black');
  const [numberOfProducts,setNumberOfProducts] = useState(1);
  const [price,setPrice] = useState(0);
  const [discountedPrice,setDiscountedPrice] = useState(0);
  const [thirdSubCatId,setThirdSubCatId] = useState(null);
  const [description,setDescription] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
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
          query getAllSWarranty {
            getAllWarranty {
              _id,
              name,
              label
            }
          }      
            `
      }
    }).then((result) => {
      if(result.data.errors){
        toast.error('خطا در دریافت اطلاعات  گارانتی ها')
      }
      else{
          setWarranty(result.data.data.getAllWarranty);
         
      }
      
    }).catch(error=>{
      console.log(error)
    });      
},[])
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
        toast.error('خطا در دریافت اطلاعات دسته بندی ها')
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
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        query addProductInfo($categoryId : ID, $getSubCategory : Boolean!, $subCategoryId : ID){
          getAddProductInfo(categoryId : $categoryId, getSubCategory : $getSubCategory, subCategoryId : $subCategoryId) {
            sellers {
              _id,
              name
            }
          }
        }      
          `,
          variables :{
            "categoryId":event.target.value,
            "getSubCategory": false,
            "subCategoryId": null
          }
    }
  }).then((result) => {
    if(result.data.errors){
      toast.error('خطا در دریافت اطلاعات فروشندگان')
    }
    setSellers(result.data.data.getAddProductInfo.sellers)           
  }).catch(error=>{
    console.log(error)
  })
  }
  const subCategoryHandler = (event)=>{
    setSubCatId(event.target.value);
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
            
            brands {
              _id,
              name
            },
            
            subcats {
              _id,
              name
            },

          }
        }      
          `,
          variables :{
            "categoryId": null,
            "getSubCategory": true,
            "subCategoryId": event.target.value
          }
    }
  }).then((result) => {
    if(result.data.errors){
      toast.error('خطا در دریافت اطلاعات برندها')
    }
    else{
      const {specs,brands,subcats}= result.data.data.getAddProductInfo ;     
      setBrands(brands);
      setThirdSubCategory(subcats);
      for(var i=0;i<specs.length;i++){
        for(var j=0;j<specs[i].details.length;j++)
        {
          specs[i].details[j].value="";
          specs[i].details[j].label="";
        }
          
      }
      setSpecs(specs);
      
    }
   
  }).catch(error=>{
    console.log(error)
  })
  }
  const thirdSubCategoryHandler=(event)=>{
    setThirdSubCatId(event.target.value);
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
  const warrantyHandler =(event)=>{
    setWarrantyId(event.target.value);
  }
  const sellerHandler = (event)=>{
    setSellerId(event.target.value)
  }
  const colorHandler = (event)=>{
    console.log(event.target.value);
    setColor(event.target.value)
  }
  const numberOfProductsHandler = (event)=>{
    setNumberOfProducts(event.target.value)
  }
  const priceHandler = (event)=>{
    setPrice(event.target.value)
  }
  const discountedPriceHandler = (event)=>{
    setDiscountedPrice(event.target.value)
  }
  const brandHandler = (event)=>{
    setBrandId(event.target.value)
  }
  
  const addButton =()=>{
    const arrayHolder = [...info];
    arrayHolder.push({
      seller:sellerId,
      warranty:warrantyId,
      price:parseInt(price),
      stock: parseInt(numberOfProducts),
      discount: parseInt(discountedPrice),
      color:color
    })
    setInfo(arrayHolder);
    
  }
  const getNameSeller =(id)=>{
    const newData = sellers.filter((item)=>{
      const itemData = item._id;
      const textData = id;
      return itemData.indexOf(textData)>-1
    })
    return newData[0].name ;
  }
  const getNameWarranty = (id)=>{
    const newData = warranty.filter((item)=>{
      const itemData = item._id;
      const textData = id;
      return itemData.indexOf(textData)>-1
    })
    return newData[0].name;
  }
  const deleteItemInfo = (index)=>{
    const infoItems = [...info];
    infoItems.splice(index , 1);
    setInfo(infoItems);
  }
  const descriptionHandler=(event,editor)=>{
    const data = editor.getData();
    setDescription(data);
  }
  const handleChangePicture= (e)=>{  
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
      console.log(name);
      console.log(englishName);
      console.log(IDforServer);
      console.log(brandId);
     console.log(info);
      console.log(description);
      console.log(SpecArray);
      let data = 
      {
        query: `
        mutation addProduct($fname : String!, $ename : String!, $category : ID!, $brand : ID!, $attribute : [InputAttribute!]!, $description : String!, $details : [InputDetails!]!, $image : Upload) {
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
            "details": SpecArray,
            "image":null
          }
    }
    let map = {
      0 : ['variables.image'],
    }

    
    let formD = new FormData();
    formD.append('operations' , JSON.stringify(data));
    formD.append('map', JSON.stringify(map));
    formD.append(0, file, file.name);
    axios({
      url: '/',
      method: 'post',
      headers:{
        'token':`${token}`,
      },
      data: formD
  }).then((result)=>{
    if(result.data.errors){
      console.log(result.data);
      toast.error('خطلا در ثبت اطلاعات محصول جدید')
    }
    else{
      toast.success(result.data.data.product.message)
    }
   
  })
  .catch((error)=>console.log(error));
  
   }
    return(
        <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <div className="form-group">
              <ToastContainer />
            </div>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> اضافه کردن محصول
                <br />
                <span style={{color:'red'}}>{message}</span>
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
                      <Label htmlFor=" thirddubcategory">زیر دسته دوم</Label>
                      <Input 
                        type="select" 
                        name="thirddubcategory" 
                        id="thirddubcategory"
                        onChange={thirdSubCategoryHandler}
                      >
                      <option></option>
                        {
                              thirdSubCategory.map((item,index)=>{
                                  return(<option key={index} value={item._id}>{item.name}</option>)
                               })
                          } 
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
                       >
                      <option></option>
                        {
                              brands.map((item,index)=>{
                                  return(<option key={index} value={item._id}>{item.name}</option>)
                               })
                          }  
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <hr style={{marginTop:'19px'}} />
                <Row>
                  <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="seller">فروشنده</Label>
                        <Input
                         type="select"
                         name="seller"
                         id="seller"
                         onChange={sellerHandler}
                         required
                          >
                          <option> </option>
                          {
                            sellers.map((item)=> <option key={item._id}  value={item._id}>{item.name}</option>)
                          }                        
                        </Input>
                      </FormGroup>
                  </Col>
                  <Col xs="4">
                      <FormGroup>
                        <Label htmlFor="Warranty">گارانتی</Label>
                        <Input
                          type="select"
                          name="Warranty"
                          id="Warranty"
                          onChange={warrantyHandler}
                          required
                        >
                          <option> </option>
                          {
                            warranty.map((item)=> <option key={item._id}  value={item._id}>{item.name}</option>)
                          } 
                        </Input>
                      </FormGroup>
                  </Col>
                </Row>
                <Row>
                    <Col xs="3">
                        <FormGroup>
                            <Label for="exampleColor">رنگ</Label>
                            <Input
                              type="select"
                              name="Warranty"
                              id="Warranty"
                              onChange={colorHandler}
                              required
                              
                            >
                             <option value="black">مشکی</option>
                             <option value="red">قرمز</option>
                             <option value="blue">آبی</option>
                             <option value="green">سبز</option>
                             <option value="yellow">زرد</option>
                          </Input>
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
                            value={numberOfProducts}
                            onChange={numberOfProductsHandler}
                            required
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
                            value={price}
                            onChange={priceHandler}
                            required
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="3">
                        <FormGroup>
                            <Label for="priceOff"> درصد تخفیف</Label> 
                            <Input
                            type="number"
                            name="priceOff"
                            id="priceOff"
                            placeholder="قیمت محصول با تخفیف" 
                            value={discountedPrice}
                            onChange={discountedPriceHandler}
                            required
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="1" style={{display:'flex',justifyContent:'center',alignItems:'flex-end'}}>
                        <FormGroup>
                            <Button color="danger" className="btn-pill" onClick={addButton} >
                                 <i className="fa fa-plus fa-lg"></i>
                            </Button>
                        </FormGroup>
                    </Col>
                </Row>
                
                {
                  //show item entered
                  info.map((item,index)=>
                  {
                    let nameSeller = getNameSeller(item.seller);
                    let nameWarranty = getNameWarranty(item.warranty);
                    return(
                    <Row key={index}>
                      <Col xs="2">
                          <FormGroup>
                              <Label for="exampleNumber">فروشنده</Label>
                              <Input
                              type="text"
                              name="number"
                              id="exampleNumber"
                              value={nameSeller}
                              disabled
                              onChange={sellerHandler}
                              />
                          </FormGroup>
                      </Col>
                      <Col xs="2">
                          <FormGroup>
                              <Label for="exampleNumber">گارانتی</Label>
                              <Input
                              type="text"
                              name="number"
                              id="exampleNumber"
                              value={nameWarranty}
                              disabled
                              onChange={warrantyHandler}
                              />
                          </FormGroup>
                      </Col>
                      <Col xl="2">
                        <FormGroup>
                            <Label for="exampleNumber">رنگ</Label>
                          <Input
                                type="color"
                                name="color"
                                id="exampleColor"
                                placeholder="color placeholder"
                                value={item.color}
                                onChange={colorHandler}
                                />
                        </FormGroup>
                      </Col>
                      <Col xs="1">
                          <FormGroup>
                              <Label for="exampleNumber">تعداد</Label>
                              <Input
                              type="text"
                              name="number"
                              id="exampleNumber"
                              value={item.stock}
                              disabled
                              onChange={numberOfProductsHandler}
                              />
                          </FormGroup>
                      </Col>
                      <Col xs="2">
                          <FormGroup>
                              <Label for="exampleNumber">قیمت</Label>
                              <Input
                              type="text"
                              name="number"
                              id="exampleNumber"
                              value={item.price}
                              disabled
                              onChange={priceHandler}
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
                              onChange={discountedPriceHandler}
                              />
                          </FormGroup>
                      </Col>
                      <Col xs="1" style={{display:'flex',justifyContent:'center',alignItems:'flex-end'}}>
                        <FormGroup>
                            <Button color="danger" className="btn-pill" onClick={()=>deleteItemInfo(index)} >
                                 <i className="fa fa-trash fa-lg"></i>
                            </Button>
                        </FormGroup>
                    </Col>
                    </Row>
                    )
                  }
                    
                  )
                }
                <hr />
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
                        <div className={classes.fileSelection}>انتخاب عکس</div>
                    </Label>
                        <Input type="file" id="file-multiple-input"
                            name="file-multiple-input"  
                            onChange={handleChangePicture}
                                  /> 
                    </FormGroup>
                  </Col>
                  <Col xl="4">
                    {image ? <img src={ image } alt={image} className={classes.preview} />:null}
                  </Col>
                </Row>
                <Row>
                  <Button color="success" size="lg" block onClick={addProductHandler}>ثبت محصول</Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
}
export default AddProduct;