import React, { useEffect, useState } from "react";
import { GMap } from "primereact/gmap";
import {
  loadGoogleMaps,
  removeGoogleMaps,
  getClient,
} from "../utils/GoogleMaps";

const LocationMap = ({ destination, isSelectable, setAddressInfo }) => {
  const [googleMapsReady, setGoogleMapsReady] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [google, setGoogle] = useState();

  const positionstackKey = "59fa9323a8ec5acf4eb7259f9d11aa3f";

  let options = {
    center: { lat: 36.890257, lng: 30.707417 },
    zoom: 12,
  };

  useEffect(() => {
    loadGoogleMaps(async () => {
      const googleClient = await getClient();
      setGoogle(googleClient);
      setGoogleMapsReady(true);
    });
  }, []);

  const onMapReady = async (event) => {
    try {
      if (destination) {
        let apiURL = `http://api.positionstack.com/v1/forward?access_key=${positionstackKey}&limit=50&output=json&query=${destination}`;
        let response = await fetch(apiURL);
        let apiData = await response.json();

        if (apiData && google && apiData.data && apiData.data.length > 0) {
          let coordinates = {
            lat: apiData.data[0].latitude,
            lng: apiData.data[0].longitude,
          };

          event.map.setCenter(coordinates);

          setMarkers([
            new google.maps.Marker({
              position: coordinates,
              title: "Craiova",
            }),
          ]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onMapClick = (event) => {
    if (google) {
      let newMarker = new google.maps.Marker({
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
        title: "hello alina",
        draggable: false,
      });

      setMarkers([newMarker]);
      findAddress(event.latLng);
    }
  };

  const findAddress = async (latLng) => {
    let apiURL = `http://api.positionstack.com/v1/reverse?access_key=${positionstackKey}&query=${`${latLng.lat()},${latLng.lng()}`}`;
    let response = await fetch(apiURL);
    let apiData = await response.json();

    if (apiData && apiData.data && apiData.data.length > 0) {
      setAddressInfo(apiData.data[0]);
    }
  };

  return (
    <>
      {googleMapsReady && (
        <GMap
          overlays={markers}
          options={options}
          style={{ width: "100%", minHeight: "320px" }}
          onMapReady={onMapReady}
          onMapClick={isSelectable ? onMapClick : () => {}}
        />
      )}
    </>
  );
};

export default LocationMap;
