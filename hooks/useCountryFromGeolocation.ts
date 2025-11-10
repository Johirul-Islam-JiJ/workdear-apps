import { config } from "@/config/config";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useCountryFromGeolocation = () => {
  const [country, setCountry] = useState("BD");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        // Request permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Permission to access location was denied");
        }

        // Get coordinates
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Reverse geocode with Google API
        const apiKey = config.geolocationApiKey;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.status !== "OK") {
          throw new Error("Failed to fetch geolocation data");
        }

        // Extract country
        const countryComp = data.results[0]?.address_components.find((c: any) =>
          c.types.includes("country")
        );
        setCountry(countryComp?.short_name || "BD");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, []);

  return { country, loading, error };
};

export default useCountryFromGeolocation;
