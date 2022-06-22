# LAB-11: Events.js - NodeJS

**Airline System**: you are going to build a control system for an Airline (for example Royal Jordanian Airlines) where you will keep tracking each flight status by contacting the pilot of that flight who in turn will inform the manager and the system when a flight took-off and arrived.

We have three main components in this system:

1. Manager (starting point)
2. Pilot (taking actions)
3. System (logging details)

## Steps

1. Create a UML diagram of the Airline system before you start and add it to your `README.md` file.
2. Create a new repository called **airline-system** and work on a branch called **events**.
3. After completing the lab, create a PR from your **events** branch to **main** then merge your code.

## Lab Requirements

For each of the three system components:

**The manager** should:

- Alert the pilot and the system when there is a new flight.
- Be notified when a flight has arrived.

**The pilot** should:

- Alert the system when a flight took-off.
- Alert the manager and the system when a flight has arrived.
- Be notified when a new flight is scheduled.

**The system** should:

- Be notified when a new flight is scheduled.
- Be notified when a flight took off.
- Be notified when a flight has arrived.

Your system should contain the following files:

- `events.js` one event instance shared by all components (singleton)
- `manager.js`

  - Choose an existing Airline you wish to build a control system for.
  - Trigger a 'new-flight' event every 10 seconds:
    - Make up fake flight details, you can use `UUID` and `faker` libraries to generate random IDs and fake pilots and destinations names.
    - Log a statement to the console informing that a new flight with its ID has been scheduled.
    - Emit 'new-flight' event and send the details as it's the payload.
  - Keep the manager alerted when a flight has arrived:
    - Log a message of appreciation to the pilot with his name to the console.

- `pilot.js`
  - Keep the pilot alerted when a new flight is scheduled:
    - After 4 seconds:
      - Emit 'took-off' event with the flight details to be the payload.
      - Log the status of the flight to the console with its ID.
    - After 3 seconds more:
      - Emit 'Arrived' event with the flight details to be the payload.
      - Log the status of the flight to the console with its ID.
- `system.js`
  - The main control room.
  - Prints the details of each event in a specific form:
  ```
  Flight {
      event: 'took_off',
      time: 2022-02-28 15:30:00.,
      Details: {
      airLine: 'Royal Jordanian Airlines',
      destination: Manchester, UK'
      pilot: 'Jane doe',
      flightID: 'ds7g86sa8v87dsv60v876d',
  }
  ```

After starting, your console should look like this:

```
Manager: new flight with ID ‘ds7g86sa8v87dsv60v876d’ have been scheduled
Flight {
        event: 'new-flight',
        time: 2022-02-28 15:30:13
        Details: {
        airLine: 'Royal Jordanian Airlines',
        flightID: 'ds7g86sa8v87dsv60v876d',
        pilot: 'Jane doe',
        destination: ‘ Manchester, UK’
    }
}
Pilot: flight with ID ‘ds7g86sa8v87dsv60v876d’ took-off
Flight {
        event: 'took_off',
        time: 2022-02-28 15:30:17
        Details: {
        airLine: 'Royal Jordanian Airlines',
        flightID: 'ds7g86sa8v87dsv60v876d',
        pilot: 'Jane doe',
        destination: ‘ Manchester, UK’
    }
}
Pilot: flight with ID 'ds7g86sa8v87dsv60v876d' has arrived
Flight {
        event: 'arrived',
        time: 2022-02-28 15:30:20
        Details: {
        airLine: 'Royal Jordanian Airlines',
        flightID: 'ds7g86sa8v87dsv60v876d',
        pilot: 'Jane doe',
        destination: ‘ Manchester, UK’
    }
}
Manager: we’re greatly thankful for the amazing flight, Jane doe

```

## Submission Instructions

After merging your code with the main, submit your PR link.
