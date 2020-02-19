import React,{useState, useEffect, useContext} from 'react';
import { Card, CardBody, CardHeader,CardFooter, Col, Row, FormGroup,Label,Input,Button,Table, Spinner  } from 'reactstrap';
import axios from 'axios';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Seller = (props)=>{
    const [title,setTitle] = useState('');
    const [lable,setLable] = useState('');
    const [mainSubTitleValue,setMainSubTitleValue] = useState('');
    const [mainSubTitleFromServer,setMainSubTitleFromServe] = useState([]);
    const [loading,setLoading] = useState(false);
    const [resultServer,setResult] = useState([])
    const[message,setMessage] = useState('')
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
                    "mainCategory": true,
                    "parentCategory": false,
                    "catId": null
                }
          }
        }).then((result) => {
          if(result.data.errors){
            toast.error('خطا در دریافت اطلاعات دسته بندی ها');
            console.log(result.data.errors);
          }
            
            setMainSubTitleFromServe(result.data.data.getAllCategory)
          
        }).catch(error=>{
          console.log(error)
        });      
    },[])
    const handleMainSubTitle=(event)=>{
        if(event.target.value===''){
          toast.error('یک دسته را انتخاب کنید');
            return;
        }
        setMainSubTitleValue(event.target.value);
        setLoading(true)
        axios({
            url: '/',
            method: 'post',
            headers:{'token':`${token}`},
            data: {
              query: `
              query getAllSeller($categoryId : ID!) {
                getAllSeller(categoryId : $categoryId) {
                  _id,
                  name,
                  label
                }
              }    
                `,
                variables :{
                    "categoryId": event.target.value
                }
          }
        }).then((result) => {
          if(result.data.errors){
            toast.error(result.data.errors[0].message)
          }
          else{
            const {getAllSeller} = result.data.data;
            for(let i=0;i<getAllSeller.length;i++)
              {
                getAllSeller[i].flag = false;
              }
            setResult(getAllSeller);
            setLoading(false);
            setTitle('');
            setLable('')
          }
       
        }).catch(error=>{
            console.log(error)
          });
    }
    const handleTitle =(event)=>{
        setTitle(event.target.value)
    }
    const handleLable =(event)=>{
        setLable(event.target.value)
    }
    const handleSubmit =()=>{
        //console.log(mainSubTitleValue+'/'+title+'/'+lable);
        axios({
            url: '/',
            method: 'post',
            headers:{'token':`${token}`},
            data: {
              query: `
              mutation addSeller($category : ID!, $name : String!, $label : String) {
                seller(category : $category, name : $name, label : $label) {
                  _id,
                  status,
                  message
                }
              }     
                `,
                variables :{
                    "category" : mainSubTitleValue,
                    "name": title,
                    "label": lable
                }
          }
        }).then((result) => {
          if(result.data.errors){
            toast.error('خطلا در ثبت اطلاعات فروشنده جدید')
          }
          else{
            toast.success('اطلاعات فروشنده جدید با موفقیت اضافه شده');
              console.log(result.data.data.seller._id)
              const arrayHolder = [...resultServer];
              arrayHolder.push({
                  _id:result.data.data.seller._id,
                  name:title,
                  label:lable
              })
              setResult(arrayHolder);
              setTitle('');
              setLable('')
           }
        }).catch(error=>{
          toast.error(error)
        });
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
    const changeNameHandler = (event,id)=>{
      const newSeller =[...resultServer];
      const newData = newSeller.filter((item)=>{
        const itemData = item._id;
        const textData = id;
        return itemData.indexOf(textData)>-1
      }) 
       newData[0].name = event.target.value;
      setResult(newSeller);
    }
    const changeLabelHandler = (event,id)=>{
      const newSeller =[...resultServer];
      const newData = newSeller.filter((item)=>{
        const itemData = item._id;
        const textData = id;
        return itemData.indexOf(textData)>-1
      }) 
       newData[0].label = event.target.value;
      setResult(newSeller);
    }
  const submitEdit= (id)=>{
      const newSeller =[...resultServer];
      const newData = newSeller.filter((item)=>{
        const itemData = item._id;
        const textData = id;
        return itemData.indexOf(textData)>-1
      })
      

      axios({
        url: '/',
        method: 'post',
        headers:{'token':`${token}`},
        data: {
          query: `
          mutation UpdateSeller($id : ID!, $name : String!, $label : String) {
            UpdateSeller(id : $id,  name : $name, label : $label) {
              status,
              message
            }
          }    
            `,
            variables :{
              "id": newData[0]._id,
              "name": newData[0].name,
              "label": newData[0].label  
            }
      }
    }).then((result) => {
      if(result.data.errors){
        toast.error('خطلا در ثبت اطلاعات فروشنده جدید')
      }
      else{
        toast.success(result.data.data.UpdateSeller.message);
        newData[0].flag = false;
        setResult(newSeller);
       }
    }).catch(error=>{
      toast.error(error)
    });
       
       
    }
    
return(
<div className="animated fadeIn">
    <Row>
     <Col xl={12}>
        <Card>
           <div className="form-group">
              <ToastContainer />
            </div>
            <CardHeader>
                    <i className="fa fa-align-justify"></i> اضافه کردن فروشنده
                    <br />
                   <span style={{color:'red'}}>{message}</span> 
            </CardHeader>
            <CardBody>
                        <FormGroup row className="my-0">
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
                            <Col xs="4">
                                <FormGroup>
                                    <Label htmlFor="title">عنوان</Label>
                                    <Input type="text" id="title"
                                    placeholder="عنوان را وارد کنید"
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
                        <strong>لیست فروشنده ها</strong>
                </CardHeader>
                <CardBody>
                    {
                        loading ?<center ><Spinner animation="border" role="status" /></center>
                        
                     :
                      <Table responsive >
                      <thead>
                          <tr>
                              <th>نام فروشنده</th>
                              <th>توضیحات</th>
                              <th>عملیات</th>                                
                          </tr>
                      </thead>                              
                        <tbody>
                            {
                                resultServer.map((item,index)=>
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
                                <td>{
                                  item.flag ?                
                                      <Input 
                                        type="text"
                                        value={item.label}
                                        onChange={(event)=>changeLabelHandler(event,item._id)}
                                      />   
                                  :item.label
                                  }</td>
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
export default Seller;