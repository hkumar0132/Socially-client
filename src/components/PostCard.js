import React, { useContext } from 'react';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes, comments } }) {

    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content as={Link} to={`/posts/${id}`}>
              <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              />
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>  
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>

                {/* Like button */}

                <LikeButton user={user} post={{ id, likes, likeCount }}/>

                {/* Comment */}

                <MyPopup content="View comments">
                    <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                        <Button color='blue' basic>
                            <Icon name='comments' />
                        </Button>
                        <Label basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>

                {user && user.username===username && <DeleteButton postId={id}/>}

            </Card.Content>
        </Card>
    )
}

export default PostCard
