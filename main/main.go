package main

/*
 * TODO:
 *
 * Accept floor numbers from user. If value in treeSet, ignore. Else, add to treeSet
 * User requests have a direction, startFloor, endFloor, startTime, endTime
 *
 * Lift has a currentDirection, currentFloor
 *
 * Algorithm for lift going up and down, while keeping track of current floor.
 * If there are requests for current floor:
 * 		Pause for 5 seconds. Remove current floor from treeSet
 * 		If any new requests come in for current floor, continue pausing for 5 seconds
 *
 * If there are no more requests, stop moving.
 * Else if there are requests in the same direction, continue going in that direction
 * Else if there are requests in the opposite direction, change direction
 *
 *
 */
