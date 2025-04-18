// import external dependencies
import { Customer } from '@shared/models';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// import internal dependencies

////////////////////////////////////////////////////////////////////////////////////////////////////

const Application = () => {
    const [customers, setCustomers] = useState({
        data: [],
        error: undefined,
        isErrored: false,
        isLoading: true,
    });

    const getCustomers = async () => {
        const payload = await (await fetch('http://localhost:3000/api/customers')).json();
        setCustomers(
            payload.success
                ? {
                      data: payload.data,
                      error: undefined,
                      isErrored: false,
                      isLoading: false,
                  }
                : {
                      data: [],
                      error: payload.error,
                      isErrored: true,
                      isLoading: false,
                  },
        );
    };

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <div className="application" data-component="application">
            <header className="header" data-component="header">
                <div className="application__page-width">
                    <h1 className="header__headline">Order System</h1>
                </div>
            </header>

            <div className="content">
                <div className="application__page-width">
                    <div className="content__wrapper">
                        <nav className="navigation">
                            <ul className="navigation__menu">
                                <li className="navigation__menu-item">
                                    <a
                                        className="navigation__menu-link"
                                        data-link="products"
                                        href="/products"
                                    >
                                        Products
                                    </a>
                                </li>
                                <li className="navigation__menu-item">
                                    <a className="navigation__menu-link" href="/customers">
                                        Customers
                                    </a>
                                </li>
                                <li className="navigation__menu-item">
                                    <a className="navigation__menu-link" href="/orders">
                                        Customers
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <main className="main">
                            <div
                                className="section"
                                data-component="customers"
                                data-section="Customers"
                            >
                                <div className="section__head">
                                    <div className="section__title">Customers</div>
                                </div>
                                <div className="section__body">
                                    {customers.isLoading ? (
                                        <div className="list__loading">Loading...</div>
                                    ) : customers.isErrored ? (
                                        <div className="list__error">{customers.error}</div>
                                    ) : (
                                        <ul
                                            className="list"
                                            data-component="list"
                                            data-list="customers"
                                        >
                                            {customers.data.map((customer: Customer) => (
                                                <li
                                                    className="list__item"
                                                    data-customer={customer.id}
                                                    key={customer.id}
                                                >
                                                    <div className="list__col" data-col="id">
                                                        {customer.id}
                                                    </div>
                                                    <div className="list__col" data-col="name">
                                                        {customer.name}
                                                    </div>
                                                    <div className="list__col" data-col="country">
                                                        {customer.address.country}
                                                    </div>
                                                    <div className="list__col" data-col="city">
                                                        {customer.address.city}
                                                    </div>
                                                    <div className="list__col" data-col="street">
                                                        {customer.address.street}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>

            <footer className="footer" data-component="footer">
                <div className="application__page-width">
                    <p className="footer__copyright">&copy; 2025 · Coded by Neville</p>
                </div>
            </footer>
        </div>
    );
};

Application.displayName = 'Application';

////////////////////////////////////////////////////////////////////////////////////////////////////

const root = createRoot(document.getElementById('root') as HTMLDivElement);
root.render(<Application />);
