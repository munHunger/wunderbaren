$fn = 16;
wallThickness = 2;

base(wallThickness);

module base(thickness) {
    union() {
        difference() {
            union() {
                translate([0,0,5+thickness/2])
                cube([40+thickness*2,60+thickness*2,10+thickness], center = true);
                translate([-30,5,5+thickness/2])
                cube([20+thickness*2,50+thickness*2,10+thickness], center = true);
            }
            translate([0,0,5+thickness/2+thickness])
            cube([40,60,10+thickness], center = true);
            translate([-30+0.01-thickness/2,5,5+thickness/2+thickness])
            cube([20+thickness,50,10+thickness], center = true);
        }
        difference() {
            translate([-30-thickness,5,15])
            cube([20+thickness*2,50+thickness*2,30], center = true);
            
            translate([-29.99+thickness/2-thickness,5,15])
            cube([20+thickness,50,31], center = true);
            
            translate([-30+0.01-thickness/2,25+thickness*2,28-11])
            cube([14,thickness*10,4], center = true);
        }
        
        //RFID PINS
        translate([20-1.3-1.2,30-1.3-14,0])
        cylinder(r = 1.3, h = 10);
        mirror([1,0,0])
        translate([20-1.3-1.2,30-1.3-14,0])
        cylinder(r = 1.3, h = 10);

        translate([20-1.3-6,-30+1.3+6,0])
        cylinder(r = 1.3, h = 10);
        mirror([1,0,0])
        translate([20-1.3-6,-30+1.3+6,0])
        cylinder(r = 1.3, h = 10);
    }

    translate([0,0,0.1]) {
        difference() {
            translate([0,0,10+thickness/2+thickness])
            cube([40+thickness*2,60+thickness*2,thickness], center = true);
            translate([-21-0.01,5,11.01+thickness/2])
            cube([thickness+0.01,50.02+thickness*2,thickness*2], center = true);
        }
        translate([-30-thickness,5,30+thickness/2])
        cube([20+thickness*2,50+thickness*2,thickness], center = true);
        
        translate([-21+0.01+thickness,5,21+thickness/2])
        cube([thickness,50+thickness*2,18+thickness], center = true);
    }
}

color([0.3,0.3,0.3])
translate([0,0,wallThickness]) {
    //RFID
    translate([0,0,5])
    cube([40,60,10], center = true);
    //ARDUINO
    translate([-30,5,15])
    cube([20,50,30], center = true);
}