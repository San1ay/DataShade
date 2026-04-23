import getDayDetails from "./getDayDetails";

function getCurrentDateDetails(year?: number, month?: number, day?: number,) {

    const ref = new Date();
    const y = (year && !isNaN(year)) ? year : ref.getFullYear();
    const m = (month && !isNaN(month)) ? month : ref.getMonth() + 1;
    const d = (day && !isNaN(day)) ? day : ref.getDate();

    return getDayDetails(y, m, d);
}

export default getCurrentDateDetails;