import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Chart, Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
const pb = new PocketBase("https://astraea.squaredfield.com");

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

type Level = [number, number];
interface Record {
	levels: Level[];
	rivernum: number;
}

const WaterLevelGraph: React.FC<{ rivernum: string | number }> = ({ rivernum }) => {
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				// Fetch data from PocketBase
				const response = await pb.collection("rivers").getList(1, 12, { filter: `rivernum = ${rivernum}` });
				const records: Record[] = response.items.map(item => ({
    levels: item.levels || [], // Ensure levels is always an array
    rivernum: item.rivernum || 0, // Ensure rivernum is always a number
}));

				// Filter records based on rivernum
				const riverRecords: Record[] = records.filter((record) => record.rivernum === rivernum);

				let data;
				if (riverRecords.length) {
					// Flatten the levels array
					const flatLevels: Level[] = riverRecords.flatMap((record) => record.levels);

					// Extract dates and levels from the flattened array
					const dates: string[] = flatLevels.map((level) => new Date(level[0] * 1000).toLocaleDateString());
					const levels: number[] = flatLevels.map((level) => level[1]);

					data = {
						labels: dates,
						datasets: [
							{
								label: "Water Level",
								data: levels,
								fill: false,
								borderColor: "rgb(75, 192, 192)",
								tension: 0.1,
							},
						],
					};
				} else {
					// No records found, set an empty dataset
					data = {
						labels: [],
						datasets: [
							{
								label: "Water Level",
								data: [],
								fill: false,
								borderColor: "rgb(75, 192, 192)",
								tension: 0.1,
							},
						],
					};
				}

				setData(data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
	}, [rivernum]);

	if (!data) {
		return null;
	}

	return <Line data={data} options={{ scales: { x: { ticks: { maxRotation: 0, minRotation: 0 } } } }} />;
};

export default WaterLevelGraph;
