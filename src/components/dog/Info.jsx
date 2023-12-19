import { Avatar, Button, Center, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Information shown after a successful form input.
 */
export default function Info({ mockState = {name:"", breed:"",age:0,photo:""} }) {
    // Gets info given to the component.
    // If this is null, use mockState instead.
    // (Mainly for use in tests)
    const { state } = useLocation();

    const toast = useToast();

    // Sets the information used in the component, and what will be set in localStorage
    const info =
        state == null
            ? { name: mockState.name, breed: mockState.breed, age: mockState.age, insurance: 0 }
            : {
                  name: state['name'].value,
                  breed: state['breed'].value,
                  age: new Date().getFullYear() - new Date(state['birthday'].value).getFullYear(),
                  insurance: 0,
              };

    /**
     * Calculates the amount for insurance for the dog.
     * @returns {number} The amount for insurance for this dog.
     */
    const calculateInsurance = () => {
        // Constant variables for each value the dogs have

        // 0 to 5 years old
        const DOG_YOUNG_AGE = 5;
        const DOG_YOUNG = 100;

        // 6 to 10 years old (between young and old)
        const DOG_MID = 160;

        // Over 10 years old (no insurance)
        const DOG_OLD_AGE = 10;
        const DOG_OLD = 0;

        // Extra fees for a large dog
        const DOG_HEAVY = 50;

        // Holds the insurance cost
        let insuranceCost;

        // Gets the age of the dog stored
        const age = info.age;

        // Dog too old
        if (age > DOG_OLD_AGE) {
            // Instantly returns 0, no need to calculate anything else
            return DOG_OLD;
        } else if (age <= DOG_YOUNG_AGE) {
            insuranceCost = DOG_YOUNG;
        } else {
            insuranceCost = DOG_MID;
        }

        // Gets the weight given
        let weight = state == null ? mockState.weight : state['weight'].value;

        // Extra insurance cost if the dog is large
        if (weight === '100+ lbs') {
            insuranceCost += DOG_HEAVY;
        }

        // Returns the insurance cost (if not 0)
        return insuranceCost;
    };

    // Memoised to make sure heavy calculation isn't done unnecessarily
    info.insurance = useMemo(() => calculateInsurance(), [info.age, calculateInsurance]);

    // Handles the localStorage use when information is confirmed
    const handleClick = () => {
        localStorage.setItem('pet', JSON.stringify(info));
        toast({
            title: 'Saved information successfully',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    };

    return (
        <>
            {info == null ? (
                // In case the information is not set
                <Spinner size='xl' />
            ) : (
                <Center minH='100vh' bgColor='gray.200'>
                    <Flex direction='column' justify='center'>
                        <Flex direction='row' align='center' mb={4}>
                            <Avatar
                                name={info.name}
                                src={state == null ? mockState.photo : state['photo'].value}
                                mr={4}
                            />
                            <Text fontSize='lg'>Welcome, {info.name}</Text>
                        </Flex>
                        <Text mb={2}>Age: {info.age} years old</Text>
                        <Text mb={2}>Breed: {info.breed}</Text>
                        <Text mb={4}>
                            Insurance:{' '}
                            {info.insurance === 0 ? 'No insurance for old pets' : '$' + info.insurance + ' per year'}
                        </Text>
                        <Flex justify='center'>
                            <Button onClick={handleClick}>Confirm</Button>
                        </Flex>
                    </Flex>
                </Center>
            )}
        </>
    );
}
