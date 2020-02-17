import React,{useState, useEffect, useContext} from 'react';
import { Card, CardBody, CardHeader,CardFooter, Col, Row, FormGroup,Label,Input,Button,Table, Spinner  } from 'reactstrap';
import axios from 'axios';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import classes from '../Shop/brand.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Status = (props)=>{
    const [title,setTitle] = useState('');
    const [loading,setLoading] = useState(false);
    const [resultServer,setResult] = useState([]);
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const {dispatch} = useContext(AuthContext);
    const token =  GetToken();

    useEffect(()=>{
        dispatch({type:'check',payload:props});
        setLoading(true);
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
            toast.error('خطا در دریافت اطلاعات  گارانتی ها');
            
          }
          else{
              setResult(result.data.data.getAllWarranty);
              setLoading(false);
          }
          
        }).catch(error=>{
          console.log(error)
        });      
    },[])

    const handleTitle =(event)=>{
        setTitle(event.target.value)
    }
   
    const handleSubmit =()=>{
        dispatch({type:'check',payload:props});
        axios({
            url: '/',
            method: 'post',
            headers:{'token':`${token}`},
            data: {
              query: `
              mutation addWarranty($name : String!, $label : String) {
                warranty(name : $name, label : $label) {
                  _id,
                  status,
                  message
                }
              }   
                `,
                variables :{
                        "name": title,
                           
                }
          }
        }).then((result) => {
          if(result.data.errors){
            toast.error('خطلا در ثبت اطلاعات گارانتی جدید جدید');
          }
          else{
           }
        }).catch(error=>{
          console.log(error)
        });
    }
    const handleChange= (e)=>{   
      setFile(e.target.files[0]);
      const  preview= URL.createObjectURL(e.target.files[0]);
      setImage(preview);
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
                    <i className="fa fa-align-justify"></i> اضافه کردن وضعیت سفارشات
                    <br />   
            </CardHeader>
            <CardBody>
             <FormGroup row className="my-0">                    
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
                    <Col xs="5">
                        <FormGroup>
                        <Label htmlFor="file-multiple-input">
                                    <div className={classes.fileSelection}>انتخاب عکس</div>
                                    </Label>
                                    <Input type="file" id="file-multiple-input"
                                    name="file-multiple-input"  
                                    onChange={handleChange}
                                    />
                        </FormGroup>
                    </Col>  
                    <Row>
                    <Col xs="8">
                            {image ? <img src={ image } alt={image} className={classes.Preview} />:null}
                             
                        </Col>
                    </Row>
                </FormGroup>
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
                        <strong>لیست گارانتی ها</strong>
            </CardHeader>
            <CardBody>
                    {
                        loading ?<center ><Spinner animation="border" role="status" /></center>
                        
                     :
                      <Table responsive >
                      <thead>
                          <tr>
                              <th>عنوان</th>
                              <th>توضیحات</th>
                              <th>عملیات</th>                                
                          </tr>
                      </thead>                              
                        <tbody>
                            {
                                resultServer.map((item)=>
                                <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.label}</td>
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
                             </tr> )
                            }
                                               
                    </tbody>                
                  </Table>
                    }                    
            </CardBody>
        </Card>
      </Col>
    </Row>
</div>
)
}
export default Status;