import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '@/context/GlobalProvider';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../../constants'
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getAllPosts } from '@/lib/appwrite';
import  Document  from "react-native-appwrite/types/models"
import useAppWrite from '../../hooks/useAppwrite';

const Home = () => {

  // Call custom hook to fetch posts data
  const { data: posts, refetch} =   useAppWrite(getAllPosts)

 
  const [refreshing, setRefreshing] = useState(false) // state to handle re-call of posts


  const onRefresh = async () => {

      setRefreshing(true)

      // re call posts / refresh
      await refetch()

      setRefreshing(false)
  }

  console.log(posts)
  return (
     
    <SafeAreaView className='bg-primary h-full'>
        <FlatList
          data={posts}
          keyExtractor={(item) => item?.$id}
          renderItem={({ item }) => (
            <View>
              
                 <Text className='text-3xl text-white'>{item.title}</Text>
            </View>
       
            
          )}
          ListHeaderComponent={() => (
            <View className='my-6 px-4 space-y-6'>
                <View className='w-full justify-between items-start flex-col mb-6'>
                      
                              <Text className='font-pmedium text-sm text-white'>
                              Welcome Back
                              </Text>
                            <Text className='text-2xl font-psemibold text-white'>
                              Sashpawar11
                        </Text>
                    
                    
                      <View className=' mt-1.5'>
                          <Image
                            source={images.logoSmall}
                            className='w-9 h-10'
                            resizeMode='contain'
                          />
                      </View>
                      <SearchInput

                      />

                      <View className='w-full flex-1 pt-8 pb-8'>
                          <Text className='text-gray-100 text-lg font-pregular mb-3'>
                            Latest Videos
                          </Text>
                          <Trending
                            posts={[{id:1},{id:2},{id:3}]}

                          />

                      </View>
                 </View>
                
            </View>
            
          )}
          ListEmptyComponent={() => (
            <EmptyState
            title='No videos found'
            subtitle='Be the first one to upload a video'
            subtitleHref='/create'
            />
          )}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
        />
    </SafeAreaView>
  )
}

export default Home