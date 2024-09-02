import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#b5121c',
    marginBottom: 15,
    textAlign: 'center',
  },

  title2: {
    fontSize: 24,
    color: '#4B4F57',
    marginBottom: 10,
    textAlign: 'center',
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#b71c1c',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    width: '40%', // Ajusta el ancho al 70% del contenedor padre
    maxWidth: 300, // Establece un ancho máximo fijo para el botón
  },
  buttonText: {
    color: '#F3F4F7',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',  // Alinea el texto horizontalmente en el centro
    alignSelf: 'center',  // Asegura que el texto esté centrado dentro del botón
    justifyContent: 'center',  // Asegura que el texto esté centrado verticalmente si hay espacio adicional

  },
});