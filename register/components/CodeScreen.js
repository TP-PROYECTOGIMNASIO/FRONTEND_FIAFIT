import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import styles from './codeScreenStyles'; 
import { useNavigation } from '@react-navigation/native';

const CodeScreen = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const navigation = useNavigation();
  
  const handleButtonClick = () => {
    navigation.navigate('TipoClienteScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image
          source={require('../assets/background.png')} 
          style={styles.image} 
        />
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.title}>REGISTRO DEL CLIENTE</Text>
        <Text style={styles.description}>
          Hemos enviado un código de 6 dígitos a tu correo y teléfono, introduce el código para validarlo
        </Text>
        <View style={styles.codeContainer}>
          {code.map((value, index) => (
            <TextInput
              key={index}
              value={value}
              onChangeText={(text) => {
                const newCode = [...code];
                newCode[index] = text;
                setCode(newCode);
              }}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>
        <Text style={styles.resendCode}>Reenviar código</Text>
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CodeScreen;
