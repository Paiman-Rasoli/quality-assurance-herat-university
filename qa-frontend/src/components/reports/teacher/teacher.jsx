import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import { httpGetReport } from "../../../services/report";
import { BarChart } from "../barChart";
import { ToastMsg } from "../../TaostMsg";
import { toast } from "react-toastify";

const TeacherReport = () => {
  const [loading, setLoading] = useState(false);
  const [teacherReport, setTeacherReport] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(null);

  console.log("chart", chartData);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await httpGetReport(
          {
            departmentId: 1,
            teacherId: 9,
            year: 2022,
            semester_type: "بهاری",
          },
          "teacher"
        );
        setResponse(res);
        const reports = await res.json();
        console.log("-res-teacher-report", reports);
        setTeacherReport(reports);
        setChartData(
          reports?.purifySubject?.map((item) => ({
            percent: item?.percent,
            label: item?.subject?.name,
          }))
        );
        console.log("teacher-report", reports);
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
          <span>نام و تخلص</span>
          <span>{teacherReport?.purifyTeachers?.teacher?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>فاکولته</span>
          <span>{teacherReport?.department?.faculty?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>دیپارتمنت</span>
          <span>{teacherReport?.department?.fa_name}</span>
        </li>
        <li className="flex gap-3">
          <span>سال</span>
          <span>{teacherReport?.year}</span>
        </li>
        <li className="flex gap-3">
          <span>سمستر</span>
          <span>{teacherReport?.semester_type}</span>
        </li>
      </ul>

      <article className="flex gap-2 flex-wrap justify-around m-5">
        <div className="flex gap-3 bg-orange-300 rounded p-3">
          <span>فیصدی امتیازات استاد</span>
          <span>
            {Number(teacherReport?.purifyTeachers?.percent).toFixed(1)}%
          </span>
        </div>

        <div className="flex gap-3 bg-orange-300 rounded p-3">
          <span>تعداد اشتراک کننده</span>
          <span>{Number(teacherReport?.purifyTeachers?.subscribers)}</span>
        </div>
      </article>
      <div>
        {chartData?.length > 0 && (
          <BarChart
            chartData={chartData}
            label="نمودار فیصدی مضامین"
            title="چارت نشان دهنده امتیازات مضامین است"
            x_label="مضمون"
            y_label="درصدی"
          />
        )}
      </div>
    </section>
  );
};

export default TeacherReport;
