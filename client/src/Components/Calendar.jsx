import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddEventModal from "./AddEventModal";
import axios from "axios";
import moment from "moment";
// import { Stripe } from "./Stripe";
import Button from "react-bootstrap/Button";

export default function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      );
      setCurrentTemp(data);
      console.log("data==?>", data);
    })();
  }, []);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };

  async function handleEventAdd(data) {
    console.log(data.event);
    await axios.post("/api/calendar/create-event", data.event);
  }

  async function handleDatesSet(data) {
    const response = await axios.get(
      "/api/calendar/get-events?start=" +
        moment(data.start).toISOString() +
        "&end=" +
        moment(data.end).toISOString()
    );

    setEvents(response.data);
  }

  const EventContent = eventInfo => {
      console.log('ervntinfo==>>', eventInfo)
    // const {temp} = currentTemp?.main;
      return (<>
    <b>{eventInfo.text}</b> {" - "}
    <i>{currentTemp?.main?.temp ? parseInt((currentTemp?.main?.temp - 273.15) * 9/5 + 32) : 0}</i> 
      </>)
  }

  return (
    <section>
      <Button variant="primary" size="lg" onClick={() => setModalOpen(true)}>
        Add Event
      </Button>{" "}
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          events={events}
          dayHeaderContent={EventContent}
          // eventContent={EventContent}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridWeek"
          eventAdd={(event) => handleEventAdd(event)}
          datesSet={(date) => handleDatesSet(date)}
        />
      </div>
      
      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
}
