export function buildPathSegments(
  object,
  year = "2023",
  monthYear = "01-2023",
  user = "admin",
) {
  const commonPathSegments = [
    "users",
    "user",
    "years",
    "year",
    "months",
    "monthYear",
  ];
  commonPathSegments.forEach((item, index, array) => {
    if (item === "user") {
      array[index] = user;
    }
    if (item === "year") {
      array[index] = year;
    }
    if (item === "monthYear") {
      array[index] = monthYear;
    }
  });
  commonPathSegments.push(object);
  return commonPathSegments;
}
