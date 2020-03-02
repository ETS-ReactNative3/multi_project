import React, { useEffect,useState,useContext } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Input, Modal, ModalHeader,Button,ModalBody,ModalFooter,Spinner  } from 'reactstrap';
import classes from './Media.module.css';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Media =(props) =>{
  const {dispatch} = useContext(AuthContext);
  const token =  GetToken();
  const [modal,setModal] = useState(false);
  const [arrayholder,setArrayHolder] = useState('');
  const [allMedia,setAllmedia] = useState([]);
  const [selectedItem,setSelectedItem] = useState(null);
  const [loading,setLoading] = useState(false);
  const [searchBarValue,setSearchBarValue] = useState('');
  const toggleLarge=()=> {
        setModal(!modal)
  }
  const setChange =(item)=>{
    setModal(true);
    setSelectedItem(item)
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
              dir,
              name,
              format,
              dimwidth,
              dimheight,
              createdAt
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
    return (
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
                        onClick={()=>{setChange(item);}}
                        >
                            <img src={`${process.env.REACT_APP_PUBLIC_URL}${item.dir}`} alt={item.dir} />
                        </div>
                        )
                      })
                    }
                        
                        
                    </div>
                    {
                      selectedItem ?
                      <Modal isOpen={modal} toggle={toggleLarge}
                      className={'modal-lg ' + props.className}>
                      <ModalHeader toggle={toggleLarge}>جزئیات پرونده </ModalHeader>
                      <ModalBody>
                          <Row>
                              <Col xl={8}>
                              <img 
                              src={`${process.env.REACT_APP_PUBLIC_URL}${selectedItem.dir}`} 
                              alt={selectedItem.dir}
                              style={{width:'100%'}}
                               />
                              </Col>
                              <Col xl={4}>
                                  <Row>
                                      <Col xl={4}>
                                        <strong>نام پرونده:</strong> 
                                      </Col>
                                      <Col xl={8}>
                                      {selectedItem.name}
                                      </Col>
                                  </Row>
                                  <hr />
                                  <Row>
                                      <Col xl={4}>
                                        <strong>نوع پرونده:</strong> 
                                      </Col>
                                      <Col xl={8}>
                                      {selectedItem.format}
                                      </Col>
                                  </Row>
                                  <hr />
                                  <Row>
                                      <Col xl={4}>
                                        <strong> ابعاد عکس:</strong> 
                                      </Col>
                                      <Col xl={8}>
                                      {selectedItem.dimwidth} * {selectedItem.dimheight} px
                                      </Col>
                                  </Row>
                                  <hr />
                                  <Row>
                                      <Col xl={4}>
                                        <strong>  تاریخ ایجاد:</strong> 
                                      </Col>
                                      <Col xl={8}>
                                      { new Date(selectedItem.createdAt).toLocaleDateString('fa-IR') } 
                                      </Col>
                                  </Row>
                              </Col>
                          </Row>
                          
                      </ModalBody>
                      <ModalFooter>
                          <Button color="danger" onClick={toggleLarge}>Delete</Button>{' '}
                          <Button color="secondary" onClick={toggleLarge}>Cancel</Button>
                      </ModalFooter>
                      </Modal>:null
                    }
                    
                 </CardBody>
             </Card>
            }
             
          </Col>
        </Row>
      </div>
    )
  
}

export default Media;
