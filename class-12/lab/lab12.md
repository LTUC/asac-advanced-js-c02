# LAB-23: Socket.io

**Airline System** Part2: today you will continue working on the Airline-system, you will refactor your code to use _socket.io_ instead of Node Events to handle your connections between multiple system components, which in turn facilitate real-time communication and allow bi-directional communication between client and server.

## Steps

1. On your **airline-system** repo, work on a branch called **socket.io**.
2. After completing the lab, create a PR from your **socket.io** branch to **main** then merge your code.

## Lab Requirements

The system functionalities from the previous lab are still the same, yet to be able to refactor with socket.io we need to specify new connections between the three components ( Manager, System, Pilot).

So first we need to establish a broadcasting channel to share the common events and their handler functions between all parts, and then a sub-connection namespace channel to share only the event between the system and the pilot as follows:

- Move each component to a separate folder so it looks like a stand-alone system then on the terminal, execute this command `npm init --y` to initialize the component with node package.

  - Manager folder (client):

    - Install **socket.io-client** library `socket.io-client`.
    - In `manager.js`:

      - Connect to the socket.io server as a client (same port from .env file)
      - every 10 seconds:
        - Alert when a new flight is scheduled
        - Log the new flight event with its ID to the console.
      - Notify the manager when a flight arrived.

  - Pilot folder (client):

    - Install **socket.io-client** library `socket.io-client`.
    - In `pilot.js`:

      - Connect to airline server namespace `airline`.

        - After 4 seconds:
          - Alert flight took-off event.
          - Log the flight event with its ID to the console.

      - Connect to the socket.io server as a client (port number from .env file).
        - Notify the pilot when a new flight is scheduled.
        - After 3 seconds more:
          - Alert when a flight arrived.
          - Log the flight event with its ID to the console.

  - System folder (our server):

    - Install **socket.io** library `npm socket.io`.
    - In `system.js`:

      - Start a socket.io server on a specific port (add the port number to the .env file).
        - Notify the system with new flights or when a flight arrived.
      - Create a namespace connection called `airline`.
        - Notify the system when a flight took-off.
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

- Now, to start, run each component separately in the following order:

  2. `system.js`
  3. `pilot.js`
  4. `manager.js`

- After running, your terminal should look like this:

  - `system.js` console

    ```
    Flight {
        event: 'new-flight’',
        time: 2022-02-28 15:30:13
        Details: {
        airLine: 'Royal Jordanian Airlines',
        flightID: 'ds7g86sa8v87dsv60v876d',
        pilot: 'Jane doe',
        destination: ‘ Manchester, UK’
     }
    }
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
    ```

  - `manager.js` console:

    ```
      Manager: new flight with ID ‘ds7g86sa8v87dsv60v876d’ have been scheduled
      Manager: we’re greatly thankful for the amazing flight, Jane doe
      Manager: new flight with ID ‘klaec9867ca79c6casc98y’ have been scheduled
      Manager: we’re greatly thankful for the amazing flight, Olive Yew.
      Manager: new flight with ID ‘bsiausgo9wd7a9797cscsc’ have been scheduled
      Manager: we’re greatly thankful for the amazing flight, Teri Dactyl.
      Manager: new flight with ID ‘flsakc90s7c9s9a8c789ca’ have been scheduled
      Manager: we’re greatly thankful for the amazing flight, Allie Grater.
    ```

  - `pilot.js` console:
    ```
      Pilot: flight with ID ‘ds7g86sa8v87dsv60v876d’ took-off
      Pilot: flight with ID ‘ds7g86sa8v87dsv60v876d’ has arrived
      Pilot: flight with ID ‘klaec9867ca79c6casc98y’ took-off
      Pilot: flight with ID ‘klaec9867ca79c6casc98y’ has arrived
      Pilot: flight with ID ‘bsiausgo9wd7a9797cscsc’ took-off
      Pilot: flight with ID ‘bsiausgo9wd7a9797cscsc’ has arrived
      Pilot: flight with ID ‘flsakc90s7c9s9a8c789ca’ took-off
      Pilot: flight with ID ‘flsakc90s7c9s9a8c789ca’ has arrived
    ```

## Submission Instructions

After merging your code with the main, submit your PR link.
