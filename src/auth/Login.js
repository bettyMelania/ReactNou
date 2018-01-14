import React, { Component } from 'react';
import { Text, View, ActivityIndicator, TouchableHighlight } from 'react-native';
import { getLogger, issueToText } from '../core/utils';
import styles from '../core/styles';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { loginAction, updatePasswordState, updateUsernameState, loginStarted } from './service'
const log = getLogger('auth/Login');
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this)
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
        log("login");
        const { dispatch, username, password } = this.props

        const inputFormProp =
            {
                username: username,
                password: password
            }


        dispatch(loginAction(inputFormProp)).then(() => {
            if (this.props.error === null && this.props.isLoading === false) {
                if (this.props.token !== null && this.props.token !== '') {
                    log("navigate");
                    this.props.navigation.navigate('ProductList');
                }
            }
        });
    }

}
const mapStateToProps = state => {
    return {
        username: state.auth.username,
        password: state.auth.password,
        error: state.auth.error,
        isLoading: state.auth.isLoading
    };
};

export default connect(mapStateToProps)(LoginComponent);