function seedDate(year: number, month: number, day: number, extra?: number) {
    const seed = month * 31 + day * 97 + year * 367 + month * day * 7 + day * year * 3 + (extra ?? 0);
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export default seedDate;