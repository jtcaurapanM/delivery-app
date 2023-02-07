import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

function BasketIcon() {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);
  return (
    <View className="absolute bottom-10 w-full z-50">
        <TouchableOpacity onPress={() => navigation.navigate("Basket")} className="mx-5 bg-[#00CCBB] p-4 rounded-lg  flex-row items-center space-x-11">
            <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">{items.length}</Text>
            <Text className="flex-1 text-white font-extrabold text-lg text-center">Ver Carro</Text>
            <Text className="text-lg text-white font-extrabold">
                $ {basketTotal}
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default BasketIcon