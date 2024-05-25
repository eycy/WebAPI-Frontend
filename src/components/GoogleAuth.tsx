import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Button } from 'antd';
import { dogAPI } from "../commons/http-commons";

interface GoogleAuthProps {
  setCredentials: (credentials: any) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
  setIsStaff: (isStaff: boolean) => void;
  setUser: (user: any) => void;
  setIsShow: (isShow: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const GoogleAuth = ({ setCredentials, setIsLoggedIn, isLoggedIn, setIsStaff, setUser, setIsShow, setIsLoading }: GoogleAuthProps) => {
  const [accessToken, setAccessToken] = useState('');

  const handleLogin = () => {
    try {
      setIsShow(false);
      setIsLoading(true);
      login();
    } finally {
      setIsLoading(false);
    }
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setAccessToken(null);
      setAccessToken(codeResponse.access_token);
    },
    onError: (error) => {
      console.log('Login failed:', error);
    }
  });

  useEffect(() => {
    if (accessToken) {
      // Fetch the user's email using the access token
      axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((res) => {
          setCredentials(`Bearer ${accessToken}`);
          const responseData = res.data;
          axios
            .post(`${dogAPI.url}/api/v1/login/auth/googleLogin`, {
              accessToken,
              responseData
            })
            .then((response) => {
              setIsStaff(false);
              setIsLoggedIn(true);
              setUser(response.data);
            })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  return (
    <>
      <Button onClick={handleLogin}>
        Sign in with Google
      </Button>
    </>
  );
};

export default GoogleAuth;