import React, { useRef, useState } from 'react';
import { Avatar } from '@mui/material';
import {styled , keyframes} from '@stitches/react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, db} from '../firebase'; 
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message';
import firebase from "firebase/compat/app";
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';
import SendIcon from '@mui/icons-material/Send';


function ChatScreen({chat, messages}){
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [input, setInput] = useState('')
    const endOfMessagesRef = useRef(null);


    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'));
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(chat.users, user)))
 
    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message => (
                <Message 
                key={message.id}
                user={message.data().user}
                message={{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                }}
                
                />
            ))
        }else{
           return JSON.parse(messages).map(message => (
               <Message key={message.id} user={message.user} message={message}/>
           ))
        }
    }

    const inputHandle = (event) => {
        setInput(event.target.value);    
    }


    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

    const sendMessageHandle = (event) => {
        event.preventDefault();

     if(input !== ''){
      //update last seen
      db.collection('users').doc(user.uid).set({
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),

    }, {merge: true});

    db.collection('chats').doc(router.query.id).collection('messages').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL,
    })
    setInput('');
    scrollToBottom();
    }
  
    }
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user);

    return(
        <Container>
            <Header>
                {recipient ? (
                    <RecipientImage src={recipient?.photoUrl} />
                ): (
                    <Avatar src={recipientEmail[0]}/>
                )}
            

                <HeaderInformation>
                    <h3 style={{margin: "0"}}>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p style={{margin: "0"}}>active: {' '} {recipient?.lastSeen?.toDate() ? (
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                        ): 'unavalible'}
                        </p>
                    ) : (
                        <p>Loading last active ..</p>
                    )}
                </HeaderInformation>

                <HeaderIcons>
                    
                </HeaderIcons>
            </Header> 
            <MessageContainer>
                {showMessages()}
             
                <EndOfMessage ref={endOfMessagesRef} />
            </MessageContainer>

            <InputContainer>
                <Input value={input}  onChange={inputHandle} />
                <button hidden disabled={!input} type="submit" onClick={sendMessageHandle}>Send</button>
                <SendIcon hidden disabled={!input} type="submit" onClick={sendMessageHandle}>Send</SendIcon>
            </InputContainer>
         
        </Container>
    )
}
export default ChatScreen;


const RecipientImage = styled('img', {
    width: '50px',
    height: '50px',
    borderRadius: '50%'
});

const InputContainer =  styled('form', {
    position:'absolute',
    display: 'flex',
    alignItems: 'center',
    gap:'20px',
    padding: '10px',
    bottom: '0',
    width: '100%',
    display: 'flex',
})

const Input = styled('input', {
flex: '1',
alignItems: 'center',
padding: '15px',
position: 'sticky',
backgroundColor: 'whitesmoke',
border: 'none',
borderRadius: '20px',
fontSize: '18px',
lineHeight: '24px',
fontWeight: '300',
resize: 'vertical',

'&:focus-visible' : {
    outline: 'none'
}
})

const Container = styled('div', {
    height: '100vh',
    display: 'block',
    position: 'relative',
});
const Header = styled('div', {
    display: 'flex',
    position: 'sticky',
    zIndex: '2',
    top: '0',
    padding: '11px',
    display: 'flex',
    alignItems: 'center',

    background: 'rgba(255, 255, 255, 0)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    height: '91px'


})

const HeaderInformation = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '15px',
    flex: '1',
    justifyContent: 'center',
})
const HeaderIcons = styled('div', {})
const EndOfMessage = styled('div', {
    marginBottom: '100px'
})

const gradientAnimation = keyframes({
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },

  });

const MessageContainer = styled('div', {
    padding: '10px',
    position: 'absolute',
    bottom: '0',

    '&::before': {
        content: `''`,
        display: 'block',

        position: 'fixed',

        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        height: '100vh',
        animation: `${gradientAnimation} 200ms`,



        top: '-3px',
        left: '-3px',
        width: 'calc(100% + 6px)',
        height: 'calc(100% + 6px)',
        borderRadius: 'inherit',
        zIndex: -1,
        opacity: '0.02'
      },
})