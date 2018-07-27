cardHolder(2, 4, 25);

module cardHolder(thickness, spacing, count) {
    difference() {
        translate([0,0,15])
        cube([count*1+(count-1)*spacing+thickness*2, 54+thickness*2, 30], center = true);
        for (i = [0:count-1]) {
            translate([(count*1+(count-1)*spacing+thickness*2)/2-0.75-thickness-(spacing+1)*i,0,85/2+10])
            cube([1.5,54.5,85], center = true);
        }
    }
}