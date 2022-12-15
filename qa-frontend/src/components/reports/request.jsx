import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { httpGetGeneralReport } from "../../services/report";
import { ToastMsg } from "../TaostMsg";
import { toast } from "react-toastify";
import { BarChart } from "./barChart";

const TotalReport = ({ teacherId, year, semester_type }) => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(null);
  const reqest = {
    year: 2022,
    semester_type: "بهاری",
  };
  console.log("chart", chartData, reqest);

  useEffect(() => {
    (async function () {
      try {
        console.log("report req");
        // setLoading(true);
        const res = await httpGetGeneralReport(reqest);
        console.log("res-report");
        setResponse(res);

        const reports = await res.json();
        console.log("res-faculty-report", reports);
        setReports(reports);
        setChartData(
          reports?.purifyFaculty?.map((item) => ({
            percent: item?.percent,
            label: item?.faculty.fa_name,
          }))
        );
        console.log("faclty-report", reports);
      } catch (error) {
        console.log("error");
        toast.warning(<ToastMsg text={"خطا در بارگیری دیتا"} />);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  if (response?.status === 404) return <section>اطلاعاتی یافت نشد</section>;

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <ul className="grid grid-cols-2 bg-cyan-200 rounded py-5 px-10">
        <li className="flex gap-3">
          <span>سال</span>
          <span>{reports?.year}</span>
        </li>
        <li className="flex gap-3">
          <span>سمستر</span>
          <span>{reports?.semester_type}</span>
        </li>
      </ul>

      {reports?.totalSubscribers === 0 ? (
        <div>هنوز کسی اشتراک نکرده</div>
      ) : (
        <>
          <article className="flex gap-2 flex-wrap justify-around m-5">
            <div className="flex gap-3 bg-orange-300 rounded p-3">
              <span>فیصدی امتیازات در سطح کل دانشگاه</span>
              <span>
                {Number(reports?.total?.percent).toFixed(1).toString()}%
              </span>
            </div>
            <div className="flex gap-3 bg-orange-300 rounded p-3">
              <span>تعداد فاکولته های شامل این گزارش</span>
              <span>{reports?.purifyFaculty?.length}</span>
            </div>
            <div className="flex gap-3 bg-orange-300 rounded p-3">
              <span>تعداد اشتراک کننده ها</span>
              <span>{reports?.total?.subscribers}</span>
            </div>
          </article>
          <div>
            {chartData?.length > 0 && (
              <BarChart
                chartData={chartData}
                label="نمودار فیصدی فاکولته ها"
                y_label="درصدی"
                x_label="فاکولته"
                title=" چارت نشان دهنده فیصدی نمرات همه فاکولته ها است."
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default TotalReport;
