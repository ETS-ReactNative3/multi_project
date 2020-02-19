import React, { useState } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, FormGroup,Input,Label,Form,Progress,CardFooter,Button  } from 'reactstrap';
import classes from './Media.module.css';
import {checkFileSize, checkMimeType, maxSelectFile} from './Funcs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const AddMedia =()=> {

const [loadedFiles,setLoadedFiles] = useState([]);
const[loaded,setLoaded] = useState(25)

const onFileLoad=(event)=>{
  if(maxSelectFile(event) && checkMimeType(event) && checkFileSize(event))
  { 
    const files = event.target.files;
    const newLoadedFiles =[...loadedFiles]
    for(var x = 0; x<files.length; x++) {
      newLoadedFiles.push({
        file:files[x],
        preview: URL.createObjectURL(files[x])
      })
    }
    setLoadedFiles(newLoadedFiles);

    
  }
  
}

const removeLoadedFile = (fileProperty)=>{
  const newFile  = loadedFiles.filter(idFile=>idFile!==fileProperty);
  setLoadedFiles(newFile);
}
const onDragOverHandler = (e) =>{
  e.preventDefault();
  //console.log('dsfs')
}
const onDropHandler = (e) =>{
  e.preventDefault();
  const files = e.dataTransfer.files;
  const newLoadedFiles =[...loadedFiles]
    for(var x = 0; x<files.length; x++) {
      newLoadedFiles.push({
        file:files[x],
        preview: URL.createObjectURL(files[x])
      })
    }
    setLoadedFiles(newLoadedFiles);
}
const Upload =()=>{
  const data = new FormData()
  for(var x = 0; x<loadedFiles.length; x++) {
      data.append('file', loadedFiles[x].file)
  }
  console.log(loadedFiles);
  // axios.post("http://localhost:8000/upload", data, {
  //     onUploadProgress: ProgressEvent => {
  //       setLoaded(ProgressEvent.loaded / ProgressEvent.total*100)
  //   },
  // })
}
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <div className="form-group">
                <ToastContainer />
              </div>
             <Card>
                <CardHeader>
                    <h6>بارگذاری رسانه جدید</h6>
                </CardHeader>
                <CardBody >
                {/* {
                  loadedFiles.length!==0 ?
                    <Progress className={classes.progressBar} max="100" color="success" value={loaded} >
                      {Math.round(loaded,2) }%
                    </Progress>
                  :null
                } */}

                    <div className={classes.addMediaSection}
                     onDragOver={onDragOverHandler}
                     onDrop={onDropHandler}
                     
                     >
                      <div className={classes.filePreview}>
                                  {
                                    loadedFiles.map((file,id)=>{
                                      return <div className={classes.file} key={id}>
                                        <span className={classes.removeIcons} onClick={()=>removeLoadedFile(file)}> 
                                          <i className="fa fa-remove fa-lg mt-4"></i>
                                        </span>
                                        <img src={file.preview} alt={file.name} />
                                      </div>
                                    })
                                  }
                        </div>
                        <div className={classes.dragdropSection}>
                            <h3>پرونده ها را اینجا بکشید </h3>
                            <span>یا</span>
                            <Form action="" method="post"  className="form-horizontal">
                            <FormGroup row>
                                <Label htmlFor="file-multiple-input">
                                <div className={classes.fileSelection}> گزینش پرونده</div>
                                </Label>
                                <Input type="file" id="file-multiple-input" name="file-multiple-input" 
                                 multiple
                                 onChange={onFileLoad}
                                 />
                                 
                            </FormGroup>
                            </Form>
                        </div>
                    </div>
                    
                </CardBody>
                <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={Upload} ><strong>آپلود</strong> </Button>
              </CardFooter>
             </Card>
          </Col>
        </Row>
      </div>
    )
  
}

export default AddMedia;
