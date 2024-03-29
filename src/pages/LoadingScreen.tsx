import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator 
                size={50}
                color='black'
            />
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
