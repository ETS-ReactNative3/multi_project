import React, { useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, FormGroup,Input,Label,Form,Progress  } from 'reactstrap';
import classes from './Media.module.css'
const AddMedia =()=> {

const [loadedFiles,setLoadedFiles] = useState([]);
 
const DragOver=(event)=>{
  event.preventDefault();
  event.stopPropagation();
  console.log(event)
}

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
  setLoadedFiles([...loadedFiles,fileProperty])
}
const removeLoadedFile = (fileProperty)=>{
  const newFile  = loadedFiles.filter(idFile=>idFile!==fileProperty);
  setLoadedFiles(newFile);
}
const removeAllLoadedFiles = ()=>{
  setLoadedFiles([])
}

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
             <Card>
                <CardHeader>
                    <h6>بارگذاری رسانه جدید</h6>
                </CardHeader>
                <CardBody >
                    <div className={classes.addMediaSection} draggable onDragOver={DragOver}>
                      <div className={classes.filePreview}>
                                  {
                                    loadedFiles.map((file,id)=>{
                                      return <div className={classes.file} key={id}>
                                        <span className={classes.removeIcons} onClick={()=>removeLoadedFile(file)}> 
                                          <i className="fa fa-remove fa-lg mt-4"></i>
                                        </span>
                                        <img src={file.data} alt={file.name} />
                                        <div className={classes.progressBar}>
                                        { file.isUploading && <Progress value="25" className="mb-3">25%</Progress>}
                                        
                                        </div>
                                      </div>
                                    })
                                  }
                        </div>
                        <div className={classes.dragdropSection}>
                            <h3>پرونده ها را اینجا بکشید </h3>
                            <span>یا</span>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                            <FormGroup row>
                                <Label htmlFor="file-multiple-input">
                                <div className={classes.fileSelection}> گزینش پرونده</div>
                                </Label>
                                <Input type="file" id="file-multiple-input" name="file-multiple-input" 
                                 multiple
                                 onDragOver={DragOver}
                                 
                                 onDrop={onFileLoad}
                                 onChange={onFileLoad}
                                 />
                                 
                            </FormGroup>
                            </Form>
                        </div>
                    </div>
                    
                </CardBody>
             </Card>
          </Col>
        </Row>
      </div>
    )
  
}

export default AddMedia;
