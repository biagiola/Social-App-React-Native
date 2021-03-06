import React, {useEffect, useState} from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import Ionicons from 'react-native-vector-icons/Ionicons'

import PostCard from '../components/PostCard'

import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

import {Container} from '../styles/FeedStyles'

const Posts = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    postTime: '4 mins ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-3.jpg'),
    liked: true,
    likes: '14',
    comments: '5',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    postTime: '2 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '8',
    comments: '0',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    postTime: '1 hours ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-2.jpg'),
    liked: true,
    likes: '1',
    comments: '0',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    postTime: '1 day ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-4.jpg'),
    liked: true,
    likes: '22',
    comments: '4',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    postTime: '2 days ago',
    post:
      'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '0',
    comments: '0',
  },
];

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleted, setDeleted] = useState(false)
  const [state, setstate] = useState(initialState)

  const fetchPosts = async () => {
    try {
      const list = []

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          
          console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            //console.log(doc.data().postTime.seconds)
            const {
              userId,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg: 
              'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime.seconds,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            })
          })
        })

        setPosts(list)

        if (loading) {
          setLoading(false)
        }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    fetchPosts()
    setDeleted(false)
  }, [deleted])

  useEffect(() => {
    firestore()
    .collection('posts')
    //.doc()
    .onSnapshot( () => {
        console.log("Current data: ");
    });
    
  }, [])

  const handleDelete = postId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!') ,
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId)
        },
      ],
      {cancelable: false}
    )
  }

  const deletePost = postId => {
    console.log('Current Post Id: ', postId)

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const { postImg } = documentSnapshot.data()
          
          if (postImg != null) {
            console.log('image not null')
            const storageRef = storage().refFromURL(postImg)
            console.log('storageRef', storageRef.fullPath)
            const imageRef = storage().ref(storageRef.fullPath)

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully`)
                deleteFirestoreData(postId)
              })
              .catch((error) => {
                console.log('Error while deleting the image. ', error)
              })
          // If the post image is not available
          } else {
            console.log('image null')
            deleteFirestoreData(postId)
          }
        }
      })
  }

  const deleteFirestoreData = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!'
        )
        setDeleted(true)
      })
      .catch((e) => console.log('Error deleting post. ', e))
  }

  const ListHeader = () => {
    return null
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          <SkeletonPlaceholder highlightColor={'#eff3f6'} speed={900}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
              <View style={{width: 60, height: 60, borderRadius: 50}} />
              <View style={{marginLeft: 20}}>
                <View style={{width: 120, height: 20, borderRadius: 4}} />
                <View
                  style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
                />
              </View>
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <View style={{width: 300, height: 20, borderRadius: 4}} />
              <View
                style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
              />
              <View
                style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
              />
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder highlightColor={'#eff3f6'} speed={900}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 60, height: 60, borderRadius: 50}} />
              <View style={{marginLeft: 20}}>
                <View style={{width: 120, height: 20, borderRadius: 4}} />
                <View
                  style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
                />
              </View>
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <View style={{width: 300, height: 20, borderRadius: 4}} />
              <View
                style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
              />
              <View
                style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
              />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <Container>
          <FlatList
            keyExtractor={item => item.id}
            data={posts}
            renderItem={ ({item}) => (
              <PostCard
                item={item}
                onDelete={(postId) => handleDelete(postId)}
                onPress={() =>
                  navigation.navigate('HomeProfile', {userId: item.userId})
                }
              />
            )}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          />
        </Container>
      )}
    </SafeAreaView>
  )
}

export default HomeScreen