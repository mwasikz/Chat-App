import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth,db } from "../firebase";
import { useRouter } from "next/router";
import { Avatar, IconButton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CampaignIcon from '@mui/icons-material/Campaign';
import firebase from 'firebase/compat/app';
import { useState, useRef } from "react";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import InputEmoji from "react-input-emoji";


function ChatScreen({ chat, messages }) {
    const [text, setText] = useState("");
    const endOfMessagesRef = useRef(null);
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection("messages").orderBy("timestamp", "asc"));

    const [recipientSnapshot] = useCollection(
     db.collection('users').where('email', '==', getRecipientEmail(chat.users, user))   
    );

    const showMessage = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(messages => (
                <Message 
                    key={messages.id}
                    user={messages.data().user}
                    message = {{
                        ...messages.data(),
                        timestamp: messages.data().timestamp?.toDate().getTime(),

                    }}
                
                />
            ));
        }
        else {
            return JSON.parse(messages).map(message => (
                <Message key={messages.id} user={message.user} message={message} />
            ))
        };
    };

    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: 'smooth',
            block: "start",
        });
    }

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true }
        );

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user:user.email,
            photoURL: user.photoURL,

        });

        setInput('');
        scrollToBottom();
        

    };

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user);

    return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} />
                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar>
                )}



                <HeaderInformation>
                <h3>{recipientEmail}</h3>
                {recipientSnapshot ? (
                    <p>Last Active: {' '}
                    {recipient?.lastSeen?.toDate() ? (
                        <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                    ): "Unavailable"}
                </p>
                ):(
                    <p>Loading Last Active...</p>
                ) }
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>


                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessage()}
                <EndOfMessage ref={endOfMessagesRef} />
            </MessageContainer>
            
            <InputContainer>
            
            <IconButton>
                <CampaignIcon />
            </IconButton>

           
            <Input value={input} onChange={e => setInput(e.target.value)}  />
            <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message
            
            </button>
            
            <IconButton>
             <InsertEmoticonIcon/>
              
            </IconButton>

            </InputContainer>
            
        </Container>

    )
}

export default ChatScreen;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
`;

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    background-color: whitesmoke;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
`;

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`;

const EndOfMessage = styled.div`
    margin-bottom: 70px;
`;

const HeaderIcons = styled.div`

`;

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;

    > h3 {
        margin-bottom: 3px ;
    }

    > p {
        font-size: 14px;
        color: gray;
    }
`;

const Header = styled.div`
    position: sticky ;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const Container = styled.div`

`;

