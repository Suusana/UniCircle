import React, { useState, useEffect } from "react";

function Search() {
  const [posts, setPosts] = useState([]);
  const [sortType, setSortType] = useState("newest");

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts/sort?type=${sortType}`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, [sortType]);

  return (
    <div>
      <h2>Search Results</h2>
      <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
        <option value="newest">Newest</option>
        <option value="most_commented">Most Commented</option>
        <option value="trending">Trending</option>
      </select>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>{post.commentCount} comments</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
