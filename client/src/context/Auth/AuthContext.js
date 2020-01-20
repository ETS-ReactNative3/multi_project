import React,{useReducer} from 'react';
export const AuthContext = React.createContext();
const authReducer = (state,action)=>{
    switch (action.type) {
        case 'login':{
            const uerInfo ={
                username:action.payload,
                authenticated:action.token
            };
            localStorage.setItem('user',JSON.stringify(uerInfo));
            
          break;
          
        }
            
        case 'logout':
        {
            localStorage.removeItem('user')
            break;
        }
        case 'check':{
            const userInfo = JSON.parse(localStorage.getItem('user'));
 
            if(!userInfo){
                action.payload.history.replace('/')
            }
            break;
        } 
        
    
        default:
            return state;
            
    }
}
const AuthContextProvider=(props)=>{
    const[authenticated,dispatch] = useReducer(authReducer,{});
    
    return(
        <AuthContext.Provider value={{authenticated,dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;