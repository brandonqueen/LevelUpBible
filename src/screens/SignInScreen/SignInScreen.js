import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React, {useState} from 'react'
import Logo from '../../../assets/Images/BibleTogether.png';
import CustomInput from '../../components/CustomInput/CustomInput';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
  
    return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode='contain'/>

      <CustomInput 
        placeholder='Username'
        value={username}
        setValue={setUsername}
        />
      <CustomInput
        placeholder='Password'
        value={password}
        setValue={setPassword}
        secureTextEntry
        />
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
    root: {
        padding: 20,
        alignItems: 'center'
    },
    logo: {
        width: '70%',
        maxWidth: 400,
        maxHeight: 300,
    }
})