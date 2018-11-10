$fn = 8;
//$fn = 16;
//$fn = 32;
barMode = false;

//space();

// translate([0,0,floorClearing]) {
//     translate([0,400,0])
//     cube([540,549,873]);
//     translate([0,400,873])
//     cube([250,549,300]);

//     translate([550,0,0])
//     cube([1200, 500, 750 - floorClearing]);

//     translate([550,0,750 - floorClearing])
//     cube([1200, 250, 300]);
//     translate([550,0,750 - floorClearing + 300])
//     cube([1200, 250, 300]);
// }

// color([1,0,0])
// translate([550,0,0])
// micke();

floorClearing = 100;
width = 1200;
shelfDepth = 300;
openWidth = 750;

woodThickness = 18;

union() {
    if(!barMode) {
        translate([650, 0, 0]) {
            a();
            translate([0,0,750])
            b();
        }
        c();
    }
    if(barMode) {
        offset = 1000;
        translate([650 + offset, 0, 0])
        rotate([0,0,90])
        union() {
            a();
            translate([0,0,750])
            b();
        }
        translate([650 + offset,1200,0])
        rotate([0,0,90])
        c();
    }
}

module panel(width = 500, height = 500, connectSides = [false, false, false, false], spacing = 500) {
    cube([width, height, woodThickness]);
    if(connectSides[0]) {
        for(i = [1:1:width/spacing])
        translate([i*spacing-spacing/2,0,tSlot40/2])
        rotate([90,0,0])
        panelConnector();
    }
    if(connectSides[1]) {
        for(i = [1:1:height/spacing])
        translate([0,i*spacing-spacing/2,tSlot40/2])
        rotate([90,0,-90])
        panelConnector();
    }
    if(connectSides[2]) {
        for(i = [1:1:width/spacing])
        translate([i*spacing-spacing/2,height,tSlot40/2])
        rotate([90,0,180])
        panelConnector();
    }
    if(connectSides[3]) {
        for(i = [1:1:height/spacing])
        translate([width,i*spacing-spacing/2,tSlot40/2])
        rotate([90,0,90])
        panelConnector();
    }
}

module panelConnector() {
    if($fn > 32) {
        //M8 nut
        translate([0,0,4])
        cylinder(r = 14.38/2, h = 6.5, $fn = 6);
        //M8 screw
        translate([0,0,-4])
        cylinder(r = 4, h = 15);
        translate([0,0,-8])
        cylinder(r = 5.5, h = 3);
    }

    translate([0, 0, -8]) {       
        difference() {
            cube([15,15,15], center = true);
            translate([0,-5,-5])
            cube([5,15,15], center = true);
            //M8 screw head clearing
            if($fn > 8)
            translate([0,0,-10])
            cylinder(r = 5.5, h = 15);
        }
        for(i = [-1:2:1]) {
            translate([(-i)*15,1,0]) {
                cube([15,5,15], center = true);
                if($fn > 8)
                translate([0,5,0])
                rotate([90,0,0])
                cylinder(r = 5.5, h = 3);
                if($fn > 32)
                translate([0,0,0])
                rotate([90,0,0])
                cylinder(r = 4, h = 16);
            }
        }
    }
}

module bracket90(size = 50, thickness = tSlot40, screwCount = 2, headRadius = 4, screwRadius = 3, headThickness = 3) {
    module screw() {
        cylinder(r = headRadius, h = 200);
        translate([0,0,-200+0.01])
        cylinder(r = screwRadius, h = 200);
    }
    color([0.1, 0.1, 0.1]) {
        difference() {
            translate([thickness,0,0])
            rotate([90,0,-90])
            linear_extrude(thickness)
            polygon([[0,0], [size,0], [0,size]]);

            if($fn > 8) {
                for(i = [1:1:screwCount])
                translate([thickness/2, -(i*(size/(screwCount+1))), headThickness])
                screw();

                for(i = [1:1:screwCount])
                translate([thickness/2, -headThickness, (i*(size/(screwCount+1)))])
                rotate([90,0,0])
                screw();
            }
        }
    }
}

