import { View, FlatList } from 'react-native'
import React from 'react'
import FeatureRowList from './FeatureRowList'

const Features = ({ data }) => {
  return (
    <View style={{ paddingBottom: 100 }}>
        <FlatList 
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={
              ({ item }) => 
                <FeatureRowList 
                    title={item.name} 
                    description={item.short_description}
                    id={item._id}
                    item={item}
                />
            }
        />
    </View>
  )
}

export default Features