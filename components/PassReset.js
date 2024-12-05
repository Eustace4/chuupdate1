import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth } from './firebase/firebaseConfig.js';
import { useNavigation } from '@react-navigation/native';

const InputField = ({ label, placeholder, value, onChangeText, iconName, keyboardType }) => {
  return (
    <View style={styles.input}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputControlContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={keyboardType || 'default'}
          style={styles.inputControl}
          placeholder={placeholder}
          placeholderTextColor="#6b7288"
          value={value}
          onChangeText={onChangeText}
        />
        <Icon
          name={iconName}
          size={20}
          color="#555555"
          style={styles.inputIcon}
        />
      </View>
    </View>
  );
};

export default function ResetPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email address', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        Alert.alert('Success', 'Check your email for password reset instructions');
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert('Reset Failed', error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter your email to reset your password</Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Email address"
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            iconName="envelope"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formAction}>
          <TouchableOpacity onPress={handleResetPassword}>
            <View style={styles.btn}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.btnText}>Reset Password</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.link}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F1FF',
  },
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 45,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 19,
    fontWeight: '500',
    color: '#1b1b33',
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  inputControl: {
    width: '100%',
    height: 50,
    backgroundColor: '#F8D7E1',
    paddingHorizontal: 45,
    borderRadius: 24,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
  },
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: '#D81B60',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});