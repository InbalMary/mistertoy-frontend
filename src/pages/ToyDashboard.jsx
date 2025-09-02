import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, TimeScale } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';
import { utilService } from '../services/util.service';
import { useTranslation } from 'react-i18next'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, TimeScale);

export function ToyDashboard() {
    const [avgPriceData, setAvgPriceData] = useState(null)
    const [inventoryData, setInventoryData] = useState(null)
    const [lineData, setLineData] = useState(null)
    const [pieData, setPieData] = useState(null)
    const [toyCount, setToyCount] = useState(0)
    const { t } = useTranslation()

    useEffect(() => {
        Promise.all([toyService.query(), toyService.getStatsPerLabel()])
            .then(([toys, statsMap]) => {
                const toyCount = toys.length
                setToyCount(toyCount)

                const labels = Object.keys(statsMap)
                const avgPrices = labels.map(label => statsMap[label].avgPrice)
                const inStockPercentages = labels.map(label => statsMap[label].percent)

                const percentagePerLabel = labels.map(label => {
                    const labelTotal = statsMap[label].total
                    return ((labelTotal / toyCount) * 100).toFixed(2)
                })
                setAvgPriceData({
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

                setInventoryData({
                    labels,
                    datasets: [
                        {
                            label: 'In Stock Percentage per Label',
                            data: inStockPercentages,
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

                setPieData({
                    labels,
                    datasets: [
                        {
                            label: 'Percentage of Toys per Label',
                            data: percentagePerLabel,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                                'rgba(0, 200, 83, 0.5)',
                                'rgba(255, 87, 34, 0.5)',

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

    if (!avgPriceData || !inventoryData || !lineData || !pieData) return <div>Loading...</div>

    return (
        <section className="my-chart">
            <h2>{t('dashboard.title')}</h2>

            <h1>{t('dashboard.avgPrice')}</h1>
            <Bar data={avgPriceData} />

            <h1>{t('dashboard.inStock')}</h1>
            <Bar data={inventoryData} />

            <h1>{t('dashboard.randomValues')}</h1>
            <Line data={lineData} />

            <h1>{t('dashboard.totalToys')}</h1>
            <Pie data={pieData} />
        </section>
    )
}