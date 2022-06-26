import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Platform,StatusBar,
    Alert, TextInput,ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import axios from "react-native-axios";
import SignInScreen from './SignInScreen';
import {AuthContext} from '../../components/context'
import UserServices from './services/UserServices';
import UserDTO from './dto/UserDTO';
import SweetAlert from 'react-native-sweet-alert';

export default class SignUpScreen extends Component {

    constructor(props) {
      super(props);
      this.state = {
        user_id:'',
        user_name:'',
        user_email: '',
        user_password: '',
        isValidNICNumber: false,
        errorNICNumber: false,
        isValuidUserName: true,
        emailValidation: false,
        isValidPassword: true,
        check_textInputChange: false,
        secureTextEntry: true,
      }
    }

    nullCheck(){
      var Cid = this.state.user_id
      var Cname =this.state.user_name
      var Cemail =this.state.user_email
      var Cpassword =this.state.user_password
      if(Cid ==""|| Cname==""|| Cemail==""||Cpassword==""){
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
        this.goSignUp()
      }
    }

    goSignUp() {
        console.log('====================================');
        console.log(this.state.user_id);
        console.log(this.state.user_name);
        console.log(this.state.user_email);
        console.log(this.state.user_password);
        console.log('====================================');
        let userServices = new UserServices();
        userServices
          .signUp(
            new UserDTO(
              this.state.user_id,
              this.state.user_name,
              this.state.user_email,
              this.state.user_password,
            ),
          )
          .then(response => response.json())
          .then(json => {
            console.log('register response ', json);
            console.log('==========================');
            // alert add ane data save
            const {signIn} = this.context;
            console.log(json.name)
            // signIn(json.user, json.token);
          })
          .catch(error => {
            console.log('error ' + error);
            return error;
          });
        console.log('button done');
      }
    

    signIn =()=> {
        this.props.navigation.navigate(SignInScreen)
      }
    render() {
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
            </View>
    
            <View style={styles.footer}>
              <ScrollView>
                {/* NIC text feild */}
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
                {/* name text feild */}
                <View>
                  <Text
                    style={[
                      styles.text_footer,
                      {
                        marginTop: 8,
                      },
                    ]}>
                    Name
                  </Text>
                  <View style={styles.action}>
                    <FontAwesome name="user-circle" color="#05375a" size={20} />
                    <TextInput
                      placeholder="Your Name"
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={val => this.nameOnChange(val)}
                    />
                    {this.state.check_textInputChange ? (
                      <View>
                        <Feather name="check-circle" color="green" size={20} />
                      </View>
                    ) : null}
                  </View>
                  
                </View>
                {/* Email text feild */}
                <View>
                  <Text
                    style={[
                      styles.text_footer,
                      {
                        marginTop: 8,
                      },
                    ]}>
                    Email
                  </Text>
                  <View style={styles.action}>
                  <FontAwesome name="user-o" color="#05375a" size={20}/>
                    <TextInput
                      placeholder="Your Email"
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={val => this.handleEmailChange(val)}
                    />
                    {this.state.emailValidation ? (
                      <View>
                        <Feather name="check-circle" color="green" size={20} />
                      </View>
                    ) : null}
                  </View>
                </View>
                {/* password text feild */}
                <View>
                  <Text
                    style={[
                      styles.text_footer,
                      {
                        marginTop: 8,
                      },
                    ]}>
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
                      secureTextEntry={this.state.secureTextEntry}
                      style={styles.textInput}
                      autoCapitalize="none"
                      onChangeText={val => this.handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={this.updateSecureTextEntry}>
                      {this.state.secureTextEntry ? (
                        <Feather name="eye-off" color="grey" size={20} />
                      ) : (
                        <Feather name="eye" color="grey" size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
                  {this.state.isValidPassword ? null : (
                    <View>
                      <Text
                        style={{
                          color: 'red',
                        }}>
                        Password must be minimum 8 and maximum 12 characters
                      </Text>
                    </View>
                  )}
                </View>
                {/* password confirm text feild */}

                <View style={styles.button}>
        
        <TouchableOpacity
        style={styles.signIn}
        onPress={() => {
            console.log('sighup button pressed');
            this.nullCheck();
          }}>
    
            <LinearGradient
            colors={['#08d4c4', '#01ab9d']}
            style={styles.signIn}
            >
            <Text style={[styles.textSign, {
            color:'#fff'
        }]}>Sign Up</Text>
            </LinearGradient>

            </TouchableOpacity>


            <TouchableOpacity
        onPress={this.signIn}
        style={[styles.signIn, {
            borderColor: '#009387',
            borderWidth: 1,
            marginTop: 15
        }]}
    >
        <Text style={[styles.textSign, {
            color: '#009387'
        }]}>Sign In</Text>
            </TouchableOpacity> 
        </View>
              </ScrollView>
            </View>
          </View>
        );
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
    
      nameOnChange = val => {
        if (val.trim().length >= 8) {
          this.setState({
            user_name: val.trim(),
            check_textInputChange: true,
          });
        } else {
          this.setState({
            user_name: val.trim(),
            check_textInputChange: false,
          });
        }
      };
    
      handleEmailChange(val) {
        const pattern =
          /[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/;
        if (val !== '' && pattern.test(val)) {
          this.setState({
            user_email: val.trim(),
            emailValidation: true,
          });
        } else {
          this.setState({
            user_email: val.trim(),
            emailValidation: false,
          });
        }
      }
      handlePasswordChange = val => {
        if (val.trim().length > 8 && val.trim().length < 12) {
          this.setState({
            user_password: val,
            isValidPassword: true,
          });
        } else {
          this.setState({
            user_password: val,
            isValidPassword: false,
          });
        }
      };

      updateSecureTextEntry = () => {
        this.setState({
          secureTextEntry: !this.state.secureTextEntry,
        });
      };

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
