import React, { useEffect, useState } from 'react';
import { Text, Grid, Card, Loading, Container } from '@nextui-org/react';
import { API_URL } from 'utils/urls';
import UserCard from './UserCard';

const Users = () => {
  const [storedUsers, setStoredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get the users from the API
        const response = await fetch(API_URL('users'));
        const data = await response.json();
        if (data.success) {
          const users = data.response;
          console.log(users);
          // Store the users in state
          setStoredUsers(users);
        } else {
          console.log(data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <Container md>
      <Grid.Container gap={8}>
        <Grid display="flex" direction="column" align="flex-end">
          {loading && <Loading type="points" />}
          <Text h2>Users</Text>
          <UserCard storedUsers={storedUsers} />
        </Grid>
      </Grid.Container>
    </Container>)
}

export default Users;