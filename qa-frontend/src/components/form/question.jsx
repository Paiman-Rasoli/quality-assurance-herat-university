const Question = ({ register, errors, name, question }) => {
  return (
    <div className="my-3">
      <label htmlFor="q1">{question}</label>
      <article className="flex flex-wrap gap-5">
        <div className="flex gap-1">
          <label htmlFor="a1">خیلی زیاد</label>
          <input
            {...register(`${name}`)}
            type="radio"
            id="q1"
            value="خیلی زیاد"
          />
        </div>

        <div className="flex gap-1">
          <label htmlFor="a1"> زیاد</label>
          <input {...register(`${name}`)} type="radio" id="q1" value="زیاد" />
        </div>

        <div className="flex gap-1">
          <label htmlFor="a1">متوسط</label>
          <input {...register(`${name}`)} type="radio" id="q1" value="متوسط" />
        </div>

        <div className="flex gap-1">
          <label htmlFor="a1">کم</label>
          <input {...register(`${name}`)} type="radio" id="q1" value="کم" />
        </div>

        <div className="flex gap-1">
          <label htmlFor="a1">خیلی کم</label>
          <input
            {...register(`${name}`)}
            type="radio"
            id="q1"
            value="خیلی کم"
          />
        </div>
        {errors[name] && (
          <p className="text-red-500 text-xs">{errors[name]?.message}</p>
        )}
      </article>
    </div>
  );
};

export default Question;
