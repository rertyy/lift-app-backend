import { OrderedSet } from "js-sdsl";

export enum Direction {
  up,
  down,
}

export function requestsRemainingAbove(
  requests: OrderedSet<number>,
  currentFloor: number,
): boolean {
  const notExists = requests.upperBound(currentFloor).equals(requests.end());
  return !notExists;
}

export function requestsRemainingBelow(
  requests: OrderedSet<number>,
  currentFloor: number,
): boolean {
  const notExists = requests
    .reverseLowerBound(currentFloor)
    .equals(requests.rEnd());
  return !notExists;
}

// since requests.find returns an iterator, element is inside if !equal end()
export function inContainer(
  requests: OrderedSet<number>,
  num: number,
): boolean {
  const f = requests.find(num);
  return !f.equals(requests.end());
}

// // insert a random number of requests between minFloors and maxFloors
// export function insertRequest(
//   num: number,
//   requests: OrderedSet<number>,
//   minFloors: number = 1,
//   maxFloors: number = 10,
// ) {
//   for (let i = 0; i < num; i++) {
//     const a = randomInt(minFloors, maxFloors);
//     requests.insert(a);
//   }
// }
//
// // returns a function that adds more requests every 10 times it is called
// export function addMoreRequests(
//   requests: OrderedSet<number>,
//   left = 10,
//   valuesToAdd = 5,
// ) {
//   let numUntilAdd = left;
//
//   return () => {
//     if (numUntilAdd === 0) {
//       insertRequest(valuesToAdd, requests, 1, 10);
//       numUntilAdd = 10;
//       printRequests(requests);
//     }
//     return numUntilAdd--;
//   };
// }

// // prints requests in order
// export function printRequests(requests: OrderedSet<number>) {
//   const tempArr: number[] = [];
//   requests.forEach((value) => {
//     tempArr.push(value);
//   });
//   console.log(tempArr);
// }
