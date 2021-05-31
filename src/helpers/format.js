function formattedDate(d = new Date()) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${day}/${month}/${year}`;
}

function fomattedPhoneNumber(number = '00000000000', type) {
  const numberStr = number.toString();
  switch (type) {
    case 'byThree':
      return `(${numberStr.substr(0, 2)}) ${numberStr.substr(
        2,
        3
      )} ${numberStr.substr(5, 3)} ${numberStr.substr(8, 3)}`;
    case 'byFive':
      return `(${numberStr.substr(0, 2)}) ${numberStr.substr(
        2,
        5
      )}-${numberStr.substr(7, 4)}`;
    default:
      return;
  }
}

export { formattedDate, fomattedPhoneNumber };
