import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebaseAuth } from "./firebase/firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
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

const PasswordInput = ({ label, placeholder, value, onChangeText, iconPass1, isPasswordVisible, togglePasswordVisibility }) => {
  return (
    <View style={styles.input}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.passwordContainer}>
        <Icon
          name={iconPass1}
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

export default function LoginForm() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    const { email, password } = form;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email address', 'Please enter a valid email address.');
      return;
    }

    if (!password) {
      Alert.alert('Password is required');
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        Alert.alert('Login successful');
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        Alert.alert('Login failed', error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Welcome back! Please login to continue.</Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Email address"
            placeholder="name@example.com"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            iconName="envelope"
            keyboardType="email-address"
          />

          <PasswordInput
            label="Password"
            placeholder="**********"
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            iconPass1="lock"
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        </View>

        <View style={styles.formAction}>
          <TouchableOpacity onPress={handleSignIn}>
            <View style={styles.btn}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.btnText}>Login</Text>
              )}
            </View>
          </TouchableOpacity>
          
        </View>
        {/* Navigation */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPassword')}
          style={styles.link}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.link}>
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>
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
  inputControlWithIcon: {
    flex: 1,
    width: '100%',
    height: 50,
    backgroundColor: '#F8D7E1',
    paddingHorizontal: 45,
    borderRadius: 24,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  lockIcon: {
    position: 'absolute',
    left: 16,
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
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
    justifyContent: 'space-between',
  },
  forgotPasswordText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
    marginTop: 15,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
    marginTop: 40,
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
