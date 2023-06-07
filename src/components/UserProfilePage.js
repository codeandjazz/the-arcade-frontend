import React from 'react';
import { Container, Row, Col, Card, Text, Grid } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';
import Header from './Header';
import { InnerWrapper, OuterWrapper } from './GlobalStyles';

const UserProfilePage = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  return (
    <>
      <Header />
      <OuterWrapper>
        <InnerWrapper>
          {accessToken && (
            <>
              <Grid.Container gap={1} justify="center">
                <Grid xs={9} sm={0}>
                  <Card>
                    <Card.Body>
                      <Text>
                                          Welcome to your profile page
                      </Text>
                    </Card.Body>
                  </Card>
                </Grid>
              </Grid.Container>
              <Grid.Container gap={1} justify="center">
                <Grid xs={3}>
                  <Card>
                    <Card.Body>
                      <UserProfile />
                      <Text>
                                              Joined in 2023
                      </Text>
                      <Text>
                                              user description
                      </Text>
                      <Text>
                                              Created at
                      </Text>
                    </Card.Body>
                  </Card>
                </Grid>
                <Grid xs={6}>
                  <Card>
                    <Card.Body>
                      <Text>Favorite games</Text>
                    </Card.Body>
                  </Card>
                </Grid>
              </Grid.Container>
            </>
          )}
          {!accessToken && (
            <Container>
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <Text>
                                        You need to be logged in to view this page
                      </Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}
        </InnerWrapper>
      </OuterWrapper>
    </>
  )
}

export default UserProfilePage;