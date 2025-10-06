import { useState, useEffect } from 'react';

const usStates = {
  Alabama: ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa'],
  Alaska: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan'],
  Arizona: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale'],
  Arkansas: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro'],
  California: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento'],
  Colorado: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood'],
  Connecticut: ['Hartford', 'New Haven', 'Stamford', 'Waterbury', 'Norwalk'],
  Delaware: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna'],
  Florida: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg'],
  Georgia: ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens'],
  Hawaii: ['Honolulu', 'Hilo', 'Kailua', 'Kapolei', 'Waipahu'],
  Idaho: ['Boise', 'Nampa', 'Meridian', 'Idaho Falls', 'Caldwell'],
  Illinois: ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford'],
  Indiana: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'],
  Iowa: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'],
  Kansas: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka'],
  Kentucky: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'],
  Louisiana: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles'],
  Maine: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn'],
  Maryland: ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie'],
  Massachusetts: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge'],
  Michigan: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor'],
  Minnesota: ['Minneapolis', 'Saint Paul', 'Rochester', 'Duluth', 'Bloomington'],
  Mississippi: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi'],
  Missouri: ['Kansas City', 'Saint Louis', 'Springfield', 'Columbia', 'Independence'],
  Montana: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte'],
  Nebraska: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'],
  Nevada: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'],
  NewHampshire: ['Manchester', 'Nashua', 'Concord', 'Dover', 'Rochester'],
  NewJersey: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Trenton'],
  NewMexico: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell'],
  NewYork: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse'],
  NorthCarolina: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'],
  NorthDakota: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo'],
  Ohio: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'],
  Oklahoma: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Edmond'],
  Oregon: ['Portland', 'Salem', 'Eugene', 'Gresham', 'Hillsboro'],
  Pennsylvania: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading'],
  RhodeIsland: ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence'],
  SouthCarolina: ['Columbia', 'Charleston', 'North Charleston', 'Mount Pleasant', 'Rock Hill'],
  SouthDakota: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown'],
  Tennessee: ['Memphis', 'Nashville', 'Knoxville', 'Chattanooga', 'Clarksville'],
  Texas: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth'],
  Utah: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem'],
  Vermont: ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier'],
  Virginia: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News'],
  Washington: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
  WestVirginia: ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling'],
  Wisconsin: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
  Wyoming: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs'],
};

