import styled from "styled-components";
import { Avatar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import * as EmailValidator from "email-validator";
import { auth, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar() {

    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
       const input = prompt('Enter Email ID of User');

       if (!input) return null;

       if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email ) {
           db.collection('chats').add({
              users: [user.email, input],
           });

       }

       
    };

    const chatAlreadyExists = (recipientEmail) => 
        !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((user) => user === recipientEmail)?. length > 0 );
    

   

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL}  />

                <IconsContainer>
                    <IconButton>
                        <ChatIcon onClick={createChat} />
                    </IconButton>

                    <IconButton>
                        <LogoutIcon onClick={ () => auth.signOut() } />
                    </IconButton>

                    
                    
                    

                </IconsContainer>

            </Header>

            <Search>
            <SearchIcon />
            <SearchInput placeholder="Search in chats" />
            </Search>

            <SidebarButton onClick={createChat}>

                Start A New Chat

            </SidebarButton>

        {/* List of Chats */}

        {chatsSnapshot?.docs.map(chat => (
            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
        </Container>
    )
}

export default Sidebar;

const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div`


`;