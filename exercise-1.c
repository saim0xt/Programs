#include <stdio.h>

int main() {
    // Question 1: Declare an integer variable and assign it a value. Print the value.
    int myInteger = 42;
    printf("Integer value: %d\n", myInteger);

    // Question 2: Declare a float variable and assign it a value. Print the value.
    float myFloat = 3.14f;
    printf("Float value: %.2f\n", myFloat);

    // Question 3: Declare a double variable and assign it a value. Print the value.
    double myDouble = 2.718281828459;
    printf("Double value: %.12lf\n", myDouble);

    // Question 4: Declare a char variable and assign it a character. Print the character.
    char myChar = 'A';
    printf("Character value: %c\n", myChar);

    // Question 5: Declare a string (array of characters) and assign it a value. Print the string.
    char myString[] = "Hello, World!";
    printf("String value: %s\n", myString);

    // Question 6: Declare a short integer and a long integer. Assign values and print them.
    short myShort = 32767;  // Maximum value for short
    long myLong = 1234567890L;
    printf("Short value: %d\n", myShort);
    printf("Long value: %ld\n", myLong);

    // Question 7: Declare an unsigned integer and assign it a value. Print the value.
    unsigned int myUnsignedInt = 3000000000U;
    printf("Unsigned Integer value: %u\n", myUnsignedInt);

    // Question 8: Experiment with type casting. Convert a float to an integer and print the result.
    int castedInteger = (int)myFloat;
    printf("Casted Integer from Float: %d\n", castedInteger);

    return 0;
}