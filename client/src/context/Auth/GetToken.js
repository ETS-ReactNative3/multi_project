
const GetToken = ()=>{
    const userInfo = JSON.parse(localStorage.getItem('user'));
    return(userInfo.authenticated);
}
export default GetToken;