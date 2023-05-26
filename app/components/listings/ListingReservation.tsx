'use client'

import Calendar from '@/app/inputs/Calendar';
import { Value } from '@prisma/client/runtime';
import { DateRange, Range } from 'react-date-range'
import Button from '../button';

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (Value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[]

}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabledDates,
    disabled
}) => {
    return (
        <div
            className='
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
        '
        >
            <div className='
            flex
            flex-row
            items-center
            gap-1
            p-4
                        '>
                <div className='text-2xl font-semibold'>
                    $ {price}
                </div>
                <div className='font-light text-neutral-600'>
                    night
                </div>
            </div>
            <hr />
            <Calendar disabledDates={disabledDates} onChange={({ range1 }) => {
                onChangeDate(range1)
            }} value={dateRange} />
            <hr />
            <div className="p-4">
                <Button
                    disabled={disabled}
                    label="Reserve"
                    onClick={onSubmit}
                />
            </div>

            <hr />
            <div className='
            p-4
            flex
            flex-row
            items-center
            justify-between
            font-semibold
            text-lg'
            >
                <div>Total</div>
                <div>$ {totalPrice}</div>
            </div>
        </div>
    );
};

export default ListingReservation;