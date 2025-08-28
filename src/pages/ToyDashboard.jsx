import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export function ToyDashboard() {
    const [data, setData] = useState(null)

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
    }, [])

    if (!data) return <div>Loading...</div>

    return (
        <section className="my-chart">
            <h1>Bar Chart- Average Toys Prices per Label</h1>
            {/* <Pie data={data} /> */}
            <Bar data={data} />
        </section>
    )

}