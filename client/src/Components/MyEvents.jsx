import React, {useEffect, useState} from 'react'
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const MyEvents = () => {
    const user_details = JSON.parse(localStorage.getItem("user_details"))
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/api/calendar/logged-events/${user_details?._id}`)
            setEvents(result.data.events)
            console.log(result)
        }

        fetchData()
    }, [])

    async function removeFromEvents(id) {
        const result = await axios.put(`/api/calendar/remove-volunteer/${id}`, {volunteer_id: user_details?._id})
        const filteredEvents = events.filter(i => i._id !== id)
        setEvents(filteredEvents)
        console.log(result.data.event)
    }
    return (
        <div>
            <h1>My events</h1> 
            
            <Container>
        <Row>
          {events.map((item) => (
            <Col key={item._id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.location}</Card.Text>
                  <Card.Text>
                    Start:{" "}
                    <strong>
                      {moment(item.start).format(
                        "dddd, MMMM Do YYYY, h:mm:ss a"
                      )}
                    </strong>
                  </Card.Text>
                  <Card.Text>
                    End:{" "}
                    <strong>
                      {moment(item.end).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                    </strong>
                  </Card.Text>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromEvents(item._id)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
        </div>
    )
}

export default MyEvents
