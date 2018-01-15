import React, { Component } from 'react';
import { connect } from 'react-redux'
import {  getAllAction } from './service';
import {ScrollView,ListView, Text, View, StatusBar, ActivityIndicator, Alert,NetInfo} from 'react-native';
import styles from '../core/styles';
import ProductView from "./ProductView";
import {Spinner} from 'native-base';


class ProductListComponent extends Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    async componentWillMount() {
        const { dispatch, token,dataset } = this.props;
        dispatch(getAllAction(token)).then(() => {
            if (this.props.error === null && this.props.isLoading === false) {
                this.props.dataset.reset(0);
            }
        });
    }


    renderItem() {
        if (this.props.dataset) {
            return this.props.dataset.map(record => {
                return <ProductView record={record} key={record.id} {...this.props} />;
            });
        }
        return null;
    }

    render() {
        const { isLoading,dataset,token } = this.props;
        return (
            <View style={styles.content}>
                <Text  style={styles.title}> PRODUCTS </Text>
                <ActivityIndicator animating={isLoading} style={styles.activityIndicator} size="large"/>

                <ScrollView style={styles.contentContainer}>
                    {this.renderItem()}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.productList.error,
        isLoading: state.productList.isLoading,
        token: state.auth.token,
        dataset: state.productList.dataset,
    };
};

export default connect(mapStateToProps)(ProductListComponent);