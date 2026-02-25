import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/newsSlice";
import { Link } from "react-router-dom";

const News = () => {
  const dispatch = useDispatch();
  const { articles, status } = useSelector((state) => state.news);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleNext = () => {
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentArticle = articles[currentIndex];

  return (
    <div className="news-page">
      <div className="background-text">
        WORLD NEWS
      </div>
      <h2 className="news-title">TODAY NEWS</h2>
      <div className="monitor-wrapper">
        <button className="prev-btn" onClick={handlePrev}>
          <img src="img/left.png" alt="prev" />
        </button>

        <div className="monitor-box">
          <div className="monitor-inner">
            {status === "loading" && <p>Loading...</p>}

            {status === "succeeded" && currentArticle && (
              <>
                <div className="monitor-screen">
                  <img
                    className="news-image"
                    src={currentArticle.urlToImage || "/noimage.png"}
                    alt="news"
                  />
                </div>

                <div className="news-text">
                  <h3 className="news-headline">{currentArticle.title}</h3>
 
                  <p className="news-description">
                    {currentArticle.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <button className="next-btn" onClick={handleNext}>
          <img src="img/right.png" alt="next" />
        </button>
      </div>

      <Link to="/" className="go-home">
        Go Home
      </Link>
    </div>
  );
};

export default News;
