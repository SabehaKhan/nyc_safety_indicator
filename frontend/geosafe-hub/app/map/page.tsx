"use client"

import Link from "next/link";
import Image from "next/image";
import Footer from "../components/footer";
import { useEffect, useRef, useState, Ref } from "react";
import mapboxgl, { Marker, NavigationControl } from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'; //mapbox styling
import MapView from "../components/map-view";
import MapSidebarDrawer from "../components/map-sidebar-drawer";
import SearchBar from "../components/SearchBar";
import Axios from 'axios'; //for geocoding

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    neighborhood: string;
  } | null>(null);

  const mapRef = useRef<mapboxgl.Map | null>(null);

  //geocode a neighborhood name to get its coordinates
  const geocodeNeighborhood = async (neighborhood: string): Promise<[number, number] | null> => {
    try {
      const response = await Axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(neighborhood)}, New York City&format=json&limit=1`
      );
      if (response.data && response.data.length > 0) {
        return [parseFloat(response.data[0].lon), parseFloat(response.data[0].lat)];
      }
      return null;
    } catch (error) {
      console.error("Geocoding failed:", error);
      return null;
    }
  };

  const handleNeighborhoodSelect = async (neighborhood: string) => {
    //geocode the neighborhood
    const coordinates = await geocodeNeighborhood(neighborhood);
    if (coordinates && mapRef.current) {
      mapRef.current.flyTo({ center: coordinates, zoom: 12 });

      // Update marker position
      if (mapRef.current._markers && mapRef.current._markers.length > 0) {
        mapRef.current._markers[0].setLngLat(coordinates);
      } else {
        new mapboxgl.Marker()
          .setLngLat(coordinates)
          .addTo(mapRef.current);
      }
      setSelectedLocation({ latitude: coordinates[1], longitude: coordinates[0], neighborhood: neighborhood });
    } else {
      setSelectedLocation({ latitude: 0, longitude: 0, neighborhood: neighborhood }); // Still update sidebar if geocoding fails
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-md text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
              alt="GeoSafe Hub Logo"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <h1 className="text-3xl font-bold">GeoSafe Hub</h1>
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <SearchBar onNeighborhoodSelect={handleNeighborhoodSelect} />
            </div>
            <Link href="/signin" className="px-4 py-2 border border-white/30 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">Sign in</Link>
            <Link href="/register" className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">Register</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden pt-13">
        <MapView
          onLocationSelect={(loc) => {
            setSelectedLocation(loc);
            if (mapRef.current?.flyTo && loc?.longitude && loc?.latitude) {
              mapRef.current.flyTo({ center: [loc.longitude, loc.latitude], zoom: 12 });
              // Update marker on manual click as well
              if (mapRef.current._markers && mapRef.current._markers.length > 0) {
                mapRef.current._markers[0].setLngLat([loc.longitude, loc.latitude]);
              } else {
                new mapboxgl.Marker()
                  .setLngLat([loc.longitude, loc.latitude])
                  .addTo(mapRef.current);
              }
            }
          }}
          mapRef={mapRef}
        />
      </main>

      <MapSidebarDrawer
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        location={selectedLocation?.neighborhood || ""}
        safetyScore={62} //will be fetched in the sidebar
        crimeStats={[
          { category: "Assault", count: 25, trend: "down", percent: 12 },
          { category: "Theft", count: 40, trend: "up", percent: 5 },
          { category: "Vandalism", count: 18, trend: "down", percent: 8 },
        ]}
        resources={[
          { name: "Midtown South Precinct", distance: "0.3 miles" },
          { name: "St. Luke's Urgent Care", distance: "0.5 miles" },
        ]}
        coords={selectedLocation ? [{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }] : []}
      />
    </div>
  );
}