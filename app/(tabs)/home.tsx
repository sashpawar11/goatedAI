import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
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

const Home = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])


  // Call to load posts data on screenload using useEffect
  useEffect(() => {

    const fetchData = async () => {
      getAllPosts()
    }

    fetchData()
  }, [])
  
 
  const [refreshing, setRefreshing] = useState(false) // state to handle re-call of posts


  const onRefresh = async () => {

      setRefreshing(true)

      // re call posts / refresh

      setRefreshing(false)
  }


  return (
     
    <SafeAreaView className='bg-primary h-full'>
        <FlatList
          data={[]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text className='text-3xl text-white'>{item.id}</Text>
            
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