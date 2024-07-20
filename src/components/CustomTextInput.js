import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
const CustomTextInput = (props) => {
    const {value, onChangeText, label, 
        errorText = "", leftIcon, rightIcon, 
        keyboardType, secureTextEntry, 
        styleTextInput, disabled }= props;
    return (
            <View style={styleTextInput ? styleTextInput : styles.inputContainer}>
                <TextInput
                    disabled={disabled}
                    label={label}
                    value={value}
                    mode="outlined"
                    onChangeText={(text) => onChangeText && onChangeText(text)}
                    left={leftIcon}
                    right={rightIcon}
                    style={styles.input}
                    outlineStyle={{ borderColor: "#00C4FF" }}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                
                />
                {
                    errorText ?
                    <Text
                    style={{
                        color: 'red',
                        marginTop: 10,
                    }}>
                    {errorText}
                </Text>
                    : null
                }
               
            </View>
    );
}
const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        backgroundColor: '#F4F5F7'
      },
})
export default CustomTextInput;