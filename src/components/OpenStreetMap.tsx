"use client";

import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import {
	MapContainer,
	TileLayer,
	Popup,
	LayersControl,
	AttributionControl,
	GeoJSON,
	GeoJSONProps,
	useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Layer, LatLngTuple } from "leaflet";
import riverData from "./ne_10m_rivers_lake_centerlines.json";
import WaterLevelGraph from "./WaterLevelGraph";

const OpenStreetMap: React.FC = () => {
	const [center, setCenter] = useState<LatLngTuple>([-3.118889, -60.021667]);
	const ZOOM_LEVEL = 9;
	const [selectedRivernum, setSelectedRivernum] = useState(null);
	const roots = new Map();

	const onEachFeature = (feature: any, layer: Layer) => {
		if (feature.properties && feature.properties.rivernum) {
			const container = document.createElement("div");
			container.className = "graph-popup";
			layer.bindPopup(container);
			layer.on("click", () => {
				setSelectedRivernum(feature.properties.rivernum);
				const newGraph = <WaterLevelGraph rivernum={feature.properties.rivernum} />;
				let root = roots.get(container);
				if (!root) {
					root = createRoot(container);
					roots.set(container, root);
				}
				root.render(
					<>
						<h2>{feature.properties.name}</h2>
						<div>{newGraph}</div>
						<div style={{ position: "absolute", top: "22vh" }}>
							<a href={`/${feature.properties.rivernum}`} target="_blank">
								Go to {feature.properties.name}
							</a>
						</div>
					</>,
				);
			});
		}
	};

	return (
		<>
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
				<GeoJSON
					data={riverData as GeoJSON.FeatureCollection}
					onEachFeature={onEachFeature}
					style={() => ({ weight: 6 })}
				/>
			</MapContainer>
			{selectedRivernum !== null && <WaterLevelGraph rivernum={selectedRivernum} />}
		</>
	);
};

export default OpenStreetMap;
