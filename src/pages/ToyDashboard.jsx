import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, TimeScale } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';
import { utilService } from '../services/util.service';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, TimeScale);

export function ToyDashboard() {
    const [data, setData] = useState(null)
    const [inventoryData, setInventoryData] = useState(null)
    const [lineData, setLineData] = useState(null)

    useEffect(() => {
        toyService.getPricesPerLabel().then(pricesMap => {
            const labels = Object.keys(pricesMap)
            const avgPrices = labels.map(label => pricesMap[label].avgPrice)

            setData({
                labels,
                datasets: [
                    {
                        label: 'Average Price per Label',
                        data: avgPrices,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            })
        })

        toyService.getInventoryByLabel().then(inventoryMap => {
            const labels = Object.keys(inventoryMap)
            const percentages = labels.map(label => inventoryMap[label].percent)

            setInventoryData({
                labels,
                datasets: [
                    {
                        label: 'In Stock Percentage per Label',
                        data: percentages,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            })
        })
        const datesLabels = Array.from({ length: 7 }, () => utilService.getRandomDate(30))
        const values = datesLabels.map(() => Math.floor(Math.random() * 100) + 10)

        setLineData({
            labels: datesLabels,
            datasets: [
                {
                    label: 'Random Values Over Time',
                    data: values,
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    tension: 0.3
                }
            ]
        })
    }, [])

    if (!data) return <div>Loading...</div>

    return (
        <section className="my-chart">
            <h2>Toys Dashboard</h2>
            <h1>Bar Chart- Average Toys Prices per Label</h1>
            <Bar data={data} />

            {inventoryData && (
                <>
                    <h1>Bar Chart- In Stock Percentage per Label</h1>
                    <Bar data={inventoryData} />
                </>
            )}

            <h1>Line Chart - Random Values Over Time</h1>
            <Line data={lineData} />
        </section>
    )
}