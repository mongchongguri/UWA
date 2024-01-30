function DateFormat(dateTimeString) {
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    new Date(dateTimeString)
  );
  return formattedDate.replace(
    /(\d{2})\/(\d{2})\/(\d{2}), (\d{2}):(\d{2})/,
    "$3.$1.$2 $4:$5"
  );
}

export default DateFormat;
