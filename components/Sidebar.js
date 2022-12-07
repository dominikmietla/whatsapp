import {styled} from '@stitches/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator';
import Tooltip from '@mui/material/Tooltip';
import {auth , db} from '../firebase';

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
const Chat = styled(ChatIcon, {
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

const createChat = () => {
    const input = prompt('enter adres email for user you with to chat');

    if (!input) 
        return null;
    
    if (EmailValidator.validate(input)) {
        // we need to add the chat into db chats collection

    }

}

function Sidebar() {
    return (
        <Container>
            <Header>
                <Tooltip title="Log out">
                    <UseAvatar onClick={() => auth.signOut()}/>
                </Tooltip>
                <IconsContainer>
                    <IconButton >
                        <Chat/>
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
        </Container>
    )
}

export default Sidebar;
