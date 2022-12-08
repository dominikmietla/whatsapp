import {styled} from '@stitches/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator';
import Tooltip from '@mui/material/Tooltip';
import {auth , db} from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatComponent from './ChatComponent';
import Image from 'next/image';


function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt('enter adres email for user you with to chat');
        if (!input) 
            return null;
        if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
            // we need to add the chat into db chats collection
            db.collection('chats').add({
                 users: [user.email, input]
            })
        }
    };

    const chatAlreadyExists = (recipientEmail) => {
       !!chatsSnapshot?.docs.find(
           (chat) => 
           chat.data().users.find((user) => user === recipientEmail)?.length > 0
        );
    }
    
    return (
        <Container>
            <Header>
                <Tooltip title="Log out">
                         {/* zastosować komponent Image, (problem z domeną sprawdzić next.config.js) */}
                {user.photoURL ? 
                    <AdminImage 
                    onClick={() => auth.signOut()}
                    src={user.photoURL}
                    alt="Picture of the author"/>
                    : 
                    <UseAvatar  onClick={() => auth.signOut()}/>
                }
                  
                </Tooltip>
                <IconsContainer>
                    <IconButton >
                        <ChatMaterialIcon/>
                    </IconButton>
                    <IconButton >
                        <MoreVert/>
                    </IconButton>

                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon/>
                <SearchInput placeholder='search in chats'/>
            </Search>

            <SidebarButton onClick={createChat}>new chat</SidebarButton>
            {/* list of chats */}
            {chatsSnapshot?.docs.map((chat) => (
                <ChatComponent key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    );
}

const AdminImage = styled('img', {
    width: '50px',
    height: '50px',
    borderRadius: '50%'
});

const Container = styled('div', {});

const Header = styled('div', {
    display: 'flex',
    position: 'sticky',
    top: '0,',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #282828'
});
const IconsContainer = styled('div', {})

const Search = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '33px 33px 0'
})

const SearchInput = styled('input', {
    borderRadius: '20px',
    border: 'none',
    padding: '10px',

    '&:focus-visible': {
        border: 'none',
        outline: 'none'
    }
})

const UseAvatar = styled(AccountCircleIcon, {
    margin: '10px',
    cursor: 'pointer',
    color: '#fff',
    outline: 'none',

    '&:hover': {
        opacity: '0.8'
    }
});
const ChatMaterialIcon = styled(ChatIcon, {
    margin: '10px',
    cursor: 'pointer',
    color: '#fff',

    '&:hover': {
        opacity: '0.8'
    }
});
const MoreVert = styled(MoreVertIcon, {
    margin: '10px',
    cursor: 'pointer',
    color: '#fff',

    '&:hover': {
        opacity: '0.8'
    }
});

const SidebarButton = styled('button', {

    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '20px',
    textTransform: 'uppercase',
    margin: '33px 33px'
});
export default Sidebar;

