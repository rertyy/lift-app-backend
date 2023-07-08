from random import randint
from sortedcontainers import SortedSet


def LOOK(sorted_requests: SortedSet[int], initial_position: int) -> list[int]:

    # Initialize variables
    current_floor = initial_position
    
    # Tracks the floors to be visited in order
    visited_requests = []
    travelled_floors = []
    dir = 1

    floor_index = sorted_requests.bisect(current_floor) - 1
    if floor_index < 0:
        dir = 1 # lift starts below (inclusive) first request
    elif floor_index >= len(sorted_requests):
        dir = -1 # lift starts above (inclusive) last request

    # Iterate until all requests are served
    while sorted_requests:
        # Track the floors travelled
        travelled_floors.append(current_floor)

        # Swap direction if outside the range of requests
        if current_floor <= sorted_requests[0]:
            dir = 1
        elif current_floor >= sorted_requests[-1]:
            dir = -1

        # Check if the current floor has a request
        if current_floor in sorted_requests:
            # travels from indices of range(floor_index, len(sorted_requests)):
            sorted_requests.remove(current_floor)
            visited_requests.append(current_floor)
        
        # Move to the next floor in the current direction
        current_floor += dir
    
    print("visited_requests: ", visited_requests)
    print("travelled_floors: ", travelled_floors)
    return visited_requests




'''
TODO:
add logic to add to the skiplistset. Up logic and down logic for consumers such that there can be up consumer and down consumer at the same time
Prob a skiplistset for up and a skiplistset for down, sorted by key on floorFrom
Enable concurrency via locking/MQ

'''
requests = []
maxfloor = 10
numrequests = 10
for _ in range(numrequests):
    requests.append(randint(1, maxfloor))

sorted_requests = SortedSet(requests)
print(sorted_requests)
initial_position = 6
LOOK(sorted_requests, initial_position)