#include <USVSystem.h>

void updateMotorSpeed(unsigned char speed)
{
  // speed = 0
  //  1 <= speed <= 50
  // 51 <= speed <= 100
  if (speed == 0)
  {
    digitalWrite(MOTOR_PIN0, HIGH);
    analogWrite(MOTOR_PIN2, 0);
    analogWrite(MOTOR_PIN1, 0);
  }
  else
  {
    digitalWrite(MOTOR_PIN0, LOW);

    if (speed <= 50)
    {
      analogWrite(MOTOR_PIN1, map(speed, 1, 50, 2, 255));
      analogWrite(MOTOR_PIN2, 0);
    }

    if (speed >= 51)
    {
      analogWrite(MOTOR_PIN1, 255);
      analogWrite(MOTOR_PIN2, map(speed, 51, 100, 2, 255));
    }
  }
}