import React,{useState, useEffect, useContext} from 'react';
import { Table, Card, CardBody, CardHeader,CardFooter, Col, Row, FormGroup,Label,Input,Button,Modal, ModalHeader, ModalBody, ModalFooter, Spinner,Carousel,CarouselIndicators,CarouselControl,CarouselItem  } from 'reactstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from '../Media/Media.module.css';
const Slider = (props)=>{
    const [title,setTitle] = useState('');
    const [checked,setChecked] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultLoading,setResultLoading] = useState(true);
    const [arrayholder,setArrayHolder] = useState('');
    const [allMedia,setAllmedia] = useState([]);
    const [searchBarValue,setSearchBarValue] = useState('');
    const [sliderImage] = useState([]);
    const [modal,setModal] = useState(false);
    const [modalAddImage,setModalAddImage] = useState(false);
    const [activeIndex,setActiveIndex] = useState(0);
    const {dispatch} = useContext(AuthContext); 
    const [animating,setAnimating] = useState(false);
    const [allSlider,SetAllSlider] = useState([]);
    const [selectedItem,setSelectedItem] = useState(null);
    const token =  GetToken();

    const handleTitle =(event)=>{
        setTitle(event.target.value)
    }
    const setDefault = ()=>{
        setChecked(!checked)
    }
    const selectImage=()=>{
        setModal(true);
    }
    const toggleLarge=()=> {
        setModal(!modal)
    }
    const modalAddImageHandler = (id)=>{
        setModalAddImage(true);
        setSelectedItem(id)
    }
    const togglemodalAddImageHandler=()=> {
        setModalAddImage(!modalAddImage)
    }
  useEffect(()=>{
    dispatch({type:'check',payload:props});
    axios({
        url: '/',
        method: 'post',
        headers:{'token':`${token}`},
        data: {
          query: `
          query getAllSlider($sliderId : ID) {
            getAllSlider(sliderId : $sliderId) {
              _id,
              name,
              image {
                _id,
                dir
              },
              default
            }
          } 
            `,
            variables :{
                "sliderId": null
              }
      }
    }).then((result)=>{
      const {getAllSlider} = result.data.data;
      getAllSlider.map(item=>item.flag=false);
      SetAllSlider(getAllSlider);
      setResultLoading(false)
    }).catch((error)=>{
          console.log(error)
    })

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
              name
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
    setLoading(false);
  }).catch((error)=>{
        console.log(error)
  })
},[])
const filterMedia = (event)=>{
 
  const newData = arrayholder.filter((item)=>{
    const itemData = item.name.toUpperCase();
    const textData = event.target.value.toUpperCase();
    return itemData.indexOf(textData)>-1
  })
  setAllmedia(newData);
  setSearchBarValue(event.target.value)
}
const addSlider = (id)=>{
    const newAllMedia = [...allMedia]
    const newData = newAllMedia.filter((item)=>{
        return item._id ===id
      })
      newData[0].checked = !newData[0].checked;
      setAllmedia(newAllMedia);
      sliderImage.push({
          "id": newData[0]._id,
          "src": newData[0].dir
      })

}

const slides2 = sliderImage.map((item,index) => {
    return (
      <CarouselItem
        onExiting={onExiting}
        onExited={onExited}
        key={index}
        className={classes.CarouselItem}
      >
        <img className="d-block w-100" src={`${process.env.REACT_APP_PUBLIC_URL}${item.src}`} alt={item.src} />
      </CarouselItem>
    );
  });
 const next =() =>{
    if (animating) return;
    const nextIndex = activeIndex === sliderImage.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex );
}
const previous =() => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? sliderImage.length - 1 : sliderImage.activeIndex - 1;
    setActiveIndex(nextIndex );
  }
  const onExiting =()=> {
    setAnimating(true)
  }

 const onExited =() =>{
    setAnimating(false);
  }
  const goToIndex =(newIndex)=> {
    if (animating) return;
    setActiveIndex(newIndex );
  }

const handleSubmit = ()=>{
const ImageId =[];
for (let i=0;i<sliderImage.length;i++)
{
    ImageId.push(sliderImage[i].id)
}

axios({
    url: '/',
    method: 'post',
    headers:{'token':`${token}`},
    data: {
      query: `
      mutation addSlider($name : String!, $imageId : [ID!]!, $default : Boolean) {
        addSlider(name : $name, imageId : $imageId, default : $default) {
            _id,
          status,
          message
        }
      }
        `,
        variables :{
            "name": title,
            "imageId": ImageId,
            "default": checked
          }
  }
}).then((result)=>{
    if(result.data.errors){
        const {message} = result.data.errors[0];
       toast.error( message)
    }
    else{
        const {message,_id} = result.data.data.addSlider;
        toast.success(message);
        const tempSlider = [...allSlider]
        tempSlider.push({
            "_id":_id,
            "name":title,
            "image":ImageId,
            "flag":false
        })
        SetAllSlider(tempSlider)
    }
 
}).catch((error)=>{
      console.log(error)
})

}

