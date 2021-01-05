import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Dimmer, Grid, Image, Loader, Segment, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
    
    const { user } = useContext(AuthContext);
    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={2} divided>

            {user && (
                <Grid.Row>
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                </Grid.Row>
            )}

            <Grid.Row className="page-title">
                <h1>Recent posts</h1>
            </Grid.Row>

            <Grid.Row>  
                {loading ? (
                    <Segment>
                        <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                        </Dimmer>
                        <Image 
                            width="800px"
                            src='https://react.semantic-ui.com/images/wireframe/paragraph.png' 
                        />
                    </Segment> 
                ): (
                    <Transition.Group>
                        {posts && posts.map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    )
}

export default Home;
