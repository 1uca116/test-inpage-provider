import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  LinearScale,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

type ChartTestProps = {
  testData?: { network: string; usdValue: number }[];
};
const ChartTest = (props: ChartTestProps) => {
  const labels = props.testData?.map((x) => x.network);
  const newData = {
    labels,
    datasets: [
      {
        data: props.testData?.map((x) => x.usdValue),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div style={{ height: '100%', width: '100%', maxHeight: '320px' }}>
      <Doughnut data={newData} width={150} />
    </div>
  );
};

export default ChartTest;
