import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';

import CustomTextInput from "./components/CustomTextInput";
import axios from 'axios';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [isTabEmail, setIsTabEmail] = useState(true);

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Phone' },
  ]);

  const login = (data) => {
    const config = {
      headers: {
        'apikey': "037cb34d-c5ee-4169-b2fd-bec049f77ecf",
        'x-platform': Platform.OS === 'ios' ? 'ios' : 'android'
      }
    };

    

    axios.post('https://dev.tovtrip.com/usersvc/api/v1/auth/login', data, config)
      .then(response => {
        const data = response?.data?.data;
        navigation.navigate('Profile', {accessToken: data?.accessToken})
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
  }
  const validateEmailPassword = (email, password) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email?.trim()) {
      setErrorEmail('Email is required');
    } else if (!regexEmail.test(email)) {
      setErrorEmail('Invalid email format');
    } else if(!password?.trim()){
      setErrorPassword('Password is required');
    } else {
      const data = {
        email: email,
        password: password
      };
      login(data)
    }
  } 
    const validatePhoneNumberPassWord = (phone, password) => {
      const regexPhone = /^[0-9 ()+-]*$/;
      if(!phone?.trim()){
        setErrorPhone('Phone number is required');
      }else if(!regexPhone?.test(phone)){
        setErrorPhone('Invalid phone number format');
      } else if(!password?.trim()){
        setErrorPassword('Password is required');
      } else {
        const data = {
          countryCode: "855",
          phone: phone,
          password: password
        };
        login(data)
      }
  };
  
  const handleValidateInputs = () => {
    if(isTabEmail){
      validateEmailPassword(email, password)
    } else {
      validatePhoneNumberPassWord(phone, password)
    }
  }
 
  const EmailLogin = () => (
    <View style={{ flex: 1, marginTop: 15 }}>
      <CustomTextInput
        label={"Email"}
        value={email}
        onChangeText={(text) => {
          setEmail(text)
          setErrorEmail("")

        }}
        leftIcon={<TextInput.Icon icon="email" />}
        errorText={errorEmail}
        keyboardType="email-address"
      />
      <CustomTextInput
        label={"Password"}
        value={password}
        secureTextEntry={hidePass}
        onChangeText={(text) =>{
          setPassword(text)
          setErrorPassword("")
        } }
        leftIcon={<TextInput.Icon icon="lock" />}
        rightIcon={<TextInput.Icon icon={hidePass ? "eye-off" : "eye"}
          onPress={() => setHidePass(!hidePass)} />}
        errorText={errorPassword}
      />
    </View>
  );


  const PhoneLogin = () => (
    <View style={{ flex: 1, marginTop: 15 }}>
      <CustomTextInput
        label={"Phone"}
        value={phone}
        onChangeText={(text) => {
          setPhone(text)
          setErrorPhone("")
        }}
        leftIcon={<TextInput.Icon icon="phone" />}
        errorText={errorPhone}
        keyboardType="phone-pad"
      />
      <CustomTextInput
        label={"Password"}
        value={password}
        secureTextEntry={hidePass}
        onChangeText={(text) =>{
          setPassword(text)
          setErrorPassword("")
        } }
        leftIcon={<TextInput.Icon icon="lock" />}
        rightIcon={<TextInput.Icon icon={hidePass ? "eye-off" : "eye"}
          onPress={() => setHidePass(!hidePass)} />}
        errorText={errorPassword}
      />
    </View>
  );


  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#00C4FF' }}
      style={{ backgroundColor: '#DDDDE4' }}
      onTabPress={({ route }) => {
        if (route.key === 'email') {
          setIsTabEmail(true);
        } else{
          setIsTabEmail(false);
        }
      }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: "#2F3137", margin: 8 }}>
          {route.title}
        </Text>
      )}
    />
  );
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'email':
        return EmailLogin();
      default:
        return PhoneLogin();
    }
  };
  return (

    <SafeAreaView style={styles.container} >
      <Text style={styles.title}>Login</Text>
      <View style={styles.subContain}>
        <TabView
          lazy
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
      <View style={{ flex: 2, padding: 20, }}>
        <TouchableOpacity onPress={() => console.log('Forgot Password Pressed')}>
          <Text style={{ color: '#00C4FF', textAlign: 'center' }}>
            Forgot password
          </Text>
        </TouchableOpacity>

        <Button style={styles.button} mode="contained" onPress={() =>
        // navigation.navigate('Profile's)
           handleValidateInputs()
           }>
          Continue
        </Button>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  subContain: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center'
  },
  
  button: {
    marginTop: 40,
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#00C4FF',
  },
});

export default LoginScreen;
