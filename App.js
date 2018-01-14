import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider, connect } from "react-redux";
import { StackNavigator, addNavigationHelpers } from "react-navigation";
import { authReducer } from "./src/auth/reducer";
import { productReducer } from "./src/product/reducer";
import { persistStore, autoRehydrate } from 'redux-persist';
import LoginComponent from "./src/auth/Login";
import ProductListComponent from "./src/product/ProductList";



const AppNavigator = StackNavigator({
    Login: {screen: LoginComponent},
    ProductList: {screen: ProductListComponent},
});

const loginState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};


class App extends Component {
    render() {
        return (
            <AppNavigator
                screenProps={{ store: { store } }}
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const initialState = {
    auth: { isLoading: false, error: null, username: '', password: '' }
};

const rootReducer = combineReducers
(
    {
        nav: navReducer, auth: authReducer, productList: productReducer
    }
);

let store = createStore(rootReducer, initialState, applyMiddleware(thunk));

configureStore = (onComplete) => {
    const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
    persistStore(store, { storage: AsyncStorage }, onComplete);

    return store;
};

export default function Root() {
    return (
        <Provider store={store}>
            <AppWithNavigationState />
        </Provider>
    );
}


//adb logcat -s ReactNativeJS