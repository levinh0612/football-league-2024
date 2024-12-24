import dayjs from "dayjs";

const formatDate = (dateString) => {
  const date = dayjs(dateString);
  const now = dayjs();
  const diffInDays = date.diff(now, "day");

  // if (diffInDays === 0) {
  //   return `Today, ${date.format("hh:mm A")}`; // Format for "Today"
  // } else if (diffInDays === 1) {
  //   return `Tomorrow, ${date.format("hh:mm A")}`; // Format for "Tomorrow"
  // } else if (diffInDays === -1) {
  //   return `Yesterday, ${date.format("hh:mm A")}`; // Format for "Yesterday"
  // } else {
  //   return date.format("DD-MM-YYYY hh:mm A"); // Default format
  // }

  return date.format("DD-MM-YYYY hh:mm A"); // Default format
};

export default formatDate;