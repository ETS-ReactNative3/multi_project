import React, { useState, useEffect, useContext } from 'react';
import {Card,CardBody,CardHeader, Col, Row, Table, Button, Modal, ModalHeader,ModalBody,ModalFooter,Label,Input,FormGroup, Spinner } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classes from './product.module.css';
import axios from 'axios';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Products =(props)=> {
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  const [message,setMessage] = useState('');
  const [loading,setLoading] = useState(false);
  const [products,setProducts] = useState([]);
  const [attribute,setAttribute] = useState([]);
  const [loadAgain,setLoadAgain] = useState(false);
  const [modal,setModal] = useState(false);
  const [modalSeller,setModalSeller] = useState(false);
  const [productName,setProductName] = useState('');
  const [productId,setProductId] = useState(null);
  const [sellers,setSellers] = useState([]);
  const [catId,setCatId] = useState(null);
  const [mainSubTitleFromServer,setMainSubTitleFromServe] = useState([]);
  const [sellerId,setSellerId] = useState(null);
  const [warrantyId,setWarrantyId] = useState(null);
  const [warranty,setWarranty] = useState([]);
  const [color,setColor] = useState('');
  const [numberOfProducts,setNumberOfProducts] = useState(1);
  const [price,setPrice] = useState(0);
  const [discountedPrice,setDiscountedPrice] = useState(0);
  useEffect(()=>{  
    dispatch({type:'check',payload:props});
    setLoading(true);
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
              name
            },
            attribute {
              _id,
              seller {
                _id,
                name
              },
              warranty{
                _id,
                name
              },
              color,
              stock,
              price,
              discount,
              suggestion
            },
            rate,          
            original
          }
        }     
          `,
          variables :{
            "page": 1,
            "limit": 10,
            "productId": null
          }
    }
  }).then((result) => {
    if(result.data.errors){
      
      toast.error('خطا در دریافت اطلاعات  محصولات');
      dispatch({type:'logout',payload:props});
    }
    else{
      const {getProduct} = result.data.data;
      setProducts(getProduct);
      setLoading(false) 
    }
             
  }).catch(error=>{
    console.log(error)
  })
 
  },[loadAgain])

  useEffect(()=>{
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
      toast.error('خطا در دریافت اطلاعات دسته بندی ها')
    }
    const {getAllCategory} = result.data.data;
      setMainSubTitleFromServe(getAllCategory)            
  }).catch(error=>{
    console.log(error)
  }); 
  },[])

  const toggleLarge=(attribute)=> {
    if(!modal)
    {
      setAttribute(attribute);
      setModal(true)
    }
    else{
      setAttribute([]);
      setModal(false);
    }
    
  }
  const editSellers =()=>{
    const attributeHolder =[];
    attribute.map((item)=>{
      attributeHolder.push({
        id:item._id,
        seller:item.seller._id,
        warranty:item.warranty._id,
        color:item.color,
        price:parseInt(item.price),
        discount:parseInt(item.discount),
        stock:parseInt(item.stock),
        suggestion:item.suggestion
      })
    })
    console.log(attributeHolder);
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        mutation updateProductAttribute($addSeller : Boolean, $attribute : [InputAttribute!]!) {
          UpdateProducctAttribute (input : {addSeller : $addSeller, attribute : $attribute}) {
            status,
            message
          }
        }    
          `,
          variables :{
            "addSeller":false,
            "attribute": attributeHolder
          }
    }
  }).then((result) => {
    if(result.data.errors){
      
      toast.error('خطا در ویرایش اطلاعات  فروشندگان');
      
    }
    else{
      toast.success(result.data.data.UpdateProducctAttribute.message);
      setLoadAgain(!loadAgain);
      setModal(false);
    }
             
  }).catch(error=>{
    console.log(error)
  })
  }
  const handleChangeColor = (event,id)=>{ 
    const field={...attribute[id]};
    field.color=event.target.value;
    const newAttributerState = [...attribute];
    newAttributerState[id]=field;
    setAttribute(newAttributerState);
  }
  const handleChangeStock = (event,id)=>{ 
    const field={...attribute[id]};
    field.stock=event.target.value;
    const newAttributerState = [...attribute];
    newAttributerState[id]=field;
    setAttribute(newAttributerState);
  }
  const handleChangePrice = (event,id)=>{ 
    const field={...attribute[id]};
    field.price=event.target.value;
    const newAttributerState = [...attribute];
    newAttributerState[id]=field;
    setAttribute(newAttributerState);
  }
  const handleChangeDiscount = (event,id)=>{ 
    const field={...attribute[id]};
    field.discount=event.target.value;
    const newAttributerState = [...attribute];
    newAttributerState[id]=field;
    setAttribute(newAttributerState);
  }
  const suggestion = (id,flag)=>{
    const field={...attribute[id]};
    if(field.discount<5){
      toast.error('برای اضافه شدن محصول به پیشنهاد ویژه باید درصد تخفیف بیشتر از 5 درصد باشد');
    }
    else{
      field.suggestion=flag;
      const newAttributerState = [...attribute];
      newAttributerState[id]=field;
      setAttribute(newAttributerState);
    }    
  }
  const deleteItem=(index)=>{
    const items = [...attribute];
    items.splice(index , 1);
    setAttribute(items);
    console.log(attribute);
    if(attribute.length===0){
      setModal(false);
    }
  }
  const categoryHandler = (event)=>{
    setCatId(event.target.value);
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        query getAllSeller($categoryId : ID!) {
          getAllSeller(categoryId : $categoryId) {
            _id,
            name,
            label
          }
        }      
          `,
          variables :{
            "categoryId": event.target.value
          }
    }
  }).then((result) => {
    if(result.data.errors){
      toast.error('خطا در دریافت اطلاعات فروشندگان')
    }
    //console.log(result.data.data);
    setSellers(result.data.data.getAllSeller)           
  }).catch(error=>{
    console.log(error)
  })


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

  }

  const showAddModalSeller = (productId,productName)=>{
    setProductId(productId)
    setProductName(productName)
    setModalSeller(!modalSeller);
   
  }

  const sellerHandler = (event)=>{
    setSellerId(event.target.value);
  }
  const warrantyHandler =(event)=>{
    setWarrantyId(event.target.value);
  }
  const colorHandler = (event)=>{
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

  const addSeller = ()=>{
    console.log(productId);
    console.log(sellerId);
    console.log(warrantyId);
    console.log(color);
    console.log(numberOfProducts);
    console.log(price);
    console.log(discountedPrice);
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        mutation updateProductAttribute($addseller : Boolean, $attribute : [InputAttribute!]!) {
          UpdateProductAttribute (input : {addSeller : $addseller, attribute : $attribute}) {
            status,
            message
          }
        }      
          `,
          variables :{
            "addseller": true,
            "attribute": {
              "id": productId,
              "seller": sellerId,
              "warranty": warrantyId,
              "color": color,
              "price": parseInt(price),
              "stock": parseInt(numberOfProducts),
              "discount": parseInt(discountedPrice)
            }
          }
    }
  }).then((result) => {
    if(result.data.errors){
      toast.error('خطا در ثبت اطلاعات فروشنده جدید  ')
    }
    else{
      toast.success(result.data.data.UpdateProducctAttribute.message);
      setModalSeller(false);
        }
      
  }).catch(error=>{
    console.log(error)
  })
    
  }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <div className="form-group">
              <ToastContainer />
            </div>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> محصولات<br />
                <span style={{color:'red'}}>{message}</span>
              </CardHeader>
              <CardBody>
              { loading ?<center><Spinner size="lg" /></center> :
                <Table responsive>
                  <thead>
                    <tr>
                      
                      <th scope="col">نام محصول</th>
                      <th scope="col">عکس</th>
                      <th scope="col">برند</th>
                      <th scope="col">فروشندگان</th>         
                      <th scope="col">امتیاز</th>
                      <th scope="col">عملیات</th>
                    </tr>
                  </thead>
                  
                    
                    <tbody>
                      {
                          products.map((item)=>
                          {
                           let link =`/products/product/${item._id}`;
                           let pictureLink = `/products/product/picture/${item._id}`;
                              return(
                                <tr className={classes.productDetails} key={item._id}>
                                  <td className={classes.bothname}>
                                    <span>{item.fname}</span>
                                    <span>{item.ename}</span>
                                  </td>
                                  <td>
                                    <img src={require(`${process.env.REACT_APP_PUBLIC_URL}${item.original}`)} alt="pic" />
                                  </td>
                                  <td>{item.brand.name}</td>
                                  <td>
                                   <Button size="sm" color="primary"> 
                                    <i className="fa fa-eye fa-lg " onClick={()=>toggleLarge(item.attribute)}></i>
                                    </Button>
                                    <Button size="sm" color="danger"> 
                                      <i className="fa fa-plus fa-lg" onClick={()=>showAddModalSeller(item._id,item.name)}></i>
                                    </Button>
                                    </td>
                                  <td>{item.rate ? item.rate :0}</td>
                                  <td className={classes.opreation}>
                                    <Button size="sm" color="primary"> 
                                      <NavLink to={link}> <i className="fa fa-edit fa-lg "></i></NavLink>
                                    </Button>
                                    <NavLink to={pictureLink}>
                                      <Button size="sm" color="warning">
                                      <i className="fa fa-file-image-o fa-lg"></i>
                                      </Button>
                                    </NavLink>
                                    <Button type="submit" size="sm" color="danger">
                                      <i className="fa fa-trash fa-lg "></i>
                                    </Button>
                                  </td>
                                </tr>
                              )
                          } 
                          )
                      }                     
                   </tbody> 
                </Table>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggleLarge}
                        className={'modal-lg ' + props.className}>
                    <ModalHeader toggle={toggleLarge}>فروشندگان {productName}</ModalHeader>
                    <ModalBody>
                      {
                        attribute.map((item,idx)=>
                        {
                            
                            const sellerId = `seller-${idx}`;
                            const warrantyId = `warranty-${idx}`;
                            const colorId = `color-${idx}`;
                            const stockId = `color-${idx}`;
                            const price = `price-${idx}`;
                            const discountId = `discount-${idx}`;
                            return(
                              <Row key={item.seller._id}>
                                  <Col xl="4">
                                  <FormGroup>
                                      <Label htmlFor={sellerId}>فروشنده</Label>
                                      <Input
                                      type="select"
                                      name={sellerId}
                                      id={sellerId}
                                      disabled
                                      required
                                        >
                                          <option vlaue={item.seller._id}>{item.seller.name}</option>
                                          </Input>
                                    </FormGroup>
                                  </Col>
                                  <Col xl="4">
                                  <FormGroup>
                                        <Label htmlFor={warrantyId}>گارانتی</Label>
                                        <Input
                                        type="select"
                                        name={warrantyId}
                                        id={warrantyId}
                                        disabled
                                        required
                                          >
                                            <option vlaue={item.warranty._id}>{item.warranty.name}</option>
                                            </Input>
                                      </FormGroup>
                                  </Col>
                                  <Col xl="4">
                                  <FormGroup>
                                        <Label for={colorId}>رنگ</Label>
                                          <Input
                                              type="select"
                                              name={colorId}
                                              id={colorId}
                                              onChange={(event)=>handleChangeColor(event,idx)}
                                              value={item.color}
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
                                  <Col xl="2">
                                  <FormGroup>
                                      <Label for={stockId}>تعداد</Label>
                                      <Input
                                      type="number"
                                      name={stockId}
                                      id={stockId}
                                      placeholder="تعداد محصول"
                                      value={item.stock}
                                      onChange={(event)=>handleChangeStock(event,idx)}
                                      required
                                      />
                                  </FormGroup>
                                  </Col>
                                  <Col xl="3">
                                    <FormGroup>
                                        <Label for={price}>قیمت (تومان)</Label>
                                        <Input
                                        type="number"
                                        name={price}
                                        id={price}
                                        placeholder=" قیمت محصول"
                                        value={item.price}
                                        onChange={(event)=>handleChangePrice(event,idx)}
                                        required
                                        />
                                    </FormGroup>
                                  </Col>
                                  <Col xl="3">
                                  <FormGroup>
                                      <Label for={discountId}> درصد تخفیف</Label> 
                                      <Input
                                      type="number"
                                      name={discountId}
                                      id={discountId}
                                      placeholder="قیمت محصول با تخفیف" 
                                      value={item.discount}
                                      onChange={(event)=>handleChangeDiscount(event,idx)}
                                      required
                                      />
                                  </FormGroup>
                                  </Col>
                                  <Col xl="2" className={classes.deleteButton}>
                                    <FormGroup style={{display:'flex',flexFlow:'column'}}>
                                    <Label>پیشنهاد وِیژه</Label> 
                                        {                                 
                                            item.suggestion ?
                                            <i className="fa fa-star fa-lg" onClick={()=>suggestion(idx,false)}></i> 
                                            :<i className="fa fa-star-o fa-lg" onClick={()=>suggestion(idx,true)}></i>
                                          }
                                    </FormGroup>
                                  </Col>
                                  <Col xl="2" className={classes.deleteButton}>
                                  <Button type="submit" size="lg" color="danger" onClick={()=>deleteItem(idx)}>
                                    <i className="fa fa-trash fa-lg"></i>
                                  </Button>
                                  </Col>
                                  <hr />  
                              </Row>
                            )
                        }
                       
                        
                        )
                      }
                        
                                               
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={editSellers}>ویرایش</Button>{' '}
                        <Button color="secondary" onClick={toggleLarge}>لغو</Button>
                    </ModalFooter>
                    </Modal>

                    <Modal isOpen={modalSeller} toggle={showAddModalSeller} className={'modal-lg ' + props.className}>
                      <ModalHeader toggle={showAddModalSeller}>اضافه کردن فروشنده به محصول {productName}</ModalHeader>
                      <ModalBody>
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
                                    sellers ?
                                    sellers.map((item)=> <option key={item._id}  value={item._id}>{item.name}</option>):null
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
                        </Row>

                      </ModalBody>
                      <ModalFooter>
                          <Button color="danger" onClick={addSeller}>اضافه کردن فروشنده</Button>{' '}
                          <Button color="secondary" onClick={showAddModalSeller}>لغو</Button>
                      </ModalFooter>
                    </Modal>
      </div>
    )
  
}

export default Products;
