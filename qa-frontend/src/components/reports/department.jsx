import React, { useEffect, useState } from "react";
import { httpGetReport } from "../../services/report";
import Loading from "../loading";
import Chart from "./chart";

const DepartmentReport = () => {
  const [depReport, setDepReport] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await httpGetReport(
        {
          semester: 1,
          // teacherId: 9,
          departmentId: 1,
          year: 2022,
          type: "بهاری",
        },
        "department"
      );
      const reports = await res.json();
      setDepReport(reports);
      console.log("dep-report", reports, depReport);
    })();
  }, []);

  if (depReport.length === 0) return <Loading />;

  return (
    <section>
      <ul>
        <li className="flex gap-3">
          <span>فاکولته</span>
          <span>{depReport?.department.faculty.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>دیپارتمنت</span>
          <span>{depReport?.department.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>فیصدی امتیازات دیپارتمنت</span>
          <span>{Number(depReport?.final?.percent).toFixed(1)}%</span>
        </li>
        <li className="flex gap-3">
          <span>تعداد اشتراک کننده</span>
          <span>{Number(depReport?.final?.subscribers)}</span>
        </li>
      </ul>
      <div>
        <span>dep</span>
        <Chart />
      </div>
    </section>
  );
};

export default DepartmentReport;
