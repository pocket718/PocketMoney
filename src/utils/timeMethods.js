import moment from 'moment';

export const getTime12HFormat = time => {
  return moment(time).format('hh:mm');
};

export const getDateMonthYearFormat = time => {
  return moment(time).format('DD MMM YYYY');
};

export const getAmPm = time => {
  return moment(time).format('a');
};

export const yyyyMmDd = time => {
  return moment(time).format('YYYY-MM-DD');
};

export const monthFromIndex = month => {
  let monthsArray = [
    {
      name: 'January',
      shortName: 'Jan',
      length: 31,
      index: 0,
      number: 1,
    },
    {
      name: 'February',
      shortName: 'Feb',
      length: 28,
      index: 1,
      number: 2,
    },
    {
      name: 'March',
      shortName: 'Mar',
      length: 31,
      index: 2,
      number: 3,
    },
    {
      name: 'April',
      shortName: 'Apr',
      length: 30,
      index: 3,
      number: 4,
    },
    {
      name: 'May',
      shortName: 'May',
      length: 31,
      index: 4,
      number: 5,
    },
    {
      name: 'June',
      shortName: 'Jun',
      length: 30,
      index: 5,
      number: 6,
    },
    {
      name: 'July',
      shortName: 'Jul',
      length: 31,
      index: 6,
      number: 7,
    },
    {
      name: 'August',
      shortName: 'Aug',
      length: 31,
      index: 7,
      number: 8,
    },
    {
      name: 'September',
      shortName: 'Sep',
      length: 30,
      index: 8,
      number: 9,
    },
    {
      name: 'October',
      shortName: 'Oct',
      length: 31,
      index: 9,
      number: 10,
    },
    {
      name: 'November',
      shortName: 'Nov',
      length: 30,
      index: 10,
      number: 11,
    },
    {
      name: 'December',
      shortName: 'Dec',
      length: 31,
      index: 11,
      number: 12,
    },
  ];
  return monthsArray[month];
};

export const getTimeInMinutes = time => {
  let duration = 0;
  let hM = time?.split(':');
  if (hM?.length == 2) {
    let hour = parseInt(hM[0]);
    duration = parseInt(hM[1]) + hour * 60;
  }
  return duration;
};

export const mergeDateAndTime = (date, time) => {
  return date + ' ' + time;
};

export const getDeadline = (date, duration) => {
  let tempDate = new Date(date);
  let deadline = new Date(tempDate.getTime() + duration * 60 * 1000);
  let month = monthFromIndex(deadline.getMonth()).number;
  let year = deadline.getFullYear();
  let day = deadline.getDate();
  let hour = deadline.getHours();
  let minutes = deadline.getMinutes();
  let time =
    (hour < 10 ? '0' : '') + hour + ':' + (minutes < 10 ? '0' : '') + minutes;
  return (
    year +
    '-' +
    (month < 10 ? '0' : '') +
    month +
    '-' +
    (day < 10 ? '0' : '') +
    day +
    ' ' +
    time
  );
};

export const getDateFromCompleteDate = date => {
  return moment(date).format('DD');
};

export const getMonthFromCompleteDate = date => {
  return moment(date).format('MMM');
};

export const getWeekDayFromCompleteDate = date => {
  return moment(date).format('ddd');
};

export const getYearFromCompleteDate = date => {
  return moment(date).format('YYYY');
};

export const getTimeFromSeconds = seconds => {
  let minute = parseInt(seconds / 60);
  let second = seconds - minute * 60;
  return `${minute < 10 ? '0' : ''}${minute}:${
    second < 10 ? '0' : ''
  }${second}`;
};

export const getPreviousDate = (age = 16) => {
  let currentDate = new Date();
  let newDate = currentDate.getTime() - age * 365 * 24 * 60 * 60 * 1000;
  return yyyyMmDd(new Date(newDate));
};

export const getAgeFromDob = dob => {
  if (!dob) return '';

  let dobdate = new Date(dob).getTime();
  let difference = new Date().getTime() - dobdate;
  let age = new Date(difference).getFullYear() - 1970;
  return age;
};

export const getWeeklyDays = (firstDate, secondDate) => {
  let first = new Date(firstDate);
  let second = new Date(secondDate);
  let firstWeekDay = first.getDay();
  let secondWeekDay = second.getDay();
  let weekDiff = firstWeekDay - secondWeekDay;
  let response = [];
  if (first.getTime() < second.getTime()) {
    response.push(firstDate);
    let secondTempDate = new Date(
      second.getTime() +
        ((weekDiff >= 0 ? 0 : 7) + weekDiff) * 24 * 60 * 60 * 1000,
    );
    secondTempDate = yyyyMmDd(secondTempDate);
    response.push(secondTempDate);
  } else {
    let secondTempDate = new Date(
      second.getTime() -
        ((weekDiff >= 0 ? 7 : 0) - weekDiff) * 24 * 60 * 60 * 1000,
    );
    secondTempDate = yyyyMmDd(secondTempDate);
    response.push(secondTempDate);
    response.push(firstDate);
  }
  return response;
};

export const isTaskActive = date => {
  let taskdate = new Date(date);
  let currentDate = new Date();
  return currentDate.getTime() >= taskdate.getTime();
};
