import { SafeAreaView, Dimensions, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

const WrapperScreen = ({ children, withHeader = true }) => {
  const fullHeightDevice = Dimensions.get("window").height;
  const fullWidthDevice = Dimensions.get("window").width;
  const navigation = useNavigation();

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false,
      })
  }, [navigation])

  return (
    <SafeAreaView 
        className={`bg-white`}
        style={{ 
          height: fullHeightDevice, 
          width: fullWidthDevice,
          paddingTop: Platform.OS === 'android' ? 35: 20,
        }}
        >
        {withHeader ? <Header /> : null}
        {children}
    </SafeAreaView>
  )
}

export default WrapperScreen