const deleteSlider = (id,index)=>{
    axios({
        url: '/',
        method: 'post',
        headers:{'token':`${token}`},
        data: {
          query: `
          mutation DeleteSlider($sliderId : ID!, $imageId : ID) {
            DeleteSlider(sliderId : $sliderId, imageId : $imageId) {
              status,
              message
            }
          }
            `,
            variables :{
                "sliderId": id,
                "imageId" : null
              }
      }
    }).then((result)=>{
        if(result.data.errors){
            const {message} = result.data.errors[0];
            //console.log(result.data)
           toast.error( message)
        }
        else{
            const {message} = result.data.data.DeleteSlider;
            toast.success(message);
            const tempSlider = [...allSlider];
            tempSlider.splice(index,1);
            SetAllSlider(tempSlider)
            
        }
     
    }).catch((error)=>{
          console.log(error)
    })
}

const handleEdit = (id)=>{
    const newSlider =[...allSlider];
    const newData = newSlider.filter((item)=>{
      return item._id ===id
    })
     
     newData[0].flag = true;
    SetAllSlider(newSlider);
  }

  const ChangeDefaultStatus = (id)=>{
    const newSlider =[...allSlider];
    const newData = newSlider.filter((item)=>{
        return item._id ===id
    }) 
     newData[0].default = !newData[0].default;
     SetAllSlider(newSlider);
  }
  const changeNameHandler = (event,id)=>{
    const newSlider =[...allSlider];
    const newData = newSlider.filter((item)=>{
        return item._id ===id
    }) 
     newData[0].name = event.target.value;
     SetAllSlider(newSlider);
  }

  const removeImage = (itemIndex,imageIndex)=>{
    const newSlider =[...allSlider];
    newSlider[itemIndex].image.splice(imageIndex,1);
    SetAllSlider(newSlider)
  }
  const addImage=(id,dir)=>{
    const newAllMedia = [...allMedia]
    const newData = newAllMedia.filter((item)=>{
        return item._id ===id
      })
      newData[0].checked = !newData[0].checked;
      setAllmedia(newAllMedia);
      
    const newSlider =[...allSlider];
    const newItem = newSlider.filter((item)=>{
        return item._id ===selectedItem
    }) 
    newItem[0].image.push({
        "_id":id,
        "dir":dir
    })
     SetAllSlider(newSlider);

  }

