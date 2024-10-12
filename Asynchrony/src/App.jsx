import { useEffect, useState } from 'react';
import './App.css';
// Import the error image
import errorImage from './images/error-message.png'; // Assuming the image is in src/images/

function App() {
  // State to hold posts and error messages
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // To show loading state

  // Fetch posts using Fetch API when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
        setError(null);  // Reset error if successful
      } catch (error) {
        setError(error.message); // Catch and set error message
      } finally {
        setLoading(false);  // Stop loading regardless of success/failure
      }
    };

    fetchPosts();
  }, []);

  // Conditional rendering based on loading, error, and posts
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <img src={errorImage} alt="Error" style={{ width: '400px', height: 'auto' }} />
        
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Posts</h1>
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post">
            <h2>{post.id}. {post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
