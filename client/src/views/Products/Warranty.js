import React,{useState, useEffect, useContext} from 'react';
import { Card, CardBody, CardHeader,CardFooter, Col, Row, FormGroup,Label,Input,Button,Table, Spinner  } from 'reactstrap';
import axios from 'axios';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
const Warranty = (props)=>{
    const [title,setTitle] = useState('');
    const [lable,setLable] = useState('');
    const [loading,setLoading] = useState(false);
    const [resultServer,setResult] = useState([])
    const[message,setMessage] = useState('')
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
            setMessage('خطا در دریافت اطلاعات  گارانتی ها');
            
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
    const handleLable =(event)=>{
        setLable(event.target.value)
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
                        "label": lable         
                }
          }
        }).then((result) => {
          if(result.data.errors){
            setMessage('خطلا در ثبت اطلاعات گارانتی جدید جدید')
          }
          else{
              setMessage('اطلاعات گارانتی جدید با موفقیت اضافه شده');
              const arrayHolder = [...resultServer];
              arrayHolder.push({
                  _id:result.data.data.warranty._id,
                  name:title,
                  label:lable
              })
              setResult(arrayHolder);
              setTitle('');
              setLable('')
           }
        }).catch(error=>{
          console.log(error)
        });
    }
    
return(
<div className="animated fadeIn">
    <Row>
     <Col xl={12}>
        <Card>
            <CardHeader>
                    <i className="fa fa-align-justify"></i> اضافه کردن فروشنده
                    <br />
                    {message}
            </CardHeader>
            <CardBody>
             <FormGroup row className="my-0">
                        
             <Col xs="4">
                   <FormGroup>
                        <Label htmlFor="title">عنوان گارانتی</Label>
                         <Input type="text" id="title"
                          placeholder="عنوان  گارانتی را وارد کنید"
                          value={title}
                          onChange={handleTitle}
                          required/>
                     </FormGroup>
                </Col>
                <Col xs="5">
                     <FormGroup>
                        <Label htmlFor="description">توضیحات</Label>
                        <Input type="text" id="description"
                            placeholder="در صورت نیاز توضیحات را وارد کنید"
                            value={lable}
                            onChange={handleLable}
                            />
                    </FormGroup>
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
export default Warranty;