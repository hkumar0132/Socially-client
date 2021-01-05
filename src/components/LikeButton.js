import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Button, Icon, Label } from 'semantic-ui-react';
import MyPopup from '../util/MyPopup';

function LikeButton({user, post: { id, likeCount, likes }}) {

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        onError() {

        },
        variables: { postId: id }
      });
  
    const likeButton = user ? (

        <MyPopup content={liked? 'Unlike': 'Like'}>
            {liked ? (
                <Button color="teal">
                    <Icon name="heart" />
                </Button>
            ) : (
                <Button color="teal" basic>
                    <Icon name="heart" />
                </Button>
            )}
        </MyPopup>
    ): (
        <MyPopup content="Login to like">
            <Button as={Link} to="/login" color="teal" basic>
                <Icon name="heart" />
            </Button>
        </MyPopup>
    );

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
}


const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
     likePost(postId: $postId) {
        id
        likes {
            id
            username
        }
        likeCount
     }
  }
`;

export default LikeButton;
