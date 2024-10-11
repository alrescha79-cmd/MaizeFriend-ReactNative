import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  const handleOpenCamera = () => {
    alert('Camerea Opened')
  }

  const handleOpenGallery = () => {
    alert('Gallery Opened')
  }

  const handlePredictImage = () => {
    alert('Predict Image')
  }

  return (
    <View>
      <Text style={styles.title}>Prediksi Langsung</Text>
      <View style={styles.card}>
        <Image source={require('../assets/images/logo.png')} />
      </View>
      <View style={styles.cardButton}>
        <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
          <Text style={styles.buttonText}>
            Kamera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOpenGallery}>
          <Text style={styles.buttonText}>
            Galeri
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardButton}>
        <TouchableOpacity style={styles.buttonPredict} onPress={handlePredictImage}>
          <Text style={styles.buttonText}>
            Prediksi Gambar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// styles
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    width: 300,
    height: 300,
    borderRadius: 15,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    margin: 'auto',
  },
  cardButton: {
    flexDirection: 'row',
    margin: 'auto',
    gap: 12,
    marginTop: 28,
  },
  button: {
    backgroundColor: '#09291A',
    padding: 10,
    borderRadius: 100,
    height: 40,
    width: 138,
  },
  buttonPredict: {
    backgroundColor: '#1CA635',
    padding: 10,
    borderRadius: 100,
    height: 40,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
})

export default Home