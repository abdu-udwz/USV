#include <Arduino.h>
#include <TinyGPS.h>

#include <prefs.h>

// Serial is synced with the XBee

// Serial1 is the GPS
TinyGPS gps;

float lat = 28.5458, lon = 77.1703; // create variable for latitude and longitude object

void setup()
{
  // digitalWrite(13, 0);
  Serial.begin(XBEE_BAUD);
  Serial1.begin(GPS_BAUD);

  Serial.print("Simple TinyGPS library v. ");
  Serial.println(TinyGPS::library_version());
  Serial.println("by Mikal Hart");
  Serial.println();
}

void loop()
{
  while (Serial1.available())
  {                                 // check for gps data
    if (gps.encode(Serial1.read())) // encode gps data
    {
      gps.f_get_position(&lat, &lon); // get latitude and longitude

      Serial.print("Position: ");
      Serial.print("Latitude:");
      Serial.print(lat, 6);
      Serial.print(";");
      Serial.print("Longitude:");
      Serial.println(lon, 6);
      Serial.print(lat);
      Serial.print(" ");
    }
  }
  delay(1000);
}