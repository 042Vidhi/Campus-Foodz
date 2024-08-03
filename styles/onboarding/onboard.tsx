import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
    firstContainer:{
        alignItems:"center",
        flex:1,
        justifyContent:"center",
        backgroundColor:'#fff',
    },
    image: {
        width: wp('60%'),
        height: hp('30%'),
        resizeMode: 'contain',
        marginBottom: hp('2%'),
      },
    heading1:{
        fontSize:20,
        fontWeight:"100",
        textAlign:'center',
    },
    heading2:{
        fontSize:20,
        fontWeight: 'bold',
        color:"#1A3636"
    },
    buttonContainer: {
        backgroundColor: '#f1592a',
        borderRadius: wp('2%'),
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
    color: '#FFFFFF',
    fontSize: wp('5%'),
    },
})