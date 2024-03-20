import { ChakraProvider } from '@chakra-ui/react';
import { createMemoryRouter, Route, Routes, RouterProvider } from 'react-router-dom';
import Form from './Form';
import Info from './Info';

export function Dog() {
    return (
        <ChakraProvider>
            <Routes>
                <Route path="/" element={<Form />}></Route>
                <Route path="info" element={<Info />}></Route>
            </Routes>
        </ChakraProvider>
    );
}

const router = createMemoryRouter([{ path: '*', Component: Dog }], {
    initialEntries: ['/'],
});

export default function App() {
    return <RouterProvider router={router} />;
}
