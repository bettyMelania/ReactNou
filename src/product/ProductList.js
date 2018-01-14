import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAction, getAllAction, datasetstateSet, setDataset, changeDeleted } from './service';
import {ListView, Text, View, StatusBar, ActivityIndicator, Alert} from 'react-native';
import styles from '../core/styles';
import ProductView from "./ProductView";

class ProductListComponent extends Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
    }

    async componentWillMount() {
        this.props.dataset.reset(0);
    }
    renderItem() {
        if (this.props.dataset) {
            return this.props.datasetState.map(record => {
                return <ProductView record={record} key={record.content.id} {...this.props} />;
            });
        }
        return null;
    }
    render() {
        const { isLoading,dataset,token } = this.props;
        getAllAction(token);
        return (
            <View style={styles.content}>
                {isLoading && <ActivityIndicator animating={isLoading} style={styles.activityIndicator} size="large"/>}
                {<ListView
                    dataSource={dataset}
                    enableEmptySections={true}
                    renderRow={product => (<ProductView record={product} key={product.content.id} {...this.props}
                                                        onPress={(product) => this.onProductPress(product)}/>)}/>
                }
            </View>
        );
    }

    onProductPress(product) {
        this.props.navigation.navigate('ProductEdit');

    }
}

const mapStateToProps = state => {
    Alert.alert('ERROR', 'getStarted+ token'+state.auth.token);
    return {
        error: state.productList.error,
        isLoading: state.productList.isLoading,
        token: state.auth.token,
        dataset: state.productList.dataset,
        datasetState: state.productList.datasetState,
    };
};

export default connect(mapStateToProps)(ProductListComponent);