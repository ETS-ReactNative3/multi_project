import React, { useContext, useEffect,useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Table,Button,Label,Input,FormGroup,CardFooter,Pagination,PaginationItem,PaginationLink,Spinner,Modal, ModalHeader, ModalBody  } from 'reactstrap';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import axios from 'axios';
import classes from '../Media/Media.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [message, setMessage] = useState('');
    const [modal,setModal] = useState(false);
    const [searchBarValue,setSearchBarValue] = useState('');
    const [arrayholder,setArrayHolder] = useState('');
    const [allMedia,setAllmedia] = useState([]);
    const [images,setImages] = useState([])
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
        const tempImage = images[0]._id;
        console.log(tempImage);
        axios({
            url: '/',
            method: 'post',
            headers:{'token':`${token}`},
            data: {
              query: `
               mutation addcategory($name : String!, $label : String, $parent : ID, $image: ID!) {
                   category(input : { name : $name, label : $label, parent : $parent, image:$image}) {
                     status
                   }
                 }     
                `,
                variables : {
                  "name" : title,
                  "label" : lable,
                  "parent" : parent,
                  "image":tempImage
                }
          }
        }).then((result) => {
            if(result.data.errors){
                console.log(result.data.errors);
                //setMessage('ثبت اطلاعات با مشکل مواجه شده است');            
            }
            toast.success('دسته بندی با موفقیت ذخیره شد')
            setIsSubmit(!isSubmit);
            
        }).catch(error=>console.log(error));
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
        console.log(newImages);   
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
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12} xs={12} md={12}>
          <div className="form-group">
                <ToastContainer />
            </div>
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
                        <Col xs="2">
                          <Button size="sm" color="danger" onClick={selectImage}>
                          انتخاب عکس
                          </Button>
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

export default Category;
