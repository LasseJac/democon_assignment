import React from 'react';
import css from './details.scss';

const Details = props => {
    return (
        <div className={css['details']}>
            <div 
                className={css['close']}
                onClick={e => {
                    e.stopPropagation();

                    props.setSelectedTalk(null);
                }}
            >
                Back to schedule
            </div> 

            <div className={css['talk']}>
                <h3>{props.talk.title}</h3>
                <span>Speakers: {props.talk.speakers.map(speaker => speaker.name).join(',')}</span>
                <span>Duration: {props.talk.duration} minutes</span>
                <span>{props.talk.slot.room.en}</span>
                <p>{props.talk.description}</p>

                <p style={{ color: 'red' }}>could keep formatting here but pretty pointless for demo purposes</p>
            </div>
        </div>
    );
};

export default Details;