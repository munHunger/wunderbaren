$fn = 128;
difference() {
    translate([0,0,5])
    cube([30,5,10], center = true);
    translate([0,0,-0.01])
    cylinder(r=1, h = 11);

    for(i = [0:1:1])
        mirror([i,0,0])
        translate([15,5,10])
        scale([1.5,1,1])
        rotate([90,0,0])
        cylinder(r=7, h=10);
}