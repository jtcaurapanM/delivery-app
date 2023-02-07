import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { selectRestaurant } from '../../features/restaurantSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasketItems, removeFromBasket, selectBasketTotal } from '../../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../../sanity';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {})

        setGroupedItemsInBasket(groupedItems);
    }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
        <View className="flex-1 bg-gray-100">
            <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                <View>
                    <Text className="text-lg font-bold text-center">Carrito</Text>
                    <Text className="text-center text-gray-400">{restaurant.title}</Text>
                </View>
                <TouchableOpacity 
                onPress={() => navigation.goBack()}
                className="rounded-full bg-gra-100 absolute top-3 right-5">
                    <XCircleIcon color="#00CCBB" height={50} width={50} />
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                <Image source={ {uri: "https://links.papareact.com/wru"}}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full" />
                <Text className="flex-1 text-gray-600">Tiempo de entrega 50-70 min</Text>
                <TouchableOpacity>
                    <Text className="text-[#00CCBB]">Cambiar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="divide-y divide-gray-200">
                {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                    <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                        <Text className="text-[#00CCBB]">{items.length} x</Text>
                        <Image 
                        source={{ uri: urlFor(items[0]?.image).url()}} 
                        className="h-12 w-12 rounded-full" />
                        <Text className="flex-1">{items[0]?.name}</Text>
                        <Text className="text-gray-600">$ {items[0]?.price}</Text>

                        <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key }))}>
                            <Text className="text-[#00CCBB] text-xs">Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <View className="p-5 bg-white mt-5 space-y-4">
                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Subtotal</Text>
                    <Text className="text-gray-400"> $ {basketTotal}</Text>
                </View>

                <View className="flex-row justify-between">
                    <Text className="text-gray-400">Envío</Text>
                    <Text className="text-gray-400"> $ 3000</Text>
                </View>

                <View className="flex-row justify-between">
                    <Text>Total</Text>
                    <Text className="font-extrabold"> $ {basketTotal + 3000}</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("PreparingOrder")} className="rounded-lg bg-[#00CCBB] p-4">
                    <Text className="text-center text-white text-lg font-bold">Realizar Pedido</Text>
                </TouchableOpacity>

            </View>
        </View>
    </SafeAreaView>
  )
}

export default BasketScreen