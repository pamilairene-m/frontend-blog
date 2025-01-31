import React from "react";
import { Link } from "react-router-dom";
import { useStoryContext } from "../context/StoryContext";
import "./PostList.css"; // Corrected the CSS import path

const PostList = ({ posts }) => {
  const {  toggleLike } = useStoryContext();

  return (
    <div className="post-list-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post">
            <img
              src={
                post.image }
              alt={post.title}
              className="post-image"
            />
            <h3 className="post-title">{post.title}</h3>
            <p className="post-excerpt">{post.content}</p>
            <div className="post-actions">
              <button onClick={() => toggleLike(post.id)} className="like-button">
                ❤️ {post.likes} Likes
              </button>
              <Link to={`/post/${post.id}`} className="read-more">
                Read more...
              </Link>
             
            </div>
          </div>
        ))
      ) : (
        <p>No posts found for this date or search query</p>
      )}
    </div>
  );
};

export default PostList;
