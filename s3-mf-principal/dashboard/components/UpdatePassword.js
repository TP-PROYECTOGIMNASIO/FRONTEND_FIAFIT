import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Key, Lock, KeyRound } from 'lucide-react-native';
import styles from './UpdatePasswordStyles'; // Importa los estilos
import { useRoute } from '@react-navigation/native';

export default function UpdatePassword() {
  const route = useRoute(); // Obtener las propiedades de la ruta
  const { role } = route.params || {}; // Capturar el rol de los parámetros

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [message, setMessage] = useState({ type: '', content: '' });

  const handlePasswordChange = (name, value) => {
    setPasswords({ ...passwords, [name]: value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setMessage({ type: 'error', content: 'Las contraseñas no coinciden' });
    } else {
      setMessage({ type: 'success', content: 'Contraseña actualizada con éxito' });
      setPasswords({ current: '', new: '', confirm: '' });
    }
    setTimeout(() => setMessage({ type: '', content: '' }), 3000);
  };

  return (
    <View style={styles.container}>
      {/* Mostrar el rol fuera del contenedor de cambiar contraseña */}
      {role && (
        <Text style={styles.title}>
          Bienvenido {role}
        </Text>
      )}

      <View style={styles.formContainer}>
        {message.content && (
          <View style={[styles.message, message.type === 'success' ? styles.successMessage : styles.errorMessage]}>
            <Text>{message.content}</Text>
          </View>
        )}

        <Text style={styles.title}>
          <Key style={styles.icon} size={24} />
          Cambiar Contraseña 
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Contraseña Actual</Text>
          <View style={styles.inputContainer}>
            <KeyRound style={styles.icon} size={24} />
            <TextInput
              style={styles.input}
              secureTextEntry
              value={passwords.current}
              onChangeText={(value) => handlePasswordChange('current', value)}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nueva Contraseña</Text>
          <View style={styles.inputContainer}>
            <Lock style={styles.icon} size={24} />
            <TextInput
              style={styles.input}
              secureTextEntry
              value={passwords.new}
              onChangeText={(value) => handlePasswordChange('new', value)}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
          <View style={styles.inputContainer}>
            <Lock style={styles.icon} size={24} />
            <TextInput
              style={styles.input}
              secureTextEntry
              value={passwords.confirm}
              onChangeText={(value) => handlePasswordChange('confirm', value)}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handlePasswordSubmit}>
          <Text style={styles.button}>Cambiar Contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
