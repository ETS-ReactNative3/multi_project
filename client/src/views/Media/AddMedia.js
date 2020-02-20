import React, { useState,useContext, useEffect } from 'react';
import {  Card, CardBody, CardHeader, Col, Row, FormGroup,Input,Label,Form,Progress,CardFooter,Button  } from 'reactstrap';
import classes from './Media.module.css';
import {checkFileSize, checkMimeType, maxSelectFile} from './Funcs';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {AuthContext} from '../../context/Auth/AuthContext';
import GetToken from '../../context/Auth/GetToken';
const AddMedia =(props)=> {

const [loadedFiles,setLoadedFiles] = useState([]);
const[loaded,setLoaded] = useState(0)
const {dispatch} = useContext(AuthContext);
const token =  GetToken();
useEffect(()=>{
  dispatch({type:'check',payload:props});
},[])
const onFileLoad=(event)=>{
  if(maxSelectFile(event) && checkMimeType(event) && checkFileSize(event))
  { 
    const files = event.target.files;
    const newLoadedFiles =[...loadedFiles]
    for(var x = 0; x<files.length; x++) {
      newLoadedFiles.push({
        file:files[x],
        preview: URL.createObjectURL(files[x]),
        loaded:0,
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
        preview: URL.createObjectURL(files[x]),
        loaded:0,
      })
    }
    setLoadedFiles(newLoadedFiles);
}
const Upload =()=>{
  

  const tempLoadedFiles = [...loadedFiles];
  for(let x = 0; x<loadedFiles.length; x++) {
    if(loadedFiles[x].loaded!==100)
    {
      let data = {
        query : `
        mutation addmultimedia($image : Upload!) {
          multimedia(image : $image) {
            status,
            message
          }
        }
        `,
        variables : {
            "image" : null,
        }
    };
    
    let map = {
        0 : ['variables.image'],
        
    }
  const formD = new FormData();
    formD.append('operations' , JSON.stringify(data));
    formD.append('map', JSON.stringify(map));
    formD.append(0, loadedFiles[x].file,loadedFiles[x].file.name);

    axios({
      url: '/',
      method: 'post',
      headers:{
        'token':`${token}`,
      },
      data: formD,
      onUploadProgress: ProgressEvent => {
        loadedFiles[x].loaded =  ProgressEvent.loaded / ProgressEvent.total*100;
        
      },
      
  }).then((result)=>{
    if(result.data.errors){
      toast.error(result.data.errors[0].message);
     // toast.error('خطلا در ثبت اطلاعات محصول جدید')
    }
    else{
      tempLoadedFiles[x] = loadedFiles[x];
        setLoadedFiles(tempLoadedFiles);
    }
  })
  .catch((error)=>console.log(error));
    }
        
  }
  
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
                

                    <div className={classes.addMediaSection}
                     onDragOver={onDragOverHandler}
                     onDrop={onDropHandler}
                     
                     >
                      <div className={classes.filePreview}>
                                  {
                                    loadedFiles.map((file,id)=>{
                                      return <div className={classes.file} key={id}>
                                        {
                                          file.loaded===0?
                                        <span className={classes.removeIcons} onClick={()=>removeLoadedFile(file)}> 
                                          <i className="fa fa-remove fa-lg mt-4"></i>
                                        </span>:null}
                                        <img src={file.preview} alt={file.name} />
                                        <Progress max="100" color="success" value={file.loaded} >
                                          {Math.round( file.loaded,2) }%
                                        </Progress>
                                        
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
