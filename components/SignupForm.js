import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For FontAwesome icons
import { firebaseAuth } from "./firebase/firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigation } from '@react-navigation/native';

export default function SignupForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigation = useNavigation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleSignUp = () => {
    const { email, password, confirmPassword } = form;

    // Email Validation (Using Regular Expression)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email address', 'Please enter a valid email address.');
      return;
    }

    // Check password length
    if (password.length < 8) {
      Alert.alert('Password must be at least 8 characters');
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    // If all checks pass
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed up 
        Alert.alert('Successfully signed up!');
        return signInWithEmailAndPassword(firebaseAuth, email, password);
      })
      .then((loginCredential) => {
        // User successfully logged in
        const user = loginCredential.user;
        console.log(user);
        navigation.navigate('Dashboard');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', error.message);
      });
    
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign up!</Text>
          <Text style={styles.subtitle}>Enter details</Text>
        </View>

        <View style={styles.form}>
          {/* Email Input */}
          <InputField
            label="Email address"
            placeholder="name@example.com"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            iconName="envelope" // Mail icon
            keyboardType="email-address"
          />

          {/* Password Input */}
          <PasswordInput
            label="Password"
            placeholder="**********"
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            iconPass1="lock"
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
          />

          {/* Confirm Password Input */}
          <PasswordInput
            label="Confirm Password"
            placeholder="**********"
            value={form.confirmPassword}
            onChangeText={(confirmPassword) => setForm({ ...form, confirmPassword })}
            iconPass1="lock"
            isPasswordVisible={isConfirmPasswordVisible}
            togglePasswordVisibility={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.formAction}>
          <TouchableOpacity onPress={handleSignUp}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Create account</Text>
            </View>
          </TouchableOpacity>
        </View>

          {/* Navigation */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.link}>
            <Text style={styles.linkText}>Already have an account? Sign in</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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

const PasswordInput = ({ label, placeholder, value, onChangeText, iconPass1, isPasswordVisible, togglePasswordVisibility }) => {
  return (
    <View style={styles.input}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.passwordContainer}>
        {/* Lock icon in front of the input */}
        <Icon
          name={iconPass1}  // Lock icon for password
          size={20}
          color="#555555"
          style={styles.lockIcon}
        />
        <TextInput
          secureTextEntry={!isPasswordVisible}
          maxLength={20}
          style={styles.inputControlWithIcon}
          placeholder={placeholder}
          placeholderTextColor="#6b7288"
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity style={styles.toggleButton} onPress={togglePasswordVisibility}>
          <Icon
            name={isPasswordVisible ? 'eye-slash' : 'eye'}
            size={20}
            color="#555555"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  inputControlWithIcon: {
    width: '100%',
    flex: 1,
    height: 50,
    backgroundColor: '#F8D7E1',
    paddingHorizontal: 16,
    paddingLeft: 45, // Make space for the lock icon
    borderRadius: 24,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  lockIcon: {
    position: 'absolute',
    left: 16, // Position the lock icon at the start of the input field
  },
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
    justifyContent: 'space-between',
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
    letterSpacing: 0.1,
    marginTop: 40,
  },
  btn: {
    backgroundColor: '#D81B60',
    borderRadius: 24,
    borderWidth: 6,
    borderColor: '#D81B60',
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  toggleButton: {
    position: 'absolute',
    right: 16,
    padding: 8,
  },
});
