export interface DayItem {
  day: number;
  date: Date;
  dayOfWeek: number;
  isToday: boolean;
}

export interface MessMenu {
  Breakfast?: string[];
  Lunch?: string[];
  Dinner?: string[];
}


export  interface FoodCardListProps {
  data: FoodCourt[];
}
export interface FoodCourt {
  id: number;
  image: string;
  name: string;
  distance: string;
  location: string;
  priceRange: string;
  famousFor: string;
  landmark: string;
  timing: {
    [key: string]: string; // The key is a day or category, and the value is the timing string
  };
}