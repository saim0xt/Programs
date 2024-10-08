/* Exercise: Write a C program that takes three numbers as input from the user and stores them in variables of 
different data types (int, float, and double). Then, print the values of these variables.*/

#include <stdio.h>

int main() {
    int num1;
    float num2;
    double num3;

    printf("Enter an integer: ");
    scanf("%d", &num1);

    printf("Enter a floating point number: ");
    scanf("%f", &num2);

    printf("Enter a double precision floating point number: ");
    scanf("%lf", &num3);

    printf("You entered: \n");
    printf("Integer: %d\n", num1);
    printf("Float: %f\n", num2);
    printf("Double: %lf\n", num3);

    return 0;
}