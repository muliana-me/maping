import json
from pynput import mouse

def on_click(x, y, button, pressed):
    if pressed:
        name_coords = {'x': x, 'y': y}
        address_coords = {'x': x, 'y': y + 30}
        number_coords = {'x': x, 'y': y + 60}

        save_coords_to_file({
            'nameCoords': name_coords,
            'addressCoords': address_coords,
            'numberCoords': number_coords
        })
        return False

def save_coords_to_file(coords):
    with open('mouse_coords.json', 'w') as file:
        json.dump(coords, file)
    print('Mouse coords saved. Now you can run maping.py')

def start_mouse_listener():
    listener = mouse.Listener(on_click=on_click)
    listener.start()
    listener.join()

print('[ Program running... ]\n')
print('Click the first copy icon(top right corner) in google maps\n')

start_mouse_listener()