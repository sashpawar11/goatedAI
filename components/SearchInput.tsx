import { View, Text, TextInput, TouchableOpacity , Image } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'


interface SearchInputProps {
    title : string,
    value : string,
    placeholder? : string
    handleChangeText :  (text: string) => void,
    otherStyles? : string,
    [key : string] : any
}


const SearchInput : React.FC<SearchInputProps> = ({title,value,handleChangeText,otherStyles, ...props}) => {

    const [showPassword,setShowPassword ] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View
      className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4'
      >
        <TextInput
            className='text-base mt-0.5 text-white flex-1 font-pregular'
            value={value}
            placeholder="Search for a video topic"
            placeholderTextColor='#7b7b8b'
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />

        <TouchableOpacity>
          <Image
          source={icons.search}
          resizeMode='contain'
          className='w-5 h-5'
          />
        </TouchableOpacity>
       

      </View>
    </View>
  )
}

export default SearchInput