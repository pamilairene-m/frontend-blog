import React, { useState, useEffect } from "react";
import PostList from "../components/PostList";
import "./HomePage.css";

// Function to fetch poems from PoetryDB API
const fetchPoems = async (numOfPoems) => {
  const url = `https://poetrydb.org/random/${numOfPoems}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.map((poem, index) => ({
      id: `poem-${index + 1}`,
      title: poem.title || `Poem #${index + 1}`,
      body: poem.lines.join("\n"),
      image: `https://picsum.photos/seed/poem${index}/300/200`, // Random image
    }));
  } catch (error) {
    console.error("Error fetching poems:", error);
    return []; // Return an empty array instead of an error message
  }
};

// Function to fetch fictional stories
const fetchFictionalStories = async (numOfStories) => {
  try {
    return Array.from({ length: numOfStories }, (_, index) => ({
      id: `story-${index + 1}`,
      title: `Fictional Story #${index + 1}`,
      body: `Once upon a time, in a distant land, a great adventure unfolded...`,
      image: `https://picsum.photos/seed/story${index}/300/200`,
    }));
  } catch (error) {
    console.error("Error fetching fictional stories:", error);
    return []; // Return an empty array instead of an error message
  }
};

const HomePage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        setLoading(true);
        const poems = await fetchPoems(125);
        const storiesFromAPI = await fetchFictionalStories(125);
        setStories([...poems, ...storiesFromAPI]);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page-container">
      <h1>A Place for Every Thought</h1>
      <p className="home-description">
        From fleeting ideas to deep reflections, this is where your words find meaning, 
        your voice finds a stage, and your thoughts find a home.
      </p>

      {stories.length === 0 ? (
        <p className="no-posts-message">
          No posts available at the moment. Please check back later.
        </p>
      ) : (
        <div className="post-list-container">
          <PostList posts={stories} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
