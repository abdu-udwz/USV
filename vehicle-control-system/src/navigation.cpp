#include <USVSystem.h>
#include <TinyGPS.h>
#include <prefs.h>

// Serial1 is the GPS
TinyGPS gps;

unsigned long lastTimestamp = 0;
float lat = 28.5458, lon = 77.1703; // create variable for latitude and longitude object

void navigationMain()
{
  if (millis() - lastTimestamp < 1000)
    return;

  bool newData = false;

  // TODO: blocking code
  for (unsigned long start = millis(); millis() - start < 500;)
  {
    while (Serial1.available())
    {
      char c = Serial1.read();
      // Serial.write(c);   // uncomment this line if you want to see the GPS data flowing
      if (gps.encode(c)) // Did a new valid sentence come in?
      {
        newData = true;
        break;
      }
    }
  }

  StaticJsonDocument<200> doc;
  if (newData)
  {
    float flat, flon;
    unsigned long age;
    gps.f_get_position(&flat, &flon, &age);
    // Serial.print("LAT=");
    // Serial.print(flat == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flat, 6);
    // Serial.print(" LON=");
    // Serial.print(flon == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flon, 6);
    // Serial.print(" SAT=");
    // Serial.print(gps.satellites() == TinyGPS::GPS_INVALID_SATELLITES ? 0 : gps.satellites());
    // Serial.print(" PREC=");
    // Serial.print(gps.hdop() == TinyGPS::GPS_INVALID_HDOP ? 0 : gps.hdop());

    doc["vehicleId"] = VEHICLE_ID;
    doc["operation"] = "gpsUpdate";

    lastTimestamp = millis();
    doc["timestamp"] = lastTimestamp;
    doc["lon"] = flon;
    doc["lat"] = flat;

    serializeJson(doc, Serial);
    Serial.println();
  }
  // if ten seconds have passed since the last fix issue a warning
  else if (millis() - lastTimestamp > 10000)
  {
    doc.clear();

    doc["vehicleId"] = VEHICLE_ID;
    doc["operation"] = "gpsIssue";
    doc["message"] = "GPS Signal weak or lost";
    doc["timestamp"] = millis();

    serializeJson(doc, Serial);
    Serial.println();

    lastTimestamp = millis();
  }
}