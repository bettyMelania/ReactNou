import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateProductAction,updateAmountState,updatePriceState,updateNameState } from './service';
import styles from '../core/styles';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";


class ProductEditComponent extends Component {
    constructor(props) {
        super(props);
        this.updateProduct = this.updateProduct.bind(this);
    }
    async componentWillMount() {

    }
    render() {
        const { product,dispatch,name,price,amount,product } = this.props;
        //dispatch(updateNameState(product.name));
        //dispatch(updatePriceState(product.price));
        //dispatch(updateAmountState(product.amount));
        return(
            <View style={styles.updateBox}>
                <Card>
                <FormLabel>Name</FormLabel><FormInput value={name} onChangeText={(text) => dispatch(updateNameState(text))} />
                <FormLabel>Price</FormLabel><FormInput value={price} onChangeText={(text) => dispatch(updatePriceState(text))} />
                <FormLabel>Amount</FormLabel><FormInput value={amount} onChangeText={(text) => dispatch(updateAmountState(text))} />

                <Button
                        onPress={() => this.updateProduct()}
                        backgroundColor="#0B0B3B"
                        title="Update"
                />
                </Card>
            </View>
        );
    }

    updateProduct(){
        const { token,dispatch, name, price, amount,product } = this.props
        Alert.alert('update', name+" "+price+" "+amount);
        product.name=name;
        product.price=price;
        product.amount=amount;
        dispatch(updateProductAction(product,token)).then(() => {
            this.props.navigation.navigate('ProductList');
        });
    }
}

const mapStateToProps = state => {
    return {
        error: state.productEdit.error,
        isLoading: state.productEdit.isLoading,
        token: state.auth.token,
        product: state.productList.product,
    };
};

export default connect(mapStateToProps)(ProductEditComponent);