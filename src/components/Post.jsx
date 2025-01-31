import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStoryContext } from "../context/StoryContext";
import './Post.css'
const Post = () => {
  const { postId } = useParams(); // Get postId from URL
  const { addComment } = useStoryContext(); // Function to add comments
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState(""); // State to hold the new comment
  const [comments, setComments] = useState([]); // State for the comments list

  useEffect(() => {
    console.log("Fetching post with ID:", postId); // Log postId to check if it's correct
    const fetchData = () => {
      setLoading(true);
      const fetchedPost = {
        id: postId,
        title: ` ${postId}`,
        content: `This is a detailed content of the story ${postId}. Content by Thoughtful people...`,
        image: `https://via.placeholder.com/800x400?text=Story+${postId}`,
        comments: ["Amazing story!", "Loved it!"], // Mock initial comments
      };
      setPost(fetchedPost);
      setComments(fetchedPost.comments || []);
      setLoading(false);
    };

    fetchData();
  }, [postId]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments((prev) => [...prev, newComment]); // Add the new comment locally
      addComment(postId, newComment); // Update context/state
      setNewComment(""); // Clear input
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!post) {
    return <div className="error">Post not found</div>;
  }

  return (
    <div className="post-detail-container">
      <h2>{post.title}</h2>
      <img src={post.image} alt={post.title} />
      <p>{post.content}</p>

      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
};

export default Post;
