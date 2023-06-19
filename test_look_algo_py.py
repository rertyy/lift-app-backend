def LOOK(requests, initial_position):
    # Sort the requests in ascending order
    sorted_requests = sorted(requests)
    
    # Initialize variables
    current_floor = initial_position
    direction = 1  # 1 for upward, -1 for downward
    
    # Tracks the floors to be visited in order
    visited_floors = []
    
    # Iterate until all requests are served
    while sorted_requests:
        # find the floors to go up. I think ideally to change this to use treeset or something?
        floor_index = sorted_requests.bisect(current_floor) - 1
        if floor_index < 0 or floor_index >= len(sorted_requests):
            floor_index = 0
        # Check if the current floor has a request
        if current_floor in sorted_requests:
            print("Serving request at floor", current_floor)
            sorted_requests.remove(current_floor)
            visited_floors.append(current_floor)
        
        # Change direction if there are no more requests in the current direction
        if not sorted_requests:
            direction *= -1
        
        # Move to the next floor in the current direction
        current_floor += direction
    
    return visited_floors


requests = [98, 183, 37, 122, 14, 124, 65, 67]
initial_position = 53
LOOK(requests, initial_position)