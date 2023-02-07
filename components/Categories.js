import { FlatList, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from './../sanity';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(()=> {
    sanityClient.fetch(`
      *[_type == "category"]
    `).then(data => setCategories(data));
  },[]);

  return (
    <View
      style={{ 
        paddingHorizontal: 15, 
        paddingTop: 10, 
        paddingBottom: 10,
      }}
    >
      <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={categories}
          renderItem={
            ({ item }) => 
              <CategoryCard 
                imgUrl={urlFor(item.image).url()} 
                title={item.name} 
              />
          }
      />
    </View>
  )
}

export default Categories