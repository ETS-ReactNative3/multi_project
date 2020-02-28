import React, { useContext, useEffect,useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Label,Input,FormGroup,CardFooter,Pagination,PaginationItem,PaginationLink,Spinner,Modal, ModalHeader, ModalBody  } from 'reactstrap';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';
import classes from '../Media/Media.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Banner =(props)=> {
    const [mainCategory,setMainCategory] = useState(true);
    const [parentCategory,setParentCategory] = useState(false);
    const [mainSubTitleFromServer,setMainSubTitleFromServe] = useState([]);
    const [catId,setCatId] = useState(null);
    const [subCategory,setSubCategory] = useState([]);
    const [thirdSubCategory,setThirdSubCategory] = useState([]);
    const [subCatId,setSubCatId] = useState(null);
    const [thirdSubCatId,setThirdSubCatId] = useState(null);
    const [images,setImages] = useState([]);
    const [modal,setModal] = useState(false);
    const [arrayholder,setArrayHolder] = useState('');
    const [allMedia,setAllmedia] = useState([]);
    const [searchBarValue,setSearchBarValue] = useState('');
    const [checked,setChecked] = useState(false);
    const [resultLoading,setResultLoading] = useState(true);
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

    useEffect(()=>{
        dispatch({type:'check',payload:props});
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
                    "limit": 100
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
    },[])

    const categoryHandler = (event)=>{
        setCatId(event.target.value);
        setMainCategory(false);
        setParentCategory(true);
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
          const {subcats}= result.data.data.getAddProductInfo ;     
          setThirdSubCategory(subcats); 
        }
       
      }).catch(error=>{
        console.log(error)
      })
    }
    const thirdSubCategoryHandler=(event)=>{
        setThirdSubCatId(event.target.value);
      }


      const selectImage=()=>{
        if(images.length>0){
            toast.error('لطفا عکس قبلی را حذف کنید تا بتوانید عکس جدید انتخاب کنید')
        }
        else{
          setModal(true);
        }
        
      }
    const toggleLarge=()=> {
        setModal(!modal)
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
            const newImages = [...images];
            newImages.push({
              "_id":id,
              "dir":dir
            });
            setImages(newImages);
            setModal(false);
            
    }
    const removeImage = (id,index)=>{
        const newImages = [...images];
        newImages.splice(index,1);
        setImages(newImages);
        const newAllMedia = [...allMedia]
        const newData = newAllMedia.filter((item)=>{
            return item._id ===id
        })
        newData[0].checked = false;
        setAllmedia(newAllMedia);
    
    }
    const setDefault = ()=>{
        setChecked(!checked)
    }
    const addBanner = ()=>{
        let IDforServer = null;
        if(thirdSubCatId){
            IDforServer = thirdSubCatId;
        }
        else{
            IDforServer = subCatId;
        }
        const tempImage = images[0]._id;
        console.log(tempImage);
        console.log(IDforServer);
        console.log(checked);
        axios({
            url: '/',
            method: 'post',
            headers:{'token':`${token}`},
            data: {
              query: `
              mutation addBanner($categoryId : ID!, $imageId : ID!, $default : Boolean) {
                Banner(categoryId : $categoryId, imageId : $imageId, default : $default) {
                  status,
                  message
                }
              }    
                `,
                variables :{
                    "categoryId": IDforServer,
                    "imageId": tempImage,
                    "default":checked
                  }
          }
        }).then((result) => {
          if(result.data.errors){
            const {message} = result.data.errors[0]
            toast.error(message)
          }
          else{
              const {message} = result.data.data.Banner
              toast.success(message);
          }
         
        }).catch(error=>{
          console.log(error)
        })

    }

    return(
        <div className="animated fadeIn">
            <Row>
                <Col xl={12} xs={12} md={12}>
                    <div className="form-group">
                            <ToastContainer />
                    </div>
                    <Card>
                        <CardHeader>         
                            <strong> اضافه کردن بنر به دسته بندی ها</strong>
                            <br />     
                        </CardHeader>
                        <CardBody>
                            
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
                                <Col xs="3" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                    <Button size="sm" color="danger" onClick={selectImage}>
                                        انتخاب عکس
                                    </Button>
                                </Col>
                                <Col xl="5" className="checbox_box">
                                    <FormGroup check>
                                        <Label check>
                                        فعال بودن
                                        </Label>
                                        <Input type="checkbox" value={checked} onChange={setDefault} />
                                    </FormGroup>
                                </Col> 
                                <Col xs="2">
                                    <div className={classes.mediaSection}>
                                        {
                                            images.map((item,index)=>{
                                            return(
                                            <div className={classes.media}  key={index} style={{width:'auto'}}>
                                                <span className={classes.removeIconsPicturesProduct} onClick={()=>removeImage(item._id,index)}> 
                                                    <i className="fa fa-remove fa-lg mt-4"></i>
                                                </span>
                                                <img src={require(`${process.env.REACT_APP_PUBLIC_URL}${item.dir}`)} alt={item.dir} />
                                            </div>
                                            )
                                            })
                                        }
                                    </div>
                                </Col>
                            </Row>

                        </CardBody>
                        <CardFooter>
                            <Button type="submit" size="sm" 
                                color="primary"
                                onClick={addBanner}
                            >
                                <strong>ثبت</strong> 
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>                   
                                <strong>لیست بنرها</strong>
                        </CardHeader>
                        <CardBody>
                            {
                                resultLoading ?<center ><Spinner animation="border" role="status" /></center>
                                
                            :
                            <Table responsive >
                                <thead>
                                    <tr>
                                        <th>نام دسته </th>
                                        <th> عکس</th>
                                        <th>وضعیت</th>
                                        <th>عملیات</th>                                
                                    </tr>
                                </thead>
                            
                                
                                <tbody>
                                </tbody>
                            </Table>
                            }
                        </CardBody>
                    </Card>

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
export default React.memo(Banner)