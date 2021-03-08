import React, { useState, useCallback, useEffect } from 'react'
import { View, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const renderSend = (props) => {
    return (
      <Send {...props} >
        <MaterialCommunityIcons 
          name='send-circle' 
          size={32} 
          color='#2e64e5'
          style={{ paddingBottom: 8 }}
        />
      </Send>
    )
  }

  const renderBubble = props => {
    return (
    <Bubble 
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#2e64e5'
        }
      }}
      textStyle={{
        right: {
          color: '#fff'
        }
      }}
    />
    )
  }

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name='angle-double-down' size={22} color='#333'/>
    )
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      textInputStyle={{borderBottomWidth: 0, marginTop: 5, color: 'black'}}
      user={{
        _id: 1,
      }}
      alwaysShowSend
      renderBubble={renderBubble}
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  )
}

export default ChatScreen
