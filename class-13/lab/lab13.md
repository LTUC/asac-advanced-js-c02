# LAB-13: Message Queue

**Airline System** Part3: today you will continue working on the Airline-system, you will create message queue to store the events when the pilot is offline and send them back when he became online.

## Steps

1. On your **airline-system** repo, work on a branch called **messageQueue**.
2. After completing the lab, create a PR from your **messageQueue** branch to **main** then merge your code.

## Lab Requirements

### **system.js file:**

- Add new object called 'queue' that have One property (flights) to contain all 'new-flight' events.

- Inside 'new-flight' event handler create a new ID for the flight and add it to the queue object (inside flights property).

- Listen to new event 'get-all':
  - Once triggered should emit 'flight' event with all stored messages as payload back to the pilot.
  - Delete all messages from the message queue.
  - Listen to 'delete' event that once triggered should delete a flight with specific Id from the message queue.(Strech Goal)

### Note: the message queue should look like this:

```javascript
queue ={
         flights:{
             '53gdf34fdg3334g':{
                 event:"new-flight",
                     details:{
                         time: 6-27-2022,
                         id: 332u443673r32yuf463w444,
                         pilot : Joun Cina Snow,
                         destination : Amman,
                     }
             },
             '765trhdfs4345rt':{
                 event:"new-flight",
                     details:{
                         time: 6-27-2022,
                         id: zd89f06gz8975dvfvzfa87v,
                         pilot : Batman,
                         destination : Ankara,
                     }
             },
         }
     }
```

### **pilot.js file:**

- trigger 'get-all' event, to get all messages back from the message queue.

- After triggering the 'flight-arrived' event make sure to delete the flight from the message queue.(Strech Goal)

- Listen to 'fligt' event to log this message to the console 'Pilot:Sorry i didn't catch this flight ID 332u443673r32yuf463'.

## Submission Instructions

After merging your code with the main, submit your PR link.
