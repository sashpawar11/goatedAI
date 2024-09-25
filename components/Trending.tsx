import { View, Text, FlatList } from 'react-native'
import React , {useState} from 'react'
import * as Animatable from 'react-native-animatable'

const TrendingItem = () => {
  return (
    <Animatable.View>
    </Animatable.View>
  )
}

interface TrendingProps {

    posts : any
}


const Trending : React.FC<TrendingProps>= ({posts}) => {

  const [activeItem, setActiveItem] = useState(posts[0])

  return (
   <FlatList
        data={posts}
         keyExtractor={(item) => posts.id}
          renderItem={({ item }) => (
            <TrendingItem 
            activeItem={activeItem}
            />
          )}
          horizontal
   />
  )
}

export default Trending