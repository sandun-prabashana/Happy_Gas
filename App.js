/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { useEffect } from 'react';
 import { View, ActivityIndicator ,LogBox } from 'react-native';
 import { 
   NavigationContainer, 
   DefaultTheme as NavigationDefaultTheme,
   DarkTheme as NavigationDarkTheme
 } from '@react-navigation/native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 
 import { 
   Provider as PaperProvider, 
   DefaultTheme as PaperDefaultTheme,
   DarkTheme as PaperDarkTheme 
 } from 'react-native-paper';
 
 import { DrawerContent } from './screens/DefaultPages/DrawerContent';
 
 import MainTabScreen from './screens/DefaultPages/MainTabScreen';
 
 import { AuthContext } from './components/context';
 
 import RootStackScreen from './screens/authPages/RootStackScreen';
 
 import AsyncStorage from '@react-native-async-storage/async-storage';
 
 const Drawer = createDrawerNavigator();
 
 LogBox.ignoreAllLogs();

 const App = () => {
   
 
   const [isDarkTheme, setIsDarkTheme] = React.useState(false);
 
   const initialLoginState = {
     isLoading: true,
     userName: null,
     userToken: null,
   };
 


 
   const loginReducer = (prevState, action) => {
     switch( action.type ) {
       case 'RETRIEVE_TOKEN': 
         return {
           ...prevState,
           userToken: action.token,
           isLoading: false,
         };
       case 'LOGIN': 
         return {
           ...prevState,
           userName: action.id,
           userToken: action.token,
           isLoading: false,
         };
       case 'LOGOUT': 
         return {
           ...prevState,
           userName: null,
           userToken: null,
           isLoading: false,
         };
       case 'REGISTER': 
         return {
           ...prevState,
           userName: action.id,
           userToken: action.token,
           isLoading: false,
         };
     }
   };
 
   const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
 
   const authContext = React.useMemo(() => ({
     signIn: async(user_ID, user_Token ,user_name,user_email) => {
      console.log('-------------------------------')
      console.log(user_Token)
       const userToken = user_Token;
       const userID = user_ID;
       
       try {
        await AsyncStorage.setItem('userToken', JSON.stringify(user_Token));
        await AsyncStorage.setItem('userID', userID);
        await AsyncStorage.setItem('userName', user_name);
        await AsyncStorage.setItem('userEmail', user_email);
       } catch(e) {
         console.log(e);
       }
       
       dispatch({ type: 'LOGIN', id: userID, token: userToken });
     },
     signOut: async() => {
       
       try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userID');
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('userEmail');
       } catch(e) {
         console.log(e);
       }
       dispatch({ type: 'LOGOUT' });
     },
     signUp: () => {
       
     },
     toggleTheme: () => {
       setIsDarkTheme( isDarkTheme => !isDarkTheme );
     }
   }), []);
 
   useEffect(() => {
     setTimeout(async() => {
       
       let userToken;
       userToken = null;
       let UserName;
       UserName = null;
       try {
         userToken = await AsyncStorage.getItem('userToken');
         UserName = await AsyncStorage.getItem('userID');
         
       } catch(e) {
         console.log(e);
       }
       
       dispatch({ type: 'RETRIEVE_TOKEN', token: userToken,userName:UserName });
     }, 1000);
   }, []);
 
   if( loginState.isLoading ) {
     return(
       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <ActivityIndicator size="large"/>
       </View>
     );
   }
   return (
     <AuthContext.Provider value={authContext}>
     <NavigationContainer>
       { loginState.userToken !== null ? (
         <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
           <Drawer.Screen name="HomeDrawer" options={{headerShown: false}} component={MainTabScreen} />
         </Drawer.Navigator>
       )
     :
       <RootStackScreen/>
     }
     </NavigationContainer>
     </AuthContext.Provider>
   );
 }
 
 export default App;
 