import React, {useContext, useEffect, useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles'

//import ProgressiveImage from './ProgressiveImage'

import {AuthContext} from '../navigation/AuthProvider'

import moment from 'moment'
import {TouchableOpacity} from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'

const PostCard = () => {



  return (
    <View><Text>Hola</Text></View>
  )
}

export default PostCard
