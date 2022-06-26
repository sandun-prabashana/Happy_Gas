import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import { color } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id:'',
      user_name:'',
      user_email: '',
    }
  }

  componentDidMount(){
    this.displayData()
  }

  displayData = async ()=>{  
    try{  
      let id = await AsyncStorage.getItem('userID');
      let name = await AsyncStorage.getItem('userName');
      let email = await AsyncStorage.getItem('userEmail');
      this.setState({
        user_id : id,
        user_name : name,
        user_email : email ,
      });
    }  
    catch(error){  
      alert(error)  
    }  
  }  


  render() {
    return (
      <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
      <View style={styles.body}>
        {/* <View style={styles.bodyContent}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.textSize}>{this.state.user_id}</Text>  
          </TouchableOpacity>              
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.textSize}>{this.state.user_name}</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.textSize}>{this.state.user_email}</Text> 
          </TouchableOpacity>
          
        </View> */}
        <View style={styles.box}>
          <Text style={styles.title}>Name</Text>
          <Text style={styles.detail}>{this.state.user_name}</Text>
        </View>
        <View style={styles.box}>
        <Text style={styles.title}>NIC    </Text>
        <Text style={styles.detail}>{this.state.user_id}</Text>
        </View>
        <View style={styles.box}>
        <Text style={styles.title}>Email </Text>
        <Text style={styles.detail}>{this.state.user_email}</Text>
        </View>
    </View>
  </View>
    )
  }
}
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#27E311",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  box:{
    flexDirection: 'row',
    height:60,
    marginLeft:15,
    width:windowWidth-30,
    backgroundColor:'white',
    marginBottom:20,
    alignItems: 'center',
  },
  title:{
    fontSize:15,
    color:'#B9B9B9',
    fontWeight:'bold',
    marginLeft:15
  },
  detail:{
    fontSize:16,
    color:'black',
    fontWeight:'bold',
    marginLeft: windowWidth/4
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:100,
    color: "#696969",
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  textSize:{
    fontSize:15,
    fontWeight:'bold',
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#009387",
  },
  id:{
    fontSize:20,
    flex: 1,
  }
});