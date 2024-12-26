import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const formatDate = (dateString) => {

  // Convert the date string to the Asia/Ho_Chi_Minh timezone
  const date = dayjs(dateString).utc().tz("Asia/Ho_Chi_Minh", true); // Treat input as UTC time first

  // Format the date as 'DD-MM-YYYY HH:mm A'
  return date.format("DD-MM-YYYY HH:mm A");
};

export default formatDate;