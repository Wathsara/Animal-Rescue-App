import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.select({ ios: 10, android: 10 }),    
    width: "90%",
    borderRadius:15
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: "transparent",
    height: 45,
    marginHorizontal: 20,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius:15
  },
  textInput: {
    height: 45,
    margin: 0,
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    padding: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    fontSize: 14,
    borderRadius:15
  },
  listView: {
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 15,
    marginTop: 10
  },
  description: {
    fontSize: 14
  },
  row: {
    padding: 20,
    height: 58
  }
});
