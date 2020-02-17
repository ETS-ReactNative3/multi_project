import React,{useState, useEffect, useContext} from 'react';
import { Card, CardBody, CardHeader,CardFooter, Col, Row, FormGroup,Label,Input,Button,Table, Spinner  } from 'reactstrap';
import axios from 'axios';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import classes from '../Shop/brand.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Order.css';
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
      setLoading(true)
      axios({
        url: '/',
        method: 'post',
        headers:{'token':`${token}`},
        data: {
          query: `
          query getAllOrderStatus {
            getAllOrderStatus {
              _id,
              name,
              image
            }
          } 
            `
      }
    }).then((result) => {
      if(result.data.errors){
        
        console.log(result.data.errors)
      }
      else{
       const{getAllOrderStatus} = result.data.data;
       getAllOrderStatus.map((item)=>
       {
         item.flag=false;
       })
        setResult(getAllOrderStatus);
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
      let data ={
        query: `
        mutation addOrderStatus($name : String!, $image : Upload!) {
          OrderStatus(name : $name, image : $image) {
            status,
            message
          }
        }     
          `,
          variables :{
            "name": title,
            "image": null
            }
      }
      let map = {
        0 : ['variables.image'],
      }

    
    let formD = new FormData();
    formD.append('operations' , JSON.stringify(data));
    formD.append('map', JSON.stringify(map));
    formD.append(0, file, file.name);

      axios({
          url: '/',
          method: 'post',
          headers:{'token':`${token}`},
          data: formD
      }).then((result) => {
        if(result.data.errors){
          toast.error(result.data.errors.message);
        }
        else{
            const {status,message} = result.data.data.OrderStatus;
            if(status===401){
              toast.error(message);
            }
            else{
              toast.success(message);
            }
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
 const changeNameHandler = (event,id)=>{
  const newOrderStatus =[...resultServer];
  const newData = newOrderStatus.filter((item)=>{
    const itemData = item._id;
    const textData = id;
    return itemData.indexOf(textData)>-1
  }) 
   newData[0].name = event.target.value;
  setResult(newOrderStatus);
}
const handleEdit = (id)=>{
  const newSeller =[...resultServer];
  const newData = newSeller.filter((item)=>{
    const itemData = item._id;
    const textData = id;
    return itemData.indexOf(textData)>-1
  })
   
   newData[0].flag = true;
  setResult(newSeller);
}
const submitEdit= (id)=>{
  const newSeller =[...resultServer];
  const newData = newSeller.filter((item)=>{
    const itemData = item._id;
    const textData = id;
    return itemData.indexOf(textData)>-1
  })
  newData[0].flag = false;
  setResult(newSeller);
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
                    <Col xl="3" className="checbox_box">
                      <FormGroup check>
                        <Label check>
                        تعیین به عنوان حالت پیش فرض سفارشات
                        </Label>
                          <Input type="checkbox" />{' '}
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
                    
             </Row>                  
                 
              <Row>
                    <Col xs="8">
                            {image ? <img src={ image } alt={image} className={classes.Preview} />:null}
                             
                        </Col>
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
                              <th>عکس</th>
                              <th>عملیات</th>                                
                          </tr>
                      </thead>                              
                        <tbody>
                            {
                                resultServer.map((item)=>
                                <tr key={item._id}>
                                <td>{
                                  item.flag ?
                                    <Input 
                                    type="text"
                                    value={item.name}
                                    onChange={(event)=>changeNameHandler(event,item._id)}
                                    />
                                  :item.name
                                  }</td>
                                <td><img src={require(`${process.env.REACT_APP_PUBLIC_URL}${item.image}`)} alt={item.image}  className={classes.Preview}/></td>
                                <td>
                                    <Row>
                                    <Col xs="3">
                                    {item.flag ? <Button type="submit" size="sm" color="primary" onClick={()=>submitEdit(item._id)}> <i className="fa fa-check fa-lg "></i> </Button>
                                         :<Button type="submit" size="sm" color="primary" onClick={()=>handleEdit(item._id)}><strong>ویرایش</strong> </Button>
                                        }
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