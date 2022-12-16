import useFetch from "../../../hooks/useFetch";
import Loading from "../../loading";

const Table = ({ points }) => {
  const { loading: laodingdata, data: questions, error } = useFetch("question");

  const filterdQuestions = questions
    ?.filter((item) => item.status)
    ?.map(
      (item) =>
        points
          .map(
            (q) =>
              item.id === +q.label && {
                question: item,
                percent: q.percent,
                subs: q.subs,
              }
          )
          .filter((item) => item)[0]
    );

  if (laodingdata) return <Loading />;

  if (error)
    return (
      <div className="grid place-content-center">
        somthing went wrong with connection to database
      </div>
    );

  return (
    <section className="my-5">
      <div className="p-5 rounded-xl bg-gray-100">
        <h4 className="font-vazir text-xl">
          {" "}
          لیست سوالات ، امتیازات و تعداد پاسخ ها مربوطه آنها
        </h4>
        <div className="mt-5 shadow-sm ring-1 ring-black ring-opacity-5 text">
          <table
            className="min-w-full divide-y divide-gray-300 font-vazir"
            dir="rtl"
          >
            <thead dir="rtl" className="text-base">
              <tr className="divide-x divide-x-reverse divide-gray-200">
                <th
                  scope="col"
                  className="w-[3rem] py-3.5 pr-4 pl-4 text-right font-semibold text-gray-900 sm:pr-6"
                >
                  شماره (Id)
                </th>
                <th
                  scope="col"
                  className="max-w-[40rem] px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  متن سوال
                </th>

                <th
                  scope="col"
                  className="px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  فیصدی نمرات
                </th>
                <th
                  scope="col"
                  className="px-4 py-3.5 text-right font-semibold text-gray-900"
                >
                  تعداد پاسخ ها
                </th>
              </tr>
            </thead>
            <tbody dir="rtl" className="divide-y divide-gray-200 bg-white">
              {filterdQuestions?.map((item) => (
                <tr
                  key={item.question.id}
                  className="divide-x divide-x-reverse divide-gray-200"
                >
                  <td className="whitespace-nowrap p-2 lg:p-4  font-medium text-gray-900">
                    {item.question.id}
                  </td>

                  <td className="max-w-[40rem] p-2 lg:p-4  text-gray-700">
                    <p>{item.question.text}</p>
                  </td>

                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    % {(+item.percent).toFixed(1)}
                  </td>
                  <td className="whitespace-nowrap p-2 lg:p-4  text-gray-700">
                    {item.subs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Table;
