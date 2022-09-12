#include <Arduino.h>

void setup()
{
}

void loop()
{
}
// #include <prefs.h>
// #include <SoftwareSerial.h>

// #define rxPin 2
// #define txPin 3

// SoftwareSerial xbee(rxPin, txPin);

// bool boardInitialized = false;

// int incomingByte = 0; // for incoming serial data

// void setup()
// {
//   // define pin mode for SoftwareSerial
//   digitalWrite(rxPin, 0);
//   pinMode(rxPin, INPUT);
//   pinMode(txPin, OUTPUT);

//   xbee.begin(XBEE_BAUD);

//   Serial.begin(USB_BAUD);
//   Serial.println("board is on");
// }

// void loop()
// {
//   if (xbee.available() > 0)
//   {
//     Serial.write(xbee.read());
//   }

//   if (Serial.available() > 0)
//   {
//     xbee.write(Serial.read());
//   }
// }
