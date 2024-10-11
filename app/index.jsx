import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { MaterialIcons } from '@expo/vector-icons'

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  // Fungsi untuk membuka kamera
  const handleOpenCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!')
      return
    }

    const result = await ImagePicker.launchCameraAsync()

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
  }

  // Fungsi untuk membuka galeri
  const handleOpenGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access gallery is required!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync()

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
  }

  // Fungsi untuk prediksi gambar
  const handlePredictImage = () => {
    if (selectedImage) {
      alert('Predicting image for: ' + selectedImage)
    } else {
      alert('No image selected for prediction!')
    }
  }

  // Fungsi untuk menghapus gambar yang dipilih
  const handleRemoveImage = () => {
    setSelectedImage(null)
  }

  return (
    <View>
      <Text style={styles.title}>Prediksi Langsung</Text>
      <View style={styles.card}>
        {selectedImage ? (
          <View>
            <Image source={{ uri: selectedImage }} style={{ width: 300, height: 300 }} />
            <TouchableOpacity style={styles.deleteIcon} onPress={handleRemoveImage}>
              <MaterialIcons name="close" size={30} color="red" />
            </TouchableOpacity>
          </View>
        ) : (
          <Text>Preview Gambar</Text>
        )}
      </View>
      <View style={styles.cardButton}>
        <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
          <Text style={styles.buttonText}>Kamera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleOpenGallery}>
          <Text style={styles.buttonText}>Galeri</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardButton}>
        <TouchableOpacity style={styles.buttonPredict} onPress={handlePredictImage}>
          <Text style={styles.buttonText}>Prediksi Gambar</Text>
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
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
