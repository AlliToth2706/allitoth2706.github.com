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
    const [honeypot, setHoneypot] = useState('');

    const borderStyle = { borderColor: 'rgb(216 180 254)', boxShadow: '0 0 0 1px rgb(216 180 254)' };
    const toast = useToast();

    /**
     * @param {Event} e
     */
    const sendEmail = (e) => {
        setIsSubmitting(true);
        if (ableToSend) {
            // Check if the honeypot was filled in
            if (honeypot) {
                console.log('true');
                // Refuse to allow to send anymore
                setAbleToSend(false);

                // Do something else(?)
                return;
            }
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
                    // Clears the form after sending the email
                    e.target.reset();
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
    };

    document.querySelector('form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        sendEmail(e);
    });

    return (
        <>
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
                <FormControl
                    className="opacity-0 !absolute top-0 left-0 h-0 w-0 -z-10"
                    onChange={(e) => setHoneypot(e.target.value)}
                >
                    <FormLabel></FormLabel>
                    <Input type="email" name="user_email_repeat" _focusVisible={borderStyle} autoComplete="off" />
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
                    className="w-full hover:bg-purple-300 rounded-lg bg-gray-100 text-black"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                    Send
                </Button>
            </form>
        </>
    );
};

export default Container;
