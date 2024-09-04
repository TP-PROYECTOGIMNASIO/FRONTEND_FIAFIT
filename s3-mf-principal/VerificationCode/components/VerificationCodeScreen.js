import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function VerificationCodeScreen(){
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
      <View style={styles.verificationbox}>
      <TouchableOpacity 
                        style={styles.closeButton} 
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>


        <Text style={styles.title}>RESTABLECER CONTRASEÑA</Text>
        <Text style={[styles.instructions, { marginBottom: 30 }]}>
          Hemos enviado un código de 6 dígitos a tu correo y teléfono, introduce el código para cambiar la contraseña
        </Text>

        <View style={styles.codeContainer}>
         
          <TextInput 
            style={styles.codeInput} 
            keyboardType="number-pad" 
            maxLength={1} 
            placeholderTextColor="#000"
          />
          <TextInput 
            style={styles.codeInput} 
            keyboardType="number-pad" 
            maxLength={1} 
            placeholderTextColor="#000"
          />
          <TextInput 
            style={styles.codeInput} 
            keyboardType="number-pad" 
            maxLength={1} 
            placeholderTextColor="#000"
          />
          <TextInput 
            style={styles.codeInput} 
            keyboardType="number-pad" 
            maxLength={1} 
            placeholderTextColor="#000"
          />
          <TextInput 
            style={styles.codeInput} 
            keyboardType="number-pad" 
            maxLength={1} 
            placeholderTextColor="#000"
          />
          <TextInput 
            style={styles.codeInput} 
            keyboardType="number-pad" 
            maxLength={1} 
            placeholderTextColor="#000"
          />
        </View>
        <TouchableOpacity onPress={() => {/* Lógica para reenviar código */}}>
                        <Text style={styles.resendText}>Reenviar Código</Text>
                    </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} onPress={() => navigation.navigate('NewPasswordScreen')}>
          <Text style={styles.buttonText}>SIGUIENTE</Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
  );
};