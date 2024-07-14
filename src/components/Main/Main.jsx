import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null); // Track selected suggestion

  const handleClickSuggestion = (suggestion) => {
    // Pre-fill the search bar with a portion of the suggestion text
    setInput(`${suggestion.text.slice(0, 10)}...`); // Adjust slice(0, length) for desired text length
    setSelectedSuggestion(suggestion); // Update selected suggestion state
  };

  return (
    <div className="main">
      <div className="nav">
        <p>AeroAssistAI</p>
        <img src={assets.user_icon} alt="Image error" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Aerospace engineer.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="card clickable" // Add "clickable" class for hover effect
                  onClick={() => handleClickSuggestion(suggestion)} // Bind click handler
                >
                  <p>{suggestion.text}</p>
                  <img src={suggestion.icon} alt="Image error" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Image error" />
              <img src={assets.mic_icon} alt="Image error" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="Image error" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

// Assuming suggestions are defined elsewhere in your code:
const suggestions = [
  { text: 'Research latest advancements in hypersonic propulsion...', icon: assets.rocket_icon },  // Example
  { text: 'Find orbital mechanics data for a specific satellite...', icon: assets.satellite_icon },
  { text: 'Calculate launch window for a given payload and trajectory...', icon: assets.calendar_icon },
  { text: 'Analyze sensor data from a recent space mission...', icon:  assets.chart_icon },
  { text: 'Simulate the re-entry of a spacecraft into Earth\'s atmosphere...', icon: assets.earth_icon },
  { text: 'Explore materials properties for use in extreme space environments...', icon: assets.material_icon },
  { text: 'Design a new wing configuration for improved aircraft performance...', icon: assets.airplane_icon },
  { text: 'Investigate the feasibility of a mission to a specific asteroid...', icon: assets.asteroid_icon },
];

export default Main;