module c() {
    height = 1350;
    depth = 650;
    width = 900;
    for(i = [0:1:1]) {
        translate([0, (width - tSlot40) * i, 0]) {
            tSlot(height);
            translate([depth - tSlot40, 0, 0])
            tSlot(height);   
        }
    }
    translate([tSlot40 + 300,300,floorClearing])
    svalkas();
    color([0.8, 0.8, 0.8])
    translate([0,0,height])
    cube([depth, width, 40]);
}

module b() {
    height = 600;
    shelfCount = 2;

    tSlot(height);
    translate([0, shelfDepth - tSlot40, 0])
    tSlot(height);

    translate([width - tSlot40, 0, 0]) {
        tSlot(height);
        translate([0, shelfDepth - tSlot40, 0])
        tSlot(height);
    }
    translate([openWidth - tSlot40, 0, 0]) {
        tSlot(height);
        translate([0, shelfDepth - tSlot40, 0])
        tSlot(height);
    }

    for(i = [1:1:shelfCount]) {
        translate([openWidth, shelfDepth - tSlot40, i * (height / (shelfCount + 1))])
        rotate([0,90,0])
        tSlot(width - openWidth - tSlot40);
    }

    color([0.8, 0.8, 0.8]) 
    translate([0, 0, height])
    cube([width, shelfDepth, 40]);
}

module a() {
    depth = 650;
    height = 750;
    shelfCount = 2;
    cableSlotWidth = 50;

    //Back support pipes
    union() {
        tSlot(height);
        translate([width - tSlot40, 0, 0])
        tSlot(height);
    }

    module lBracket() {
        translate([tSlot40, tSlot40, 0])
        rotate([0,180,90])
        bracket90();
        translate([0, tSlot40, 0])
        rotate([0,180,180])
        bracket90();
    }
    //Support brackets for botom structure
    translate([0, 0, floorClearing])
    {
        lBracket();
        translate([width,depth,0])
        mirror([1,1,0])
        lBracket();
        translate([width,0,0])
        mirror([1,0,0])
        lBracket();
        translate([openWidth-tSlot40,depth,0])
        mirror([0,1,0])
        lBracket();
        translate([0,depth-tSlot40,0])
        rotate([90,0,0])
        bracket90();
    }
    //Support brackets for upper structure
    translate([0, 0, height-tSlot40])
    {
        lBracket();
        translate([width,depth,0])
        mirror([1,1,0])
        lBracket();
        translate([width,0,0])
        mirror([1,0,0])
        lBracket();
        translate([0,depth,0])
        mirror([0,1,0])
        lBracket();
        translate([openWidth,depth-tSlot40,0])
        rotate([90,0,90])
        bracket90();
    }

    //Front support pipes
    translate([0, depth-tSlot40, 0]) {
        tSlot(height = height);
        translate([width - tSlot40, 0, 0])
        tSlot(height);
    }

    translate([tSlot40, 0, tSlot40 + floorClearing])
    rotate([0,90,0])
    tSlot(width - 2 * tSlot40);
    translate([tSlot40, 0, height])
    rotate([0,90,0])
    tSlot(width - 2 * tSlot40);

    translate([tSlot40, depth - tSlot40, height])
    rotate([0,90,0])
    tSlot(width - 2 * tSlot40);


    for(i = [0:1:1]) {
        translate([(width-tSlot40) * i,0,0]) {
            translate([0,tSlot40,tSlot40 + floorClearing])
            rotate([-90,0,0])
            tSlot(depth- 2 * tSlot40);
            translate([0,tSlot40,height])
            rotate([-90,0,0])
            tSlot(depth- 2 * tSlot40);
        }
    }

    translate([openWidth - tSlot40,depth-tSlot40,0])
    tSlot(height-tSlot40);
    translate([openWidth - tSlot40, tSlot40, tSlot40 + floorClearing])
    rotate([-90,0,0])
    tSlot(depth - 2 * tSlot40);

