import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    content: {
        marginTop: 20,
        flex: 1
    },
    title: {
        fontSize: 60,
    },
    activityIndicator: {
        height: 50
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    name: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 10,
        color:'burlywood',
    },
    amount:{
        fontSize: 10,
        color: 'darkgoldenrod',
    },
    contentContainer: {
        paddingVertical: 20
    },
    box:{
        height:90,
        borderRadius:10,
        backgroundColor:'aqua',
        margin:5,
    },
    updateBox:{
        backgroundColor:'#E6E6E6',
    }
});

export default styles;