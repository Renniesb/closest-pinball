import logo from "./pinball.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import SearchForm from "./SearchForm";

interface latLong {
  lat: string;
  long: string;
}

interface Location {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  distance: number;
}

function App() {
  const [locations, setLocations] = useState(Array<Location>);
  const [isLocationsEmpty, setIsLocationEmpty] = useState(false);

  const apiUrl = (lat: string, lon: string) => {
    return `https://pinballmap.com/api/v1/locations/closest_by_lat_lon.json?lat=${lat}&lon=${lon}&send_all_within_distance=max_distance`;
  };

  const getPinballList = async (formLatlong: latLong) => {
    try {
      const { data } = await axios.get(
        apiUrl(formLatlong.lat, formLatlong.long)
      );
      if (!data.locations) {
        setIsLocationEmpty(true);
        setLocations([]);
        return;
      }
      setLocations(data.locations);
      setIsLocationEmpty(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pinball Location finder</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SearchForm getPinballList={getPinballList} />
      {isLocationsEmpty && <p>No locations found</p>}
      {locations
        .sort((a, b) => a.distance - b.distance)
        .map((location: Location) => {
          return (
            <div key={location.id + location.name} className="pinball">
              <div>
                <b>Pinball Location Name:</b> {location.name}{" "}
              </div>
              <div>
                <b>Address:</b> {location.street}, {location.city},{" "}
                {location.state}
              </div>
              <div style={{ marginTop: "25px", textAlign: "right" }}>
                {parseFloat(location.distance.toFixed(2))} miles away
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
