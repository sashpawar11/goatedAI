import {useEffect, useState} from 'react'
import {  Alert } from 'react-native'

const useAppWrite = (fn : any) => {

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<Document[] | undefined>([])

    const fetchData = async () => {
      
      setIsLoading(true)

      try {

        const _response = await fn()

        setData(_response)

      } catch (error) {
            if(error instanceof Error){
              Alert.alert('Error', error.message)
            }
      } finally{
        setIsLoading(false)
      }
      
    }
  // Call to load posts data on screenload using useEffect
  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => fetchData()
  
  return { data, isLoading, refetch}
}

export default useAppWrite