import React, { Component } from 'react';
import {Text, Image,} from 'react-native';

export default class ProductView extends Component {
    constructor(props) {
        super(props);
        this.recordData = props.record.content;
    }

    render() {
        return (
            <Card style={{ margin: 10 }}>
                <CardItem header>
                    <Text>{this.recordData.name}</Text>
                </CardItem>
                <CardItem>
                    <Body>
                    <Text>
                        price: {this.recordData.price} {"\n"}
                        amount: {this.recordData.amount} {"\n"}
                    </Text>
                    </Body>
                </CardItem>

            </Card>
        );
    }
}