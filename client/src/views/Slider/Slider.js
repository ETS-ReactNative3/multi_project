import React,{useState, useEffect, useContext} from 'react';
import { Card, CardBody, CardHeader,CardFooter, Col, Row, FormGroup,Label,Input,Button,Modal, ModalHeader, ModalBody, Spinner,Carousel,CarouselIndicators,CarouselControl,CarouselItem  } from 'reactstrap';
import axios from 'axios';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from '../Media/Media.module.css';
const Slider = (props)=>{
    const [title,setTitle] = useState('');
    const [checked,setChecked] = useState(false);
    const [loading,setLoading] = useState(false);
    const [arrayholder,setArrayHolder] = useState('');
    const [allMedia,setAllmedia] = useState([]);
    const [searchBarValue,setSearchBarValue] = useState('');
    const [sliderImage] = useState([]);
    const [modal,setModal] = useState(false);
    const [activeIndex,setActiveIndex] = useState(0);
    const {dispatch} = useContext(AuthContext); 
    const [animating,setAnimating] = useState(false)
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
              dir
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

const slides2 = sliderImage.map((item) => {
    return (
      <CarouselItem
        onExiting={onExiting}
        onExited={onExited}
        key={item.src}
      >
        <img className="d-block w-100" src={require(`${process.env.REACT_APP_PUBLIC_URL}${item.src}`)} alt={item.src} />
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
console.log(sliderImage);
console.log(checked);
console.log(title);

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
export default React.memo(Slider);