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
        options={{
          responsive: true,
          title: {
            display: true,
            text: "COVID-19 Cases of Last 3 Months",
            fontSize: 15,
          },
          legend: {
            display: true, //Is the legend shown?
            position: "top", //Position of the legend.
          },
        }}
      />
    </div>
  );
};
