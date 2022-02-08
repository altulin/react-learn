import React from 'react';
type Order = number
export const OrderContext = React.createContext<Order>({} as Order);
