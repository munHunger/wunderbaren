

//stepperMotorDriverMount();

wallThickness = 2;

translate([0,1,wallThickness/2])
cube([17+wallThickness*2,34+wallThickness*2, wallThickness], center = true);
translate([0,-17,wallThickness+3])
cube([5,wallThickness,6], center = true);
translate([0,-16.75,wallThickness+7])
cube([5,wallThickness*1.5,2], center = true);
translate([0,-16,wallThickness+1.5])
cube([5,2,3], center = true);

translate([9.5,0,wallThickness+2.5])
cube([wallThickness,5,5], center = true);
translate([-9.5,0,wallThickness+2.5])
cube([wallThickness,5,5], center = true);

difference() {
    translate([0,18.5,wallThickness+3])
    cube([17.5,wallThickness,6], center = true);
    translate([0,0,wallThickness+1.51])
    cube([8,50,3], center = true);
}

//$fn = 100;
module shotHolder() {
    difference() {
        union() {
            tube(20, 25, 10);
            translate([0,25,5])
            cube([12, 6, 10], center = true);
        }
        translate([0,28.1,5])
        rotate([90,0,0])
        intersection() {
            cylinder(r = 2.7, h = 6);
            translate([0,0,3])
            cube([3,6,6], center = true);
        }
    }
}

module stepperMotorDriverMount() {
    difference() {
        translate([0,0,1.5])
        cube([37,34,3], center = true);
        translate([0,0,2.01])
        cube([35,32,2],center=true);
    }
    translate([0,0,1]) {
        translate([15,13,0])
        cylinder(r = 1, h = 2);
        translate([-15,13,0])
        cylinder(r = 1, h = 2);
        translate([15,-13,0])
        cylinder(r = 1, h = 2);
        translate([-15,-13,0])
        cylinder(r = 1, h = 2);
    }
}

module tube(innerRadius, outerRadius, height) {
    difference() {
        cylinder(r = outerRadius, h = height);
        translate([0,0,-1]) cylinder(r = innerRadius, h = height + 2);
    }
}