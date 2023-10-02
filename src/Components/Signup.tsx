import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FormControl,
  FormHelperText,
  InputRightElement,
  InputLeftAddon,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import careerflowLogo from '../assets/careerflow.svg';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('email', name, email, password);

    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      // Check for success
      if (response.ok) {
        const data = await response.json();
        console.log('Account signed up', data);
        navigate('/', { replace: true });
      } else {
        console.error('Error signing up.', response);
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
        {/* <Avatar bg="orange.500" /> */}
        <img src={careerflowLogo} alt="logo" />
        <Heading color="orange.400">Sign up!</Heading>
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
                    <CMdEmail color="orange.300" />

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

                  >
                    <CFaUserAlt color="orange.300" />

                  </InputLeftAddon>
                  <Input
                    type="text"
                    placeholder="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftAddon
                    pointerEvents="none"
                    color="gray.300"

                  >
                    <CFaLock color="orange.300" />

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
              colorScheme="orange"
              width="full"
            >
              Sign up with us!
            </Button>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?
        {' '}
        <Link color="orange.500" href="/login">
          Sign in
        </Link>
      </Box>
    </Flex>
  );
}

export default Signup;
