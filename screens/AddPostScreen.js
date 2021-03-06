import React, {useState, useContext} from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker'

import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';

import { AuthContext } from '../navigation/AuthProvider'

const AddPostScreen = ({ navigation }) => {
  console.log('navigation', navigation)

  const { user, logout } = useContext(AuthContext)

  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [transferred, setTransferred] = useState(0)
  const [post, setPost] = useState(null)

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log('takePhotoFromCamera', image)
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
      setImage(imageUri)
    })
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log('chosePhotoFromLibrary', image)
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
      setImage(imageUri)
    })
  }

  const submitPost = async () => {
    const imageUri = await uploadImage()
    console.log('Image Url', imageUri)
    console.log('Post: ', post)

    firestore()
    .collection('posts')
    .add({
      userId: user.uid,
      post: post,
      postImg: imageUri,
      postTime: firestore.Timestamp.fromDate(new Date()),
      likes: null,
      comments: null
    })
    .then(() => {
      console.log('Post Added!')
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully'
      )
      setPost(null)

      navigation.navigate('Social App')
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error)
    })
  }

  const uploadImage = async () => {
    if (image == null) {
      return null
    }

    const uploadUri = image
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

    // Add timestamp to file name
    const extension = filename.split('.').pop()
    const name = filename.split('.').slice(0, -1).join('.')
    filename = name + Date.now() + '.' + extension

    setUploading(true)
    setTransferred(0)

    const storageRef = storage().ref(`photos/${filename}`)
    const task = storageRef.putFile(uploadUri)

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      )

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100)
      )
    })

    try {
      await task

      const url = await storageRef.getDownloadURL()

      setUploading(false)
      setImage(null)

      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      )

      return url

    } catch (error) {
      console.log(error)
      return null
    }
  }

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImage source={{uri: image}} /> : null}

        <InputField 
          placeholder="What's on your mind?"
          multiline 
          numberofLines={4}
          value={post}
          onChangeText={content => setPost(content)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size='large' color='#0000ff' />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      </InputWrapper>
      
      <ActionButton buttonColor='#2e64e5'>
        <ActionButton.Item
          buttonColor='#9b59b6'
          title='Take Photo'
          onPress={takePhotoFromCamera}>
          <Icon name='camera-outline' style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor='#3498db'
          title='Choose Photo'
          onPress={choosePhotoFromLibrary}>
          <Icon name='md-images-outline' style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  )
}

export default AddPostScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})