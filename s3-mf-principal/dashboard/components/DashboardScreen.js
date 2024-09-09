import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {role} = route.params;

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };
  const handleNavigateToWeb = () => {
    navigation.navigate('Microview');
  };
  return (
    <View style={styles.container}>
      
      
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.backgroundImage}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToWeb}
        >
      
          <Text style={styles.buttonText}>Ir a {role}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
