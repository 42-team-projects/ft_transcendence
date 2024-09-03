from multiprocessing import Process
import time
def print_numbers():
    for i in range(5):
        print(f"Number: {i}")

def print_letters():
    for letter in ['a', 'b', 'c', 'd', 'e']:
        print(f"Letter: {letter}")

if __name__ == '__main__':
    # Create processes
    process1 = Process(target=print_numbers)
    process2 = Process(target=print_letters)

    # Start processes
    process1.start()
    process2.start()

    # Wait for processes to complete
    process1.join()
    process2.join()
    time.sleep(100000)
    print("Both processes have finished execution.")
