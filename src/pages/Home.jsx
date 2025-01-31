import React, { useState, useEffect } from "react";
import PostList from "../components/PostList";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

// Import images
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";
import img9 from "../assets/img9.png";
import img10 from "../assets/img10.png";

const Home = ({ stories }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Set featured posts to the first 3 stories or all if less than 3
    if (stories) {
      setFeaturedPosts(stories.slice(0, 3));
    }
  }, [stories]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-container">
      {/* Full-screen Slideshow */}
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {[img6, img7, img8, img9, img10].map((img, index) => (
            <div className="slider-slide" key={index}>
              <img
                src={img}
                alt={`Creative content ${index + 1}`}
                className="slider-image"
              />
              <div className="overlay"></div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Text Content */}
      <div className="content-container">
        <div className="content-text">
          <h1 className="heading">A Platform for Every Story, Every Thought</h1>
          <p className="subheading">
            Whether you're a poet, a storyteller, a lyricist, or just someone with an idea, this is the space for you. Share your creativity, express your thoughts, and connect with a community of like-minded individuals who value the art of writing in all its forms.
          </p>

          {/* Search Bar 
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for stories, poetry, or songs..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>*/}

          {/* Featured Posts 
          <section className="featured-posts">
            <h2 className="featured-heading">Featured Creations</h2>
            <div className="post-grid">
              {featuredPosts.length > 0 ? (
                featuredPosts.map((post) => <PostList key={post.id} post={post} />)
              ) : (
                <p className="no-posts">There are no featured creations yet. Start sharing your thoughts today!</p>
              )}
            </div>
          </section>*/}

          {/* Call to Action */}
          <section className="cta-container">
            <h2 className="cta-heading">Join the Creative Community</h2>
            <p className="cta-text">
              This is the perfect space for writers, readers, and creators to find each other, share their work, and inspire one another. Whether you’re looking to publish your latest poem or find a new story to read, you’ve come to the right place.
            </p>
            <div className="cta-buttons">
              <button
                onClick={() => navigate("/signup")}
                className="cta-btn cta-signup"
              >
                Sign Up and Share Your Thoughts
              </button>
              <button
                onClick={() => navigate("/login")}
                className="cta-btn cta-login"
              >
                Log In to Discover More
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
