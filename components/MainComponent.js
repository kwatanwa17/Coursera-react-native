import React, {Component} from "react";
import Home from "./HomeComponent";
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import {View, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Constants from 'expo-constants';

const Stack = createStackNavigator();

function MenuNavigator() {
    return (

        <Stack.Navigator
            screenOptions={{
                initialRouteName: 'Menu',
                navigationOptions: {
                    headerStyle: {
                        backgroundColor: '#512DA8'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff'
                    }
                }
            }}>
            <Stack.Screen
                name="Menu"
                component={Menu}
                options={{title: 'Menu'}}
            />
            <Stack.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{title: 'Dishdetail'}}
            />
        </Stack.Navigator>

    );
}

function HomeNavigator() {
    return (

        <Stack.Navigator
            screenOptions={{
                navigationOptions: {
                    headerStyle: {
                        backgroundColor: '#512DA8'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff'
                    }
                }
            }}>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{title: 'Home'}}
            />
        </Stack.Navigator>

    );
}

const Drawer = createDrawerNavigator();

function MainNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home"
                              drawerStyle={{
                                  backgroundColor: '#D1C4E9'
                              }}>
                <Drawer.Screen name="Home" component={HomeNavigator}/>
                <Drawer.Screen name="Menu" component={MenuNavigator}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

class Main extends Component {

    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
                <MainNavigator/>
            </View>
        );
    }
}

export default Main;