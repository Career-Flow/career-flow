import React, { FormEvent, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  InputLeftAddon,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import careerflowLogo from '../assets/careerflow.svg';
import Signup from './Signup';

const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('email', email, password);

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check for success
      if (response.ok) {
        const data = await response.json();
        console.log('Account signed in', data);
        // window.location.href = '/';
      } else {
        console.error('Error signing in.', response);
      }
    } catch (error) {
      console.error('Network error', error);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Avatar bg="teal.500" /> */}
        <img src={careerflowLogo} alt="logo" />
        <Heading color="teal.400">Sign in!</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftAddon
                    pointerEvents="none"
                  >
                    <CMdEmail color="gray.300" />

                  </InputLeftAddon>
                  <Input
                    type="email"
                    placeholder="email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftAddon
                    pointerEvents="none"
                    color="gray.300"
                  >
                    <CFaLock color="gray.300" />

                  </InputLeftAddon>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  {/* <Link>forgot password?</Link> */}
                </FormHelperText>
              </FormControl>
            </Stack>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
            >
              Sign in
            </Button>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?
        {' '}
        <Link href="/signup" color="teal.500">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
}

export default Login;
