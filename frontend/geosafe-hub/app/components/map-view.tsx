"use client"

import Link from "next/link";
import Image from "next/image";
import Footer from "../components/footer";
import { useEffect, useRef, useState } from "react";
import mapboxgl, { Marker, NavigationControl } from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'; //mapbox styling
import MapSidebarDrawer from "../components/map-sidebar-drawer";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface MapViewProps {
  onLocationSelect?: (location: {
    latitude: number;
    longitude: number;
    neighborhood: string;
  }) => void;
}

// potentially fix the popup map rendering issue
function useHasSize(ref: React.RefObject<HTMLElement>) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setReady(true);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return ready;
}

export default function MapView({ onLocationSelect }: MapViewProps) {

  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
  const timeout = setTimeout(() => {
    if (mapContainer.current && !mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", //might change later
        center: [-73.9857, 40.7589],
        zoom: 10,
        maxBounds: [
          [-74.45909, 40.417399],
          [-73.400381, 40.957577],
        ],
      });

      map.fitBounds(
        [
          [-74.45909, 40.417399],
          [-73.400381, 40.957577],
        ],
        { padding: 50, maxZoom: 15 }
      );

      map.addControl(new NavigationControl(), "bottom-left"); //maybe move this
      mapRef.current = map;

      map.on("click", (event) => {
        const { lngLat } = event;
        const latitude = lngLat.lat;
        const longitude = lngLat.lng;

        if (markerRef.current) {
          markerRef.current.remove();
        }

        markerRef.current = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map);

        if (onLocationSelect) {
          onLocationSelect({
            latitude,
            longitude,
            neighborhood: "Midtown Manhattan", //PLACEHOLDER
          });
        }
      });
    }
  }, 200); //slight delay for resizing (react/mapbox issue)

  return () => clearTimeout(timeout);
}, [onLocationSelect]);

  return <div ref={mapContainer} className="right-0 w-full h-full" />;
}