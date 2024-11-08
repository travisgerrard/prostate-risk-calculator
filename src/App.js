import React, { useState } from 'react';
import Modal from 'react-modal'; // Import modal
import './App.css';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [screening, setScreening] = useState('No Screening');

  const handleOptionChange = (e) => {
    setScreening(e.target.value);
  };

  // Counts for each category based on the grid logic
  const counts = {
    blue: screening === 'No Screening' ? 31 : 25, // Deaths
    yellow: screening === 'With Screening' ? 6 : 0, // Lives Saved
    powderBlue: screening === 'With Screening' ? 148 : 0, // Biopsies - No Cancer
    columbiaBlue: screening === 'With Screening' ? 3 : 0, // Biopsy-related infections
    darkRed: screening === 'With Screening' ? 75 : 0, // Prostate Cancer
    lightRed: screening === 'With Screening' ? 20 : 0, // Erectile Dysfunction
    lightestRed: screening === 'With Screening' ? 5 : 0, // Incontinence
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
            <span>Death from prostate cancer ({counts.blue}/1024)</span>
          </div>
          {screening === 'With Screening' && (
            <>
              <div className="legend-item">
                <div className="legend-circle yellow"></div>
                <span>
                  Life saved from prostate screening ({counts.yellow}/1024)
                </span>
              </div>
              <div className="legend-item">
                <div className="legend-circle powder-blue"></div>
                <span>Biopsy - No Cancer ({counts.powderBlue}/1024)</span>
              </div>
              <div className="legend-item">
                <div className="legend-circle columbia-blue"></div>
                <span>
                  Biopsy-related infections ({counts.columbiaBlue}/1024)
                </span>
              </div>
              <div className="legend-item">
                <div className="legend-circle dark-red"></div>
                <span>Prostate Cancer ({counts.darkRed}/1024)</span>
              </div>
              <div className="legend-item">
                <div className="legend-circle light-red"></div>
                <span>Erectile Dysfunction ({counts.lightRed}/1024)</span>
              </div>
              <div className="legend-item">
                <div className="legend-circle lightest-red"></div>
                <span>Incontinence ({counts.lightestRed}/1024)</span>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Button to Open Modal */}
      <button className="modal-button" onClick={openModal}>
        Learn More
      </button>
      {/* Modal for References */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="References"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>References</h2>
        <ol>
          <li>
            Schröder FH, et al. Screening and Prostate-Cancer Mortality in a
            Randomized European Study. <i>New England Journal of Medicine</i>.
            2009;360:1320-1328.
          </li>
          <li>
            Schröder FH, et al. Prostate-Cancer Mortality at 11 Years of
            Follow-Up. <i>New England Journal of Medicine</i>. 2012;366:981-990.
          </li>
          <li>
            Hugosson J, et al. Mortality Results from the Göteborg Randomized
            Population-Based Prostate-Cancer Screening Trial.{' '}
            <i>Lancet Oncology</i>. 2010;11:725-732.
          </li>
          <li>
            Hugosson J, et al. Eighteen-Year Follow-Up of the Göteborg
            Randomized Population-Based Prostate Cancer Screening Trial: Effect
            of Sociodemographic Variables on Participation, Prostate Cancer
            Incidence and Mortality. <i>Scandinavian Journal of Urology</i>.
            2018;52:27-37.
          </li>
          <li>
            Carlsson SV, et al. Outcome Following Active Surveillance of Men
            with Screen-Detected Prostate Cancer: Results from the Göteborg
            Randomised Population-Based Prostate Cancer Screening Trial.
            <i>European Urology</i>. 2013;63:101-107.
          </li>
          <li>
            Schröder FH, et al. Screening and Prostate Cancer Mortality: Results
            of the European Randomised Study of Screening for Prostate Cancer
            (ERSPC) at 13 Years of Follow-Up. <i>Lancet</i>. 2014;384:2027-2035.
          </li>
        </ol>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default App;
