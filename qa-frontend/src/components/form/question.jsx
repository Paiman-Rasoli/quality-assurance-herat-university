const Question = ({ register, errors, name, question }) => {
  return (
    <div className="my-3 grid w-full">
      <label htmlFor={name}>{question}</label>
      <article className="flex flex-wrap gap-5 justify-around w-full m-2">
        <div className="flex gap-1">
          <label htmlFor={`${name}a1`}>خیلی زیاد</label>
          <input
            {...register(`${name}`)}
            type="radio"
            id={`${name}a1`}
            value="خیلی زیاد"
          />
        </div>

        <div className="flex gap-1">
          <label htmlFor={`${name}a2`}> زیاد</label>
          <input
            {...register(`${name}`)}
            type="radio"
            id={`${name}a2`}
            value="زیاد"
          />
        </div>

        <div className="flex gap-1">
          <label htmlFor={`${name}a3`}>متوسط</label>
          <input
            {...register(`${name}`)}
            type="radio"
            id={`${name}a3`}
            value="متوسط"
          />
        </div>

        <div className="flex gap-1">
          <label htmlFor={`${name}a4`}>کم</label>
          <input
            {...register(`${name}`)}
            type="radio"
            id={`${name}a4`}
            value="کم"
          />
        </div>

        <div className="flex gap-1">
          <label htmlFor={`${name}a5`}>خیلی کم</label>
          <input
            {...register(`${name}`)}
            type="radio"
            id={`${name}a5`}
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
