import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: wp('5%'),
      },
      heading: {
        fontSize: wp('7%'),
        fontWeight: 'bold',
        marginBottom: hp('5%'),
      },
      input: {
        width: wp('80%'),
        padding: hp('1.5%'),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: wp('2%'),
        marginBottom: hp('2%'),
      },
      buttonContainer: {
        backgroundColor: '#f1592a',
        borderRadius: wp('2%'),
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        width:wp("80%"),
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: wp('5%'),
        },
    textBottom:{
        marginTop :20
    },
    textLink:{
        color:"#0087FF"
    }
})