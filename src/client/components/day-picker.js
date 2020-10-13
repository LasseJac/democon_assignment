import React from 'react';
import css from './day-picker.scss';

const calculateEventDuration = (start, end) => {
    const duration = new Date(end) - new Date(start);

    return (duration / 1000 / 24 / 60 / 60) + 1;
};

const DayPicker = props => {
    const eventDuration = calculateEventDuration(props.startDate, props.endDate);

    return (
        <div className={css['day-picker']}>
            {Array(eventDuration).fill().map((_, i) => {
                const date = new Date(props.startDate);

                date.setDate(date.getDate() + i);

                const selected = props.selectedDay === i;

                return (
                    <div 
                        className={selected ? `${css['day']} ${css['selected']}` : css['day']}
                        onMouseDown={() => props.setSelectedDay(i)}
                    >
                        {date.toDateString()}
                    </div>
                );
            })}
        </div>
    );
};

export default DayPicker;