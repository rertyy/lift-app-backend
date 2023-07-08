// import { OrderedSet } from "js-sdsl";
// import { randomInt } from "crypto";
//
//
//
// function broadcastCurrentFloor(currentPosition: number) {
//   console.log(`currentPosition is ${currentPosition}`);
// }
//
// // insert a random number of requests between minFloors and maxFloors
// function insertRequest(num: number) {
//   for (let i = 0; i < num; i++) {
//     const a = randomInt(minFloors, maxFloors);
//     requests.insert(a);
//   }
// }
//
// // since requests.find returns an iterator, element is inside if !equal end()
// function inContainer(num: number): boolean {
//   const f = requests.find(num);
//   return !f.equals(requests.end());
// }
//
// // returns a function that adds more requests every 10 times it is called
// function addMoreRequests(left = 10, valuesToAdd = 5) {
//   let numUntilAdd = left;
//
//   return () => {
//     if (numUntilAdd === 0) {
//       insertRequest(valuesToAdd);
//       numUntilAdd = 10;
//       printRequests();
//     }
//     return numUntilAdd--;
//   };
// }
// const incr = addMoreRequests();
//
// // prints requests in order
// function printRequests() {
//   const tempArr: number[] = [];
//   requests.forEach((value) => {
//     tempArr.push(value);
//   });
//   console.log(tempArr);
// }
//
// function requestsRemainingAbove(): boolean {
//   const notExists = requests.upperBound(currentFloor).equals(requests.end());
//   return !notExists;
// }
//
// function requestsRemainingBelow(): boolean {
//   const notExists = requests
//     .reverseLowerBound(currentFloor)
//     .equals(requests.rEnd());
//   return !notExists;
// }
//
// /// Variable Declarations
// let currentFloor = 1;
// const requests = new OrderedSet<number>();
// let dir = Direction.up;
// let times: Record<number, number> = {};
// let sumRequestTimes = 0;
// let requestsFulfilled = 0;
//
// let maxFloors = 20; //  hardcoded for now
// const minFloors = 1;
//
// insertRequest(1);
// printRequests();
//
// setInterval(() => {
//   look();
// }, 500);
//
// function look() {
//   // times[currentFloor] = Date.now();
//   if (requests.empty()) {
//     console.log(`empty at ${currentFloor}`);
//     return;
//   }
//   broadcastCurrentFloor(currentFloor);
//
//   if (inContainer(currentFloor)) {
//     requests.eraseElementByKey(currentFloor);
//     console.log(`current floor ${currentFloor} fulfills!`);
//   }
//
//   if (dir === Direction.up) {
//     // prioritise going up if already going up
//     if (currentFloor === minFloors || requestsRemainingAbove()) {
//       dir = Direction.up;
//       currentFloor++;
//     } else if (currentFloor === maxFloors || requestsRemainingBelow()) {
//       dir = Direction.down;
//       currentFloor--;
//     }
//   } else {
//     // prioritise going down if already going down
//     if (currentFloor === maxFloors || requestsRemainingBelow()) {
//       dir = Direction.down;
//       currentFloor--;
//     } else if (currentFloor === minFloors || requestsRemainingAbove()) {
//       dir = Direction.up;
//       currentFloor++;
//     }
//   }
// }
