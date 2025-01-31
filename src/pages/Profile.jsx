import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './Profile.css'

const Profile = () => {
  const [stories, setStories] = useState([]);
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  // Fetch stories from the server when the component mounts
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(`https://backend-blog-2-0fo9.onrender.com/api/stories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setStories(data);
        } else {
          alert(data.message || "Failed to fetch stories");
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
        alert("Error fetching stories");
      }
    };

    // Re-fetch stories if a new story is added
    fetchStories();
  }, [location.state?.newStoryAdded]); // Dependency on newStoryAdded state

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2 className="profile-title">Your Stories</h2>
        {stories.length === 0 ? (
          <p>No stories found. Start writing your first story!</p>
        ) : (
          <div className="profile-stories">
            {stories.map((story) => (
              <div key={story._id} className="story-item">
                <h3>{story.title}</h3>
                <p>{story.content}</p>
                {story.image && (
                  <img
                    src={`https://backend-blog-2-0fo9.onrender.com/${story.image}`} // Adjust the image path based on where the images are stored
                    alt={story.title}
                    className="story-image"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
