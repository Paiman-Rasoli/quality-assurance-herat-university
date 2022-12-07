import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { httpGetReport } from "../../services/report";
import { BarChart } from "./barChart";

const TeacherReport = () => {
  const [teacherReport, setTeacherReport] = useState([]);
  const [chartData, setChartData] = useState([]);

  console.log("chart", chartData);

  useEffect(() => {
    (async function () {
      const res = await httpGetReport(
        {
          semester: 1,
          departmentId: 1,
          teacherId: 9,
          year: 2022,
          type: "بهاری",
        },
        "teacher"
      );
      console.log("-res-", res);
      const reports = await res.json();
      setTeacherReport(reports);
      setChartData(
        teacherReport?.purify?.map((item) => ({
          percent: item.percent,
          label: item.teacherId,
        }))
      );
      console.log("teacher-report", reports, teacherReport);
    })();
  }, []);

  if (teacherReport.length === 0) return <Loading />;

  return (
    <section>
      <ul>
        <li className="flex gap-3">
          <span>فاکولته</span>
          <span>{teacherReport?.department.faculty.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>دیپارتمنت</span>
          <span>{teacherReport?.department.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>فیصدی امتیازات دیپارتمنت</span>
          <span>{Number(teacherReport?.final?.percent).toFixed(1)}%</span>
        </li>
        <li className="flex gap-3">
          <span>تعداد اشتراک کننده</span>
          <span>{Number(teacherReport?.final?.subscribers)}</span>
        </li>
      </ul>
      <div>
        <span>dep</span>
        {chartData?.length > 0 && (
          <BarChart chartData={chartData} label="چارت اساتید دیپارتمنت" />
        )}
      </div>
    </section>
  );
};

export default TeacherReport;
