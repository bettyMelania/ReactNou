import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getAllAction, getAllSuccess} from './service';
import {ScrollView, Text, View, ActivityIndicator,NetInfo} from 'react-native';
import styles from '../core/styles';
import ProductView from "./ProductView";
import { setItem, getItem } from "../core/storage";


class ProductListComponent extends Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.handleConnectivityChange=this.handleConnectivityChange.bind(this);
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleConnectivityChange
        );
    }

    async componentWillMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.handleConnectivityChange(isConnected)
        });

    }

    handleConnectivityChange(isConnected) {
        if (isConnected) {
            console.log("connected to NET");
            const { dispatch, token,dataset } = this.props;
            dispatch(getAllAction(token)).then(() => {
                if (this.props.error === null && this.props.isLoading === false) {
                    this.props.dataset.reset(0);
                }
                setItem("dataset",this.props.dataset);
            }).catch((err)=>console.log(""))
        }
        else {
            console.log("not connected to NET");
            const { dispatch,dataset } = this.props;
            getItem("dataset").then((value)=>{
                //console.log(value);
                dispatch(getAllSuccess(value));
                this.props.dataset.reset(0);
            }).catch((err)=>console.log(""));
        }
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
        console.log("render");
        const { isLoading } = this.props;
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