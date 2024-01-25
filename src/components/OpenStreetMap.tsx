"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, AttributionControl, GeoJSON, GeoJSONProps, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import L from "leaflet";
import riverData from './ne_10m_rivers_lake_centerlines.json';
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const OpenStreetMap: React.FC = () => {
	const [center, setCenter] = useState<LatLngTuple>([-15.793889, -47.882778]);
	const ZOOM_LEVEL: number = 9;

	const onEachFeature = (feature: any, layer: L.GeoJSON) => {
		if (feature.properties && feature.properties.name) {
			layer.bindPopup(feature.properties.name);
		}
	};

	return (
		<MapContainer
			center={center}
			zoom={ZOOM_LEVEL}
			attributionControl={false}
			style={{ height: "100vh", width: "100vw" }}
		>
			<LayersControl position="topright">
				<LayersControl.BaseLayer checked name="OpenStreetMap">
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name="CycleOSM">
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
					/>
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name="Humanitarian">
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
					/>
				</LayersControl.BaseLayer>
			</LayersControl>
			<AttributionControl prefix='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
			<GeoJSON data={riverData as GeoJSON.FeatureCollection} onEachFeature={onEachFeature} />
		</MapContainer>
	);
};

export default OpenStreetMap;