import { broadcastFromServer } from "../index";
import { FromServerType } from "../models/types";
import { getAverageTime } from "../lift/lift";

function createJson(type: any, data: any) {
  return JSON.stringify({ type: type, data: data });
}

export function broadcastAddFloor(data: number) {
  console.log("broadcastAddFloor");
  broadcastFromServer(createJson(FromServerType.AddFloor, data));
}

export function broadcastRemoveFloor(data: number) {
  console.log("broadcastRemoveFloor");
  broadcastFromServer(createJson(FromServerType.RemoveFloor, data));
}

export function broadcastResetFloors() {
  console.log("broadcastResetFloors");
  broadcastFromServer(createJson(FromServerType.ResetFloors, null));
}

export function broadcastCurrentFloor(currentPosition: number) {
  console.log("broadcastCurrentFloor");
  broadcastFromServer(
    createJson(FromServerType.UpdateCurrentFloor, currentPosition),
  );
}

function broadcastAverageTime() {
  console.log("broadcastAverageTime");
  broadcastFromServer(
    createJson(FromServerType.UpdateAverageTime, getAverageTime()),
  );
}
