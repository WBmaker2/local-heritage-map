import L from "leaflet";
import { useEffect, useRef } from "react";
import type { MapSite } from "../data/heritageSites";
import { getSiteTitle } from "../data/heritageSites";

type GyeongbukMapProps = {
  sites: MapSite[];
  selectedSiteId?: string;
  completedSiteIds: string[];
  onSelectSite: (site: MapSite) => void;
};

const GYEONGBUK_BOUNDS = L.latLngBounds([35.55, 127.95], [37.15, 129.65]);

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function createMarkerIcon(site: MapSite, isSelected: boolean, isCompleted: boolean) {
  const title = escapeHtml(getSiteTitle(site));
  const isCustom = "isCustom" in site && site.isCustom === true;
  const classNames = [
    "leaflet-heritage-marker",
    isCustom ? "leaflet-heritage-marker--custom" : "",
    isSelected ? "leaflet-heritage-marker--selected" : "",
    isCompleted ? "leaflet-heritage-marker--completed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return L.divIcon({
    className: "",
    html: `<span class="${classNames}" aria-hidden="true"><span>⌂</span><strong>${title}</strong></span>`,
    iconSize: [154, 44],
    iconAnchor: [77, 22],
  });
}

export function GyeongbukMap({
  sites,
  selectedSiteId,
  completedSiteIds,
  onSelectSite,
}: GyeongbukMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    const map = L.map(mapContainerRef.current, {
      center: [36.45, 128.75],
      zoom: 8,
      minZoom: 7,
      maxZoom: 18,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const markerLayer = L.layerGroup().addTo(map);
    map.fitBounds(GYEONGBUK_BOUNDS, { padding: [18, 18] });

    mapRef.current = map;
    markerLayerRef.current = markerLayer;

    window.setTimeout(() => map.invalidateSize(), 0);

    return () => {
      map.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const markerLayer = markerLayerRef.current;
    const map = mapRef.current;

    if (!markerLayer || !map) {
      return;
    }

    markerLayer.clearLayers();

    const markerBounds = L.latLngBounds([]);
    sites.forEach((site) => {
      const marker = L.marker([site.latitude, site.longitude], {
        title: getSiteTitle(site),
        icon: createMarkerIcon(
          site,
          site.id === selectedSiteId,
          completedSiteIds.includes(site.id),
        ),
      });

      marker.on("click", () => onSelectSite(site));
      marker.addTo(markerLayer);
      markerBounds.extend([site.latitude, site.longitude]);
    });

    if (sites.length > 1) {
      map.fitBounds(markerBounds.pad(0.35), {
        maxZoom: 10,
        padding: [32, 32],
      });
    } else if (sites.length === 1) {
      map.setView([sites[0].latitude, sites[0].longitude], 11);
    } else {
      map.fitBounds(GYEONGBUK_BOUNDS, { padding: [18, 18] });
    }
  }, [completedSiteIds, onSelectSite, selectedSiteId, sites]);

  return (
    <section className="map-stage" aria-label="경상북도 문화유산 지도">
      <div className="map-stage__header">
        <div>
          <h2>경상북도 실제 지도</h2>
          <p>OpenStreetMap 실제 지도 위의 핀을 눌러 위치와 가치를 탐험해 보세요.</p>
        </div>
      </div>
      <div className="real-map-canvas" ref={mapContainerRef} aria-label="OpenStreetMap 기반 경상북도 지도" />
      <p className="map-attribution">
        지도 자료:{" "}
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
          OpenStreetMap contributors
        </a>
        , ODbL 1.0
      </p>
      <div className="map-marker-list" aria-label="문화유산 마커 목록">
        {sites.map((site) => (
          <button
            key={site.id}
            className={site.id === selectedSiteId ? "map-list-button is-active" : "map-list-button"}
            type="button"
            data-testid={`marker-${site.id}`}
            aria-pressed={site.id === selectedSiteId}
            onClick={() => onSelectSite(site)}
          >
            {getSiteTitle(site)}
          </button>
        ))}
      </div>
    </section>
  );
}
