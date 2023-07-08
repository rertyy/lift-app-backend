import {
  addFloorToLift,
  removeFloorFromLift,
  resetFloorsOfLift,
} from "../lift/lift";

import { Message, ToServerType } from "../models/types";

export function handleMessageFromClient(data: any) {
  if (data === null || data === undefined || data.toString() === "") {
    console.log("data is null");
    return;
  }

  const obj: Message = JSON.parse(data.toString());
  switch (obj.type) {
    case ToServerType.AddFloor:
      addFloorToLift(obj.data);
      break;
    case ToServerType.RemoveFloor:
      removeFloorFromLift(obj.data);
      break;
    case ToServerType.ResetFloors:
      resetFloorsOfLift();
      break;
    default:
      console.log("unknown request type");
  }
}
