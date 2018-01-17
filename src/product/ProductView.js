import React, { Component } from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import {connect} from "react-redux";
import styles from '../core/styles';
import {toUpdateView} from "./service";

class ProductView extends Component {
    constructor(props) {
        super(props);
        this.onProductPress = this.onProductPress.bind(this);
        //this.product = props.record;
    }

    render() {
        const { product } = this.props;
        console.log("render view"+product.name);
            return(
                <TouchableHighlight onPress={() => this.onProductPress(product)}>
                <View key={product.id} style={styles.box}>
                    <Text style={styles.name}>Price: {product.name}</Text>
                    <Text style={styles.price}>Price: {product.price}</Text>
                    <Text style={styles.amount}>Amount: {product.amount}</Text>
                </View>
                </TouchableHighlight>
            );
    }
    onProductPress(product) {
        const { dispatch } = this.props;
        dispatch(toUpdateView(product));
        this.props.navigation.navigate('ProductEdit');
    }
}

const mapStateToProps = state => {
    return {
        product: state.productList.product,
    };
};

export default connect(mapStateToProps)(ProductView);

