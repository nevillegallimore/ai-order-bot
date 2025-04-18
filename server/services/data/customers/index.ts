// import internal dependencies
import { CountryCode, Customer } from '@shared/models';
import { Filter } from '@shared/types';
import data from './customers.json';

////////////////////////////////////////////////////////////////////////////////////////////////////

const customers: Customer[] = data as Customer[];

type FilterProp = 'city' | 'country' | 'id' | 'name';
const FILTER_PROPS = ['id', 'name', 'city', 'country'] as const;
const isFilterMatch = (customer: Customer, filter: Filter): boolean => {
    switch (filter.prop) {
        case 'city':
            return customer.address.city.toLowerCase() === filter.value.toLowerCase();
        case 'country':
            return customer.address.country.toLowerCase() === filter.value.toLowerCase();
        case 'id':
            return customer.id === filter.value;
        case 'name':
            return customer.name.toLowerCase() === filter.value.toLowerCase();
        default:
            return true;
    }
};

const service = {
    fetch: (query: { [key: string]: any }): Customer[] => {
        const filters: Filter[] = FILTER_PROPS.reduce((filters: Filter[], prop: FilterProp) => {
            return query[prop] ? [...filters, { prop, value: query[prop] }] : filters;
        }, []);
        console.log('[DEBUG] Runningn Fetch:', { filters, query }); // DEBUG

        let result: Customer[] = customers;
        filters.forEach((filter: Filter) => {
            result = result.filter((customer: Customer) => {
                return isFilterMatch(customer, filter);
            });
        });

        return result;
    },
};

////////////////////////////////////////////////////////////////////////////////////////////////////

export default service;
