import React, {useState, useEffect, useContext} from 'react';
import {  Card, CardBody, CardHeader, CardFooter, Col, Row, Input, Modal, ModalHeader,Button,ModalBody,ModalFooter,Spinner  } from 'reactstrap';
import classes from '../Media/Media.module.css';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const ProductPictures = (props)=>{
    const {productid} =props.match.params;
    if(!productid)
    {
        props.history.push('/dashboard')
    }
    const {dispatch} = useContext(AuthContext);
    const token =  GetToken();
    const [allMedia,setAllmedia] = useState([]);
    const [loading,setLoading] = useState(false);
    const [modal,setModal] = useState(false);
    const [searchBarValue,setSearchBarValue] = useState('');
    const [arrayholder,setArrayHolder] = useState('');
    const [products,setProducts] = useState([]);
  useEffect(()=>{
      dispatch({type:'check',payload:props});
      setLoading(true);
      axios({
        url: '/',
        method: 'post',
        headers:{'token':`${token}`},
        data: {
          query: `
          query getAllMedia($page : Int, $limit : Int) {
              getAllMultimedia(page : $page, limit : $limit) {
                _id,
                dir,
              
              }
            }  
            `,
            variables :{        
                  "page": 1,
                  "limit": 10
          }
      }
    }).then((result)=>{
        const {getAllMultimedia} = result.data.data;
        for(let i=0;i<getAllMultimedia.length;i++){
            getAllMultimedia[i].checked = false;
        }
      setAllmedia(getAllMultimedia);
      setArrayHolder(getAllMultimedia)
    }).catch((error)=>{
          console.log(error)
    })

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
            images{
              _id,
              dir
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
      console.log(result.data.errors[0])
      toast.error('خطا در دریافت اطلاعات  محصولات');
      //dispatch({type:'logout',payload:props});
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
  const toggleLarge=()=> {
    setModal(!modal)
}
  const selectImage=()=>{
    setModal(true);
}
const filterMedia = (event)=>{
 
    const newData = arrayholder.filter((item)=>{
      const itemData = item.name.toUpperCase();
      const textData = event.target.value.toUpperCase();
      return itemData.indexOf(textData)>-1
    })
    setAllmedia(newData);
    setSearchBarValue(event.target.value)
  }

  const addImage = (id,dir)=>{
    const newAllMedia = [...allMedia]
    const newData = newAllMedia.filter((item)=>{
        return item._id ===id
      })
      newData[0].checked = !newData[0].checked;
      setAllmedia(newAllMedia);
    const newProduct = [...products];
    newProduct[0].images.push({
      "_id":id,
      "dir":dir
    });
    setProducts(newProduct);

  }
  const removeImage = (index)=>{
    const newProduct = [...products];
    newProduct[0].images.splice(index,1);
    setProducts(newProduct);
  }
  const onSubmitProductImages = ()=>{
    console.log(productid);
    const tempProduct =[];
    for(let i =0;i<products[0].images.length;i++){
      tempProduct.push(products[0].images[i]._id)
    }
    console.log(tempProduct);

    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        mutation UpdateProductImages($productId : ID!, $images : [String!]!) {
          UpdateProductImages(productId : $productId, images : $images) {
            status,
            message
          }
        }    
          `,
          variables :{
            "productId": productid,
            "images": tempProduct
          }
    }
  }).then((result) => {
    if(result.data.errors){
      const {message} = result.data.errors[0];
      toast.error(message);
    }
    else{
     
       const {message} = result.data.data.UpdateProductImages;
        toast.success(message);
    }
             
  }).catch(error=>{
    console.log(error)
  })


  }
    return(
        <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <div className="form-group">
                <ToastContainer />
            </div>
            {
              loading ? <center><Spinner /></center> :
              
                products.map((p)=>
                <Card key={p._id}>
                  <CardHeader style={{ display: 'flex',justifyContent: 'space-between'}}>
                      <span>
                      عکس های محصول <span style={{color:'blue'}}>{p.fname}</span>
                      </span>
                      <Button size="sm" color="danger" onClick={selectImage}>
                        انتخاب عکس
                      </Button>
                  </CardHeader>
                 <CardBody>
                    <div className={classes.mediaSection}>
                    {
                      p.images.map((item,index)=>{
                        return(
                        <div className={classes.media}  key={index}>
                            <span className={classes.removeIconsPicturesProduct} onClick={()=>removeImage(index)}> 
                                <i className="fa fa-remove fa-lg mt-4"></i>
                            </span>
                            <img src={require(`${process.env.REACT_APP_PUBLIC_URL}${item.dir}`)} alt={item.dir} />
                        </div>
                        )
                      })
                    }
                        
                        
                    </div>
                   
                    
                 </CardBody>
                 <CardFooter>
                    <Button size="sm" color="primary" block onClick={onSubmitProductImages}>
                         ثبت
                    </Button>
                 </CardFooter>
             </Card>
                )
            }
             
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggleLarge}
         className={'modal-lg ' + props.className}>
         <ModalHeader toggle={toggleLarge}>انتخاب عکس </ModalHeader>
         <ModalBody>

            {
                modal ? 
                
                <div className="animated fadeIn">
                    <Row>
                    <Col xl={12}>
                        <div className="form-group">
                            <ToastContainer />
                        </div>
                        {
                        loading ? <center><Spinner /></center> :
                        <Card>
                            <CardHeader>
                                <Col xs="7">
                                <Input type="text"
                                placeholder="جستجو در پرونده های چند رسانه ای"
                                onChange={filterMedia}
                                value={searchBarValue}
                                    />
                                </Col>
                            </CardHeader>
                            <CardBody>
                                <div className={classes.mediaSection}>
                                {
                                allMedia.map((item)=>{
                                    return(
                                    <div className={classes.media}  key={item._id}
                                    >
                                        <Input type="checkbox" onChange={()=>addImage(item._id,item.dir)} checked={item.checked}/>
                                        <img src={require(`${process.env.REACT_APP_PUBLIC_URL}${item.dir}`)} alt={item.dir} />
                                    </div>
                                    )
                                  })
                                }      
                                </div>
                                
                                
                            </CardBody>
                        </Card>
                        }
                        
                    </Col>
                    </Row>
                </div>
                
                :null
            }
        </ModalBody>
      </Modal>
      </div>
    )
}
export default React.memo(ProductPictures)