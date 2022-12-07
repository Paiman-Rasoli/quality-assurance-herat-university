// components/BarChart.js
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js/auto";
ChartJS.register(...registerables);

export const BarChart = ({ chartData, label }) => {
  // console.log("barChart", chartData);
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>{label}</h2>
      <Bar
        options={{
          scales: {
            y: {
              title: { display: true, text: "درصدی" },
              max: 100,
            },
            x: {
              title: { display: true, text: "آیدی" },
            },
          },
          plugins: {
            title: {
              display: true,
              text: " چارت نشان دهنده فیصدی نمرات همه اساتید دیپارتمنت است.",
            },
          },
        }}
        data={{
          labels: [...chartData?.map((item) => item.label)],
          datasets: [
            {
              axis: "y",
              label: "نمودار فیصدی اساتید",
              data: [...chartData?.map((item) => item.percent)],
              fill: true,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};
