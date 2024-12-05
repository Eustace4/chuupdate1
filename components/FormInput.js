import React from 'react';
import {View, StyleSheet, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const FormInput = ({placeholder, title, placeholderTextColor, icon, secureTextEntry, value, onChangeText,toggleSecureText}) => {
    return (
    <>
    <Text style={{fontWeight: 'bold'}}>{title}</Text> 
    <View style={styles.inputContainer}>
        {icon && 
            <MaterialIcons
            name={icon}
            size={24}
            color='#FF69B4'
            style={styles.icon}/>
        }
    <TextInput 
    placeholder={placeholder} 
    placeholderTextColor={placeholderTextColor}
    style={styles.input} 
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    />
    {toggleSecureText && (
        <TouchableOpacity
        onPress={toggleSecureText}
        style={styles.toggleVisibility}
        >
        <MaterialIcons
        name={secureTextEntry ? 'visibility': 'visibility-off'}
        size={24}
        color='gray'
        />
        </TouchableOpacity>
    )}
    </View>
    </>
    );
};
const styles = StyleSheet.create({
    inputContainer:{
            borderWidth: 1, 
            borderColor: '#FF69B4', 
            height: 45,
            borderRadius: 20,
            paddingLeft: 10,
            marginBottom: 15,
            alignItems: 'center',
            flexDirection: 'row',
            position: 'relative',
        
        
    },
    icon:
    {
    marginRight: 10,
    },
    input:{ 
        flex:1,
        fontSize: 18,
        height: 40,
        paddingHorizontal: 10,
    
    },
    toggleVisibility:{
        position: 'absolute',
        right: 10,
        top: '50%',
        transform:[{translateY: -30}],
    },
});
export default FormInput;