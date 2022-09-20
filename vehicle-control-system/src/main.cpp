#include <USVSystem.h>
#include <ArduinoJson.h>
#include <Servo.h>

/*
 * Serial is synced with the XBee
 * Serial1 (one) is attached to the GPS module
 */
String inputString = "";     // a string to hold incoming data
bool stringComplete = false; // whether the string is complete

/**
 * @brief whether or not the vehicle is stationary.
 *
 * when true, the vehicle will only report ping signal to the station
 */
bool idling = false;

/* timing */
unsigned long pingTimestamp = 0;

/* */
Servo rudderServo;

/* decelerations */
extern void sendPing();

void setup()
{
  Serial.begin(XBEE_BAUD);
  Serial1.begin(GPS_BAUD);

  rudderServo.attach(RUDDER_PIN);
}

void loop()
{
  if (stringComplete)
  {
    StaticJsonDocument<1000> doc;
    DeserializationError parseError = deserializeJson(doc, inputString);

    if (parseError)
    {
      doc.clear();
      doc["vehicleId"] = VEHICLE_ID;
      doc["operation"] = "error";
      doc["message"] = parseError.f_str();
      serializeJson(doc, Serial);
    }
    else
    {
      const char *operation = doc["operation"];

      if (strcmp("updateRudderAngle", operation) == 0)
      {
        short angle = doc["angle"];
        updateRudderAngle(angle);
      }
      else if (strcmp(operation, "updateMotor") == 0)
      {
        if (doc.containsKey("speed"))
        {
          updateMotorSpeed(doc["speed"] | 0);
        }
      }
    }

    stringComplete = false;
    inputString = "";
  }

  if (!idling)
  {
    // TODO: so much stuff to do here
    navigationMain();
  }

  if (millis() - pingTimestamp > 5000)
  {

    sendPing();
  }
}

/*
  SerialEvent occurs whenever a new data comes in the
 hardware serial RX.  This routine is run between each
 time loop() runs, so using delay inside loop can delay
 response.  Multiple bytes of data may be available.
 This is general code you can reuse.
 */
void serialEvent()
{
  while (Serial.available() && !stringComplete)
  {
    char inChar = (char)Serial.read();
    inputString += inChar;
    if (inChar == '\n')
    {
      stringComplete = true;
    }
  }
}

void sendPing()
{
  StaticJsonDocument<200> doc;

  // Add values in the document
  doc["vehicleId"] = VEHICLE_ID;
  doc["operation"] = "ping";
  doc["status"] = idling ? "IDLING" : "DEPLOYED";

  pingTimestamp = millis();
  doc["timestamp"] = pingTimestamp;

  // Generate the minified JSON and send it to the Serial port.
  serializeJson(doc, Serial);
  Serial.println();
}