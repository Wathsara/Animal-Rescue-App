


import { StyleSheet, Dimensions } from "react-native";
import { COLOR_PRIMARY, COLOR_GRAY } from "../../config/styles";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    tabBarContainer:{ 
        flexDirection: 'row',               
        height: 50, 
        width: '100%',
        marginBottom:5,
        // borderWidth: 1.5,
        // borderColor: COLOR_GRAY,
        backgroundColor: '#192f6a', 
      },
      tabBarActive: {
        width: '33.33%',
        borderColor: '#fff',        
        borderBottomWidth: 4.5,        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#192f6a',
      },
      tabBar: {
        width: '33.3%',
        backgroundColor: '#192f6a',        
        justifyContent: 'center',
        alignItems: 'center'
      },  
    

});

