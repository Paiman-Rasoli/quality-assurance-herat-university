import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import { httpGetReport } from "../../../services/report";
import { BarChart } from "../barChart";
import { ToastMsg } from "../../TaostMsg";
import { toast } from "react-toastify";
import Table from "./table";

const SubjectReport = ({
  teacherId,
  year,
  semester_type,
  semester,
  subjectId,
  setSelected,
}) => {
  const [loading, setLoading] = useState(false);
  const [reports, setReport] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await httpGetReport(
          {
            semester,
            teacherId,
            year: new Date(year).getFullYear(),
            semester_type,
            subjectId,
          },
          "subject"
        );
        setResponse(res);
        const reports = await res.json();
        setReport(reports);
        const temp = [];
        for (const [key, value] of Object.entries(reports.result)) {
          temp.push({ label: key, percent: value.percent, subs: value.subs });
        }
        setChartData(temp);
      } catch (error) {
        console.log("error");
        response.status === 404
          ? toast.warning(<ToastMsg text="دیتا وجود ندارد" />, {
              position: "top-center",
            })
          : toast.warning(<ToastMsg text={"خطا در بارگیری دیتا"} />, {
              position: "top-center",
            });
      } finally {
        setLoading(false);
      }
    })();
  }, [semester, semester_type, subjectId, teacherId, year]);
  if (loading) return <Loading />;

  if (response?.status === 404)
    return (
      <section className="w-full grid">
        <div className="mb-10 flex flex-wrap w-full justify-end gap-5">
          <button
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => setSelected(null)}
          >
            گزارش جدید
          </button>
        </div>
        <div className="grid place-content-center">اطلاعاتی یافت نشد</div>
      </section>
    );

  return (
    <section className="font-vazirBold p-2 md:p-5 lg:p-10 w-full">
      <div className="mb-10 flex flex-wrap w-full justify-end gap-5">
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setSelected(null)}
        >
          گزارش جدید
        </button>
      </div>
      <ul className="grid grid-cols-2 bg-cyan-200 rounded py-5 px-10">
        <li className="flex gap-3">
          <span>فورم آیدی:</span>
          <span>{reports?.formId}</span>
        </li>
        <li className="flex gap-3">
          <span>استاد:</span>
          <span>{reports?.teacher?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>مضمون:</span>
          <span>{reports?.subject?.name}</span>
        </li>
        <li className="flex gap-3">
          <span>سال:</span>
          <span>{reports?.year}</span>
        </li>
        <li className="flex gap-3">
          <span>سمستر:</span>
          <span>
            {reports?.semester_type}
            {" - "}
            {reports?.semester}
          </span>
        </li>
      </ul>
      <article>
        <Table points={chartData} />
      </article>
      <div>
        {chartData?.length > 0 && (
          <BarChart
            chartData={chartData}
            label="نمودار فیصدی سوالات"
            y_label="درصدی"
            x_label="آیدی سوال"
            title=" چارت نشان دهنده فیصدی نمرات همه سوالات تایید شده است."
          />
        )}
      </div>
    </section>
  );
};

export default SubjectReport;
