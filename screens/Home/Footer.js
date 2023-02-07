import { View, Text, Dimensions } from 'react-native'
import React from 'react'

const Footer = () => {
  const footerHeight = Dimensions.get("window").height * 0.05;
  return (
    <View style={{ height: footerHeight }}>
      <Text>Footer</Text>
    </View>
  )
}

export default Footer