import React from 'react';
import { 
    View, 
    Text, 
    Image,
    TextInput,
    Dimensions
} from 'react-native';
import {
    UserIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon
} from 'react-native-heroicons/outline';

const Header = () => {
    return (
        <View className='px-4' 
            style={{ height: Dimensions.get("window").height * 0.15 }} >
            <View className='flex-row pb-3 items-center nx-4 space-x-2' >
                <Image
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    className={'h-7 w-7 bg-gray-300 p-4 rounded-full'}
                />
                <View className='flex-1'>
                    <Text className='font-bold text-gray-400 text-xs'>
                        Entrega a domicilio
                    </Text>
                    <Text className='flex-row font-bold text-xl'>
                        Ubicación Actual
                        <ChevronDownIcon size={20} color='#00CCBB' />
                    </Text>
                </View>
                <UserIcon 
                    size={35} 
                    color="#00CCBB" 
                />
            </View>
        
            {/* Search*/}
            <View className='flex-row items-center space-x-2 pb-2 nx-4'>
                <View className='flex-row flex-1 space-x-2 items-center bg-gray-200 p-3 rounded'>
                    <MagnifyingGlassIcon  
                        color="gray" 
                        size={20}  
                    />
                    <TextInput 
                        placeholder='Buscar Restaurantes' 
                        keyboardType='default'
                    />
                </View>
                <AdjustmentsHorizontalIcon 
                    color="#00CCBB" 
                />
            </View>
        </View>
    )
}

export default Header