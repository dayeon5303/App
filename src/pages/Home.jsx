import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainText from "../components/MainText";
import Clock from "../components/Clock";
import weatherImg from "../assets/weather.png";
import newsImg from "../assets/news.png";
import EnterKey from "../components/Enterkey";

const Home = () => {
  const navigate = useNavigate();
  const [pressedWeather, setPressedWeather] = useState(false);
  const [pressedNews, setPressedNews] = useState(false);

  const goWeather = () => {
    setPressedWeather(true);
    setTimeout(() => {
      navigate("/weather");
    }, 250);
  };

  const goNews = () => {
    setPressedNews(true);
    setTimeout(() => {
      navigate("/news");
    }, 250);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter") {
        goWeather();
      }
      if (e.key === "N") {
        goNews();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  return (
    <div className="home-container">
      <div className="home-page">
        <MainText />
      </div>
      <div className="home-button-group">
        <EnterKey
          onClick={goWeather}
          pressed={pressedWeather}
          imgSrc={weatherImg}
          altText="Weather Enter"
        />

        <EnterKey
          onClick={goNews}
          pressed={pressedNews}
          imgSrc={newsImg}
          altText="News Enter"
        />
      </div>

      <Clock />
    </div>
  );
};

export default Home;
