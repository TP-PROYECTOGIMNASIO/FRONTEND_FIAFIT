import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ClienteRegularScreen = () => {
  const [showPasarellaPago, setShowPasarellaPago] = useState(false); 
  const navigation = useNavigation();
  const [isSelectedBasic, setIsSelectedBasic] = useState(false);
  const [isSelectedPro, setIsSelectedPro] = useState(false);

  const handleOpenPayment = () => {
    navigation.navigate('ClienteRegular2Screen'); // Navegar a la pantalla ClienteRegular2
  };

  const handleClosePayment = () => {
    setShowPasarellaPago(false);
  }; 

  const toggleCheckboxBasic = () => {
    setIsSelectedBasic(!isSelectedBasic);
  };

  // Función para alternar la selección del checkbox pro
  const toggleCheckboxPro = () => {
    setIsSelectedPro(!isSelectedPro);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.underline} />
      <ScrollView contentContainerStyle={styles.scrollableContainer}>
        <View style={styles.form}>
          <View style={styles.firstLine}>
            <Text style={styles.label}>Selecciona tu plan de Membresía</Text>
            <TouchableOpacity style={styles.button} onPress={handleOpenPayment}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
            {showPasarellaPago && (
                <Modal
                  visible={showPasarellaPago}
                  transparent={true}
                  animationType="slide"
                  onRequestClose={handleClosePayment}
                >
                  <PasarellaPago onClose={handleClosePayment} />
                </Modal>
            )} 
          </View>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxItem}>
            <TouchableOpacity
          style={[styles.checkbox, isSelectedBasic && styles.checkboxSelected]}
          onPress={toggleCheckboxBasic}
        />
              <Text style={styles.checkboxLabel}>Membresía Básica</Text>
              <Text>Inscripción</Text>
              <Text>Precio</Text>
            </View>
            <View style={styles.checkboxItem}>
            <TouchableOpacity
          style={[styles.checkbox, isSelectedPro && styles.checkboxSelected]}
          onPress={toggleCheckboxPro}
        />
              <Text style={styles.checkboxLabel}>Membresía Pro</Text>
              <Text>Inscripción</Text>
              <Text>Precio</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '80%',
    marginTop: 50,
    marginBottom: 50,
    alignSelf: 'Center',
  },
  header: {
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  underline: {
    height: 50,
    backgroundColor: '#B71C1C',
    width: '100%',
  },
  scrollableContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  form: {
    marginVertical: 20,
  },
  firstLine: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button:{
    backgroundColor: '#B71C1C',
    marginRight:60,
    fontSize:20,
    width:120,
    height:38,
    borderRadius:5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText:{
    color: '#FFFFFF',
    fontSize:18,
    paddingTop:5,
  },
  checkboxContainer: {
    flexDirection: 'column',
    padding: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width:'80%',
    backgroundColor: '#D9D9D9',
    height:100,
    
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#B71C1C',
    marginRight: 10,
    borderRadius: 5,
  },
  checkboxSelected: {
    backgroundColor: '#B71C1C',
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  footer: {
    alignItems: 'center',
    padding: 10,
  },
}); 

export default ClienteRegularScreen;
