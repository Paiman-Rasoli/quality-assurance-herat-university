import React, { useEffect, useState } from "react";
import Loading from "../../loading";
import { httpGetReport } from "../../../services/report";
import { BarChart } from "../barChart";
import { ToastMsg } from "../../TaostMsg";
import { toast } from "react-toastify";

const FacultyReport = ({ teacherId, year, semester_type }) => {
  const [loading, setLoading] = useState(false);
  const [teacherReport, setTeacherReport] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [response, setResponse] = useState(null);

  console.log("chart", chartData, {
    facultyId: 1,
    year: 2022,
    semester_type: "بهاری",
  });

  useEffect(() => {
    (async function () {
      try {
        console.log("resss");
        // setLoading(true);
        const res = await httpGetReport(
          {
            facultyId: 1,
            year: 2022,
            semester_type: "بهاری",
          },
          "faculty"
        );
        console.log("res-faculty-report");
        setResponse(res);

        const reports = await res.json();
        console.log("res-faculty-report", reports);
        setTeacherReport(reports);
        setChartData(
          reports?.purifySubject?.map((item) => ({
            percent: item?.percent,
            label: item?.subject?.name,
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
      faculty
    </section>
  );
};

export default FacultyReport;
