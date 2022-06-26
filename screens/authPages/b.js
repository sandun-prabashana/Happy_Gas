import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Platform,StatusBar,
    Alert, TextInput,ActivityIndicator, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUpScreen from './SignUpScreen';
import UserServices from './services/UserServices';
import UserDTO from './dto/UserDTO';
import SweetAlert from 'react-native-sweet-alert';
import { AuthContext } from '../../components/context';

const { signIn } = React.useContext(AuthContext);

export default class SignInScreen extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        user_id: '',
        check_textInputChange: false,
        isValidUser: true,
        user_password: '',
        secureTextEntry: true,
        isValidPassword: true,
        isValidNICNumber: false,
        errorNICNumber: false,
      }
    }

    

    signUp =()=> {
      this.props.navigation.navigate(SignUpScreen);
    }

    signIn =()=> {  
        let Login = "LOGIN";  
        AsyncStorage.setItem('State',Login);  
        
      }

      nullCheck(){
        var Cid = this.state.user_id
        var Cpassword =this.state.user_password
        if(Cid ==""|| Cpassword==""){
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
          this.loginHandle(Cid,Cpassword)
        }
      }


      loginHandle(user_id, user_password) {
        this.setState({
          isLoading: true,
        });
        
        // const {signIn} = this.context;
        const userService = new UserServices();
        userService
          .signIn(user_id, user_password)
          .then(response => response.json())
          .then(json => {
            this.setState({
              isLoading: false,
            });

        var code = json.StatusCode;
            if(code == 200){
                console.log('ok')
                console.log('id :',json.user_id)
                console.log('token :',json.Token)
                signIn(json.user_id, json.Token);
            }else{
                SweetAlert.showAlertWithOptions({
                    title: json.massage,
                    subTitle: '',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    style: 'error',
                    cancellable: true
                  });
            }
            
          });
      }

    // login= ()=> {
    //   fetch('http://192.168.1.3:3000/user/oneuser/' + this.state.email, { method: 'GET' })
    //             .then((response) => response.json())
    //             .then((json) => this.Passwordmatch(json.data.password,json.data.name,json.data.uid))
    //  }


  

    
    
  
//     Passwordmatch= (password,name,uid)=> {
//       if (this.state.password == password) {
//         console.log("wadegoda")
//         this.props.navigation.navigate('ProfileScreen',{
//             email:this.state.email,
//             uid:uid,
//             name:name,
//             password:password
//           })

//       }else{
//         alert("Login First");

//     }
// }
    
render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
            </View>
          <View style={styles.footer}>
          <View>
                  <Text style={styles.text_footer}>NIC number</Text>
                  <View style={styles.action}>
                    <FontAwesome name="id-card-o" color="#05375a" size={20} />
                    <TextInput
                      placeholder="Your NIC number"
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={val => this.nicOnChange(val)}
                    />
                    {this.state.isValidNICNumber ? (
                      <View>
                        <Feather name="check-circle" color="green" size={20} />
                      </View>
                    ) : null}
                  </View>
                  {this.state.errorNICNumber ? (
                    <View>
                      <Text
                        style={{
                          color: 'red',
                        }}>
                        NIC number must be at 8 characters long
                      </Text>
                    </View>
                  ) : null}
                </View>

            <View>
              <Text style={[styles.text_footer, {marginTop: 35}]}>
                Password
              </Text>
              <View style={styles.action}>
              <FontAwesome
                    name="lock"
                    color="#05375a"
                    size={20}
                    />
                <TextInput
                  placeholder="Your Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={this.state.secureTextEntry}
                  style={[styles.textInput]}
                  autoCapitalize="none"
                  onChangeText={val => this.handlePasswordChange(val)}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.updateSecureTextEntry();
                  }}>
                  {this.state.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              {this.state.isValidPassword ? null : (
                <View>
                  <Text style={styles.errorMsg}>
                    Password must be 8 characters long.
                  </Text>
                </View>
              )}
              <TouchableOpacity>
                <Text style={{color: '#009387', marginTop: 15}}>
                  Forgot password?
                </Text>
              </TouchableOpacity>

              <View style={styles.button}>
                    <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {
                        this.nullCheck();
                      }}>
                        <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.signIn}
                        >
                        <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={this.signUp}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}>
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                        </TouchableOpacity> 

                    </View>
            </View>
          </View>
        </View>
      );
    }
  }

  nicOnChange(val) {
    if (val.trim().length >= 8) {
      this.setState({
        user_id: val.trim(),
        isValidNICNumber: true,
        errorNICNumber: false,
      });
    } else {
      this.setState({
        user_id: val.trim(),
        isValidNICNumber: false,
        errorNICNumber: true,
      });
    }
  }

  handlePasswordChange(val) {
    if (val.trim().length >= 8) {
      this.setState({
        user_password: val.trim(),
        isValidPassword: true,
      });
    } else {
      this.setState({
        user_password: val.trim(),
        isValidPassword: false,
      });
    }
  }

  updateSecureTextEntry() {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});

