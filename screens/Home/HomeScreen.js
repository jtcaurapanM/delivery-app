import React from 'react';
import Body from './Body';
import Footer from './Footer';
import WrapperScreen from '../../layouts/WrapperScreen';

const HomeScreen = () => (
    <WrapperScreen 
      withHeader>
      <Body />
      {/* <Footer /> */}
    </WrapperScreen>
);

export default HomeScreen;