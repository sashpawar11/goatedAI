import { View, Text, Image } from 'react-native'
import React from 'react'
import { Href, Link, LinkProps } from 'expo-router'
import {images} from '@/constants'

interface EmptyStateProps {
    title : string,
    subtitle : string,
    subtitleHref : Href<string>
    
}

const EmptyState : React.FC<EmptyStateProps> = ({title, subtitle, subtitleHref}) => {

    const linkHref = {subtitleHref}
  return (
    <View className='justify-center items-center px-4'>
        <Image
        source = {images.empty}
        className='w-[270px] h-[215px]'
        resizeMode='contain'
        />
      <Text className='text-2xl font-pregular text-gray-400'>{title}</Text>
        <Link href={subtitleHref} className='mt-1 text-sm font-psemibold text-secondary-100'>{subtitle}</Link>
    </View>
  )
}

export default EmptyState