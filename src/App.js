import React, { useState } from 'react';
import './App.css';

function App() {
  const [screening, setScreening] = useState('No Screening');

  const handleOptionChange = (e) => {
    setScreening(e.target.value);
  };

  const circles = Array.from({ length: 1024 }, (_, index) => {
    const col = index % 32; // Column index
    const row = Math.floor(index / 32); // Row index
    const verticalIndex = col * 32 + row; // Calculate the vertical position in the grid

    let circleClass = '';

    if (screening === 'No Screening') {
      if (verticalIndex < 31) {
        circleClass = 'blue'; // First 31 circles for No Screening
      }
    } else if (screening === 'With Screening') {
      if (verticalIndex < 6) {
        circleClass = 'yellow'; // First 6 circles (lives saved)
      } else if (verticalIndex >= 6 && verticalIndex < 31) {
        circleClass = 'blue'; // Next 25 circles (deaths)
      } else if (verticalIndex >= 32 && verticalIndex <= 674) {
        circleClass = 'grey'; // Survivors without event (no legend entry)
      } else if (verticalIndex >= 775 && verticalIndex <= 922) {
        circleClass = 'powder-blue'; // Biopsy
      } else if (verticalIndex >= 922 && verticalIndex <= 924) {
        circleClass = 'columbia-blue'; // Biopsy complication
      } else if (verticalIndex >= 925 && verticalIndex <= 999) {
        circleClass = 'dark-red'; // Prostate Cancer
      } else if (verticalIndex >= 1000 && verticalIndex <= 1019) {
        circleClass = 'light-red'; // Prostate Cancer
      } else if (verticalIndex >= 1020 && verticalIndex <= 1024) {
        circleClass = 'lightest-red'; // Prostate Cancer
      }
    }

    return <div key={index} className={`circle ${circleClass}`}></div>;
  });

  return (
    <div className="app-container">
      <h1 className="app-title">Prostate Cancer Risk Calculator</h1>{' '}
      {/* Add Title */}
      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            value="No Screening"
            checked={screening === 'No Screening'}
            onChange={handleOptionChange}
          />
          No Screening
        </label>
        <label>
          <input
            type="radio"
            value="With Screening"
            checked={screening === 'With Screening'}
            onChange={handleOptionChange}
          />
          With Screening
        </label>
      </div>
      <div className="main-content">
        <div className="grid-container">{circles}</div>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-circle blue"></div>
            <span>Death from prostate cancer</span>
          </div>
          {screening === 'With Screening' && (
            <>
              <div className="legend-item">
                <div className="legend-circle yellow"></div>
                <span>Life saved from prostate cancer screening</span>
              </div>
              <div className="legend-item">
                <div className="legend-circle powder-blue"></div>
                <span>Biopsy - No Cancer</span>
              </div>
              <div className="legend-item">
                <div className="legend-circle columbia-blue"></div>
                <span>Biopsy related infection</span>
              </div>
              <div className="legend-item">
                <div className="legend-circle dark-red"></div>
                <span>Prostate Cancer</span>
              </div>
              <div className="legend-item">
                <div className="legend-circle light-red"></div>
                <span>Erectile Dysfunction</span>
              </div>
              <div className="legend-item">
                <div className="legend-circle lightest-red"></div>
                <span>Incontinence</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
