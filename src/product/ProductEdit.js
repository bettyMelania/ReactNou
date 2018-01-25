import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateProductAction,updateAmountState,updatePriceState,updateNameState } from './service';
import styles from '../core/styles';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import {NetInfo, View,ActivityIndicator} from 'react-native';
import { setItem, getItem } from "../core/storage";



class ProductEditComponent extends Component {
    constructor(props) {
        super(props);
        this.updateProduct = this.updateProduct.bind(this);

    }
    async componentWillMount() {
        const { dispatch,product } = this.props;
        dispatch(updateNameState(product.name));
        dispatch(updatePriceState(product.price));
        dispatch(updateAmountState(product.amount));
    }


    render() {
        const { dispatch,name,price,amount,product,isLoading } = this.props;
        //var loadFinished=!isLoading;
        return(
            <View style={styles.updateBox}>
                <Card>
                <FormLabel>Name</FormLabel><FormInput value={name} onChangeText={(text) => dispatch(updateNameState(text))} />
                <FormLabel>Price</FormLabel><FormInput value={price} onChangeText={(text) => dispatch(updatePriceState(text))} />
                <FormLabel>Amount</FormLabel><FormInput value={amount} onChangeText={(text) => dispatch(updateAmountState(text))} />

                    {
                        isLoading && <ActivityIndicator animating={true} style={styles.activityIndicator} size="large"/>
                    }
                    {
                        !isLoading &&
                        < Button
                            onPress={() => this.updateProduct()}
                            backgroundColor="#0B0B3B"
                            title="Update"
                        />
                    }
                </Card>
            </View>
        );
    }

    updateProduct(){
        const { token,dispatch, name, price, amount,product,dataset } = this.props
        product.name=name;
        product.price=price;
        product.amount=amount;
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected) {
                dispatch(updateProductAction(product, token)).then(() => {
                    this.props.navigation.navigate('ProductList');
                });
            }else{
                var index = dataset.findIndex((i) => i.id == product.id);
                if (index != -1) {
                    dataset.splice(index, 1, product);
                }
                setItem("dataset",dataset);
                this.props.navigation.navigate('ProductList');
            }
        });

    }
}

const mapStateToProps = state => {
    return {
        error: state.productEdit.error,
        isLoading: state.productEdit.isLoading,
        token: state.auth.token,
        product: state.productList.product,
        name: state.productEdit.name,
        price: state.productEdit.price,
        amount: state.productEdit.amount,
        dataset: state.productList.dataset
    };
};

export default connect(mapStateToProps)(ProductEditComponent);