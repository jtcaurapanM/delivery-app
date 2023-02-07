import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from './../sanity';

const FeatureRowList = ({ id, title, description }) => {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        sanityClient.fetch(
            `
                *[_type == "featured" && _id == $id] {
                    ...,
                    restaurants[]->{
                    ...,
                    dishes[]->,
                    type-> {
                        name
                    }
                  },
                }[0]
            `, 
            { id }
        ).then(data => setRestaurants(data?.restaurants));
    },[])

    console.log("restaurants",restaurants);

  return (
    <View>
        <View className="mt-4 flex-row items-center justify-between px-4">
            <Text className="font-bold text-lg">{title}</Text>
            <ArrowRightIcon color="#00CCBB" />
        </View>

        <Text className="text-xs text-gray-500 px-4">
            {description}
        </Text>

        <View
            style={{
                paddingHorizontal: 15,
            }}
        >
        {/* RestauyrantCards */}
        <FlatList 
            data={restaurants}
            showsHorizontalScrollIndicator={false}
            renderItem={
              ({ item }) => 
                <RestaurantCard 
                    key={item._id}
                    id={item._id}
                    imgUrl={item.image}
                    title={item.name}
                    rating={item.rating}
                    genre={item.type?.name}
                    address={item.addess}
                    short_description={item.short_description}
                    dishes={item.dishes}
                    long={item.long}
                    lat={item.lat}
                />
            }
            horizontal
        />
        </View>
    </View>
  )
}

export default FeatureRowList;