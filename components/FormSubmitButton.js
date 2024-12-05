import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const FormSubmitButton = ({title,backgroundColor }) => {
    return (
        <TouchableOpacity style={styles.container} >
            <Text style={{fontSize: 20, color: '#fff'}}>{title}</Text>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    container:{
        height: 55,
        backgroundColor:'#D81B60',
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
    }
})

export default FormSubmitButton;