import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, TextInput, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import CustomTextInput from "./components/CustomTextInput";
import axios from 'axios';

const ProfileScreen = () => {
    const route = useRoute();
    const accessToken = route.params?.accessToken;
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('Male');

    useEffect(() => {
        const config = {
            headers: {
                'apikey': "037cb34d-c5ee-4169-b2fd-bec049f77ecf",
                'x-platform': Platform.OS === 'ios' ? 'ios' : 'android',
                'Authorization': `Bearer ${accessToken}`
            }
        };

        axios.get('https://dev.tovtrip.com/usersvc/api/v1/users/me', config)
            .then(response => {
                const user = response?.data?.data;
                setFirstName(user?.firstName);
                setLastName(user?.lastName)
                setEmail(user?.email);
                setGender(user?.gender);
            })
            .catch(error => {
                console.error('Error posting data:', error);
            });
    }, []);

    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.title}>Profile</Text>
            <View style={{ flexDirection: 'row', marginTop: 15, }}>
                <CustomTextInput
                    label={""}
                    value={firstName}
                    styleTextInput={{ width: '50%', marginRight: 10 }}
                />

                <CustomTextInput
                    label={""}
                    value={lastName}
                    styleTextInput={{ width: '47%' }}
                />
            </View>
            <View style={{ marginTop: 15 }}>
                <CustomTextInput
                    label={""}
                    value={email}
                    leftIcon={<TextInput.Icon icon="email" />}
                />
            </View>
            <View style={styles.viewGender}>
                <Text style={styles.label}>Gender</Text>
                <View style={{ flex: 3}}>
                    <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
                        <View style={styles.radioGroup}>
                            <View style={styles.radioContainer}>
                                <Text style={styles.radioText}>Male</Text>
                                <RadioButton
                                    value="Male"
                                    color="#00C4FF"
                                    status={gender === 'Male' ? 'checked' : 'unchecked'}
                                />
                            </View>
                            <View style={styles.radioContainer}>
                                <Text style={styles.radioText}>Female</Text>
                                <RadioButton
                                    value="Female"
                                    color="#00C4FF"
                                    status={gender === 'Female' ? 'checked' : 'unchecked'}
                                />
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
            </View>

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center'
    },
   
    viewGender: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        marginRight: 20,
        flex: 3
    },
    radioGroup: {
        flexDirection: 'row',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioText: {
        fontSize: 16,
        marginLeft: 5,
    },

});

export default ProfileScreen;
