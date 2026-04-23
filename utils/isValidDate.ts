function isValidDate(year?: number, month?: number, day?: number): boolean {
    if (year === undefined || isNaN(year) || year < 1000 || year > 9999) return false;
    if (month === undefined || isNaN(month)) return true;
    if (month < 1 || month > 12) return false;
    if (day === undefined || isNaN(day)) return true;
    return day >= 1 && day <= new Date(year, month, 0).getDate();
}

export default isValidDate;