#include <USVSystem.h>
#include <dht.h>

dht DHT;

unsigned long lastDHTTimestamp = 0;

void readAirConditions()
{
  if (millis() - lastDHTTimestamp < 6000)
    return;

  StaticJsonDocument<100> doc;
  int chk = DHT.read11(DHT11_PIN);
  doc["vehicleId"] = VEHICLE_ID;
  doc["operation"] = "airConditionsUpdate";
  doc["temp"] = DHT.temperature;
  doc["humd"] = DHT.humidity;

  serializeJson(doc, Serial);
  Serial.println();

  lastDHTTimestamp = millis();
}