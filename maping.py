import pyautogui
import keyboard
import json
import os

def load_coords(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        print('[ ERROR ] Coords data not found, run config.py first!')
        os._exit(0)

def start():
    coords_data = load_coords('mouse_coords.json')

    if 'nameCoords' in coords_data:
        name_coords = coords_data['nameCoords']
        name_x = name_coords['x']
        name_y = name_coords['y']

        pyautogui.moveTo(name_x, name_y, duration=0.1)
        pyautogui.click()
        pyautogui.sleep(0.4)

        pyautogui.hotkey('ctrl', 'tab')
        pyautogui.sleep(0.4)

        pyautogui.hotkey('ctrl', 'v')
        pyautogui.sleep(0.4)

        pyautogui.press('right')
        pyautogui.sleep(0.4)

        pyautogui.hotkey('ctrl', 'tab')
        pyautogui.sleep(0.4)

        address_coords = coords_data['addressCoords']
        address_x = address_coords['x']
        address_y = address_coords['y']

        pyautogui.moveTo(address_x, address_y, duration=0.1)
        pyautogui.click()
        pyautogui.sleep(0.4)

        pyautogui.hotkey('ctrl', 'tab')
        pyautogui.sleep(0.4)

        pyautogui.hotkey('ctrl', 'v')
        pyautogui.sleep(0.4)

        pyautogui.press('right')
        pyautogui.sleep(0.4)

        pyautogui.hotkey('ctrl', 'tab')
        pyautogui.sleep(0.4)

        number_coords = coords_data['numberCoords']
        number_x = number_coords['x']
        number_y = number_coords['y']

        pyautogui.moveTo(number_x, number_y, duration=0.1)
        pyautogui.click()
        pyautogui.sleep(0.4)

        pyautogui.hotkey('ctrl', 'tab')
        pyautogui.sleep(0.4)

        pyautogui.hotkey('ctrl', 'v')
        pyautogui.sleep(0.4)

        pyautogui.press('down')
        pyautogui.sleep(0.4)

        pyautogui.press('left')
        pyautogui.press('left')
        pyautogui.sleep(0.4)

        pyautogui.hotkey('ctrl', 'tab')
        pyautogui.sleep(0.4)

    else:
        print('[ ERROR ] Coords data not found, run mouse_config.py first!')
        os._exit(0)
        
    
def on_key_press(event):
    if event.name == '`':
        start()

print('[ Program running... ]\n')
print('Press ` to automate maping')
print('Press ESC to exit\n')

keyboard.on_press(on_key_press)
keyboard.wait('esc')