import React, { useContext, useEffect, useState, useRef } from 'react'
import { View, Text, Dimensions, Animated, TextInput, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  Card,
  UserInfo,
  UserInfoLeft,
  UserInfoRight,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  MenuItemIcon,
  MenuItemText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles'

import ProgressiveImage from './ProgressiveImage'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

import { AuthContext } from '../navigation/AuthProvider'

import firestore from '@react-native-firebase/firestore'
import Menu, { MenuItem } from 'react-native-material-menu'

const PostCard = ({item, onDelete, onPress, route}) => {
  const { user, logout } = useContext(AuthContext)
  const [userData, setUserData] = useState(null)
  const windowWidth = Dimensions.get('window').width
  const [editPostBox, setEditPostBox] = useState(false)
  const [textPostEdited, setTextPostEdited] = useState(item.post)

  /* menu stuffs */
  let menu = null
  const setMenuRef = ref => {
    menu = ref
  }
  const hideMenu = () => {
    menu.hide()
  }
  const showMenu = () => {
    menu.show()
  }

  /* post date */
  let date = new Date(0); // The 0 there is the key, which sets the date to the epoch
  if(route.name == 'Profile') {
    console.log('Profile ...')
    date.setUTCSeconds(item.postTime.seconds);
  } 
  if(route.name == 'Social App') {
    console.log('Social App ...')
    date.setUTCSeconds(item.postTime);
  } 

  /* like color */
  likeIcon = item.liked ? 'heart' : 'heart-outline'
  likeIconColor = item.liked ? '#2e64e5' : '#333'
  
  /* likes design */
  if (item.likes == 1) {
    likeText = '1 Like'
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes'
  } else {
    likeText = 'Like'
  }

  /* Comments design */
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

  /* animations's cards */
  const fadeAnim = useRef(new Animated.Value(0)).current
  useEffect(() => {
    getUser()
    
    Animated.timing(fadeAnim, {
      toValue: 10,
      duration: 1000,
      useNativeDriver: true
    }).start()

  }, [])

  /* animations's buttons */
  const fadeAnimBtn = useRef(new Animated.Value(0)).current
  useEffect(() => {
    getUser()
    
    Animated.timing(fadeAnimBtn, {
      toValue: 10,
      duration: 1000,
      useNativeDriver: true
    }).start()

  }, [editPostBox])

  const onEdit = () => {
    setEditPostBox(!editPostBox)
    hideMenu()
  }

  const editPost = async() => {
    try {
      await firestore()
      .collection('posts')
      .doc(item.id)
      .update({
        post: textPostEdited,
      })

      setEditPostBox(!editPostBox)
      console.log('Update success!', textPostEdited)

    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <Animated.View
      style={{ opacity: fadeAnim  }} // Bind opacity to animated value
    >
    <Card key={item.id} width={windowWidth} >
      {/* Post Header */}
      <UserInfo>
        {/* <UserImg
          source={{
            uri: userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        /> */}
        <UserInfoLeft>
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
        </UserInfoLeft>
        <UserInfoRight>
          {/* open menu */}
          <Menu
            ref={setMenuRef}
            button={
              <View> 
                <Text onPress={showMenu}>
                <Ionicons name="ellipsis-horizontal" size={20}/>
                </Text>  
              </View>
            }
          >
            {/* delete item */}
            <MenuItem onPress={() => onDelete(item.id)}>
              <MenuItemIcon>
                <AntDesign name='delete' size={17} color="#111" />
              </MenuItemIcon>
              <MenuItemText>
                <Text>Delete</Text>
              </MenuItemText>
            </MenuItem>
            {/* edit item */}
            <MenuItem onPress={onEdit}>
              <MenuItemIcon>
                <AntDesign name='edit' size={17} color="#111" />
              </MenuItemIcon>
              <MenuItemText>
                <Text>Edit</Text>
              </MenuItemText>
            </MenuItem>
          </Menu>
        </UserInfoRight>

      </UserInfo>

      {/* Posts data */}
      {editPostBox ? 
        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
          <TextInput 
            type="text" 
            autoFocus={true}
            value={textPostEdited}
            onChangeText={val => setTextPostEdited(val)} 
            style={{ borderBottomWidth: 0, marginLeft: 10 }} 
          />
          {/* Buttons */}
          <Animated.View style={{ opacity: fadeAnimBtn  }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              {/* Edit */}
              <View style={{ marginRight: 10 }}>
                <Button title='edit' onPress={editPost} />
              </View>
              {/* Button */}
              <View>
                <Button title='cancel' onPress={onEdit }/>
              </View>
            </View>
          </Animated.View>
        </View>
        :
        <PostText>{textPostEdited}</PostText>}
      
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

      {/* Likes, Comments */}
      <InteractionWrapper>
        <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
      </InteractionWrapper>

    </Card>
    </Animated.View>
  )
}

export default PostCard

