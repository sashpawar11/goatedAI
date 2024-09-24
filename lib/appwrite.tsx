import {  endpoint,
    platform,
    projectID,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId } from '@/appwriteKeys';



import { Client , Account, ID, Avatars, Databases, Query, Storage  } from 'react-native-appwrite';

// Init your React Native SDK
const client = new Client();



client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectID) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.



const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)


// Register User
export const createUser = async (email : string, password  : string, username  : string) => {

    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username

        )

        if(!newAccount) throw Error;
        
        const avatarUrl = avatars.getInitials(username)

        await signIn(email,password)

        // DB Entry
        const newUser = await databases.createDocument(
            databaseId, 
            userCollectionId, 
            ID.unique(),
            {
            accountId : newAccount.$id,
            email,
            username,
            avatar : avatarUrl
            }

        )

        return newUser
        } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export const signIn = async(email : string, password : string,) => {
        try {
            
            // Establish new user session
            const session = await account.createEmailPasswordSession(email,password)

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
        }
        }
}

export const signOut = async() => {
    try {

        const _currSession = await account.deleteSession('current')

    } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
        }
    }
}



export const getCurrentUser = async() => {

    try {
        const currentAccount = await account.get()

        if(!currentAccount) throw Error

        const currentUser = await databases.getDocument(
            databaseId, 
            userCollectionId, 
            currentAccount.$id,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]

    } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
    }
}


export const getAllPosts = async () => {

    try {

         const _allPosts = await databases.listDocuments(
            databaseId, 
            videoCollectionId
         )
         return _allPosts.documents
        
    } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
    }
}