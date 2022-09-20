#ifndef USVSystem_H
#define USVSystem_H

#include "Arduino.h"
#include <ArduinoJson.h>
#include <Servo.h>
#include "prefs.h"

/* Motor */
void updateMotorSpeed(unsigned char speed);

/* GPS */
void navigationMain();

/* Rudder */
extern Servo rudderServo; // create servo object to control a servo
void updateRudderAngle(short angle);

#endif