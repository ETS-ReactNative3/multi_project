import React, { useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row,Button,Label,Input,FormGroup,CardFooter  } from 'reactstrap';
import classes from './brand.module.css'
const Brand =()=> {
    const [loadedFiles,setLoadedFiles] = useState({});
    const [subCategoryFromServer,setSubCategoryFromServer] = useState([
        {id:1, name:'گوشی موبایل'},
        {id:2,name:'واقعیت مجازی'},
        {id:3.,name:'مچ بند و ساعت هوشمند'},
        {id:4,name:'لوازم جانبی دوربین'},
        {id:5,name:'لپ تاب'},
        {id:6,name:'تبلت '},
    ])
    const [arrayHolder,setArrayHolder] = useState([])
    const onFileLoad=(event)=>{
    const file = event.currentTarget.files[0];
    let fileReader = new FileReader();
    fileReader.onload = ()=>{
    console.log('image loaded:', fileReader.result);
    const fileProperty={
        name: file.name,
        size: file.size,
        type: file.type,
        data: fileReader.result 
    }
    addLoadedFile(fileProperty)
    }
    fileReader.onabort = ()=>{
        alert('Reading Aborted')
    }
    fileReader.onerror = ()=>{
        alert('Reading Error')
    }
    fileReader.readAsDataURL(file)
    }
    const addLoadedFile = (fileProperty)=>{
    setLoadedFiles(fileProperty)
    }
    const addSubCategory = (event)=>{    
        const categoryIndex = subCategoryFromServer.findIndex(subCategory=>{
            return subCategory.id==event.target.value;
        })
        console.log(categoryIndex)
        const subCat = {...subCategoryFromServer[categoryIndex]};
        const tempArray =[...arrayHolder];       
        tempArray.push(subCat);
        setArrayHolder(tempArray);
       const response = [...subCategoryFromServer]  ;
       response.splice(categoryIndex,1);
       setSubCategoryFromServer(response)
    }
    const deleteSubCategory=(index,item)=>{
        const tempArray = [...arrayHolder];
        tempArray.splice(index,1);
        setArrayHolder(tempArray);
        const response = [...subCategoryFromServer];
        response.push(item);
        setSubCategoryFromServer(response)
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12} xs={12} md={12}>
              <Card>
                <CardHeader>         
                    <strong> اضافه کردن  برند جدید</strong>
                </CardHeader>
                <CardBody>
                    <FormGroup row className="my-0">
                        <Col xs="6">
                            <FormGroup>
                            <Label htmlFor="title">عنوان</Label>
                            <Input type="text" id="title" placeholder="عنوان را وارد کنید"  required/>
                            </FormGroup>
                        </Col>
                        <Col xs="6">
                            <FormGroup>
                            <Label htmlFor="description">توضیحات</Label>
                            <Input type="text" id="description" placeholder="در صورت نیاز توضیحات را وارد کنید" />
                            </FormGroup>
                        </Col>
                        <Col xs="4">
                            <FormGroup>
                            <Label htmlFor="category"> دسته ها</Label>
                            <Input type="select" name="multiple-select"
                             id="multiple-select"
                             multiple
                             onChange={addSubCategory}
                              >
                              {
                                  subCategoryFromServer.map((subcat)=>{
                                      return(
                                        <option key={subcat.id} value={subcat.id}>{subcat.name}</option>
                                      )
                                  })
                              }
                                
                                
                            </Input>
                            </FormGroup>
                        </Col>
                        {
                           arrayHolder.length!==0 && <Col xs="8" className={classes.brandSection}>
                            
                            {
                                arrayHolder.map((item,index)=>{
                                    return(
                                     <div className={classes.brand}  key={item.id}>
                                     <span>{item.name} </span>
                                     <i className="fa fa-remove fa-lg " onClick={()=>deleteSubCategory(index,item)}></i>
                                     </div>
                                    )
                                })
                            }
                                
                            
                            </Col>
                        }
                        
                        <Col xs="4">
                                <Label htmlFor="file-multiple-input">
                                     <div className={classes.fileSelection}>انتخاب عکس</div>
                                </Label>
                                <Input type="file" id="file-multiple-input"
                                 name="file-multiple-input"  
                                 onChange={onFileLoad}
                                 multiple
                                 /> 
                        
                        </Col>
                        
                        <Col xs="8">
                            {loadedFiles && <img src={loadedFiles.data} alt={loadedFiles.name} className="Preview" />} 
                        </Col>
                    </FormGroup>
                </CardBody>
                <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={()=>console.log(arrayHolder)}><strong>ثبت</strong> </Button>
              </CardFooter>
              </Card>
             
          </Col>
        </Row>
      </div>
    )
  
}

export default Brand;
