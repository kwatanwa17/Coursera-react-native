import React, {Component} from "react";
import Home from "./HomeComponent";
import Menu from './MenuComponent';
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import DishDetail from './DishdetailComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';

import {View, Platform, Text, ScrollView, Image, StyleSheet, SafeAreaView, ToastAndroid} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
    createDrawerNavigator, DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import Constants from 'expo-constants';

import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';

import NetInfo from "@react-native-community/netinfo";

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
});


const Stack = createStackNavigator();

function MenuNavigator({navigation}) {
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
                options={{
                    title: 'Menu',
                    headerLeft: () => (<Icon name="menu" size={24}
                                             color='black'
                                             onPress={() => navigation.toggleDrawer()}/>
                    ),
                }}
            />
            <Stack.Screen
                name="DishDetail"
                component={DishDetail}
                options={{title: 'DishDetail'}}
            />
        </Stack.Navigator>
    );
}

function HomeNavigator({navigation}) {
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
                options={{
                    title: 'Home',
                    headerLeft: () => (<Icon name="menu" size={24}
                                             color='black'
                                             onPress={() => navigation.toggleDrawer()}/>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function ContactNavigator({navigation}) {
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
                name="Contact"
                component={Contact}
                options={{
                    title: 'Contact Us',
                    headerLeft: () => (<Icon name="menu" size={24}
                                             color='black'
                                             onPress={() => navigation.toggleDrawer()}/>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function AboutNavigator({navigation}) {
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
                name="About"
                component={About}
                options={{
                    title: 'About Us',
                    headerLeft: () => (<Icon name="menu" size={24}
                                             color='black'
                                             onPress={() => navigation.toggleDrawer()}/>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function ReservationNavigator({navigation}) {
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
                name="Reservation"
                component={Reservation}
                options={{
                    title: 'Reservation',
                    headerLeft: () => (<Icon name="menu" size={24}
                                             color='black'
                                             onPress={() => navigation.toggleDrawer()}/>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function FavoritesNavigator({navigation}) {
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
                name="Favorites"
                component={Favorites}
                options={{
                    title: 'Favorites',
                    headerLeft: () => (<Icon name="menu" size={24}
                                             color='black'
                                             onPress={() => navigation.toggleDrawer()}/>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function LoginNavigator({navigation}) {
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
                name="Login"
                component={Login}
                options={{
                    title: 'Login',
                    headerLeft: () => (<Icon name="menu" size={24}
                                             color='black'
                                             onPress={() => navigation.toggleDrawer()}/>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}


const Drawer = createDrawerNavigator();

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView>
        <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage}/>
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </SafeAreaView>
    </DrawerContentScrollView>
);


function MainNavigator(props) {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home"
                              drawerStyle={{
                                  backgroundColor: '#D1C4E9'
                              }}
                              drawerContent={CustomDrawerContentComponent}>
                <Drawer.Screen
                    name="Login"
                    component={LoginNavigator}
                    options={{
                        drawerIcon: ({color, focused}) =>
                            (<Icon
                                name='sign-in'
                                type='font-awesome'
                                size={24}
                                color={color}/>),
                    }}
                />
                <Drawer.Screen name="Home"
                               component={HomeNavigator}
                               options={{
                                   drawerIcon: ({color, focused}) =>
                                       (<Icon
                                           name='home'
                                           type='font-awesome'
                                           size={24}
                                           color={color}/>),
                               }}
                />
                <Drawer.Screen
                    name="About Us"
                    component={AboutNavigator}
                    options={{
                        drawerIcon: ({color, focused}) =>
                            (<Icon
                                name='info-circle'
                                type='font-awesome'
                                size={24}
                                color={color}/>),
                    }}
                />
                <Drawer.Screen
                    name="Menu"
                    component={MenuNavigator}
                    options={{
                        drawerIcon: ({color, focused}) =>
                            (<Icon
                                name='list'
                                type='font-awesome'
                                size={24}
                                color={color}/>),
                    }}
                />
                <Drawer.Screen
                    name="Contact Us"
                    component={ContactNavigator}
                    options={{
                        drawerIcon: ({color, focused}) =>
                            (<Icon
                                name='address-card'
                                type='font-awesome'
                                size={24}
                                color={color}/>),
                    }}
                />
                <Drawer.Screen
                    name="Reserve Table"
                    component={ReservationNavigator}
                    options={{
                        drawerIcon: ({color, focused}) =>
                            (<Icon
                                name='cutlery'
                                type='font-awesome'
                                size={24}
                                color={color}/>),
                    }}
                />
                <Drawer.Screen
                    name="My Favorites"
                    component={FavoritesNavigator}
                    options={{
                        drawerIcon: ({color, focused}) =>
                            (<Icon
                                name='heart'
                                type='font-awesome'
                                size={24}
                                color={color}/>),
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

        NetInfo.fetch()
            .then((connectionInfo) => {
                ToastAndroid.show('Initial Network Connectivity Type: '
                    + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                    ToastAndroid.LONG)
            });

        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
                break;
            case 'unknown':
                ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
                <MainNavigator/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);