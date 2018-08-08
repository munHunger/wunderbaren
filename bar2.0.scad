$fn = 8;
//$fn = 16;
//$fn = 32;
barMode = true;

space();

if(barMode) {
    translate([1900,0,0])
    rotate([0,0,90])
    longSegment();
    
    translate([1200,1400,0])
    rotate([0,0,180])
    shortSegment();
}
if(!barMode) {
    translate([1200,0,0])
    longSegment();
    translate([0,1400,0])
    rotate([0,0,-90])
    shortSegment();
}
module longSegment() {
    //Upper section
    translate([0,0,1000])
    mirror([1,0,0])
    rotate([0,0,90]) {
        translate([0,(200-10)*0,0])
        box(width = 200, depth = 200, height = 350, useMesh = [true, true, false, true], useDoor = true);
        translate([0,(200-10)*1,0])
        box(width = 200, depth = 200, height = 350, useMesh = [true, true, false, true], useDoor = true);
        translate([0,(200-10)*2,0])
        box(width = 200, depth = 200, height = 350, useMesh = [true, true, false, true], useDoor = true, hingeRight = true);
        translate([0,(200-10)*3,0])
        box(width = 200, depth = 200, height = 350, useMesh = [true, true, true, true], useDoor = true, hingeRight = true);
        translate([50,385,350])
        oak(300, 770);
    }
    //Bottom section
    translate([0,0,100]) {
        box(width = 400, depth = 200, height = 900, useMesh = [true, true, false, false], useWood = [false, false, false, true]);
        translate([190,0,0])
        box(width = 400, depth = 390, height = 900, useWood = [false, false, false, true]);
        translate([570,0,0])
        box(width = 400, depth = 200, height = 900, useMesh = [true, true, false, false], useWood = [false, false, false, true]);
    }
}

module shortSegment() {
    //Upper section
    translate([0,0,1000])
    mirror([1,0,0])
    rotate([0,0,90]) {
        translate([0,(200-10)*0,0])
        box(width = 200, depth = 200, height = 350, useMesh = [true, true, false, true], useDoor = true);
        translate([0,(200-10)*1,0])
        box(width = 200, depth = 200, height = 350, useMesh = [true, true, true, true], useDoor = true, hingeRight = true);
        translate([50,195,350])
        oak(300, 390);
    }
    //Bottom section
    translate([0,0,100]) {
        translate([280,290,0])
        svalkas();
        box(width = 580, depth = 570, height = 900, useMesh = [true, true, false, false], useWood = [false, false, false, true]);
        translate([560,0,0])
        box(width = 580, depth = 200, height = 900, useMesh = [true, true, false, false], useWood = [false, false, false, true]);
    }
}

//https://www.ikea.com/se/sv/catalog/products/60282346/
module svalkas() {
    color([0.9,0.9,0.9])
    translate([0,0,873/2])
    cube([540,549,873], center = true);
}

//https://www.bauhaus.se/limfog-ek-18x600x2500mm.html
module oak(length = 100, width = 100) {
    color([0.7,0.65,0.5])
    translate([0,0,9])
    cube([length,width,18], center = true);
}

module box(width = 100, height = 100, depth = 100, useMesh = [false, false, false, false], useWood = [false, false, false, false], useDoor = false, doorOpenAngle = 45, hingeRight = false) {
    if(!useDoor) {
        translate([depth-10,0,0])
        panel(width, height, useMesh = useMesh[0], useWood = useWood[0]);
    }
    if(useDoor) {
        translate([depth-10,0,0])
        panel(width, height, useMesh = false);
        if(hingeRight) {
            translate([depth,width-10,10])
            rotate([0,0,doorOpenAngle])
            translate([-10,-width+20,0])
            panel(width-20, height-20, useMesh = useMesh[0], useWood = useWood[0]);
        }
        if(!hingeRight) {
            translate([depth,10,10])
            rotate([0,0,-doorOpenAngle])
            translate([-10,0,0])
            panel(width-20, height-20, useMesh = useMesh[0], useWood = useWood[0]);
        }
    }
    panel(width, height, useMesh = useMesh[1], useWood = useWood[1]);
    translate([depth,width-10,0])
    rotate([0,0,90])
    panel(depth, height, useMesh = useMesh[2], useWood = useWood[2]);
    translate([depth,0,0])
    rotate([0,0,90])
    panel(depth, height, useMesh = useMesh[3], useWood = useWood[3]);
}

module panel(width = 100, height = 100, useMesh = false, useWood = false) {
    translate([5,5,0]) {
        bar(height);
        translate([0,width-10,0])
        bar(height);
        translate([0,-5+10,5])
        rotate([-90,0,0])
        bar(width-20);
        translate([0,-5+10,-5+height])
        rotate([-90,0,0])
        bar(width-20);
        
        if(useMesh) {
            translate([0,width/2-5,height/2])
            rotate([90,0,0])
            rotate([0,-90,0])
            mesh(width-20, height-20);
        }
        if(useWood) {
            translate([0,width/2-5,height/2])
            rotate([90,0,0])
            rotate([0,-90,0])
            oak(width-20, height-20);
        }
    }
}

//https://www.byggmax.se/virke/st%C3%A5lprofiler/vinkelprofil-aluminium-m%C3%B6rk-p208151
module lProfile(length = 100) {
    color([0.1,0.1,0.1])
    translate([0,0,length/2])
    difference() {
        cube([10,10,length], center = true);
        translate([1,1,0])
        cube([10,10,length+1], center = true);
    }
}

//https://www.skruvat.se/Aluminiumnat-grill-svart-P81224.aspx
module mesh(width = 100, height = 100) {
    color([0.1,0.1,0.1])
    translate([0,0,2]) {
        difference() {
            cube([width, height, 4], center = true);
            if($fn > 32) {
                translate([-width/2,-height/2,0]) {
                    for(x = [0:1:width/6]) {
                        for(y = [0:1:height/2]) {
                            translate([6*x+(3*(y%2)),2*y,0])
                            scale([2,1,1])
                            rotate([0,0,45])
                            cube([2,2,8], center = true);
                        }
                    }
                }
            }
            if($fn > 16 && $fn <= 32) {
                translate([-width/2,-height/2,0]) {
                    for(x = [0:1:width/24]) {
                        for(y = [0:1:height/8]) {
                            translate([24*x+(12*(y%2)),8*y,0])
                            scale([2,1,1])
                            rotate([0,0,45])
                            cube([8,8,8], center = true);
                        }
                    }
                }
            }
            if($fn <= 16 && $fn > 8) {
                translate([-width/2,-height/2,0]) {
                    for(x = [0:1:width/48]) {
                        for(y = [0:1:height/16]) {
                            translate([48*x+(24*(y%2)),16*y,0])
                            scale([2,1,1])
                            rotate([0,0,45])
                            cube([16,16,8], center = true);
                        }
                    }
                }
            }
        }
    }
}

//https://www.byggmax.se/virke/st%C3%A5lprofiler/r%C3%B6r-fyrkantigt-aluminium-p208145
module bar(length = 100) {
    color([0.1,0.1,0.1])
    difference() {
        translate([0,0,length/2])
        cube([10,10,length], center = true);        
        translate([0,0,length/2])
        cube([8,8,length+3], center = true);
    }
}

module space() {
    color([0.8,0.8,0.8]) {
        rotate([90,0,90])
        square([1000,2800]);
        translate([0,1000,0])
        rotate([90,0,90])
        square([1000,810]);
        rotate([90,0,0])
        square([1970,2800]);
        square([1970,2000]);
    }
}