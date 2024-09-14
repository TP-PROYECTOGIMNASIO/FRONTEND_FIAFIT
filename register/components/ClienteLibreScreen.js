import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
/* import PasarellaPago from './PasarellaPago';  */

const ClienteLibreScreen = () => {
  /* const [showPasarellaPago, setShowPasarellaPago] = useState(false);

  const handleOpenPayment = () => {
    setShowPasarellaPago(true);
  };

  const handleClosePayment = () => {
    setShowPasarellaPago(false);
  }; */

  return (
    <View style={styles.container}>
      
      {/* <View style={styles.form}>
        <Text style={styles.title}>Pase Libre</Text>
        <Text style={styles.subtitle}>Descripción</Text>
        <Text>Seleccionar fecha</Text>
        <TextInput style={styles.input} placeholder="Fecha" />
        <Text>Seleccionar sede</Text>
        <TextInput style={styles.input} placeholder="Sede" />
        <Button title="Siguiente" onPress={handleOpenPayment} />
      </View>
      <Modal
        transparent={true}
        visible={showPasarellaPago}
        animationType="slide"
        onRequestClose={handleClosePayment}
      >
        <PasarellaPago onClose={handleClosePayment} />
      </Modal> */}
    </View>
  );
};

/* const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  logo: { fontSize: 24, fontWeight: 'bold' },
  logoImage: { width: 100, height: 100 },
  form: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: 'grey' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginVertical: 10 },
}); */

export default ClienteLibreScreen;