const submitEdit= (id)=>{
    const newSlider =[...allSlider];
    const newData = newSlider.filter((item)=>{
      return item._id ===id
    })
    const {_id, name, image} = newData[0];
    const images =[];
    image.map((item)=>{
      images.push(item._id)
    })
    axios({
      url: '/',
      method: 'post',
      headers:{'token':`${token}`},
      data: {
        query: `
        mutation UpdateSlider($sliderId : ID, $name : String, $imageId : [ID], $default : Boolean) {
          UpdateSlider(sliderId : $sliderId, name : $name, imageId : $imageId, default : $default) {
            status,
            message
          }
        }
          `,
          variables :{
            "sliderId": _id,
            "name": name,
            "imageId": images,
            "default": newData[0].default
          }
    }
  }).then((result)=>{
      if(result.data.errors){
          const {message} = result.data.errors[0];
          console.log(result.data)
         toast.error( message)
      }
      else{
          const {message,status} = result.data.data.UpdateSlider;
          if(status==401)
          {
            toast.error(message);
          }
          else{
            toast.success(message);
          }
          
          newData[0].flag = false;
          SetAllSlider(newSlider);
      }
   
  }).catch((error)=>{
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
        <Card>
            <CardHeader>
                    <i className="fa fa-align-justify"></i> اضافه کردن  اسلایدر
                    <br />   
            </CardHeader>
            <CardBody>
             
             <Row>
                  <Col xs="4">
                      <FormGroup>
                            <Label htmlFor="title">عنوان </Label>
                            <Input type="text" id="title"
                              placeholder="عنوان وضعیت را وارد کنید"
                              value={title}
                              onChange={handleTitle}
                              required/>
                        </FormGroup>
                    </Col>
                    <Col xl="5" className="checbox_box">
                      <FormGroup check>
                        <Label check>
                       
                        تعیین به عنوان اسلایدر پیش فرض اپلیکیشن
                        </Label>
                          <Input type="checkbox" value={checked} onChange={setDefault} />
                      </FormGroup>
                    </Col> 
                    <Col xs="3">
                        <FormGroup>
                        <Button type="submit" size="sm" 
                            color="danger"
                            onClick={selectImage}
                            >
                                <strong>انتخاب عکس</strong> 
                        </Button>
                        </FormGroup>
                    </Col>
                    
             </Row>                  
                 
              <Row>
                  
                  {
                      sliderImage.length !==0?
                    <Col xs="8">
                    <hr />
                    <Carousel activeIndex={activeIndex} next={next} previous={previous} className={classes.slider}>
                        <CarouselIndicators items={sliderImage} activeIndex={activeIndex} onClickHandler={goToIndex} />
                        {slides2}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                    </Carousel>                    
                    </Col>:null
                  }
               
              </Row>
             



            </CardBody>
            <CardFooter>
                    <Button type="submit" size="sm" 
                    color="danger"
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
                        resultLoading ?<center ><Spinner animation="border" role="status" /></center>
                        
                     :
                      <Table responsive >
                      <thead>
                          <tr>
                              <th>نام اسلایدر </th>
                              <th>تعداد عکس</th>
                              <th>وضعیت</th>
                              <th>عملیات</th>                                
                          </tr>
                      </thead>
                      
                          
                        <tbody>
                        {
                            
                            allSlider.map((item,index)=>{
                                
                                return(
                                    <React.Fragment key={item._id}>
                                    <tr  style={item.default ?{background:'#f0f3f5'}:null}>
                                        <td>
                                        {
                                        item.flag ?
                                            <Input 
                                            type="text"
                                            value={item.name}
                                            onChange={(event)=>changeNameHandler(event,item._id)}
                                            />
                                        :item.name
                                        }
                                        </td>
                                        <td>{item.image.length}</td>
                                        <td>
                                        {item.flag 
                                          ? 
                                          <Input type="checkbox" 
                                          //value={item.default}
                                          checked={item.default}
                                          onChange={() =>ChangeDefaultStatus(item._id)}
                                          //disabled = {item.default}
                                           />
                                          :
                                          item.default ? 'پیش فرض' : 'عادی'}
                                        </td>
                                        <td>
                                            <Row>
                                            <Col xs="2">
                                            {
                                                item.flag ? 
                                            <Button type="submit" size="sm" color="primary" onClick={()=>submitEdit(item._id)}> <i className="fa fa-check fa-lg "></i> </Button>
                                                :
                                            <Button type="submit" size="sm" color="primary" onClick={()=>handleEdit(item._id)}><strong>ویرایش</strong> </Button>
                                            }
                                            
                                                
                                        
                                            </Col>
                                            <Col xs="2">
                                                <Button type="submit" size="sm" color="danger" onClick={()=>deleteSlider(item._id,index)}><strong>حذف</strong> </Button>
                                            </Col>
                                            <Col xs="2">
                                                {item.flag? 
                                                <Button type="submit" size="sm" 
                                                    color="danger"
                                                    onClick={()=>modalAddImageHandler(item._id)}
                                                    >
                                                      اضافه کردن عکس
                                                  </Button>
                                                   :null
                                                }
                                            </Col>
                                            </Row>
                                        </td>          
                                    </tr>
                                    {
                                        item.flag ?
                                        <tr className={classes.thumbnail_box}>
                                            {
                                                item.image.map((imgeItem,idx)=>{
                                                    return(
                                                        <div key={item._id+idx}>
                                                            <span className={classes.removeIcons} onClick={()=>removeImage(index,idx)}> 
                                                                <i className="fa fa-remove fa-lg mt-4"></i>
                                                            </span>
                                                            <img style={{width:'90px', height:'110px'}}src={`${process.env.REACT_APP_PUBLIC_URL}${imgeItem.dir}`} alt={imgeItem.dir} />
                                                            
                                                        </div>
                                                    )
                                                   
                                                })
                                            }
                                        </tr>:null
                                    }
                                    </React.Fragment>
                                )
                                
                            })
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
                                        <Input type="checkbox" onChange={()=>addSlider(item._id)} checked={item.checked}/>
                                        <img src={`${process.env.REACT_APP_PUBLIC_URL}${item.dir}`} alt={item.dir} />
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

      <Modal isOpen={modalAddImage} toggle={togglemodalAddImageHandler}
         className={'modal-lg ' + props.className}>
         <ModalHeader toggle={togglemodalAddImageHandler}>اضافه کردن عکس </ModalHeader>
         <ModalBody>

            {
                modalAddImage ? 
                
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
                                        <img src={`${process.env.REACT_APP_PUBLIC_URL}${item.dir}`} alt={item.dir} />
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
export default React.memo(Slider);