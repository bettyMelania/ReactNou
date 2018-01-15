import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableHighlight,Alert} from 'react-native';
import {connect} from "react-redux";
import styles from '../core/styles';
import {toUpdateView} from "./service";

class ProductView extends Component {
    constructor(props) {
        super(props);
        this.onProductPress = this.onProductPress.bind(this);
        this.product = props.record;
    }

    render() {
            return(
                <TouchableHighlight onPress={() => this.onProductPress(this.product)}>

                <View key={this.product.id} style={styles.box}>
                    <Text style={styles.name}>Price: {this.product.name}</Text>
                    <Text style={styles.price}>Price: {this.product.price}</Text>
                    <Text style={styles.amount}>Amount: {this.product.amount}</Text>

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
        dataset: state.productList.dataset,
    };
};

export default connect(mapStateToProps)(ProductView);

