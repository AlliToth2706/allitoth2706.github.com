import {
    Button,
    Center,
    Flex,
    FormControl,
    FormErrorMessage,
    Input,
    useToast,
    FormLabel,
    Icon,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import RadioGroup from './CustomRadio';
import { upload } from './imgur';
import { useNavigate } from 'react-router-dom';

/**
 * Custom form element. Reduces code repetition. Also keeps style consistent
 */
const CustomFormElem = ({ state, elem, placeholder, onChange, checkValid, errorMessage }) => {
    return (
        <FormControl m={3} isInvalid={checkValid(state[elem].isValid)} maxW='45%'>
            <FormLabel>{`${elem[0].toUpperCase()}${elem.slice(1)}`}</FormLabel>
            <Input
                type='text'
                placeholder={placeholder}
                name={elem}
                value={state[elem].value}
                onChange={onChange}
                bgColor='gray.50'
                size='lg'
                py={8}
            />
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
    );
};

/**
 * Form used for getting user input.
 * Has inputs for name, breed, sex, weight, birthday, spayed/neutered, and a place to upload files.
 * Follows the style given for the medical insurance form.
 */
export default function Form() {
    // State for the form
    const [pet, setPet] = useState({
        name: { value: '', isValid: null },
        breed: { value: '', isValid: null },
        sex: { value: 'Female', isValid: true },
        weight: { value: '0-25lbs', isValid: true },
        // Set to true due to it not being required and there being no validation
        photo: { value: null, isValid: true },
        birthday: { value: '', isValid: null },
        sorn: { value: 'Spayed', isValid: true },
    });

    const navigate = useNavigate();
    const toast = useToast();

    // State for if there is anything not set as valid in the form
    const [valid, setValid] = useState(false);

    // Change handler for all of the values
    const handleChange = (e) => {
        e.preventDefault();
        // Checks to see if the value is valid.
        let isValid = true;
        switch (e.target.name) {
            case 'name':
                // Makes sure that the element is 20 characters or less
                isValid = e.target.value.length <= 20;
                break;
            case 'breed':
                // Makes sure the breed is in all capitals
                isValid = e.target.value === e.target.value.toUpperCase();
                break;
            case 'birthday':
                // Makes sure the birthday is in the format MM/DD/YYYY
                isValid = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(e.target.value);
                break;
            default:
                break;
        }
        // Will set any value's valid to false if it is empty
        if (isValid === true && e.target.name !== 'photo') isValid = !!e.target.value || e.target.value.length !== 0;
        setPet({ ...pet, [e.target.name]: { value: e.target.value, isValid: isValid } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (valid) {
            // Upload the photo
            let link = '';
            if (pet['photo'].value !== null)
                upload(pet['photo'].value).then((e) => {
                    link = e;
                });

            navigate('info', { state: { ...pet, photo: link } });
        } else {
            let tmp = { ...pet };
            for (const elem in tmp) {
                // Makes sure that all of the elements that haven't been touched now give an error on submit
                if (tmp[elem].isValid === null) tmp = { ...tmp, [elem]: { value: pet[elem].value, isValid: false } };
            }

            // Sets all of the "null" values to "false"
            setPet({ ...tmp });

            // User feedback
            toast({
                title: 'Please fill in all fields properly',
                status: 'error',
                duration: 1000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        // Checks if everything is valid
        let isValid = true;
        for (const key in pet) {
            isValid = isValid && pet[key].isValid === true;
            // No point checking further if it is already false
            if (isValid === false) break;
        }
        setValid(isValid);
    }, [pet]);

    // Check for each part of the form to see if it is valid
    const checkValid = (elem) => (elem === null ? false : !elem);

    return (
        <>
            <Center minH='100vh' bgColor='gray.200'>
                <Flex onSubmit={handleSubmit} as='form' width='60%' direction='column'>
                    <Flex direction='row' justify='space-between' align='start'>
                        <CustomFormElem
                            placeholder="Pet's name"
                            state={pet}
                            elem='name'
                            onChange={handleChange}
                            checkValid={checkValid}
                            errorMessage={
                                pet['name'].value === ''
                                    ? "Please enter your pet's name"
                                    : 'Please use less than 20 characters.'
                            }
                        />
                        <Flex
                            as={FormLabel}
                            align='center'
                            justify='center'
                            h='100%'
                            ml={3}
                            mr={12}
                            mt='2.75rem'
                            mb={3}
                            p={3}
                            cursor='pointer'
                            borderRadius='md'
                            _hover={{ bgColor: 'gray.300' }}
                        >
                            <input type='file' style={{ display: 'none' }} accept='image/*' name='photo' />
                            <Flex borderRadius='full' bgColor='gray.400' align='center' justify='center' mr={4} p={2}>
                                <Icon as={CameraAltIcon} />
                            </Flex>
                            Upload a photo
                        </Flex>
                    </Flex>
                    <Flex direction='row' justify='space-between' align='start'>
                        <CustomFormElem
                            placeholder="Pet's breed"
                            state={pet}
                            elem='breed'
                            onChange={handleChange}
                            checkValid={checkValid}
                            errorMessage={
                                pet['breed'].value === ''
                                    ? "Please enter your pet's breed"
                                    : 'Please use uppercase letters.'
                            }
                        />
                        <CustomFormElem
                            placeholder='MM/DD/YYYY'
                            state={pet}
                            elem='birthday'
                            onChange={handleChange}
                            checkValid={checkValid}
                            errorMessage={
                                pet['birthday'].value === ''
                                    ? "Please enter your pet's birthday"
                                    : 'Birthday needs to be in MM/DD/YYYY format.'
                            }
                        />
                    </Flex>
                    <Flex direction='row' justify='space-between' align='start'>
                        <Flex direction='column' m={3} w='45%'>
                            <FormLabel>Sex</FormLabel>
                            <RadioGroup
                                options={['Female', 'Male']}
                                onChange={handleChange}
                                name='sex'
                                defaultValue='Female'
                            />
                        </Flex>
                        <Flex direction='column' m={3} w='45%'>
                            <FormLabel>Spayed or Neutered</FormLabel>
                            <RadioGroup
                                options={['Spayed', 'Neutered']}
                                onChange={handleChange}
                                name='sorn'
                                defaultValue='Spayed'
                            />
                        </Flex>
                    </Flex>
                    <Flex direction='row' justify='space-between' align='start' w='100%'>
                        <Flex direction='column' m={3} w='100%'>
                            <FormLabel>Weight</FormLabel>
                            <RadioGroup
                                options={['0-25lbs', '25-50lbs', '50-100lbs', '100+ lbs']}
                                onChange={handleChange}
                                name='weight'
                                defaultValue='0-25lbs'
                            />
                        </Flex>
                    </Flex>
                    <Flex justify='end' w='100%'>
                        <Button type='submit' variant='solid' sx={{ border: '1px solid black' }} mr={3} mt={3}>
                            Submit
                        </Button>
                    </Flex>
                </Flex>
            </Center>
        </>
    );
}
