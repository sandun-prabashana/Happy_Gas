import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import SignInScreen from './SignInScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button} from 'native-base';

export default class SplashScreen extends Component {

    constructor(props) {
      super(props);
      this.state = {
      };
    }


    getstart =()=> {
        this.props.navigation.navigate(SignInScreen)
      }

    render() {
        
        return (
            <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
                source={require('../../assets/Happylogo.png')}
                style={styles.logo}
                resizeMode="stretch"
                />
        </View>
                <Animatable.View 
                    style={styles.footer}
                    animation="fadeInUpBig"
                    >
                    <Text style={styles.title}>Have a nice day</Text>
                    <Text style={styles.text}>Sign in with account</Text>
                    <View style={styles.button}>
                    <TouchableOpacity
                    onPress={this.getstart}
                    >
                        <LinearGradient
                        colors={['#08d4c4','#01ab9d']}
                        style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcons
                            name="navigate-next"
                            color="#fff"
                            style={20}
                            >
                            </MaterialIcons>
                        </LinearGradient>
                    </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>

            )}
        
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

