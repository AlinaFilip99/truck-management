import { Loader } from "@googlemaps/js-api-loader";

let client = false;

/**
 * Returns the google maps client
 * @returns {Promise<*|boolean|boolean>}
 */

export const getClient = async () => {
  if (client) {
    return client;
  }
  const loader = new Loader({
    libraries: ["geocoder"],
    apiKey: process.env.REACT_APP_GMAPS_API_KEY,
  });

  client = await loader.load();

  return client;
};

export const loadGoogleMaps = (callback) => {
  const existingScript = document.getElementById("googleMaps");

  if (!existingScript) {
    const script = document.createElement("script");
    script.src =
      "https://maps.google.com/maps/api/js?key=AIzaSyBcJqi7SlZJ2Q82G2x6AZ8STC7mwksQtD4";
    script.id = "googleMaps";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }

  if (existingScript && callback) callback();
};

export const removeGoogleMaps = () => {
  const mapScript = document.getElementById("googleMaps");

  if (mapScript) {
    mapScript.parentNode.removeChild(mapScript);

    const head = document.getElementsByTagName("head")[0];
    const scripts = head.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      let script = scripts[i];
      let src = script.src;

      if (src.startsWith("https://maps.google.com/maps")) {
        head.removeChild(script);
      }
    }
  }
};
