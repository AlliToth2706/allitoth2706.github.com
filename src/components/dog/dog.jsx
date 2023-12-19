import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './Form';
import Info from './Info';

export default function Test() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/dog" element={<Form />}></Route>
                    <Route path="/dog/info" element={<Info />}></Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
}
