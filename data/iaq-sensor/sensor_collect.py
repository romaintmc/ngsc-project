import serial
import time

# Serial configuration
ser = serial.Serial(
    port='/dev/ttyAMA0',  # UART port
    baudrate=9600,        # Speed communication (baud rate)
    timeout=1             # Reading timeout (secondes)
)

try:
    while True:
        # Reading line by line
        if ser.in_waiting > 0:
            data = ser.readline().decode('utf-8').strip()  # Read and decode
            print(f"Données du capteur : {data}")
        
        # Wait 3 secondes
        time.sleep(3)

except KeyboardInterrupt:
    print("Arrêt de la lecture.")
    
finally:
    # Connexion close
    ser.close()
