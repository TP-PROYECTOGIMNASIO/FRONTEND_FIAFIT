import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import styles from './styles';

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  
  const handleBack = () => {
    navigation.goBack(); // Retrocede a la pantalla anterior en la pila de navegación
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={require('../assets/background.png')}
          style={styles.backgroundImage}
        />
      </View>

      <View style={styles.rightSection}>
        <View style={styles.resetbox}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.title}>USUARIO O CONTRASEÑA INCORRECTA</Text>

          <Image
            source={require('../../public/icons8-marca-de-verificación-100.png')}
            style={styles.resetImage}
            resizeMode="contain"
          />

          <Text style={styles.subtitle}>Su contraseña ha sido restablecida con éxito</Text>

        

          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
