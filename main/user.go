package main

import (
	"fmt"
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

func (u userRequest) String() string {
	return fmt.Sprintf("come: %d | go: %d | direction: %d | start: %d | end: %d\n", p.startFloor, p.endFloor, p.direction, p.startTime, p.endTime)
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
	req := &userRequest{
		startFloor: startFloor,
		endFloor:   endFloor,
		direction:  direction,
		startTime:  startTime,
	}
	fmt.Printf(req.String())
	return req

}

func generateRandomUserRequest(maxFloor int) *userRequest {
	rand.NewSource(time.Now().UnixNano())
	startFloor := rand.Intn(maxFloor)
	endFloor := rand.Intn(maxFloor)
	return newUserRequest(startFloor, endFloor, time.Now().UnixNano())
}
