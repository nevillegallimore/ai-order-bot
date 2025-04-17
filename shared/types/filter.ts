export type Filter<T> = {
    prop: keyof T;
    value: string;
}
