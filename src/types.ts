export interface Event {
  id: string;
  year: number;
  text: string;
}

export interface Point {
  id: string;
  initYear: number;
  lastYear: number;
  name: string;
  events: Event[];
}
