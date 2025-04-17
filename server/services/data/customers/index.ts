// import internal dependencies
import { CountryCode, Customer } from '@shared/models';
import { Filter } from '@shared/types';
import data from './customers.json';

////////////////////////////////////////////////////////////////////////////////////////////////////

const customers: Customer[] = data as Customer[];

const service = {
    fetch: (query: typeof ): Customer[] => {
        let result = customers;
        filters.forEach((filter: Filter<Customer>) => {
            result = result.filter((customer: Customer) => {
                return customer[filter.prop] === filter.value;
            });
        });
        return result;
    },
};

////////////////////////////////////////////////////////////////////////////////////////////////////

export default service;
