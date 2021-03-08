import React, {useContext, useEffect, useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Dimensions } from 'react-native'
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

import ProgressiveImage from './ProgressiveImage'
import AntDesign from 'react-native-vector-icons/AntDesign';

import {AuthContext} from '../navigation/AuthProvider'

import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'

const PostCard = ({item, onDelete , onPress}) => {
  const { user, logout } = useContext(AuthContext)
  const [userData, setUserData] = useState(null)

  const windowWidth = Dimensions.get('window').width

  let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
  date.setUTCSeconds(item.postTime);

  likeIcon = item.liked ? 'heart' : 'heart-outline'
  likeIconColor = item.liked ? '#2e64e5' : '#333'

  if (item.likes == 1) {
    likeText = '1 Like'
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes'
  } else {
    likeText = 'Like'
  }

  if (item.licomments == 1) {
    commentText = '1 Comment'
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments'
  } else {
    commentText = 'Comment'
  }

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if(documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data())
          setUserData(documentSnapshot.data())
        } 
      })
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Card key={item.id} width={windowWidth}>
      <UserInfo>
        {/* <UserImg
          source={{
            uri: userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        /> */}
        <UserImg source={{ uri: item.userImg }} />
        <UserInfoText>
          <TouchableOpacity onPress={onPress}>
            <UserName>
              {userData ? userData.fname || 'Test' : 'Test'}{' '}
              {userData ? userData.lname || 'User' : 'User'}
            </UserName>
          </TouchableOpacity>
          
          <PostTime>{moment(date).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {/* { item.postImg !== null ? <PostImg source={{ uri: item.postImg }} /> : <Divider /> } */}
      {/* {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />} */}
      {item.postImg != null ? (
         <ProgressiveImage
          defaultImageSource={require('../assets/default-img.jpg')}
          source={{uri: item.postImg}}
          style={{width: windowWidth, height: 250}}
          resizeMode="cover"
         />
      ) : (
        <Divider />
      )}

      <InteractionWrapper>
        <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            {/* <Ionicons name="md-trash-outline" size={25} /> */}
            <AntDesign name='delete' size={25} color="#111" />
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
  )
}

export default PostCard

