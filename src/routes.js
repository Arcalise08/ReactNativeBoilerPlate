import React, {useState, useEffect, useRef, Fragment} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { setNav } from "./redux/actions";
import { _silentLogin } from "./redux/thunk";
import CustomBackFunction from "./utils/CustomGoBack";

//Components
import NavBar from "./components/Layout/NavBar";

//Pages
import LandingPage from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Tutorial from "./pages/Tutorial";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import AppLoading from "expo-app-loading";

import {Colors} from './GlobalStyles'


const Stack = createStackNavigator();

/**
 *  Routes of entire app.
 *  Add screens to fit situation below and they will automagically be rendered
 */
const NO_AUTH=[
    {route: "SignUp", component: SignUp},
    {route: "SignIn", component: SignIn},
    {route: "Landing", component: LandingPage}
]

const ACCOUNT_NEEDS_TUTORIAL_PROMPT=[
    {route: "Tutorial", component: Tutorial},
]

const AUTHENTICATED_ROUTES = [
    {route: "Home", component: Home},
    {route: "Matches", component: Matches},
    {route: "Profile", component: Profile},
    {route: "Search", component: SignUp},
]

const Routes = ({_user, _nav, _silentLogin, setNav, _loadHomeScreen}) => {
    const [location, setLocation] = useState("HomeScreen")
    const [isMounted, setIsMounted] = useState(false);
    const navigation = useRef()

    useEffect(() => {
        setIsMounted(true)
        return () => {
            setIsMounted(false)
        }
    },[])

    useEffect(() => {
        setNavigation()
        checkUser()
        fetchHomeScreen()
    },[_user, navigation])

    const checkUser = async () => {
        if (!_user) {
            //implement _silentLogin in your preferred approach here;
            //await _silentLogin()
        }
    }

    const setNavigation = () => {
        setNav(navWrapper)
    }

    const fetchHomeScreen = async (bool) => {
        //If data needs to be loaded for home screen, Here's a good place to do it
        if (isMounted) {
            //await _loadHomeScreen();
        }
    }

    const navWrapper = async (endPoint, params) => {
        //This is a middleware for navigation. Its great for logging location or controlling
        //navigation events through the entire application.
        const nav = navigation.current;
        if (endPoint) {
            nav.navigate(endPoint, params)
            if (isMounted)
                setLocation(endPoint);
            return true;
        }
        return false;
    }

    const injectScreen = (routeName, Component, key, showNavBar) => {
        //This approach allows you to inject anything into all your components quickly and easily
        const Injectable = (props) => (
            <Fragment>
                <CustomBackFunction {...props} nav={navWrapper}/>
                <Component {...props} location={location}/>
            </Fragment>
        )

        return (
            <Stack.Screen
                key={key}
                name={routeName}
                options={{
                    headerShown: false,
                    cardStyle: {backgroundColor: Colors.appBackground},
                    ...horizontalAnimation
                }}
            >
                {(props) =>
                    <Injectable {...props}/>
                }
            </Stack.Screen>
        )
    }

    const horizontalAnimation = {
        cardStyleInterpolator: ({ current, layouts }) => {
            return {
                cardStyle: {
                    transform: [
                        {
                            translateX: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layouts.screen.width, 0],
                            }),
                        },
                    ],
                },
            };
        },
    };

    const renderRoute = () => {
        if (!_user) {
            return (
                <Stack.Navigator initialRouteName="LandingPage" >
                    {
                        NO_AUTH.map((item, index) =>
                            injectScreen(item.route, item.component, index, false))
                    }
                </Stack.Navigator>
            )
        }

        if (!_user?.tutorial) {
            return (
                <Stack.Navigator initialRouteName="AccountSetup" >
                    {
                        ACCOUNT_NEEDS_TUTORIAL_PROMPT.map((item, index) =>
                            injectScreen(item.route, item.component, index, false))
                    }
                </Stack.Navigator>
            )
        }

        return (
            <NavBar location={location}>
                <Stack.Navigator initialRouteName="HomeScreen" >
                    {
                        AUTHENTICATED_ROUTES.map((item, index) =>
                            injectScreen(item.route, item.component, index, true))
                    }
                </Stack.Navigator>
            </NavBar>
        )
    }
    //Dont render the app until navigation object is set. This is a failsafe incase
    //a navigation occurs before navigation is set. Its easier then implementing a check for every
    //navigation to see if navigation is set.
    if (!_nav)
        return (
            <AppLoading/>
        )

    return (
        <NavigationContainer ref={navigation}>
            {
                renderRoute()
            }
        </NavigationContainer>
    )
}

let mapStateToProps = state => {
    return {
        _user: state._user,
        _nav: state._nav
    }
}

export default connect(mapStateToProps, {
    _silentLogin, setNav,
})(Routes)
