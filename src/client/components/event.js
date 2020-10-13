import React, { useState, useEffect } from 'react';
import api from '../api';
import css from './event.scss';
import DayPicker from './day-picker';
import Talks from './talks/talks';

const useEventData = () => {
    const [state, setState] = useState({
        event: null,
        error: null,
        loading: true,
    });

    useEffect(() => {
        api.getEvent()
            .then(event => {
                setState({
                    ...state,
                    event,
                    loading: false,
                    error: null
                });
            })
            .catch(error => {
                setState({
                    ...state,
                    error,
                    event: null,
                    loading: false
                });
            });
    }, []);

    return state;
}

const Event = () => {
    const [selectedDay, setSelectedDay] = React.useState(0);
    const { event, loading, error } = useEventData();

    if (loading) return null;
    if (error) return 'Something went wrong... >:(';

    return (
        <div className={css['event']}>
            <h2 title={event.name.en}>{event.name.en}</h2>

            <DayPicker 
                startDate={event.date_from}
                endDate={event.date_to}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
            />

            <Talks
                event={event.slug} // don't really need the slug because we only work with democon, but passing it along to keep things close to a real implementation
                startDate={event.date_from}
                selectedDay={selectedDay}
            />
        </div>
    );
}

export default Event;