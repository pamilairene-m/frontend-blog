import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './NewStoryForm.css'; // Import the custom CSS file

const NewStoryForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(""); // You can use a default date or select from a date picker
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !date) {
      alert("Title, content, and date are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("https://backend-blog-2-0fo9.onrender.com/api/stories", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("Story added successfully!");
        navigate("/profile", { state: { newStoryAdded: true } });
      } else {
        alert(data.message || "Failed to add story");
      }
    } catch (error) {
      console.error("Error adding story:", error);
      alert("Error adding story");
    }
  };

  return (
    <div className="page">
    <div className="new-story-form-container">
      <h2>Create New Story</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Add Story</button>
      </form>
    </div>
    </div>
  );
};

export default NewStoryForm;
