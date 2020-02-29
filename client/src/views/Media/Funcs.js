import {  toast } from 'react-toastify';
export const checkMimeType=(event)=>{
    //getting file object
    let files = event.target.files 
    //define message container
    let err = ''
    // list allow mime type
   const types = ['image/png', 'image/jpeg']
    // loop access array
    for(var x = 0; x<files.length; x++) {
     // compare file type find doesn't matach
         if (types.every(type => files[x].type !== type)) {
         // create error message and assign to container   
         err='png یا jpeg را انتخاب کنید لطفا یکی از فرمت های \n';
       }
     };
   
   if (err !== '') { // if message not same old that mean has error 
        event.target.value = null // discard selected file
        toast.error(err)
         return false; 
    }
   return true;
   
  }
 export  const checkFileSize=(event)=>{
    let files = event.target.files
    let size = 100000 
    let err = ""; 
    for(var x = 0; x<files.length; x++) {
    if (files[x].size > size) {
     err += files[x].type+'حجم فایل خیلی زیاد است لطفا یک فایل کم حجم تر انتخاب کنید\n';
   }
 };
 if (err !== '') {
    event.target.value = null
    toast.error(err)
    return false
}

return true;

}
export const maxSelectFile=(event)=>{
   let files = event.target.files // create file object
       if (files.length > 10) { 
          const msg = 'بیشتر از 10 عکس رابه طور همزمان نمی توانید آپلود کنید'
          event.target.value = null // discard selected file
          toast.error(msg)
         return false;
 
     }
   return true;
 
}