// Code from https://chakra-ui.com/docs/components/radio

import { Box, useRadio, useRadioGroup, HStack } from '@chakra-ui/react';

const RadioCard = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                _checked={{
                    bg: 'gray.200',
                    color: 'black',
                    borderColor: 'gray.400',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                minW={24}
                px={4}
                py={2}
                textAlign='center'
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default function RadioGroup({ options, onChange, name, defaultValue }) {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: name,
        defaultValue: defaultValue,
        onChange: onChange,
    });

    const group = getRootProps();

    return (
        <HStack {...group} bgColor='gray.50' py={3} px={4} borderRadius='md' w='full' justify='space-between'>
            {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                    <RadioCard key={value} {...radio}>
                        {value}
                    </RadioCard>
                );
            })}
        </HStack>
    );
}
