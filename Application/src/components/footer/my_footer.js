import React from 'react'
import {StyleSheet,Text,View} from 'react-native'
import { Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {useNavigation} from 'react-navigation-hooks'

const My_Footer =(props)=>{
    const {goBack} = useNavigation();

    return(
        <Footer>
          <FooterTab style={props.color=='green'?styles.bg_green:styles.bg_blue}>
            <Button full style={styles.row} onPress={props.onLogin}>
                {
                    props.name?
                        <Text style={styles.text}>{props.name}</Text>
                    :
                        <View style={styles.row}>
                            <Icon name="keyboard-arrow-left" style={styles.icon} size={27}/>
                            <Text style={styles.text}>ورود به دیجی کالا</Text>
                        </View>
                }
            </Button>
          </FooterTab>
        </Footer>
    )
}

const styles=StyleSheet.create({
    bg_blue:{
        backgroundColor:'#1e88e5',
    },
    bg_green:{
        backgroundColor:'#66bb6a'
    },
    text:{
        color:'#fff',
        fontSize:16,
        fontFamily:'IRANSansMobile_Light',
    },
    icon:{
        color:'#fff',
        marginRight:10
    },
    row:{
        flexDirection:'row'
    }
})

export default React.memo(My_Footer);