export default function App() {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [weatherResult, setWeatherResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_BASE = 'http://127.0.0.1:5000';

  const handleSubmit = async () => {
    if (!state || !city || !date || hour === '') return;

    setIsLoading(true);
    setWeatherResult(null);

    try {
      const resp = await fetch(`${BACKEND_BASE}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, state, date, hour }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || 'Failed to fetch prediction');
      }

      const data = await resp.json();
      setWeatherResult(data);
    } catch (err) {
      alert(`Error: ${err.message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (weather) => {
    if (!weather) return '☁️';
    const w = String(weather).toLowerCase();
    if (w.includes('rain')) return '🌧';
    if (w.includes('cloud')) return '☁️';
    if (w.includes('clear') || w.includes('sunny')) return '☀️';
    if (w.includes('snow')) return '❄️';
    if (w.includes('thunder') || w.includes('storm')) return '⛈️';
    return '☁️';
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
    :root {
      --bg-1: #05060a;
      --bg-2: #07102a;
      --panel: #0f1724;
      --muted: #9fb6d8;
      --accent: #1e6fff;
      --white: #f8fbff;
      --glass: rgba(255,255,255,0.04);
      --radius-lg: 18px;
    }
    * {
      box-sizing: border-box;
    }
    html, body, #root {
      height: 100%;
      margin: 0;
      font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
      background: linear-gradient(180deg, var(--bg-1), var(--bg-2));
      color: var(--white);
    }
    .app-wrap {
      min-height: 100vh;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 48px;
      gap: 28px;
    }
    .shell {
      width: min(1200px, 96%);
      display: grid;
      grid-template-columns: 420px 1fr;
      gap: 28px;
      align-items: start;
    }
    .panel {
      background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      border-radius: var(--radius-lg);
      padding: 28px;
      box-shadow: 0 8px 30px rgba(2,6,23,0.6);
      border: 1px solid rgba(255,255,255,0.03);
      min-height: 520px;
    }
    .panel h3 {
      margin: 0 0 12px 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--white);
    }
    .panel p.lead {
      color: var(--muted);
      margin: 0 0 20px 0;
      font-size: 13px;
    }
    .field {
      margin-bottom: 18px;
    }
    .label {
      display: block;
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 8px;
      font-weight: 600;
      letter-spacing: 0.2px;
    }
    /* Added input[type="text"] so city input inherits the same UI */
    select, input[type="date"], input[type="number"], input[type="text"] {
      width: 100%;
      padding: 12px 14px;
      background: var(--panel);
      border: 1px solid rgba(255,255,255,0.03);
      color: var(--white);
      border-radius: 12px;
      font-size: 14px;
      outline: none;
    }
    /* nicer placeholder + focus for text inputs */
    input::placeholder {
      color: var(--muted);
      opacity: 0.9;
    }
    input[type="text"]:focus {
      box-shadow: 0 8px 24px rgba(30,111,255,0.10);
      border-color: var(--accent);
    }
    select:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .actions {
      margin-top: 18px;
      display: flex;
      gap: 14px;
      flex-direction: column;
    }
    .btn {
      padding: 12px 16px;
      border-radius: 12px;
      border: 0;
      font-weight: 700;
      cursor: pointer;
      font-size: 15px;
      width: 100%;
    }
    .btn.primary {
      background: linear-gradient(180deg, var(--accent), #1560d9);
      color: white;
      box-shadow: 0 8px 28px rgba(4,30,66,0.48);
      border: 1px solid rgba(255,255,255,0.03);
    }
    .btn.primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn.ghost {
      background: transparent;
      color: var(--muted);
      border: 1px solid rgba(255,255,255,0.04);
    }
    .meta {
      margin-top: 20px;
      font-size: 13px;
      color: var(--muted);
    }
    .weather-card {
      background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      border-radius: 22px;
      padding: 36px;
      box-shadow: 0 20px 60px rgba(2,6,23,0.6);
      min-height: 520px;
      border: 1px solid rgba(255,255,255,0.03);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .top-row {
      display: flex;
      align-items: center;
      gap: 22px;
      justify-content: space-between;
    }
    .location {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .location .city {
      font-size: 28px;
      font-weight: 800;
      color: var(--white);
    }
    .location .sub {
      font-size: 13px;
      color: var(--muted);
    }
    .big-weather {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    .big-weather .icon {
      font-size: 72px;
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,0.03);
    }
    .big-weather .meta-temp {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .temp {
      font-size: 48px;
      font-weight: 800;
      color: var(--white);
    }
    .cond {
      font-size: 16px;
      color: var(--muted);
    }
    .details {
      margin-top: 6px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    .detail {
      background: var(--glass);
      border-radius: 12px;
      padding: 14px;
      border: 1px solid rgba(255,255,255,0.03);
    }
    .detail .k {
      font-size: 12px;
      color: var(--muted);
      font-weight: 600;
      margin-bottom: 6px;
    }
    .detail .v {
      font-size: 16px;
      font-weight: 700;
      color: var(--white);
    }
    .insights {
      margin-top: 12px;
      background: rgba(255,255,255,0.01);
      padding: 16px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.02);
      color: var(--muted);
      font-size: 14px;
    }
    @media (max-width: 980px) {
      .shell {
        grid-template-columns: 1fr;
      }
      .panel {
        order: 2;
      }
      .weather-card {
        order: 1;
      }
      .details {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="app-wrap">
        <div className="shell">
          <aside className="panel">
            <h3> Plan Future Events with WeatherAI </h3>
            <p className="lead">Pick a location, date and hour. The AI model forecasts expected conditions for that hour.</p>

            <div className="field">
              <label className="label">State</label>
              <select
                value={state}
                onChange={(e) => { setState(e.target.value); setCity(''); }}
              >
                <option value="">— Select State —</option>
                {Object.keys(usStates).map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label className="label">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter any city"
              />
            </div>

            <div className="field">
              <label className="label">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="field">
              <label className="label">Hour (0-23)</label>
              <input
                type="number"
                min={0}
                max={23}
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              />
            </div>

            <div className="actions">
              <button
                className="btn primary"
                onClick={handleSubmit}
                disabled={isLoading || !state || !city || !date || hour === ''}
              >
                {isLoading ? 'Predicting…' : 'Run AI Prediction'}
              </button>

              <button
                className="btn ghost"
                onClick={() => {
                  setState('');
                  setCity('');
                  setDate('');
                  setHour('');
                  setWeatherResult(null);
                }}
              >
                Reset
              </button>
            </div>

            <div className="meta">
              <div><strong>Model:</strong> Weather-AI v1</div>
              <div style={{ marginTop: 8 }}><strong>Resolution:</strong> Hourly • interpolation enabled</div>
            </div>
          </aside>

          <main className="weather-card">
            <div className="top-row">
              <div className="location">
                <div className="city">{city ? `${city}, ${state}` : 'No location selected'}</div>
                <div className="sub">{date && hour !== '' ? `${date} • ${hour}:00` : 'Select date and hour to see forecast'}</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700, letterSpacing: 0.6 }}>AI STATUS</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent)', marginTop: 6 }}>
                  {weatherResult ? 'READY' : '—'}
                </div>
              </div>
            </div>

            <div className="big-weather">
              <div className="icon">
                {weatherResult && weatherResult.weather ? getWeatherIcon(weatherResult.weather['Condition']) : '☁️'}
              </div>

              <div className="meta-temp">
                <div className="temp">
                  {weatherResult && weatherResult.weather ? 
                    `${weatherResult.weather['High (°F)'] || weatherResult.weather['Low (°F)'] || '—'}°` 
                    : '—'}
                </div>
                <div className="cond">
                  {weatherResult && weatherResult.weather ? 
                    weatherResult.weather['Condition'] || 'Weather conditions'
                    : 'Predicted conditions appear here after running the model.'}
                </div>
                <div style={{ marginTop: 8, color: 'var(--muted)', fontSize: 13 }}>
                  {weatherResult && weatherResult.weather ? 
                    `Wind: ${weatherResult.weather['Wind (mph)'] || '—'} • Precip: ${weatherResult.weather['Precipitation (mm)'] || '—'} mm` 
                    : ''}
                </div>
              </div>
            </div>

            <div className="details">
              {weatherResult && weatherResult.weather ? (
                <>
                  <div className="detail">
                    <div className="k">Condition</div>
                    <div className="v">{weatherResult.weather['Condition'] || '—'}</div>
                  </div>
                  <div className="detail">
                    <div className="k">High</div>
                    <div className="v">{weatherResult.weather['High (°F)'] || '—'}°F</div>
                  </div>
                  <div className="detail">
                    <div className="k">Low</div>
                    <div className="v">{weatherResult.weather['Low (°F)'] || '—'}°F</div>
                  </div>
                  <div className="detail">
                    <div className="k">Precipitation</div>
                    <div className="v">{weatherResult.weather['Precipitation (mm)'] || '—'} mm</div>
                  </div>
                  <div className="detail">
                    <div className="k">Wind</div>
                    <div className="v">{weatherResult.weather['Wind (mph)'] || '—'} mph</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="detail"><div className="k">Condition</div><div className="v">—</div></div>
                  <div className="detail"><div className="k">High</div><div className="v">—</div></div>
                  <div className="detail"><div className="k">Low</div><div className="v">—</div></div>
                  <div className="detail"><div className="k">Precipitation</div><div className="v">—</div></div>
                  <div className="detail"><div className="k">Wind</div><div className="v">—</div></div>
                  <div className="detail"><div className="k">Source</div><div className="v">—</div></div>
                </>
              )}
            </div>

            <div className="insights">
              <strong>AI Insight:</strong>{' '}
              {weatherResult ? 
                'The model indicates expected conditions for the selected hour based on historical patterns and current atmospheric data.' 
                : 'Run the prediction to get an AI-generated forecast and weather insights.'}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
