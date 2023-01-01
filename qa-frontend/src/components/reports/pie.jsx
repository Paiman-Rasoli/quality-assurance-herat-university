// components/BarChart.js
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(...registerables);
export const PieChart = ({ chartData, label, x_label }) => {
  // console.log("barChart", chartData);
  return (
    <div
      dir="rtl"
      className="m-5 border-2 p-2 rounded-2xl border-red-200 shadow-lg font-vazirBold"
    >
      <h6 className="text-gray-700">{label}</h6>
      <Pie
        plugins={[ChartDataLabels]}
        options={{
          layout: { padding: 15 },
          plugins: {
            datalabels: {
              formatter: (val) => {
                return (+val).toFixed(0);
              },
            },
            tooltip: {
              callbacks: {
                title: function (context) {
                  return `${x_label + " " + context[0].label}`;
                },
              },
              titleFont: { size: "14px" },
            },
          },
        }}
        data={{
          labels: [...chartData?.map((item) => item.label)],
          datasets: [
            {
              axis: "y",
              label: label,
              data: [...chartData?.map((item) => item.percent)],
              fill: true,
              backgroundColor: [
                "#eab308",
                "#f87171",
                "#06b6d4",
                "#f59e0b",
                "#10b981",
                "#8b5cf6",
                "#facc15",
                "#fb923c",
                "#ec4899",
                "#6366f1",
                "#2563eb",
                "#3b82f6",
                "#e11d48",
                "#f43f5e",
                "#84cc16",
                "#a855f7",
                "#db2777",
                "#0ea5e9",
                "#22c55e",
                "#14b8a6",
              ],
              hoverOffset: 20,
            },
          ],
        }}
      />
    </div>
  );
};
