import React, { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const StoryContext = createContext();

export const useStoryContext = () => useContext(StoryContext);

export const StoryProvider = ({ children }) => {
  const loadStoriesFromStorage = () => {
    const storedStories = localStorage.getItem("stories");
    return storedStories ? JSON.parse(storedStories) : [];
  };

  const [stories, setStories] = useState(loadStoriesFromStorage);

  useEffect(() => {
    localStorage.setItem("stories", JSON.stringify(stories));
  }, [stories]);

  const addStory = (story) => {
    const newStory = {
      ...story,
      id: uuidv4(),
      likes: 0,
      comments:[], // Initialize likes
    };
    setStories((prevStories) => [...prevStories, newStory]);
  };

  const deletePost = (id) => {
    setStories((prevStories) => prevStories.filter((post) => post.id !== id));
  };
  const editStory = (updatedStory) => {
    console.log("Updated Story:", updatedStory);
    setStories((prevStories) =>
      prevStories.map((story) =>
        story.id === updatedStory.id
          ? { ...story, ...updatedStory }
          : story
      )
    );
    console.log("Stories After Update:", stories);
  };
  const addComment = (storyId, comment) => {
    setStories((prevStories) =>
      prevStories.map((story) =>
        story.id === storyId
          ? { ...story, comments: [...(story.comments || []), comment] }
          : story
      )
    );
  };
  

  const toggleLike = (id) => {
    setStories((prevStories) =>
      prevStories.map((story) =>
        story.id === id ? { ...story, likes: story.likes + 1 } : story
      )
    );
  };

  return (
    <StoryContext.Provider
      value={{ stories, addStory, deletePost, editStory, toggleLike,addComment }}
    >
      {children}
    </StoryContext.Provider>
  );
};
