
const GetToken = ()=>{
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if(userInfo){
        return(userInfo.authenticated);
    }
    return false;
    
}
export default GetToken;