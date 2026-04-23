export type Palette = {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
};

export type BirthdayData = {
    name: string;
    palette: Palette;
    traits: string[];
};