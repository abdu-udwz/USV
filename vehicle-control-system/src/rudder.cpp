#include <USVSystem.h>
#include <Servo.h>

unsigned long lastUpdateTimestamp = 0;
short currentAngle = 0;

void updateRudderAngle(short angle)
{
  if ((millis() - lastUpdateTimestamp < 20) || currentAngle == angle)
    return;

  lastUpdateTimestamp = millis();
  rudderServo.write(angle);
  currentAngle = angle;

  StaticJsonDocument<70> doc;
  doc["vehicleId"] = VEHICLE_ID;
  doc["operation"] = "rudderInfo";
  doc["angle"] = currentAngle;
  doc["message"] = "rudder updated";

  serializeJson(doc, Serial);
  Serial.println();
}