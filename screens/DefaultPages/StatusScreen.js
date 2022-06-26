import React, { Component } from 'react'
import {View, Text, StatusBar, Dimensions, FlatList,StyleSheet } from 'react-native';
import OrderServices from './services/OrderServices';
import OrderDTO from './dto/OrderDTO';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
export default class StatusScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource:'',
    }
  }


componentDidMount(){
  this.goStatus();
}


  goStatus= async ()=> {
    console.log('====================================');
    let id = await AsyncStorage.getItem('userID');
    let orderServices = new OrderServices();
    orderServices
      .searchStatus(id)
      .then(response => response.json())
      .then(json => {
        this.setState({
          dataSource: json,

        })
        console.log(json);
        console.log('==========================');
      })
      .catch(error => {
        console.log('error ' + error);
        return error;
      });
    console.log('button done');
  }


  render() {
    flatlistref = null;
    return (
      <View style={styles.container}>
        <FlatList
                ref={(ref) => this.flatlistref = ref}
                style={styles.Fatlist}
                data={this.state.dataSource}
                renderItem={({ item }) =>
                  <View style={styles.Card}>

                    <View style={styles.datetime}>
                    <Text style={styles.Date2}>Date : </Text>
                    <Text style={styles.Date}>{item.order_date}</Text>
                    <Text style={styles.time2}>Time : </Text>
                    <Text style={styles.time}>{item.order_time}</Text>
                    </View>
                    <View style={styles.datetime}>
                    <Text style={styles.Gas}>Gas Type : </Text>
                    <Text style={styles.Gas2}>{item.order_detail}</Text>
                    </View>

                    <View style={styles.datetime}>
                    <Text style={styles.Gas}>City Outlet : </Text>
                    <Text style={styles.Gas2}>{item.order_city}</Text>
                    </View>

                    <View style={styles.datetime}>
                    <Text style={styles.type}>Order Type : </Text>
                    <Text style={styles.type2}>{item.order_type}</Text>
                    </View>
                    
                    <View style={styles.status}>
                    <Text style={styles.status2}>{item.order_status}</Text>
                    </View>
                    
                  </View>

                }

                keyExtractor={( item , index ) => index.toString()}
              />
      </View>
    )
  }

  
}

const styles=StyleSheet.create({
  container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
  },
  status:{
    borderWidth:1,
    height:40,
    borderColor: '#d02860',
    alignItems:'center',
    justifyContent:'center'
  },

  status2:{
    color:'white',
    fontWeight:'bold' ,
    fontSize:30
  },
  Fatlist: {
      marginTop: 30,
      width:windowWidth,
    },
    
    Card: {
      
      backgroundColor: '#f1b8cc',
      marginLeft: 13,
      marginRight: 13,
      marginBottom: 20,
      padding: 13,
      borderRadius: 35,
      borderWidth: 1,
      borderColor: '#d02860',
    
    },
    
    Date: {
      flexDirection: 'row',
      color: 'black',
      fontFamily:'Quicksand-SemiBold'
    },
    Date2: {
      flexDirection: 'row',
      color: 'black',
      fontFamily:'Quicksand-SemiBold',
      fontWeight:'bold'    },

    time: {
      color: 'black',
      fontFamily:'Quicksand-SemiBold',
      textAlign:'right',
      
    },
    datetime: {
      flexDirection: 'row',
      margin:5
    },
    time2: {
      color: 'black',
      fontFamily:'Quicksand-SemiBold',
      fontWeight:'bold',
      marginLeft:180    },

      Gas2: {
        flexDirection: 'row',
        color: 'black',
        fontFamily:'Quicksand-SemiBold'
      },
      Gas: {
        flexDirection: 'row',
        color: 'black',
        fontFamily:'Quicksand-SemiBold',
        fontWeight:'bold'    },

        type2: {
          flexDirection: 'row',
          color: 'black',
          fontFamily:'Quicksand-SemiBold',
          fontWeight:'bold' 
        },
        type: {
          flexDirection: 'row',
          color: 'black',
          fontFamily:'Quicksand-SemiBold',
          fontWeight:'bold'    },
    
  });
