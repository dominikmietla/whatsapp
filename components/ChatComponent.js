import {styled} from '@stitches/react';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Router, useRouter } from 'next/router';


function ChatComponent({id, users}){
    const router = useRouter();

    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users, user)));
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);

    const enterChat = () =>{
        router.push(`/chat/${id}`)
    }


    return(
        <ContainerChat onClick={enterChat}>
            {recipient ? (
                  <UserAvatar src={recipient?.photoUrl}/> 
            ):    <p>{recipientEmail[0]}</p>
            }
            <p>{recipientEmail}</p>
       
        </ContainerChat>
    )
}

export default ChatComponent;


const ContainerChat = styled('div', {
    paddingLeft: '33px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '10px',
    marginBottom: '10px',
    
    '&:hover': {
        opacity: '0.8'
    }
    })
    
    const UserAvatar = styled('img', {
    background: 'gray',
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    })
    

