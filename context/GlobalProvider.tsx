import { getCurrentUser } from '@/lib/appwrite'
import React, { createContext, useContext, useState, useEffect, ReactElement} from 'react'

interface GlobalProviderProps {
    children? : ReactElement
}

interface GlobalContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    isLoading: boolean;
}


const defaultContext : GlobalContextType  = {
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: null,
    setUser: () => {},
    isLoading: false,
}

export const GlobalContext = createContext<GlobalContextType>(defaultContext);

export const useGlobalContext = () => useContext(GlobalContext)




export const GlobalProvider : React.FC<GlobalProviderProps> = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
            getCurrentUser()
                .then((res : any) => {
                    if(res) {
                        setIsLoggedIn(true)
                        console.log('user logged-in')
                        setUser(res)
                    } else {
                        setIsLoggedIn(false)
                         setUser(null)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    setIsLoading(false)
                })
    }, [])
    return (
        <GlobalContext.Provider
        value = {{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading
        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
