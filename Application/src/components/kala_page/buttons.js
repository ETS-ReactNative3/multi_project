import React from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import Ripple from 'react-native-material-ripple'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {useNavigation} from 'react-navigation-hooks'

const w = Dimensions.get('window').width;

const Buttons = (props) => {

    const {navigate}=useNavigation();

    return(
        <View style={styles.container}>
            <Ripple style={styles.btn} onPress={()=>navigate('Comment')}>
                <Text style={styles.txt}>
                    نظرات کاربران
                </Text>
                <Icon name="content-paste" style={styles.txt} />
            </Ripple>
            <Ripple style={styles.btn} onPress={()=>navigate('Kala_specification',{id:props.item_id})}>
                <Text style={styles.txt}>
                    مشخصات
                </Text>
                <Icon name="forum" style={styles.txt} />
            </Ripple>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        marginTop:10,
        width:null,
        height:w/12,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    btn:{
        width:'48%',
        height:'100%',
        backgroundColor:'#fff',
        elevation:2,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    txt:{
        color:'#7a707f',
        fontSize:14,
        paddingLeft:4,
        fontFamily:'IRANSansMobile_Light',
    }
})

export default React.memo(Buttons);