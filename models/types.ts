import WebSocket from "ws";

export type Uuid = `${string}-${string}-${string}-${string}-${string}`;

export type Client = {
  [key: Uuid]: WebSocket;
};

export enum ToServerType {
  AddFloor,
  RemoveFloor,
  ResetFloors,
  UpdateCurrentFloor,
  UpdateAverageTime,
  UpdateLiftRequests,
}

export enum FromServerType {
  AddFloor = 100,
  RemoveFloor,
  ResetFloors,
  UpdateCurrentFloor,
  UpdateAverageTime,
  UpdateLiftRequests,
}

export type Message = {
  type: ToServerType;
  data: number;
};
