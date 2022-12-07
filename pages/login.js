import {styled, keyframes} from '@stitches/react';
import Head from 'next/head';
import Button from '@mui/material/Button';
import { auth, provider } from '../firebase';

const LoginContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
});

const scaleUp = keyframes({
    '0%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(1.5)' },
  });

const LoginButton = styled(Button, {
    borderColor: '#fff',
    color: '#fff',

    '&:hover': {
        borderColor: '#fff',
        animation: `${scaleUp} 300ms`,
      },
});

const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
}


const Container = styled('div', {});

function Login(){
    return(
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <LoginButton onClick={signIn} variant="outlined">Sign in with Google</LoginButton>
            </LoginContainer>

        </Container>
    )
}

export default Login