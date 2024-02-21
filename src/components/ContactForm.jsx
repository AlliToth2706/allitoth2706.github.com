import { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
    Button,
    ChakraProvider,
    ColorModeScript,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    extendTheme,
    useToast,
} from '@chakra-ui/react';

const Container = () => (
    <>
        <ColorModeScript initialColorMode="dark" />
        <ChakraProvider resetCSS={false} theme={extendTheme({ initialColorMode: 'dark', useSystemColorMode: false })}>
            <ContactForm />
        </ChakraProvider>
    </>
);

// https://medium.com/@thomasaugot/create-a-react-contact-form-with-email-js-cad2c8606f33
const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ableToSend, setAbleToSend] = useState(true);

    const borderStyle = { borderColor: 'rgb(var(--accent))', boxShadow: '0 0 0 1px rgb(var(--accent))' };
    const toast = useToast();

    /**
     * @param {Event} e
     */
    const sendEmail = (e) => {
        setIsSubmitting(true);
        if (ableToSend) {
            setAbleToSend(false);
            setTimeout(() => {
                setAbleToSend(true);
            }, 300000); // Make sure can't send multiple in a row, fixes bug/prevents spam
            emailjs.sendForm('service_92ilc6y', 'template_z5wxocl', e.target, 'NiUNW8GeHcJ4usiAk').then(
                (result) => {
                    toast({
                        title: 'Message sent successfully!',
                        description: 'Alli will be back to you shortly.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    setIsSubmitting(false);
                },
                (error) => {
                    toast({
                        title: 'Something went wrong.',
                        description: 'Try again later.',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                    setIsSubmitting(false);
                }
            );
        }

        // Clears the form after sending the email
        e.target.reset();
    };

    document.querySelector('form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        sendEmail(e);
    });

    return (
        <form>
            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="user_name" _focusVisible={borderStyle} />
            </FormControl>
            <br />
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="user_email" _focusVisible={borderStyle} />
            </FormControl>
            <br />
            <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea name="message" _focusVisible={borderStyle} />
            </FormControl>
            <br />
            <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={ableToSend}
                style={{ width: '100%', fontFamily: 'system-ui, sans-serif' }}
                _hover={{ background: 'rgb(var(--accent-light)) !important' }}
            >
                Send
            </Button>
        </form>
    );
};

export default Container;
