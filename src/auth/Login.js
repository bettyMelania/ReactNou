import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { getLogger } from '../core/utils';
import styles from '../core/styles';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { connect } from 'react-redux'
import { loginAction, updatePasswordState, updateUsernameState ,setToken} from './service';
import { setItem, getItem,removeItem } from "../core/storage";
import { Notification } from "../product/Notification";


const log = getLogger('auth/Login');
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.verifyToken = this.verifyToken.bind(this);
        this.navigate = this.navigate.bind(this);

    }
    componentWillMount(){
        this.verifyToken();
    }
   
    verifyToken(){
        const { dispatch } = this.props;
        getItem("token").then((value) => {
            if(value) {
                dispatch(setToken(value));
                this.navigate(value);
            }
        });
    }
    navigate(token){
        const {  dispatch } = this.props;
        if (this.notificationClient) {
            this.notificationClient.disconnect();
        }
        this.notificationClient = new Notification(token,dispatch);
        this.notificationClient.connect();
        this.props.navigation.navigate('ProductList');
    }

    render() {
        const { error, isLoading, username, password, dispatch } = this.props;
        return (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator animating={isLoading} style={styles.activityIndicator} size="large"/>
                <Card>
                    <FormLabel>Username</FormLabel>
                    <FormInput value={username} onChangeText={(text) => dispatch(updateUsernameState(text))} />
                    <FormLabel>Password</FormLabel>
                    <FormInput value={password} secureTextEntry={true} onChangeText={(text) => dispatch(updatePasswordState(text))} />

                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        backgroundColor="#FE2E9A"
                        title="Sign in"
                        onPress={() => this.login()}
                    />

                </Card>
                <ActivityIndicator animating={this.props.isLoading} style={styles.activityIndicator} size="large" />
            </View>
        );
    }


    login() {
        const { dispatch, username, password } = this.props
        const inputFormProp =
            {username: username, password: password}
        dispatch(loginAction(inputFormProp)).then(() => {
            if (this.props.error === null && this.props.isLoading === false) {
                    setItem("token",this.props.token);
                    this.navigate(this.props.token);
            }
        });
    }

}
const mapStateToProps = state => {
    return {
        username: state.auth.username,
        password: state.auth.password,
        error: state.auth.error,
        isLoading: state.auth.isLoading,
        token:state.auth.token
    };
};

export default connect(mapStateToProps)(LoginComponent);