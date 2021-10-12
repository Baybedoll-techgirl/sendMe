import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import AddEventModal from './AddEventModal';
import axios from 'axios';
import moment from 'moment'
import { Stripe } from './Stripe'
import Button from 'react-bootstrap/Button'

export default function Calendar () {

    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([])
    const calendarRef = useRef(null)

    const onEventAdded = (event) => {

        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        });
    };
    
    async function handleEventAdd(data) {
        console.log(data.event);
        await axios.post('/api/calendar/create-event', data.event)}
        
    
    
    async function handleDatesSet(data) {
        const response = await axios.get(
            '/api/calendar/get-events?start=' + 
            moment(data.start).toISOString() +
            '&end='+ moment(data.end).toISOString())
            
        setEvents(response.data);
    };

    return (
        <section>
            <Button variant="primary" size="lg" onClick={() => setModalOpen(true)}>Add Event</Button>{' '}
                <div style={{position: 'relative', zIndex: 0}}>
                    <FullCalendar
                        ref={calendarRef}
                        events={events}
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                        eventAdd={event => handleEventAdd(event)}
                        datesSet={(date) => handleDatesSet(date)}
                    />
                </div>
                <div>
                    <Stripe price={5} />
                </div>
                <AddEventModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onEventAdded={event => onEventAdded(event)}
                
                />
        </section>
    )
}