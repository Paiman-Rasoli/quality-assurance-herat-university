import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import { httpGetReport } from "../../../services/report";
import { BarChart } from "../barChart";
import { toast } from "react-toastify";
import { ToastMsg } from "../../TaostMsg";

const DepartmentReportChart = ({ departmentId, year, semester_type }) => {
  const [loading, setLoading] = useState(false);
  const [depReport, setDepReport] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await httpGetReport(
          {
            departmentId: departmentId,
            year: new Date(year).getFullYear(),
            semester_type: semester_type,
          },
          "department"
        );
        setResponse(res);
        const reports = await res.json();
        setDepReport(reports);
        setChartData(
          reports?.teachersRep?.map((item) => ({
            percent: item?.percent,
            label: item?.teacher.fa_name,
          }))
        );
      } catch (error) {
        toast.warning(<ToastMsg text={"خطا در بارگیری دیتا"} />);
      } finally {
        setLoading(false);
      }
    })();
  }, [departmentId, semester_type, year]);

  if (loading) return <Loading />;

  if (response?.status === 404) return <section>اطلاعاتی یافت نشد</section>;

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <ul className="grid grid-cols-2 bg-cyan-200 rounded py-5 px-10">
        <li className="flex gap-3">
          <span>فاکولته:</span>
          <span>{depReport?.department?.faculty?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>دیپارتمنت:</span>
          <span>{depReport?.department?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>سال:</span>
          <span>{depReport?.year}</span>
        </li>
        <li className="flex gap-3">
          <span>سمستر:</span>
          <span>{depReport?.semester_type}</span>
        </li>
      </ul>

      {depReport?.total?.subscribers === 0 ? (
        <div>هنوز کسی اشتراک نکرده</div>
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
              <span>{depReport?.total?.subscribers}</span>
            </div>
          </article>
          <div>
            {chartData?.length > 0 && (
              <BarChart
                chartData={chartData}
                label="نمودار فیصدی اساتید"
                y_label="درصدی"
                x_label="استاد"
                title=" چارت نشان دهنده فیصدی نمرات همه اساتید دیپارتمنت است."
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default DepartmentReportChart;
