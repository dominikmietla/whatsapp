import {styled} from '@stitches/react';
import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, db} from '../firebase'; 

function Message({user, message}){

    const [userLoggedIn] = useAuthState(auth);
    return(
        <Container variant={user === userLoggedIn.email ? 'sender' : 'reciver'}>
            <MessageElement color={user === userLoggedIn.email ? 'sender' : 'reciver'}>
              {message.message} 
              <TimeStamp>  {message.timestamp ? moment(message.timestamp).format('LT') : '... '}</TimeStamp>
            </MessageElement>
        </Container>
    )
}

export default Message;

const Container = styled('div', {
    display: 'flex',
    position: 'relative',

    variants: {
        variant: {
          sender: {
            justifyContent: 'end',
          },
          reciver: {
            justifyContent: 'start',
          },
        },
      },

})

const MessageElement = styled('p', {
    width: 'fit-content',
    padding: '15px',
    borderRadius: '16px',
    minWidth: '100px',
    position: 'relative',
    margin: '9px',
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: '300',
    wordBreak: 'break-word',

    variants: {
        color: {
          sender: {
            backgroundColor: 'blueviolet',
          },
          reciver: {
            backgroundColor: '#646464',
          },
        },
      },
})


const TimeStamp = styled('span',{
  color: '#bfbfbf',
  padding: '10px',
  fontSize: '9px',
  position: 'absolute',
  right:'0',
  bottom: '0px'
})