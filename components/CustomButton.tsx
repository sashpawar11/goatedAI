import { View, Text, TouchableOpacity, GestureResponderEvent, StyleProp, ViewStyle, TextStyle, } from 
'react-native'
import React from 'react'
import { Link } from 'expo-router'

interface CustomButtonProps {
    title : string,
    handlePress :  (event: GestureResponderEvent) => void,
    containerStyles? : string,
    textStyles? : string,
    isLoading? : boolean
}

const CustomButton : React.FC<CustomButtonProps> = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress} 
    activeOpacity={0.9}
    className={` items-center bg-secondary rounded-xl ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}>
        <View>
            <Text className={`text-black-100 font-psemibold  text-lg ${textStyles}`}>{title}</Text>
        </View>
    </TouchableOpacity>
  
  )
}

export default CustomButton