import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function ResetPasswordScreen(){
    const navigation = useNavigation();

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

            <Text style={styles.title}>RESTABLECER CONTRASEÑA</Text>

            <Image
                    source={require('../assets/icons8-orientación-de-bloqueo-100.png')}  // Cambia la ruta y el nombre del archivo según tu imagen
                    style={styles.resetImage}  // Agrega estilos para la imagen
                    resizeMode="contain"
                />

            <Text style={styles.subtitle}>Ingrese su usuario</Text>

            <TextInput 
             //placeholder="Usuario" 
             style={styles.input} 
             placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerificationCode')}>
              <Text style={styles.buttonText}>SIGUIENTE</Text>
            </TouchableOpacity>

           
            </View>
          </View>
    </View>

  );
};


