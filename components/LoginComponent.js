import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Icon, Input, CheckBox, Button} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';
import * as ImageManipulator from "expo-image-manipulator";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {baseUrl} from "../shared/baseUrl";

class LoginTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }


    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }))
                .catch((error) => console.log('Could not save user info', error));
        else
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));

    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={
                        <Icon
                            name='user-o'
                            type='font-awesome'
                            size={24}
                            color='black'
                            iconStyle={{marginRight: 10}}
                        />
                    }
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={
                        <Icon
                            name='key'
                            type='font-awesome'
                            size={24}
                            color='black'
                            iconStyle={{marginRight: 10}}
                        />
                    }
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox title="Remember Me"
                          center
                          checked={this.state.remember}
                          onPress={() => this.setState({remember: !this.state.remember})}
                          containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                size={24}
                                color='white'
                            />
                        }
                        buttonStyle={{backgroundColor: "#512DA8"}}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Register"
                        clear
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                size={24}
                                color='blue'
                            />
                        }
                        titleStyle={{color: 'blue'}}
                    />
                </View>
            </View>
        );
    }

}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }
    }

    getImageFromGallery = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                console.log(result);
                this.processImage(result.uri);
            }
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                {resize: {width: 400}}
            ],
            {format: 'png'}
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri });
    }



    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
    }

    render() {
        return (
            <ScrollView>

                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image}
                        />
                        <Button
                            title="Camera"
                            onPress={this.getImageFromCamera}
                            buttonStyle={{
                                margin: 10
                            }}
                        />
                        <Button
                            title="Camera roll"
                            onPress={this.getImageFromGallery}
                            buttonStyle={{
                                margin: 10
                            }}
                        />
                    </View>
                    <Input
                        placeholder="Username"
                        leftIcon={
                            <Icon
                                name='user-o'
                                type='font-awesome'
                                size={24}
                                color='black'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Password"
                        leftIcon={
                            <Icon
                                name='key'
                                type='font-awesome'
                                size={24}
                                color='black'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="First name"
                        leftIcon={
                            <Icon
                                name='user-o'
                                type='font-awesome'
                                size={24}
                                color='black'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        onChangeText={(firstname) => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="last name"
                        leftIcon={
                            <Icon
                                name='user-o'
                                type='font-awesome'
                                size={24}
                                color='black'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        onChangeText={(lastname) => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Email"
                        leftIcon={
                            <Icon
                                name='envelope-o'
                                type='font-awesome'
                                size={24}
                                color='black'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                    />
                    <CheckBox title="Remember Me"
                              center
                              checked={this.state.remember}
                              onPress={() => this.setState({remember: !this.state.remember})}
                              containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title="Register"
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    size={24}
                                    color='white'
                                />
                            }
                            color="#512DA8"
                            buttonStyle={{backgroundColor: "#512DA8"}}
                        />
                    </View>
                </View>

            </ScrollView>
        );
    }


}

const Tab = createBottomTabNavigator();

function Login() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Login') {
                        iconName = focused
                            ? 'sign-in'
                            : 'sign-in';
                    } else if (route.name === 'Register') {
                        iconName = focused
                            ? 'user-plus'
                            : 'user-plus';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName}
                                 type='font-awesome'
                                 size={size}
                                 color={color} />;
                },
            })}
            tabBarOptions={{
                activeBackgroundColor: '#9575CD',
                inactiveBackgroundColor: '#d1C4E9',
                activeTintColor: 'white',
                inactiveTintColor: 'gray'
            }}>
            <Tab.Screen name="Login" component={LoginTab}/>
            <Tab.Screen name="Register" component={RegisterTab}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginVertical: 30,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        margin: 10
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 10
    }
});

export default Login;