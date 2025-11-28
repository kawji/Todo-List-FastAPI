import { CardDoProps } from "./cardtodo"
export type ContextType = {
    data:CardDoProps[];
    setdata: React.Dispatch<React.SetStateAction<CardDoProps[]>>;
}