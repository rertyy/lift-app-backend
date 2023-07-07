package main

import (
	"fmt"
	"github.com/huandu/skiplist"
	"time"
)

type liftStatus struct {
	currentFloor int
	currentDir   int
	moving       bool
}

func look(upList skiplist.SkipList, downList skiplist.SkipList, maxFloors int) {
	timeAtFloor := make([]int64, maxFloors)
	travelledFloors := make([]int, maxFloors)
	requestFulfilledOrder := make([]struct {
		from int
		to   int
	}, maxFloors)

	totalTimeSpent := 0.0
	numRequestsFulfilled := 0

	// assume lift always starts on level 1 and starts travelling up
	lookUp(upList)

	fmt.Println(travelledFloors)
	fmt.Println("requests fulfilled", requestFulfilledOrder)
	fmt.Println("average: ", totalTimeSpent/float64(numRequestsFulfilled))

}

// lookUp upList is the requests that are going up, downList is the requests that are going down
func lookUp(upList skiplist.SkipList, status *liftStatus, times []int64) {
	// find the first request
	ele := upList.Find(status.currentFloor)
	upRequests := make(map[int][]int) // map of destination to source

	// if there are no requests going up, return
	if ele == nil {
		return
	}

	// insert the location the passenger is travelling to
	upList.Set(ele.Value, nil)

	for ele != nil {
		// if ele is a Source, just add the destination to the upList
		// else the source is already inside the upList
		if ele.Value != nil {
			upList.Set(ele.Value, nil)
			ints := append(upRequests[ele.Value.key], status.currentFloor)
		}

		if status.currentFloor == ele.Value {
			times[status.currentFloor] = time.Now().UnixNano()
			status.currentFloor++
		}

		ele = ele.Next()
	}
	lookDown()

}

func lookDown(downList skiplist.SkipList, status liftStatus, travelledFloors []int, requestFulfilledOrder []int) {

}
