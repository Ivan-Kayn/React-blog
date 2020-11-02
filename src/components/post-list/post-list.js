import React from 'react';
import PostListItem from '../post-list-item/post-list-item';
import './post-list.css';
import { ListGroup } from 'reactstrap';

const PostList = ({ posts, onDelete, onToggleImportant, onToggleLiked }) => {

    const elements = posts.map((item) => {
        const { id } = item;
        return (
            <li key={item.id} className="list-group-item">
                <PostListItem
                    label={item.label}
                    important={item.important}
                    like={item.like}
                    onDelete={() => onDelete(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleLiked={() => onToggleLiked(id)}
                />
            </li>
        )
    })

    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
    )
}

export default PostList;