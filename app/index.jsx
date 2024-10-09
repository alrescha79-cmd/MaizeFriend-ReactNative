import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href={'/result'}>
        Go to Result
      </Link>
    </View>
  )
}

export default Home