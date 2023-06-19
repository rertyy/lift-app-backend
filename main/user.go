package main

import (
	"fmt"
	"math"
	"math/rand"
	"time"
)

type userRequest struct {
	startFloor int
	endFloor   int
	direction  int // -1 is down, 1 is up, 0 if user did not specify end floor
	startTime  int64
	endTime    int64
}

func newUserRequest(startFloor int, endFloor int, startTime int64) *userRequest {
	var direction int
	if startFloor == endFloor { // represents the case where user did not specify end floor
		direction = 0
	} else if startFloor > endFloor {
		direction = -1
	} else {
		direction = 1
	}
	fmt.Printf("come: %d | go: %d | direction: %d | start: %d\n", startFloor, endFloor, direction, startTime)
	return &userRequest{
		startFloor: startFloor,
		endFloor:   endFloor,
		direction:  direction,
		startTime:  startTime,
	}
}

func (p userRequest) timeTakenForRequest() int64 {
	if p.endTime != 0 {
		return p.endTime - p.startTime
	}
	return int64(math.Inf(0)) // return positive infinity to mean request failed
}

func generateRandomUserRequest(maxFloor int) *userRequest {
	rand.NewSource(time.Now().UnixNano())
	startFloor := rand.Intn(maxFloor)
	endFloor := rand.Intn(maxFloor)
	return newUserRequest(startFloor, endFloor, time.Now().UnixNano())
}
