import { Text, View ,Image,StyleSheet,TextInput,Dimensions,TouchableOpacity,Alert,ActivityIndicator} from 'react-native'
import React, { Component } from 'react'
import DropdownMenu from 'react-native-dropdown-menu';
// import { RadioButton } from 'react-native-paper';
// import RadioGroup from 'react-native-radio-buttons-group';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import OrderServices from './services/OrderServices';
import OrderDTO from './dto/OrderDTO';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SweetAlert from 'react-native-sweet-alert';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class PickupScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address:'PickUpOrder',
      gas: 'Happy Gas 12.5kg',
      city:'',
      no:'',
      payby:'',
      type : 'PickUp',
      status : 'Pending',
      isLoading: false,
    }
  }

  nullCheckOrder(){
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds();
    var a = hours + ':' + min + ':' + sec;
    console.log(a)
    var Caddress = this.state.address;
    var Ccity =this.state.city;
    var Cno = this.state.no;
    var Cgas =this.state.gas;
    var Cpayby = this.state.payby;
    if(Caddress ==""|| Ccity==""|| Cno==""||Cgas==""||Cpayby==""){
      SweetAlert.showAlertWithOptions({
        title: 'Fields cannot be empty',
        subTitle: '',
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancel',
        otherButtonColor: '#dedede',
        style: 'error',
        cancellable: true
      });
    }else{
      this.goPlaceOrder()
    }
  }

  goPlaceOrder= async ()=> {
    this.setState({
      isLoading: true,
    });
    console.log('====================================');
    let id = await AsyncStorage.getItem('userID');

    let orderServices = new OrderServices();
    orderServices
      .placeOrder(
        new OrderDTO(
          id,
          this.state.gas,
          this.state.address,
          this.state.city,
          this.state.no,
          this.state.payby,
          this.state.type,
          this.state.status
        ),
      )
      .then(response => response.json())
      .then(json => {
        this.setState({
          isLoading: false,
        });
        console.log('order response ', json);
        console.log('==========================');
        SweetAlert.showAlertWithOptions({
          title: 'Order Placed Successfully ',
          subTitle: '',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          otherButtonTitle: 'ok',
          otherButtonColor: '#dedede',
          style: 'success',
          cancellable: true
        });
        // console.log(json.name)
      })
      .catch(error => {
        console.log('error ' + error);
        return error;
      });
    console.log('button done');
  }

  componentDidMount(){
    const data = "hello"
  }

  onSubmit = () => {
    this.setState={
      text:{name}
    }
  };

  order=()=>{
    console.log(this.state.address+","+this.state.city+","+this.state.no+","+this.state.gas+","+this.state.payby)
  }
  render() {
    var radio_props = [
      {label: 'Pay by cash         ', value: 'Pay by cash' },
      {label: 'Pas by Card   ', value: 'Pas by Card' }
    ];

    var data = [[this.state.gas]];
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Image style={styles.avatar} source={require('../../assets/Gas.png')}/>
        </View>

<View style={styles.SectionStyle}>

<Image source={require('../../assets/location.png')} style={styles.ImageStyle} />

  <TextInput
      style={{flex:1}}
      placeholder="Enter Your City Outlet Here"
      underlineColorAndroid="transparent"
      onChangeText={val => this.cityChange(val)}
  />

</View>

<View style={styles.SectionStyle}>

<Image source={require('../../assets/contact.png')} style={styles.ImageStyle} />

  <TextInput
      style={{flex:1}}
      placeholder="Enter Your Contact Number Here"
      underlineColorAndroid="transparent"
      onChangeText={val => this.noChange(val)}
  />

</View>


<View style={styles.SectionStyle}>
  <Text style={styles.gasType} >Gas Type</Text>
</View>
<DropdownMenu
          style={styles.drop}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          handler={(selection, row) => this.gasChange(data[selection][row])}
          data={data}
        >
        </DropdownMenu>


        <View style={styles.radioScreen}>
        <RadioForm
          style={styles.radio}
          radio_props={radio_props}
          initial={0}
          buttonColor={'black'}
          selectedButtonColor={'black'}
          buttonSize={18}
          formHorizontal={true}
          onPress={(value) => this.paybyChange(value)}
        />
      </View>
      <View style={[{
            alignItems:'center',
        }]}>
      <TouchableOpacity
        style={styles.signIn}
        onPress={() => {
            console.log('sighup button pressed');
            this.nullCheckOrder();
          }}>
        <Text style={[styles.textSign, {
            color: 'red'
        }]}>Order</Text>
            </TouchableOpacity> 
            </View>
      </View>
      

      
    )
  }

    addressChange(val) {
      this.setState({
        address: val.trim(),
      });
  }

  cityChange(val) {
    this.setState({
      city: val.trim(),
    });
}

noChange(val) {
  this.setState({
    no: val.trim(),
  });
}

gasChange(val) {
  this.setState({
    gas: val.trim(),
  });
}
paybyChange(val) {
  this.setState({
    payby: val.trim(),
  });
}


}
const styles = StyleSheet.create({

  header:{
    height: 230,
  },
  signIn: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 1,
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},

  avatar: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:50
  },
  SectionStyle: {
    width:windowWidth-30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5 ,
    marginTop: 20,
    marginLeft:15,
    marginBottom:0,
},
radio:{
  
},
radioScreen:{
  marginTop:90,
  height:50,
  alignItems:'center',
},
drop:{
  marginTop:30,
  height: 20,
},
gasType:{
fontWeight:'bold'
},
 
ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
},

});