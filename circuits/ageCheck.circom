pragma circom 2.0.0;

template AgeCheck() {
    signal private input age;
    signal input minAge;
    signal output isOldEnough;
    signal ageInRange;
    
    isOldEnough <== age >= minAge;
    ageInRange <== (age >= 0) && (age <= 150);
    ageInRange === 1;
}

component main = AgeCheck();