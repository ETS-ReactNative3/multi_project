import React, { useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, Input, Modal, ModalHeader,Button,ModalBody,ModalFooter  } from 'reactstrap';
import classes from './Media.module.css'
const Media =(props) =>{
  const[modal,setModal] = useState(false);
  const[picPath,setPicPath] = useState('')
  const toggleLarge=()=> {
        setModal(!modal)
      }
const setChange =(picPath)=>{
    setModal(true);
    setPicPath(picPath)
}
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
             <Card>
                 <CardHeader>
                    <Col xs="7">
                      <Input type="text" placeholder="جستجو در پرونده های چند رسانه ای" />
                    </Col>
                 </CardHeader>
                 <CardBody>
                    <div className={classes.mediaSection}>
                        <div className={classes.media} onClick={()=>{setChange('https://dkstatics-public.digikala.com/digikala-products/114170147.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90');}}>
                            <img src="https://dkstatics-public.digikala.com/digikala-products/114170147.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90" alt="pic" />
                        </div>
                        
                    </div>
                    <Modal isOpen={modal} toggle={toggleLarge}
                        className={'modal-lg ' + props.className}>
                    <ModalHeader toggle={toggleLarge}>جزئیات پرونده </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xl={8}>
                             <img className={classes.modalImage} src={picPath} alt={picPath} />
                            </Col>
                            <Col xl={4}>
                                <Row>
                                    <Col xl={4}>
                                       <strong>نام پرونده:</strong> 
                                    </Col>
                                    <Col xl={8}>
                                    acquiring-online-computer-programming-degree.jp
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xl={4}>
                                       <strong>نوع پرونده:</strong> 
                                    </Col>
                                    <Col xl={8}>
                                    image/jpeg
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                         
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={toggleLarge}>Delete</Button>{' '}
                        <Button color="secondary" onClick={toggleLarge}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
                 </CardBody>
             </Card>
          </Col>
        </Row>
      </div>
    )
  
}

export default Media;
