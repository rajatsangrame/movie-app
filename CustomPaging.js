import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

const App = () => {
  const [firstItems, setFirstItems] = useState({});
  const [skip1, setSkip1] = useState(10);
  const [hasMore1, setHasMore1] = useState(true);
  const observer1 = useRef(null);

  const [secondItems, setSecondItems] = useState([]);
  const [skip2, setSkip2] = useState(10);
  const [hasMore2, setHasMore2] = useState(true);
  const observer2 = useRef(null);

  const [thirdItems, setThirdItems] = useState([]);
  const [skip3, setSkip3] = useState(10);
  const [hasMore3, setHasMore3] = useState(true);
  const observer3 = useRef(null);

  const LIMIT = 10;

  async function fetchData(skip, setItems, setHasMore, hasMore, condtion, setSkip) {
    try {
      if (!hasMore) return;
      const url = `https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}`
      const response = await axios.get(url)
      let newItems = response.data.posts
        .filter(condtion);
      if (!newItems.length) {
        setSkip((prev) => prev + LIMIT);
        return
      }
      newItems = newItems.reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
      }, {});
      setItems((prev) => ({ ...prev, ...newItems }));
      if (response.data.total <= response.data.skip + response.data.limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    const condition = (post) => post.views > 1000;
    fetchData(skip1, setFirstItems, setHasMore1, hasMore1, condition, setSkip1);
  }, [skip1]);

  const handleObserver1 = useCallback((node) => {
    if (observer1.current) observer1.current.disconnect();

    observer1.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore1) {
        setSkip1((prev) => prev + LIMIT);
      }
    });

    if (node) observer1.current.observe(node);
  }, [hasMore1]);

  useEffect(() => {
    const condition = (post) => post.views >= 501 && post.views <= 1000;
    fetchData(skip2, setSecondItems, setHasMore2, hasMore2, condition, setSkip2);
  }, [skip2]);

  const handleObserver2 = useCallback((node) => {
    if (observer2.current) observer2.current.disconnect();

    observer2.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore2) {
        setSkip2((prev) => prev + LIMIT);
      }
    });

    if (node) observer2.current.observe(node);
  }, [hasMore2]);

  useEffect(() => {
    const condition = (post) => post.views < 501;
    fetchData(skip3, setThirdItems, setHasMore3, hasMore3, condition, setSkip3);
  }, [skip3]);

  const handleObserver3 = useCallback((node) => {
    if (observer3.current) observer3.current.disconnect();

    observer3.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore3) {
        setSkip3((prev) => prev + LIMIT);
      }
    });

    if (node) observer3.current.observe(node);
  }, [hasMore3]);

  return (
    <div className="row">
      <div className="col">
        <h5>Views above 1000</h5>
        <div className="list-container">
          {Object.values(firstItems)
            .map((item, index) => (
              <div
                key={item.id}
                className="list-item"
                ref={Object.values(firstItems).length === index + 1 ? handleObserver1 : null}
              >
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Title:</strong> {item.title}</p>
                <p><strong>Views:</strong> {item.views}</p>
                <div className="divider"></div>
              </div>
            ))}
        </div>
      </div>
      <div className="col">
        <h5>View Between 500 - 1000</h5>
        <div className="list-container">
          {Object.values(secondItems)
            .map((item, index) => (
              <div
                key={item.id}
                className="list-item"
                ref={Object.values(secondItems).length === index + 1 ? handleObserver2 : null}
              >
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Title:</strong> {item.title}</p>
                <p><strong>Views:</strong> {item.views}</p>
                <div className="divider"></div>
              </div>
            ))}
        </div>
      </div >
      <div className="col">
        <h5>Views Below 500</h5>
        <div className="list-container">
          {Object.values(thirdItems)
            .map((item, index) => (
              <div
                key={item.id}
                className="list-item"
                ref={Object.values(thirdItems).length === index + 1 ? handleObserver3 : null}
              >
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Title:</strong> {item.title}</p>
                <p><strong>Views:</strong> {item.views}</p>
                <div className="divider"></div>
              </div>
            ))}
        </div>
      </div>
    </div >

  );
};

export default App;