    translate([openWidth,depth-tSlot40,tSlot40 + floorClearing])
    rotate([0,90,0])
    tSlot(width - openWidth - tSlot40);
    
    for(i = [0:1:shelfCount]) {
        translate([openWidth,depth-tSlot40,tSlot40 + floorClearing + i * ((height - floorClearing) / (shelfCount + 1))])
        rotate([0,90,0])
        tSlot(width - openWidth - tSlot40);
    }

    translate([width - tSlot40, shelfDepth - tSlot40, floorClearing + tSlot40])
    tSlot(height - floorClearing - (2 * tSlot40));
    translate([openWidth - tSlot40, shelfDepth - tSlot40, floorClearing + tSlot40])
    tSlot(height - floorClearing - (2 * tSlot40));
    translate([tSlot40, shelfDepth - tSlot40, height])
    rotate([0,90,0])
    tSlot(width - 2 * tSlot40);

    translate([openWidth - tSlot40, tSlot40, height])
    rotate([-90,0,0])
    tSlot(shelfDepth - tSlot40 * 2);

    color([0.8, 0.8, 0.8]) {
        translate([tSlot40, tSlot40 + cableSlotWidth, height])
        mirror([0,0,1])
        panel(openWidth - tSlot40 * 2, shelfDepth - tSlot40 * 2 - cableSlotWidth, connectSides = [false, true, true, true], spacing = 100);
        translate([openWidth, tSlot40, height])
        mirror([0,0,1])
        panel(width  - openWidth - tSlot40, shelfDepth - tSlot40 * 2, connectSides = [true, true, true, true], spacing = 200);
        translate([tSlot40, shelfDepth, height])
        mirror([0,0,1])
        panel(width - 2 * tSlot40, depth - shelfDepth - tSlot40, connectSides = [true, true, true, true], spacing = 200);

        translate([0.1, tSlot40, floorClearing + tSlot40])
        rotate([0,-90,0])
        mirror([0,0,1])
        panel(height-floorClearing-2*tSlot40, depth-2*tSlot40, connectSides = [true, true, true, true], spacing = 200);
    }

    module printer() {
        cube([350, 350, 770]);
    }
    //printer();
}

tSlot40 = 40;
//https://www.alucon.se/product/aluminiumprofil-40x40-latt-t-spar-8-1-mm
module tSlot(height = 10) {
    color([0.1, 0.1, 0.1])
    translate([20,20,height / 2])
    difference() {
        //Base
        intersection() {
            cube(size=[40, 40, height], center=true);
            //chamfer
            if($fn > 16)
            rotate([0,0,45])
            cube([55, 55, height], center=true);
        }

        //Center hole
        cylinder(r=5.55, h=height+0.2, center=true);

        if($fn > 8)
        for(r = [0:1:3]) {
            rotate([0,0,90*r]) {
                //Corner cube
                translate([-(40/2)+5.2, -(40/2)+5.2,0])
                cube([7.2, 7.2, height+0.2], center=true);

                //T-Section
                translate([0,-(40/2)+(11.2)-0.1,0]) {
                    translate([0,-11.2/2,0])
                    cube([8.5, 11.2, height+0.2], center = true);
                    translate([0,-7.2/2,0])
                    intersection() {
                        cube([19.2, 7.2, height+0.2], center = true);

                        if($fn > 16)
                        translate([0,-3,0])
                        rotate([0,0,45])
                        cube([20, 20, height+0.2], center = true);
                    }
                    for(i = [0:1:1]) {
                        mirror([i,0,0]) 
                        translate([-8,-8,0])
                        cube([3, 2, height+0.2], center = true);
                    }
                }
            }
        }
    }
}

//https://www.ikea.com/se/sv/catalog/products/60282346/
module svalkas() {
    color([0.9,0.9,0.9])
    translate([0,0,873/2])
    cube([540,549,873], center = true);
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