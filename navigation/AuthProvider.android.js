import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import firestore from '@react-native-firebase/firestore'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profileImgChanged, setProfileImgChanged] = useState(false)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        profileImgChanged,
        setProfileImgChanged,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password)
          } catch (e) {
            console.log(e)
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn()

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken)

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential)
          } catch (error) {
            console.log(error)
          }
        },
        fblogin: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken()

            if (!data) {
              throw 'Something went wrong obtaining access token'
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)

            // Sign-in the user with the credential
            return auth().signInWithCredential(facebookCredential)
          } catch (error) {
            
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password)
            .then(() => {

              firestore().collection('users').doc(auth().currentUser.uid)
              .set({
                fname: '',
                lname: '',
                email: email,
                createdAt: firestore.Timestamp.fromDate( new Date()),
                userImg: null
              })
              .catch(error => {
                console.log('Something went wrong with sign up: ', error)
              })
            })
          } catch (e) {
            console.log(e)
          }
        },
        logout: async () => {
          try {
            await auth().signOut()
          } catch (e) {
            console.log(e)
          }
        }
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}