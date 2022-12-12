import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { httpGetReport } from "../../services/report";
import { BarChart } from "./barChart";
import { toast } from "react-toastify";
import { ToastMsg } from "../TaostMsg";

const DepartmentReport = () => {
  const [loading, setLoading] = useState(false);
  const [depReport, setDepReport] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(null);

  console.log("chart", chartData);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const res = await httpGetReport(
          {
            departmentId: 2,
            year: 2022,
            semester_type: "بهاری",
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
      } catch (error) {
        toast.warning(<ToastMsg text={"خطا در بارگیری دیتا"} />);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    <div>
      <Loading />
    </div>;

  if (response?.status === 404) return <section>اطلاعاتی یافت نشد</section>;

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <ul className="grid grid-cols-2 bg-cyan-200 rounded py-5 px-10">
        <li className="flex gap-3">
          <span>فاکولته</span>
          <span>{depReport?.department?.faculty?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>دیپارتمنت</span>
          <span>{depReport?.department?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>سال</span>
          <span>{depReport?.year}</span>
        </li>
        <li className="flex gap-3">
          <span>سمستر</span>
          <span>{depReport?.semester_type}</span>
        </li>
      </ul>

      {depReport?.total?.subscribers === 0 ? (
        <div>هنوز هیچ کسی اشتراک نکرده</div>
      ) : (
        <>
          <article className="flex gap-2 flex-wrap justify-around m-5">
            <div className="flex gap-3 bg-orange-300 rounded p-3">
              <span>فیصدی امتیازات دیپارتمنت</span>
              <span>
                {Number(depReport?.total?.percent).toFixed(1).toString()}%
              </span>
            </div>
            <div className="flex gap-3 bg-orange-300 rounded p-3">
              <span>تعداد اساتید شامل این گزارش</span>
              <span>{depReport?.teachersRep?.length}</span>
            </div>
            <div className="flex gap-3 bg-orange-300 rounded p-3">
              <span>تعداد مضامین شامل این گزارش</span>
              <span>{depReport?.totalSubject}</span>
            </div>
            <div className="flex gap-3 bg-orange-300 rounded p-3">
              <span>تعداد اشتراک کننده</span>
              <span>{Number(depReport?.total?.subscribers)}</span>
            </div>
          </article>
          <div>
            {chartData?.length > 0 && <BarChart chartData={chartData} />}
          </div>
        </>
      )}
    </section>
  );
};

export default DepartmentReport;
