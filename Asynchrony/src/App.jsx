import { useEffect, useState } from 'react';
import './App.css';

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

  
}

export default App;
