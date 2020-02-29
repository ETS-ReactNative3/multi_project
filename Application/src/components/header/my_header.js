import React from 'react'
import {ScrollView,Text,StyleSheet,TextInput} from 'react-native'
import { Container, Header, Left, Body, Right, Button, Title } from 'native-base';
import Ripple from 'react-native-material-ripple'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import {useNavigation} from 'react-navigation-hooks'

const styles = StyleSheet.create({
    bg_red:{
        backgroundColor:'#ef394e'
    },
    bg_white:{
        backgroundColor:'#fff'
    },
    row:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    btn:{
        padding:15,
        borderRadius:100,
    },
    icon:{
        fontSize:23,
        color:'#fff'
    },
    icongray:{
        fontSize:23,
        color:'#777'
    },
    texth1:{
        fontSize:21,
        color:'#fff',
        fontWeight:'bold',
        marginRight:10,
        fontFamily:'IRANSansMobile',
    },
    texth2:{
        fontSize:18,
        color:'#fff',
        marginRight:6,
        fontFamily:'IRANSansMobile_Light',
    },
    texth3:{
        fontSize:18,
        color:'#fff',
        marginRight:6,
        fontFamily:'IRANSansMobile_Light',
    },
    search_textinput:{
        height:'100%',
        width:'100%' ,
        textAlign:'right'
    }
})



const My_Header = (props) => {
    const {navigate,goBack,toggleDrawer} = useNavigation();

    const Main_Header =()=>{
        return(
            <Header style={styles.bg_red} androidStatusBarColor="#ef394e">
                <Left style={styles.row}>
                    <Ripple style={styles.btn} onPress={()=>navigate('Shop_cart')}>
                        <MCIcon name='cart' style={styles.icon}/>
                    </Ripple>
                    <Ripple style={styles.btn} onPress={()=>navigate('Search')}>
                        <MIcon name='search' style={styles.icon}/>
                    </Ripple>
                </Left>

                <Right style={styles.row}>
                    {
                        props.head_page_name?
                            <Text style={styles.texth2} numberOfLines={1} >
                                {props.head_page_name}
                            </Text>
                        :
                            <Text style={styles.texth1}>
                                Digikala
                            </Text>
                    }
                    
                    {
                        props.right_btn=='back'?
                            <Ripple style={styles.btn} onPress={()=>goBack(null)}>
                                <MIcon name='arrow-back' style={[styles.icon,{rotation:180}]} />
                            </Ripple>
                        :
                            <Ripple style={styles.btn} onPress={()=>toggleDrawer()}>
                                <MCIcon name='menu' style={styles.icon} />
                            </Ripple>
                    }
                </Right>
            </Header>
        )
    }


    const Cart_Header =()=>{
        return(
            <Header style={styles.bg_red} androidStatusBarColor="#ef394e">
                <Left style={styles.row}>
                    <Ripple style={styles.btn}>
                        <MCIcon name='cart' style={styles.icon}/>
                    </Ripple>
                </Left>

                <Right style={styles.row}>
                    <Text style={styles.texth3} >
                        سبد خرید شما
                    </Text>
                    <Ripple style={styles.btn} onPress={()=>goBack(null)}>
                        <MIcon name='close' style={[styles.icon,{color:'#333'}]}/>
                    </Ripple>
                </Right>
            </Header>
        )
    }


    const Login_Header =()=>{
        return(
            <Header style={styles.bg_red} androidStatusBarColor="#ef394e">
                <Left style={styles.row}>
                    <Ripple style={styles.btn} onPress={()=>navigate('Shop_cart')}>
                        <MCIcon name='cart' style={styles.icon}/>
                    </Ripple>
                    <Ripple style={styles.btn} onPress={()=>navigate('Search')}>
                        <MIcon name='search' style={styles.icon}/>
                    </Ripple>
                </Left>

                <Right style={styles.row}>
                    <Text style={styles.texth3} numberOfLines={1}>
                        {props.head_page_name}
                    </Text>
                    <Ripple style={styles.btn} onPress={()=>goBack(null)}> 
                        <MIcon name='close' style={[styles.icon,{color:'#333'}]}/>
                    </Ripple>
                </Right>
            </Header>
        )
    }


    const ForgetPass_Header =()=>{
        return(
            <Header style={styles.bg_red} androidStatusBarColor="#ef394e">
                <Right style={styles.row} numberOfLines={1}>
                    <Text style={styles.texth3}>
                        {props.head_page_name}
                    </Text>
                    <Ripple style={styles.btn} onPress={()=>goBack(null)}>
                        <MIcon name='close' style={styles.icon}/>
                    </Ripple>
                </Right>
            </Header>
        )
    }


    const Search_Header =()=>{
        return(
            <Header style={styles.bg_white} androidStatusBarColor="#ef394e">
                <Left style={styles.row}>
                    <Ripple style={styles.btn}>
                        <MCIcon name='qrcode-scan' style={styles.icongray}/>
                    </Ripple>
                    <Ripple style={styles.btn}>
                        <MIcon name='mic' style={styles.icongray}/>
                    </Ripple>
                </Left>

                <Right style={styles.row}>
                    <TextInput 
                        style={styles.search_textinput}
                        placeholder="جستجو در دیجی کالا ..."
                        placeholderTextColor='#888'
                        selectionColor="red"
                    />
                    <Ripple style={styles.btn} onPress={()=>goBack(null)}>
                        <MIcon name='arrow-back' style={[styles.icongray,{rotation:180}]}/>
                    </Ripple>
                </Right>
            </Header>
        )
    }


    const Cat_Header =()=>{
        return(
            <Header hasTabs style={styles.bg_red} androidStatusBarColor="#ef394e">
                <Right style={styles.row}>
                    {
                        props.name_page?
                            <Text style={styles.texth3} numberOfLines={1}>
                                {props.name_page}
                            </Text>
                        :
                            <Text style={styles.texth3}>
                                دسته بندی محصولات
                            </Text>
                    }
                    <Ripple style={styles.btn} onPress={()=>goBack(null)}>
                        <MIcon name='arrow-back' style={[styles.icon,{rotation:180}]}/>
                    </Ripple>
                </Right>
            </Header>
        )
    }


    switch(props.head_name){
        case 'Main':
            return Main_Header();
            break;
        case 'Cart':
            return Cart_Header();
            break;
        case 'Login':
                return Login_Header();
                break;
        case 'ForrgetPass':
            return ForgetPass_Header();
            break;
        case 'Search':
            return Search_Header();
            break;
        case 'Cat':
            return Cat_Header();
            break;
    }

    
}

export default React.memo(My_Header);