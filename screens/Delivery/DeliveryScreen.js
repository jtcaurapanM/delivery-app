import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurant } from '../../features/restaurantSlice';
import { useSelector } from 'react-redux'
import { XCircleIcon } from 'react-native-heroicons/outline';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50 pt-10">
        <View className="flex-row justify-between items-center p-5">
            <TouchableOpacity onPress={()=> navigation.navigate("Home")}>
                <XCircleIcon color="white" size={30} />
            </TouchableOpacity>
            <Text className="text-white">Ayuda</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
            <View className="flex-row justify-between">
                <View>
                    <Text className="text-lg text-gray-400">Tiempo Estimado</Text>
                    <Text className="text-2xl font-bold">45-55 Minutos</Text>
                </View>
                <Image 
                    className="h-20 w-20"
                    source={{ uri: "https://links.papareact.com/fls" }}
                />
            </View>

            <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />

            <Text className="mt-3 text-gray-500">
                Tu orden en {restaurant.title} esta siendo preparada
            </Text>
        </View>
      </SafeAreaView>
    
    <MapView
        initialRegion={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType='mutedStandard'
    >
        <Marker
            coordinate={{
                latitude: restaurant.lat,
                longitude: restaurant.long
            }}
            title={restaurant.title}
            description={restaurant.short_description}
            identifier="origin"
            pinColor="#00CCBB"
        />
    </MapView>

    <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28"> 
        <Image 
            source={{
                uri: "https://links.papareact.com/wru"
            }}
            className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
            <Text className="text-lg">Tomas Caurapan</Text>
            <Text className="text-gray-400">Tu Repartidor</Text>
        </View>

        <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Llamar</Text>

    </SafeAreaView>
      
    </View>
  )
}

export default DeliveryScreen