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
} from '@chakra-ui/react';

// https://medium.com/@thomasaugot/create-a-react-contact-form-with-email-js-cad2c8606f33
const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stateMessage, setStateMessage] = useState(null);
    const sendEmail = (e) => {
        e.persist();
        e.preventDefault();
        setIsSubmitting(true);
        emailjs.sendForm('service_92ilc6y', 'template_z5wxocl', e.target, 'NiUNW8GeHcJ4usiAk').then(
            (result) => {
                setStateMessage('Message sent!');
                setIsSubmitting(false);
                setTimeout(() => {
                    setStateMessage(null);
                }, 5000); // hide message after 5 seconds
            },
            (error) => {
                setStateMessage('Something went wrong, please try again later');
                setIsSubmitting(false);
                setTimeout(() => {
                    setStateMessage(null);
                }, 5000); // hide message after 5 seconds
            }
        );

        // Clears the form after sending the email
        e.target.reset();
    };
    return (
        <>
            <ColorModeScript initialColorMode="dark" />
            <ChakraProvider
                resetCSS={false}
                theme={extendTheme({ initialColorMode: 'dark', useSystemColorMode: false })}
            >
                <form onSubmit={sendEmail}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            name="user_name"
                            _focus={{ borderColor: 'rgb(var(--accent))', boxShadow: '0 0 0 1px rgb(var(--accent))' }}
                            _focusVisible={{
                                borderColor: 'rgb(var(--accent))',
                                boxShadow: '0 0 0 1px rgb(var(--accent))',
                            }}
                        />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            name="user_email"
                            _focus={{ borderColor: 'rgb(var(--accent))', boxShadow: '0 0 0 1px rgb(var(--accent))' }}
                            _focusVisible={{
                                borderColor: 'rgb(var(--accent))',
                                boxShadow: '0 0 0 1px rgb(var(--accent))',
                            }}
                        />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel>Message</FormLabel>
                        <Textarea
                            name="message"
                            _focus={{ borderColor: 'rgb(var(--accent))', boxShadow: '0 0 0 1px rgb(var(--accent))' }}
                            _focusVisible={{
                                borderColor: 'rgb(var(--accent))',
                                boxShadow: '0 0 0 1px rgb(var(--accent))',
                            }}
                        />
                    </FormControl>
                    <br />
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        style={{ width: '100%', fontFamily: 'system-ui, sans-serif' }}
                        _hover={{ background: 'rgb(var(--accent-light)) !important' }}
                    >
                        Send
                    </Button>
                    {stateMessage && <p>{stateMessage}</p>}
                </form>
            </ChakraProvider>
        </>
    );
};
export default ContactForm;
