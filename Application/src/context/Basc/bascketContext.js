import React,{useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
export const BascketContext = React.createContext();



const BasckContextProvider=(props)=>{
    const[bascket,setBascket] = useState([]); 
    const[productName,SETproductName] = useState(""); 
    const[productEName,SETproductEName] = useState(""); 
    const[productImage,SETproductImage] = useState(""); 
    const[productId,SETproductId] = useState(null); 

    const AddToBascket = (item,select_color) =>{
        let color = "";
        const newBascket = [...bascket]
        if(newBascket.length>0){
            color = select_color;
        }
        const newData = newBascket.filter((p)=>{
            return p.productId == productId && p.color==color;
        })
        if(newData.length>0){
            // newData[0].count+=1;
            alert('این محصول قبلا به سبد خرید شما اضافه شده است')
        }else{
            newBascket.push({
                "sellerId":item[0].seller._id,
                "sellerName":item[0].seller.name,
                "warrantyID":item[0].warranty._id,
                "warrantyName":item[0].warranty.name,
                "color":select_color,
                "price":item[0].price,
                "discount":item[0].discount,
                "productImage":productImage,
                "productName":productName,
                "productEName":productEName,
                "productId":productId,
                "count":1
            })
            setBascket(newBascket)
        }
    }

    const removeBascket = (index) => {
        const newBascket = [...bascket];
        newBascket.splice(index,1);
        setBascket(newBascket);
    }

    const _set_product_name=(name)=>{
        SETproductName(name)
    }

    const _set_product_Ename=(name)=>{
        SETproductEName(name)
    }

    const _set_product_image=(image)=>{
        SETproductImage(image)
    }

    const _set_product_id=(id)=>{
        SETproductId(id)
    }

    return(
        <BascketContext.Provider value={{bascket,AddToBascket,removeBascket,productName,_set_product_name,productEName,_set_product_Ename,productImage,_set_product_image,productId,_set_product_id}}>
            {props.children}
        </BascketContext.Provider>
    )
}
export default BasckContextProvider;