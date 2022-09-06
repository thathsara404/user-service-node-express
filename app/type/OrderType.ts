'use strict';

import { Date, ObjectId } from 'mongoose';

export interface IOrder {
    orderId: ObjectId,
    userId: ObjectId,
    total: number,
    items: Array<ObjectId>,
    date: Date
}

