import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { httpGetReport } from "../../services/report";
import { BarChart } from "./barChart";

const DepartmentReport = () => {
  const [depReport, setDepReport] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(null);

  console.log("chart", chartData);

  useEffect(() => {
    (async function () {
      const res = await httpGetReport(
        {
          semester: 1,
          departmentId: 1,
          year: 2022,
          type: "بهاری",
        },
        "department"
      );
      setResponse(res);
      const reports = await res.json();
      setDepReport(reports);
      setChartData(
        reports?.teachersRep?.map((item) => ({
          percent: item?.percent,
          label: item?.teacherId,
        }))
      );
      console.log("dep-report", reports, depReport);
    })();
  }, []);

  if (depReport.length < 1) return <Loading />;
  if (response.status === 404) return <section>اطلاعاتی یافت نشد</section>;

  return (
    <section>
      <ul>
        <li className="flex gap-3">
          <span>فاکولته</span>
          <span>{depReport?.department?.faculty?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>دیپارتمنت</span>
          <span>{depReport?.department?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>فیصدی امتیازات دیپارتمنت</span>
          <span>
            {Number(depReport?.total?.percent).toFixed(1).toString()}%
          </span>
        </li>
        <li className="flex gap-3">
          <span>تعداد اشتراک کننده</span>
          <span>{Number(depReport?.total?.subscribers)}</span>
        </li>
      </ul>
      <div>
        <span>dep</span>
        {chartData?.length > 0 && <BarChart chartData={chartData} />}
      </div>
    </section>
  );
};

export default DepartmentReport;
