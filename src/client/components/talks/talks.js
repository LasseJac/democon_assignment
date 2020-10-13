import React, { useState, useEffect, useMemo } from 'react';
import Details from './details';
import api from '../../api';
import css from './talks.scss';

const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() 
        && date1.getMonth() === date2.getMonth() 
        && date1.getDate() === date2.getDate();
};

// Creates a time-based ID for a given talk so it can be placed into a timeBlock (more context below)
const getHoursMinutes = (date) => {
    return date.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute:'2-digit'
    });
};

const useTalksData = (event) => {
    const [state, setState] = useState({
        talks: null,
        error: null,
        loading: true,
    });

    useEffect(() => {
        api.getTalks(event)
            .then(talks => {
                setState({
                    ...state,
                    talks,
                    loading: false,
                    error: null
                });
            })
            .catch(error => {
                setState({
                    ...state,
                    error,
                    talks: null,
                    loading: false
                });
            });
    }, []);

    return state;
};

const useTimeBlocks = (talks, startDate, selectedDay) => {
    const timeBlocks = useMemo(() => {
        if (!talks) return;

        const selectedDayAsDate = new Date(startDate);

        selectedDayAsDate.setDate(selectedDayAsDate.getDate() + selectedDay);

        // Filter talks by the selected day
        // Honestly probably possible to do this using the pretalx api by searching for talks by day and sorting by time (otherwise I question the quality of the service :-P), 
        // but I'm running out of time so I can't check/refactor
        const talksOnSelectedDay = talks
            .filter(talk => isSameDay(selectedDayAsDate, new Date(talk.slot.start)))
            .sort((a, b) => {
                if (new Date(a.slot.start) === new Date(b.slot.start)) {
                    return 0;
                } else if (new Date(a.slot.start) > new Date(b.slot.start)) {
                    return 1;
                } else {
                    return -1;
                }
            });

        // Transform talks into time blocks containing talks
        return talksOnSelectedDay.reduce((timeBlocks, talk) => {
            const slot = getHoursMinutes(new Date(talk.slot.start));
            const timeBlock = timeBlocks[slot];

            if (!timeBlock) {
                timeBlocks[slot] = [talk];
            } else {
                timeBlocks[slot].push(talk);
            }

            return timeBlocks;
        }, {});
    }, [talks, selectedDay]);

    return timeBlocks;
}

const Talks = props => {
    const [selectedTalk, setSelectedTalk] = useState(null);
    const { talks, loading, error } = useTalksData();
    const timeBlocks = useTimeBlocks(talks, props.startDate, props.selectedDay);

    if (loading) return 'Loading...';
    if (error) return 'Something went wrong... >:(';

    return (
        <div className={css['talks']}>
            {Object.entries(timeBlocks).map(([slot, talks]) => {
                return (
                    <div className={css['time-block']}>
                        <h2>{slot}</h2>

                        {/* Could sort by room color here so talks always show in the same room order when sharing a timeblock with another room */}
                        {talks.map(talk => {
                            const room = talk.slot.room.en;

                            return (
                                <div 
                                    key={talk.code}
                                    className={css['talk']}
                                    style={{ 
                                        // Probably worth using a library like tinycolor to auto-generate unique room colors with proper text contrast
                                        // I'm lazy so I just hardcode two colors because I know there's only two rooms :-P 
                                        background: room.includes('Khaki') ? '#00806e' : 'purple'
                                    }}
                                    onClick={() => {
                                        setSelectedTalk(talk.code)
                                    }}
                                >
                                    <h3>{talk.title}</h3>
                                    <span>Duration: {talk.duration} minutes</span>
                                    <span>{room}</span>
                                </div>
                            );
                        })}
                    </div>
                )
            })}

            {/* Wanted to make a route for this (and other things), but I was pressed on time so I just made an overlay instead */}
            {selectedTalk && 
                <Details 
                    talk={talks.find(talk => talk.code === selectedTalk)}
                    setSelectedTalk={setSelectedTalk}
                />
            }
        </div>
    );
}

export default Talks;