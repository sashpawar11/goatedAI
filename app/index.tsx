import React, { useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, Image } from 'react-native';
import {Link, Redirect, router, Router} from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

import  images  from '../constants/images'
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/context/GlobalProvider';

const Index = () => {

    const {isLoading, isLoggedIn} = useGlobalContext()

    if(!isLoading && isLoggedIn) return <Redirect href='/home'/>
    console.log(isLoggedIn)
return (
        <>
        <Redirect href='/home'/>
        <SafeAreaView className='bg-black h-full'>
            <ScrollView contentContainerStyle={{height: '100%'}}>
                <View className='w-full min-h-[88vh] justify-center items-center  px-4'>
                    <Image
                    source={images.logo}
                    className='w-[200px] h-[84px]'
                    resizeMode='contain'
                    />

                    <Image
                    source={images.cards}
                    className='max-w-[380px] w-full h-[300px]'
                    />
                    <View className='relative mt-5'>
                        <Text className='text-2xl text-white font-bold text-center'>A GenAI Wrapper to unleash your creativity and share it across the world with{' '}<Text className='text-goatedtheme-2'>Goated.AI</Text></Text>
                        <Image
                        source={images.path}
                        className="w-[136px] h-[16px] absolute -bottom-3 right-10"
                        resizeMode='contain'
                        />
                    </View>
                    <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>Create an account today and get ready to unleash your creativity.</Text>

                    <CustomButton
                    title={'Create an account'}
                    handlePress={() => { router.push('/sign-in')}}
                    containerStyles={'p-3 px-[100px] mt-8'}
                    />

                    <StatusBar backgroundColor='#000000' style='light'/>
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
    );
};
 
 
export default Index;