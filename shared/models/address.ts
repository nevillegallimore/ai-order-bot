export type CountryCode = 'CA' | 'US';

export const CountryCode = {
    CA: 'CA',
    US: 'US',
} as const;

export const CountryName = {
    CA: 'Canada',
    US: 'United States',
};

export interface Address {
    street: string;
    postal: string;
    city: string;
    country: CountryCode;
}
