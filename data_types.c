#include <stdio.h>

int main() {
    // Integer Types
    int x = 10;
    unsigned int y = 20;
    short z = 30;
    unsigned short w = 40;
    long v = 50;
    unsigned long u = 60;
    long long t = 70;
    unsigned long long s = 80;

    printf("Integer Types:\n");
    printf("x: %d\n", x);
    printf("y: %u\n", y);
    printf("z: %hd\n", z);
    printf("w: %hu\n", w);
    printf("v: %ld\n", v);
    printf("u: %lu\n", u);
    printf("t: %lld\n", t);
    printf("s: %llu\n", s);

    // Floating-Point Types
    float f = 3.14;
    double d = 2.71828;
    long double ld = 1.23456789;

    printf("\nFloating-Point Types:\n");
    printf("f: %f\n", f);
    printf("d: %f\n", d);
    printf("ld: %Lf\n", ld);

    // Character Types
    char c = 'A';
    unsigned char uc = 'B';
    wchar_t wc = L'C';

    printf("\nCharacter Types:\n");
    printf("c: %c\n", c);
    printf("uc: %c\n", uc);
    printf("wc: %lc\n", wc);

    // Boolean Type
    bool b = true;

    printf("\nBoolean Type:\n");
    printf("b: %d\n", b);

    // Void Type
    void *ptr = NULL;

    printf("\nVoid Type:\n");
    printf("ptr: %p\n", ptr);

    // Derived Types
    int arr[5] = {1, 2, 3, 4, 5};

    printf("\nDerived Types:\n");
    printf("arr: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    struct Person {
        int age;
        char name[20];
    };

    struct Person person;
    person.age = 25;
    strcpy(person.name, "John Doe");

    printf("person: age = %d, name = %s\n", person.age, person.name);

    union Color {
        int red;
        int green;
        int blue;
    };

    union Color color;
    color.red = 255;

    printf("color: red = %d\n", color.red);

    enum Day { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY };
    enum Day day = TUESDAY;

    printf("day: %d\n", day);

    int x2 = 10;
    int *ptr2 = &x2;

    printf("ptr2: %p\n", ptr2);
    printf("*ptr2: %d\n", *ptr2);

    return 0;
}