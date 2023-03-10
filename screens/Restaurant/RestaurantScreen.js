import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Text,TextInput, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import DishRow from '../../components/DishRow';
import { ArrowLeftIcon, StarIcon, MapPinIcon, QuestionMarkCircleIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../../sanity';
import BasketIcon from '../../components/BasketIcon';
import { setRestaurant } from '../../features/restaurantSlice';
import { useDispatch } from 'react-redux';

function RestaurantScreen() {
    const navigation = useNavigation();
    const [ showAlergic, setShowAlergic ] = useState(false);
    const dispatch = useDispatch();
    const { params : {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
    }} = useRoute();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        }))
    }, []);

    console.log("dishes",dishes);
  return (
    <>
        <BasketIcon />
        <ScrollView>
        <View>
            <Image 
                source={{ uri: urlFor(imgUrl).url()}} 
                className="w-full h-56 bg-gray-300 p-4"
            />
            <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
                <ArrowLeftIcon size={20} color="#00CCBB" />
            </TouchableOpacity>
        </View>

        <View className="bg-white">
            <View className="px-4 pt-4">
                <Text className="text-3xl font-bold">{title}</Text>
                <View className="flex-row space-x-2 my-1">
                    <View className="flex-row items-center space-x-1">
                        <StarIcon color="green" opacity={0.5} size={22} />
                        <Text className="text-xs text-gray-500">
                            <Text className="text-green-500">{rating}</Text> . {genre}
                        </Text>
                    </View>

                    <View className="flex-row items-center space-x-1">
                        <MapPinIcon color="gray" opacity={0.4} size={22} />
                        <Text className="text-xs text-gray-500">{address}</Text>
                    </View>
                </View>
                <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>

                <TouchableOpacity onPress={() => setShowAlergic(!showAlergic)} className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
                    <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
                    <Text className="pl-2 flex-1 text-md font-bold">
                        ??Eres alergico?
                    </Text>
                    <ChevronRightIcon color="#00CCBB" />
                </TouchableOpacity>
                {
                    showAlergic && (
                        <View>
                            <TextInput 
                            style={{ 
                                borderWidth: 1, 
                                borderColor: "gray",
                                borderRadius: 5,
                                height: 60,
                            }} 
                            className="pl-2 flex-1 text-md"
                            placeholder='Ingrese alimentos que no pueda consumir.'>
                            </TextInput>
                        </View>
                    )
                }
            </View>

            <View className="pb-36">
                <Text className="px-4 pt-6 pb-4 mb-3 font-bold text-xl bg-gray-100">Menu</Text>
                {dishes?.map(dish => (
                    <DishRow 
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        description={dish.short_description}
                        price={dish.price}
                        image={dish.image}
                    />
                ))}
            </View>
        </View>
    </ScrollView>
    </>

  )
}

export default RestaurantScreen;