import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
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
} from "@chakra-ui/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Container = () => (
    <>
        <ColorModeScript initialColorMode="dark" />
        <ChakraProvider
            resetCSS={false}
            theme={extendTheme({
                initialColorMode: "dark",
                useSystemColorMode: false,
            })}
        >
            <ContactForm />
        </ChakraProvider>
    </>
);

// https://medium.com/@thomasaugot/create-a-react-contact-form-with-email-js-cad2c8606f33
const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ableToSend, setAbleToSend] = useState(true);
    const [honeypot, setHoneypot] = useState("");
    const captchaRef = useRef();
    const form = useRef();

    const borderStyle = {
        borderColor: "rgb(216 180 254)",
        boxShadow: "0 0 0 1px rgb(216 180 254)",
    };
    const toast = useToast();

    const onSubmit = () => {
        // this reaches out to the hcaptcha library and runs the
        // execute function on it. you can use other functions as well
        // documented in the api:
        // https://docs.hcaptcha.com/configuration#jsapi
        setIsSubmitting(true);
        if (ableToSend) {
            // Check if the honeypot was filled in
            if (honeypot) {
                // Refuse to allow to send anymore
                setAbleToSend(false);

                toast({
                    title: "Something went wrong.",
                    description: "Try again later.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });

                setIsSubmitting(false);
                return;
            }
            setAbleToSend(false);
            setTimeout(() => {
                setAbleToSend(true);
            }, 2e4); // Make sure can't send multiple in a row, fixes bug/prevents spam

            captchaRef.current.execute();
        }
    };

    const sendEmail = () => {
        emailjs
            .sendForm(
                import.meta.env.EMAILJS_SERVICE, //TODO: get these from emailjs
                import.meta.env.EMAILJS_TEMPLATE,
                form.current,
                {
                    publicKey: import.meta.env.EMAILJS_SETTINGS,
                },
            )
            .then(
                (result) => {
                    toast({
                        title: "Message sent successfully!",
                        description: "Alli will get back to you shortly.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                    setIsSubmitting(false);
                    // Clears the form after sending the email
                    form.current.reset();
                },
                (error) => {
                    toast({
                        title: "Something went wrong.",
                        description: "Try again later.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                    setIsSubmitting(false);
                },
            );
    };

    const onExpire = () => {
        console.log("hCaptcha Token Expired");
    };

    const onError = (err) => {
        console.log(`hCaptcha Error: ${err}`);
    };

    return (
        <>
            <form ref={form}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type="text"
                        name="user_name"
                        _focusVisible={borderStyle}
                    />
                </FormControl>
                <br />
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        name="user_email"
                        _focusVisible={borderStyle}
                    />
                </FormControl>
                <FormControl
                    className="opacity-0 !absolute top-0 left-0 h-0 w-0 -z-10"
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex="-1"
                >
                    <FormLabel></FormLabel>
                    <Input
                        type="email"
                        name="user_email_repeat"
                        autoComplete="off"
                        required={false}
                        tabIndex="-1"
                        h="0"
                        w="0"
                        outline={null}
                        border={null}
                    />
                </FormControl>
                <br />
                <FormControl isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea name="message" _focusVisible={borderStyle} />
                </FormControl>
                <br />
                <Button
                    isLoading={isSubmitting}
                    disabled={ableToSend} //TODO: invert this for release
                    onClick={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                    className="w-full hover:bg-purple-300 rounded-lg bg-gray-100 text-black"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                >
                    Send
                </Button>
                <HCaptcha
                    sitekey={import.meta.env.PUBLIC_HCAPTCHA_SITE}
                    size="invisible"
                    onVerify={sendEmail}
                    onError={onError}
                    onExpire={onExpire}
                    ref={captchaRef}
                />
            </form>
        </>
    );
};

export default Container;
