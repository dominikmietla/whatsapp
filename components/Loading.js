
import {styled} from '@stitches/react';

const LoadingContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
})

function Loading() {
    return (
    <LoadingContainer>
       loading ...
    </LoadingContainer>)
}

export default Loading;