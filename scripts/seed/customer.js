const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
const fs = require('fs/promises');
const path = require('path');

const customers = [
    {
        id: nanoid(),
        created: '2020-01-01T00:00:00.000Z',
        updated: '2024-07-01T00:00:00.000Z',
        name: 'Riverside IT Service',
        address: {
            street: '901 Riverside Avenue',
            postal: '97232',
            city: 'Portland, OR',
            country: 'US',
        },
    },
    {
        id: nanoid(),
        created: '2021-03-07T14:57:32.123Z',
        updated: '2021-03-07T14:57:32.123Z',
        name: 'LA Computing Store',
        address: {
            street: '131 Santa Maria Way',
            postal: '90013',
            city: 'Los Angeles, CA',
            country: 'US',
        },
    },
    {
        id: nanoid(),
        created: '2021-11-02T03:24:37Z.825Z',
        updated: '2021-11-02T23:55:37Z.197Z',
        name: 'Maple Electronics',
        address: {
            street: '9925 Dundas St. W',
            postal: 'M6J 1X8',
            city: 'Toronto, ON',
            country: 'CA',
        },
    },
    {
        id: nanoid(),
        created: '2022-02-27T23:55:39.752Z',
        updated: '2022-02-27T23:55:39.752Z',
        name: 'Rocky Mountain Services',
        address: {
            street: '77 Lincoln Avenue',
            postal: '80206',
            city: 'Denver, CO',
            country: 'US',
        },
    },
    {
        id: nanoid(),
        created: '2022-04-01T18:27:14.913Z',
        updated: '2022-04-01T18:27:14.913Z',
        name: 'Jasper Park Consulting',
        address: {
            street: '9055 149th Street',
            postal: 'T5R 1B9',
            city: 'Edmonton, AB',
            country: 'CA',
        },
    },
    {
        id: nanoid(),
        created: '2024-01-17T15:41:59.266Z',
        updated: '2024-03-25T12:14:44.774Z',
        name: 'MetroCity',
        address: {
            street: '1283 14th Street',
            postal: '10069',
            city: 'Manhattan, NY',
            country: 'US',
        },
    },
];

const exec = async () => {
    const filepath = path.resolve(__dirname, '../../server/services/data/customers/customers.json');
    const content = JSON.stringify(customers, undefined, 4);
    await fs.writeFile(filepath, content, 'utf-8');
    console.log(`[DEBUG] Successfully written customer data to "${filepath}".`);
};

exec();
