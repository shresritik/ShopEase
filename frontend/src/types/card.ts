export type CardFunction = (props: {
  img: string;
  price: number;
  title: string;
  qty: number;
  category: string;
}) => string;
