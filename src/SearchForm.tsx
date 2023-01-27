import { useState, useEffect } from "react";

interface PinballListFunction {
    getPinballList: Function;
}

const SearchForm = ({ getPinballList }: PinballListFunction) => {
    const [formLatlong, changeFormLatLong] = useState({ lat: "", long: "" });
    const [localLatLong, changeLocalLatLong] = useState({ lat: "", long: "" });
  
    useEffect(() => {
      function success(pos: { coords: any }) {
        const crd = pos.coords;
        changeLocalLatLong({ lat: `${crd.latitude}`, long: `${crd.longitude}` });
      }
  
      navigator.geolocation.getCurrentPosition(success);
    }, []);
  
    return (
      <>
        <form action="">
          Coordinates:{" "}
          <input
            type="text"
            placeholder="latitude"
            value={formLatlong.lat}
            id="latitude"
            onChange={(e) => {
              changeFormLatLong({
                ...formLatlong,
                lat: e.target.value,
              });
            }}
          />
          <input
            type="text"
            placeholder="longitude"
            value={formLatlong.long}
            id="longitude"
            onChange={(e) => {
              changeFormLatLong({
                ...formLatlong,
                long: e.target.value,
              });
            }}
          />
          <button
            type="button"
            onClick={() => {
              changeFormLatLong({ lat: "", long: "" });
            }}
          >
            Clear
          </button>
          <button
            disabled={localLatLong.lat === ""}
            type="button"
            onClick={() => {
              changeFormLatLong({
                lat: localLatLong.lat,
                long: localLatLong.long,
              });
            }}
          >
            Near Me
          </button>
          <div className="search">
            <button
              className="search"
              disabled={formLatlong.lat === "" || formLatlong.long === ""}
              type="button"
              onClick={() => {
                getPinballList(formLatlong);
              }}
            >
              Search
            </button>
          </div>
        </form>
      </>
    );
  }

export default SearchForm;
