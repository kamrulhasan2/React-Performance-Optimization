import React, { useState } from 'react';

const idGenerator = ()=>{
    return Math.floor(Math.random() * 10000);
}

const ProfileDetails = ({ userId, comments, setComments }) => {
    const [commentText, setCommentText] = useState('');

    const handleClick = (e)=>{
        
        e.preventDefault();
        if(commentText.trim() === '') return;
        const newItem = { commentId: idGenerator(), userId, text: commentText };
        setComments(currentItems => [...currentItems, newItem]);
        setCommentText('');
    }

    return (
        <div>
            <h2>User Profile: {userId}</h2>
            <input 
                value={commentText} 
                onChange={(e) => setCommentText(e.target.value)} 
                placeholder={`Write comment for user ${userId}`} 
            />
            <button onClick={handleClick}>comment</button>

            {
                comments
                .filter(comment => comment.userId === userId)
                .map(filteredComment => (
                    <p key={filteredComment.commentId}>{filteredComment.text}</p>
                )) 
            }
        </div>
    );
};

const ProfileSwitcher = () => {
    const [comments,setComments] = useState([{commentId: null, userId: null, text: ''}]);
    const [currentUserId, setCurrentUserId] = useState(101);

    return (
        <div>
            <button onClick={() => setCurrentUserId(101)}>Load User 101</button>
            <button onClick={() => setCurrentUserId(202)}>Load User 202</button>
    
            <ProfileDetails key={currentUserId} userId={currentUserId} comments={comments} setComments={setComments} />
        </div>
    );
};

export default ProfileSwitcher;