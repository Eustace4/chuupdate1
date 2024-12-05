// App.js
import React from 'react';
import { View, Text, StyleSheet,TouchableWithoutFeedback,ScrollView,Dimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Formheader from './components/Formheader' ;
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navigation from './components/Navigation.js'; 

const {width, height} = Dimensions.get('window');
const App =() => {
  return ( 
  <GestureHandlerRootView style={styles.rootView}>   
      <Navigation/>
</GestureHandlerRootView>
  );
};


const styles =  StyleSheet.create ({
  rootView:{
    flex: 1,
  },
  scrollViewcontainer: {
    flexDirection:'row',
    backgroundColor: '#F8F1FF',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
  },
  pageContainer:{
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.15, 
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    width: width, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, 
  },
});
export default App;
  
  