import React, { useState } from 'react'; 
import { View, Text, StyleSheet } from 'react-native';

const ClienteRegularScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Cliente Regular Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ClienteRegularScreen;


