import { Button, Flex, Heading, Image, Spacer, Text, useColorMode } from '@chakra-ui/react';

import light from '../Resources/light.png';
import dark from '../Resources/dark.png';

//The front page for users that are not logged in
const GuestFrontPage = ({ login, signup }) => {
    const { colorMode } = useColorMode();

    return (
        <>
            <Flex direction='row'>
                <Button variant='link' onClick={login} margin='0 0.4rem'>
                    Log in
                </Button>{' '}
                or{' '}
                <Button variant='link' onClick={signup}>
                    Sign up
                </Button>{' '}
                to get started!
            </Flex>

            <Spacer />
            <Flex justify='center' direction='row' w='100%' flex={1}>
                <Flex w='50%' direction='column' h='100%'>
                    <Heading size='md' m='2rem 0'>
                        What is Now?
                    </Heading>
                    <Text w='90%'>
                        Now is a way for you to communicate with your coworkers Now. Many people from Loop Agile are
                        already communicating using the forums, and even showing their flair and style by editing their
                        profiles.
                        <br style={{ marginBottom: '0.2rem' }} />
                        Come and join the rest of the Loop Agile staff... Now!
                    </Text>
                </Flex>
                <Image src={colorMode === 'light' ? light : dark} w='45%' />
            </Flex>
        </>
    );
};

export default GuestFrontPage;
