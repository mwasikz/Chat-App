import styled from "styled-components";
import Head from "next/head";
import { Button } from '@mui/material';
import { auth, provider } from "../firebase";

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)

    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src="https://cdn3d.iconscout.com/3d/premium/thumb/chat-bubble-4329925-3599736.png" /> 
                <Button onClick={signIn} variant="outlined">Sign In With Google</Button>
            </LoginContainer>


        </Container>
    )
}

export default Login

const Logo = styled.img`
    height: 200px;
    width: 220px;
    margin-bottom: 50px;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 100px;
    align-items: center;
    background-color: #f5f6fa;
    border-radius: 10px ;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;


`;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;


`;