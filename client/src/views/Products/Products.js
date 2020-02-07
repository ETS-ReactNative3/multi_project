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
  const[products,setProducts] = useState([]);
  const[attribute,setAttribute] = useState([])
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
              discount
            },
            rate,          
            image
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
  },[])
  const[modal,setModal] = useState(false);
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
  const deleteItem=(index)=>{
    const items = [...attribute];
    items.splice(index , 1);
    setAttribute(items);
    console.log(attribute);
    if(attribute.length===0){
      setModal(false);
    }
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
                           let link =`/products/product/${item._id}`
                              return(
                                <tr className={classes.productDetails} key={item._id}>
                                  <td className={classes.bothname}>
                                    <span>{item.fname}</span>
                                    <span>{item.ename}</span>
                                  </td>
                                  <td>
                                    <img src={require(`${process.env.REACT_APP_PUBLIC_URL}${item.image}`)} alt="pic" />
                                  </td>
                                  <td>{item.brand.name}</td>
                                  <td>
                                    <i className="fa fa-eye fa-lg " onClick={()=>toggleLarge(item.attribute)}></i>
                                  </td>
                                  <td>{item.rate ? item.rate :0}</td>
                                  <td className={classes.opreation}>
                                    <Button size="sm" color="primary"> 
                                      <NavLink to={link}> <i className="fa fa-edit fa-lg "></i></NavLink>
                                    </Button>
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
                    <ModalHeader toggle={toggleLarge}>فروشندگان</ModalHeader>
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
                                  <Col xl="4">
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
                                  <Col xl="4">
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
      </div>
    )
  
}

export default Products;
