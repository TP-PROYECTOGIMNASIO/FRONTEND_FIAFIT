import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import PasarellaPago from './PaymentMethods'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';




const ClienteRegular2Screen = () => {
  const [showPasarellaPago, setShowPasarellaPago] = useState(false);

  const handleOpenPayment = () => {
    setShowPasarellaPago(true);
  };

  const redirectToPage = () => {
    window.location.href = '/aa.html';  // Cambia a la ruta de tu archivo HTML
  };

  const handleClosePayment = () => {
    setShowPasarellaPago(false);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.form}>
        <Text style={styles.title}>Membresía Regular</Text>
        
        <Button id="btn_pagar" title="Siguiente" onPress={redirectToPage} />
      </View>
      <Modal
        transparent={true}
        visible={showPasarellaPago}
        animationType="slide"
        onRequestClose={handleClosePayment}
      >
        <PasarellaPago onClose={handleClosePayment} />
      </Modal>
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  logo: { fontSize: 24, fontWeight: 'bold' },
  logoImage: { width: 100, height: 100 },
  form: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold' },
});

export default ClienteRegular2Screen;
