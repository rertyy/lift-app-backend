import { OrderedSet } from "js-sdsl";
import {
  broadcastAddFloor,
  broadcastCurrentFloor,
  broadcastRemoveFloor,
  broadcastResetFloors,
} from "../websockets/broadcastFromServerFunctions";
import {
  Direction,
  inContainer,
  requestsRemainingAbove,
  requestsRemainingBelow,
} from "./liftHelpers";

export function getAverageTime() {
  return sumRequestTimes / requestsFulfilled;
}

export function addFloorToLift(floorNum: number) {
  requests.insert(floorNum);
  broadcastAddFloor(floorNum);
}

export function removeFloorFromLift(floorNum: number) {
  requests.eraseElementByKey(floorNum);
  broadcastRemoveFloor(floorNum);
}

export function resetFloorsOfLift() {
  requests.clear();
  broadcastResetFloors();
}

/**
 * upRequests is the list of floors that have requested the lift to go up, in the format
 * of destination: source
 * Likewise for downRequests
 * times is the list of times that the lift has been at a certain floor
 * currentPosition is the current floor that the lift is at
 */

let currentFloor = 1;
const requests = new OrderedSet<number>();
let times: Record<number, number> = {};
let sumRequestTimes = 0;
let requestsFulfilled = 0;
let dir = Direction.up;

export function look(minFloors = 1, maxFloors = 10) {
  times[currentFloor] = Date.now();
  if (requests.empty()) {
    // console.log(`empty at ${currentFloor}`);
    return;
  }
  broadcastCurrentFloor(currentFloor);

  if (inContainer(requests, currentFloor)) {
    requests.eraseElementByKey(currentFloor);
    broadcastRemoveFloor(currentFloor);
    console.log(`current floor ${currentFloor} fulfills!`);
  }

  if (dir === Direction.up) {
    // prioritise going up if already going up
    if (
      currentFloor === minFloors ||
      requestsRemainingAbove(requests, currentFloor)
    ) {
      dir = Direction.up;
      currentFloor++;
    } else if (
      currentFloor === maxFloors ||
      requestsRemainingBelow(requests, currentFloor)
    ) {
      dir = Direction.down;
      currentFloor--;
    }
  } else {
    // prioritise going down if already going down
    if (
      currentFloor === maxFloors ||
      requestsRemainingBelow(requests, currentFloor)
    ) {
      dir = Direction.down;
      currentFloor--;
    } else if (
      currentFloor === minFloors ||
      requestsRemainingAbove(requests, currentFloor)
    ) {
      dir = Direction.up;
      currentFloor++;
    }
  }
}
