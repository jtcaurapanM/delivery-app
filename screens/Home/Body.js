import { View, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories';
import Features from '../../components/Features';
import sanityClient from "../../sanity";

const Body = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    sanityClient.fetch(
      `
        *[_type == "featured"] {
            ...,
            restaurants[]->{
              ...,
              dishes[]->
            }
        }
      `
      ).then(data => {
        setFeaturedCategories(data);
      });
  }, []);

  console.log("setFeaturedCategories",featuredCategories)

  return (
    <View 
        className='bg-gray-100'>
      {/* <Categories  /> */}
      <Features data={featuredCategories} />
    </View>
  )
}

export default Body