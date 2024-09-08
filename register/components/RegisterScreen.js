import React, { useState } from 'react';  
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'; 
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './registerStyles'; 

const RegisterScreen = ({ navigation }) => {

  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [mail, setMail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [genero, setGenero] = useState('');
  const [codigo, setCodigo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [postal, setPostal] = useState('');
  const [imagen, setImagen] = useState('');
  const [contacto, setContacto] = useState('');
  const [telContacto, setTelContacto] = useState('');
  const [relacion, setRelacion] = useState('');

  const [generoOpen, setGeneroOpen] = useState(false);
  const [paisOpen, setPaisOpen] = useState(false);
  const [ciudadOpen, setCiudadOpen] = useState(false);
  const [relacionOpen, setRelacionOpen] = useState(false);
  

  const handleRegister = () => {
    navigation.navigate('CodeScreen'); // Navega a la pantalla CodeScreen
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.underlineprincipal}></View>
      <View style={styles.container}>

        <Text style={styles.title}>REGISTRO DEL CLIENTE</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputlabel}>Documento*</Text>
            <TextInput 
              value={documento}  
              onChangeText={setDocumento} 
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Nombre*</Text>
            <TextInput 
              value={nombre}  
              onChangeText={setNombre} 
              style={styles.input} 
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Apellido Paterno*</Text>
            <TextInput  
              value={apellidoPaterno}  
              onChangeText={setApellidoPaterno} 
              style={styles.input}            
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Apellido Materno*</Text>
            <TextInput  
              value={apellidoMaterno}  
              onChangeText={setApellidoMaterno} 
              style={styles.input}      
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Correo Electrónico*</Text>
            <TextInput 
              value={mail}  
              onChangeText={setMail} 
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Número de Teléfono*</Text>
            <TextInput 
              value={telefono}  
              onChangeText={setTelefono} 
              style={styles.input}
            />
          </View>
          <View style={[styles.inputWrapper, { zIndex: generoOpen ? 5000 : 1 }]}>
            <Text  style={styles.inputlabel}>Género*</Text>
            <DropDownPicker
              open={generoOpen}
              setOpen={setGeneroOpen}
              items={[
                { label: 'Seleccione género', value: '' },
                { label: 'Masculino', value: 'masculino' },
                { label: 'Femenino', value: 'femenino' },
                { label: 'Otro', value: 'otro' },
              ]}
              value={genero}
              setValue={setGenero}
              containerStyle={[styles.pickerContainer]}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              dropDownContainerStyle={{ zIndex: 5000, elevation: 5 }}  // Elevación en Android
              arrowStyle={styles.dropDownArrow}
              onChangeValue={item => setGenero(item)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Código Check-In*</Text>
            <TextInput 
              value={codigo}  
              onChangeText={setCodigo} 
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Dirección</Text>
            <TextInput 
              value={direccion}  
              onChangeText={setDireccion} 
              style={styles.input}
            />
          </View>
          <View style={[styles.inputWrapper, { zIndex: paisOpen ? 4000 : 1 }]}>
            <Text  style={styles.inputlabel}>País</Text>
            <DropDownPicker
              open={paisOpen}
              setOpen={setPaisOpen}
              items={[
                { label: 'Seleccione país', value: '' },
                { label: 'Perú', value: 'peru' },
              ]}
              value={pais}
              setValue={setPais}
              containerStyle={[styles.pickerContainer]}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              dropDownContainerStyle={{ zIndex: 4000, elevation: 5 }}
              arrowStyle={styles.dropDownArrow}
              onChangeValue={item => setPais(item)}
            />
          </View>
          <View style={[styles.inputWrapper, { zIndex: ciudadOpen ? 3000 : 1 }]}>
            <Text  style={styles.inputlabel}>Ciudad</Text>
            <DropDownPicker
              open={ciudadOpen}
              setOpen={setCiudadOpen}
              items={[
                { label: 'Seleccione ciudad', value: '' },
                { label: 'Lima', value: 'lima' },
                { label: 'Arequipa', value: 'arequipa' },
              ]}
              value={ciudad}
              setValue={setCiudad}
              containerStyle={[styles.pickerContainer]}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              dropDownContainerStyle={{ zIndex: 3000, elevation: 5 }}
              arrowStyle={styles.dropDownArrow}
              onChangeValue={item => setCiudad(item)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Código Postal</Text>
            <TextInput 
              value={postal}  
              onChangeText={setPostal} 
              style={styles.input}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Adjuntar Imagen</Text>
            <TextInput 
              value={imagen}  
              onChangeText={setImagen}  
              style={styles.input}
            />
          </View> 
        </View>
        <View style={styles.underline} />
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Contacto de Emergencia*</Text>
            <TextInput 
              value={contacto} 
              onChangeText={setContacto} 
              style={styles.input} 
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text  style={styles.inputlabel}>Número de Teléfono*</Text>
            <TextInput 
              value={telContacto} 
              onChangeText={setTelContacto} 
              style={styles.input} 
            />
          </View>
          <View style={[styles.inputWrapper, { zIndex: relacionOpen ? 2000 : 1 }]}>
            <Text  style={styles.inputlabel}>Tipo de Relación*</Text>
            <DropDownPicker
              open={relacionOpen}
              setOpen={setRelacionOpen}
              items={[
                { label: 'Seleccione tipo de relación', value: '' },
                { label: 'Familiar', value: 'familiar' },
                { label: 'Amigo', value: 'amigo' },
                { label: 'Comercial', value: 'comercial' },
              ]}
              value={relacion}
              setValue={setRelacion}
              containerStyle={[styles.pickerContainer]}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              dropDownContainerStyle={{ zIndex: 2000, elevation: 5 }}
              arrowStyle={styles.dropDownArrow}
              onChangeValue={item => setRelacion(item)}
            />
          </View>        
        </View>
        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>SIGUIENTE</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
};

export default RegisterScreen;

