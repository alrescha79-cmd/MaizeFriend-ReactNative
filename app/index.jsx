import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { MaterialIcons } from '@expo/vector-icons'

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const requestImagePermission = async (permissionFunc, imagePickerFunc) => {
    const permissionResult = await permissionFunc()

    if (!permissionResult.granted) {
      alert('Permission to access is required!')
      return
    }

    const result = await imagePickerFunc()
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
  }

  const handleOpenCamera = () => {
    requestImagePermission(ImagePicker.requestCameraPermissionsAsync, ImagePicker.launchCameraAsync)
  }

  const handleOpenGallery = () => {
    requestImagePermission(ImagePicker.requestMediaLibraryPermissionsAsync, ImagePicker.launchImageLibraryAsync)
  }

  const handlePredictImage = async () => {
    if (!selectedImage) {
      alert('No image selected for prediction!');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await fetch('https://cnn-341033130364.asia-southeast2.run.app/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        const { predicted_class, predicted_percentage } = result;
        alert(`Hasil Prediksi: ${predicted_class},\nAkurasi: ${predicted_percentage}`);
      } else {
        console.error('Error response:', result);
        alert(`Error predicting image: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Error predicting image. Please try again.');
    }finally {
      setIsLoading(false);
    }

  };


  const confirmRemoveImage = () => {
    Alert.alert(
      'Hapus Gambar',
      'Apakah Anda yakin ingin menghapus gambar ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        { text: 'Hapus', onPress: () => setSelectedImage(null), style: 'destructive' },
      ],
      { cancelable: true }
    )
  }

  const renderImageOrPlaceholder = () => {
    return selectedImage ? (
      <View>
        <Image source={{ uri: selectedImage }} style={styles.image} />
        <TouchableOpacity style={styles.deleteIcon} onPress={confirmRemoveImage}>
          <MaterialIcons name="close" size={30} color="red" />
        </TouchableOpacity>
      </View>
    ) : (
      <Text>Preview Gambar</Text>
    )
  }

  return (
    <View>
      <Text style={styles.title}>Prediksi Langsung</Text>
      <View style={styles.card}>
        {renderImageOrPlaceholder()}
      </View>
      <Text style={styles.title}>Pilih Gambar</Text>
      {isLoading && (
        <Text style={{ textAlign: 'center', marginTop: 10 }}>AI Sedang Memprediksi ....</Text>
      )}
      <View style={styles.cardButton}>
        <CustomButton title="Kamera" onPress={handleOpenCamera} />
        <CustomButton title="Galeri" onPress={handleOpenGallery} />
      </View>
      <View style={styles.cardButton}>
        <CustomButton title="Prediksi Gambar" onPress={handlePredictImage} style={styles.buttonPredict} disabled={isLoading} />
      </View>
    </View>
  )
}

const CustomButton = ({ title, onPress, style, disabled }) => (
  <TouchableOpacity style={[styles.button, style, disabled && styles.buttonDisabled]} onPress={onPress} disabled={disabled}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

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
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
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
    justifyContent: 'center',
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
  buttonDisabled: {
    backgroundColor: '#a9a9a9',
  },
  buttonPredict: {
    backgroundColor: '#1CA635',
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
