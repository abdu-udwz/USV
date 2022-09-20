#include <USVSystem.h>

void updateMotorSpeed(unsigned char speed)
{
  // speed = 0
  //  1 <= speed <= 127
  // 128 <= speed <= 255
  if (speed == 0)
  {
    digitalWrite(MOTOR_PIN0, HIGH);
  }
  else
  {
    digitalWrite(MOTOR_PIN0, LOW);

    if (speed <= 127)
    {
      analogWrite(MOTOR_PIN2, 0);
      analogWrite(MOTOR_PIN1, map(speed, 1, 127, 0, 255));
    }

    if (speed >= 127)
    {
      analogWrite(MOTOR_PIN1, 255);
      analogWrite(MOTOR_PIN1, map(speed, 128, 255, 0, 255));
    }
  }
}