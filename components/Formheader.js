// Formheader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Formheader = ({leftHeading, rightHeading, subHeading, subHeadingAlign = 'left' }) => {
  return (
  <>
  <View style={styles.container}>
    <Text style={[styles.heading, styles.leftHeading]}>{leftHeading}</Text>
    <Text style={[styles.heading, styles.leftHeading]}>{rightHeading}</Text>
  </View>
  <Text style={[styles.subHeading, { textAlign: subHeadingAlign}]}>{subHeading}</Text>
    </>
  );
};
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 40,
        marginBottom: 10,
        
    },
    heading:{
      fontSize:35,
      fontWeight: 'bold',
      color:'#1b1b33',
    },
    leftHeading:{
      textAlign: 'left',
    },
    subHeading: {
      fontSize: 20,
      color:'#1b1b33',
      marginTop: 5,
      paddingHorizontal: 40},
})
export default Formheader;
