$fn = 8;
//$fn = 16;
//$fn = 32;
barMode = false;

space();

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

translate([2000,150,floorClearing])
color([0.4,0.4,0.4])
printer();
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

!union() {
    //space();
    c();
    translate([600,0,0])
    desk();
}
module desk() {
    //a();
    deskHeight = 750;
    fullHeight = 1350;
    depth = 650;
    openWidth = 800;
    shelfDepth = 300;
    profileSize = 20;

    grooveDepth = 70;

    module side() {
        squareProfile(fullHeight);
        translate([0,shelfDepth - profileSize,deskHeight])
        squareProfile(fullHeight - deskHeight);

        translate([0,profileSize,fullHeight])
        rotate([-90,0,0])
        squareProfile(shelfDepth - profileSize * 2);

        translate([0,depth - profileSize,0])
        squareProfile(deskHeight);
        translate([0,profileSize, floorClearing + profileSize])
        rotate([-90,0,0])
        squareProfile(depth - 2 * profileSize);
        translate([0,profileSize, deskHeight])
        rotate([-90,0,0])
        squareProfile(depth - 2 * profileSize);
    }
    color([0.2, 0.2, 0.2]) {
        side();
        translate([width - profileSize, 0, 0])
        side();
        translate([openWidth, 0, 0])
        side();

        translate([openWidth / 2, 0, 0])
        squareProfile(fullHeight);
    }
    translate([0,shelfDepth,deskHeight])
    oak(width, depth - shelfDepth);

    translate([0,0,fullHeight])
    oak(width, shelfDepth);
    translate([profileSize,profileSize + grooveDepth,deskHeight])
    oak(width - profileSize * 2, shelfDepth - profileSize * 2 - grooveDepth);

    module sidePanel() {
        translate([profileSize, profileSize, deskHeight])
        rotate([0,-90,0])
        panel(fullHeight - deskHeight - profileSize, shelfDepth - 2 * profileSize);

        translate([profileSize, profileSize, floorClearing + profileSize])
        rotate([0,-90,0])
        panel(deskHeight - floorClearing - 2 * profileSize, depth - 2 * profileSize);
    }
    sidePanel();
    translate([width, 0, 0])
    mirror([1,0,0])
    sidePanel();

    module backPlate(width) {
        translate([0,profileSize,floorClearing + profileSize])
        rotate([90,0,0])
        panel(width, deskHeight - floorClearing - 2 * profileSize);

        translate([0,profileSize,deskHeight])
        rotate([90,0,0])
        panel(width, fullHeight - deskHeight - profileSize);

        color([0.2,0.2,0.2]) {
            translate([0,0,floorClearing + profileSize])
            rotate([0,90,0])
            squareProfile(width);
            translate([0,0,fullHeight])
            rotate([0,90,0])
            squareProfile(width);
            translate([0,0,deskHeight])
            rotate([0,90,0])
            squareProfile(width);
        }
    }
    translate([openWidth + profileSize, 0, 0])
    backPlate(width - openWidth - 2 * profileSize);

    translate([profileSize, 0, 0])
    backPlate((openWidth - profileSize) / 2);
    translate([profileSize + openWidth / 2, 0, 0])
    backPlate((openWidth - profileSize) / 2);
}

module oak(width, height) {
    echo ("oak", width, height);
    cube([width, height, 20]);
}

module dimensions(size = [1000, 1000, 1000]) {
    thickness = 30;
    cube([thickness * 3, thickness * 3, thickness * 3], center = true);
    translate([size[0]/2,0,0]) {
        cube([size[0],thickness, thickness], center = true);
        mirror([1,0,0])
        mirror([0,1,0])
        translate([-200,0,0])
        text(str(size[0], "mm"), 100);
    }
    translate([0,size[1]/2,0]) {
        cube([thickness,size[1], thickness], center = true);
        rotate([0,0,-90])
        mirror([1,0,0])
        mirror([0,1,0])
        translate([-200,0,0])
        text(str(size[1], "mm"), 100);
    }
    translate([0,0,size[2]/2]) {
        cube([thickness,thickness, size[2]], center = true);
        rotate([0,0,-90])
        mirror([1,0,0])
        mirror([0,1,0])
        rotate([0,90,0])
        translate([-200,0,0])
        text(str(size[2], "mm"), 100);
    }
}

module laptop() {
    alpha = 0.5;
    color([alpha, alpha, alpha]) {
        cube([322,223,6]);
        translate([0,0,6])
        rotate([110,0,0])
        cube([322,223,6]);
    }
}

module printer() {
    translate([0,0,700])
    import("./top.stl");
    translate([0,0,350])
    for(i = [0:1:2]) {
        rotate([0,0,120 * i])
        translate([0,152,0])
        import("./K8800-RI.stl");
    }

    for(i = [0:1:2]) {
        rotate([0,0,120 * i])
        import("./side.stl");
    }
}

module panel(width = 500, height = 500) {
    profileSize = 20;
    profileThickness = 2;
    color([0.2,0.2,0.2]) {
        translate([0,0, profileSize])
        rotate([-90,0,0])
        panelAngle(height);

        translate([width,0, profileSize])
        mirror([1,0,0])
        rotate([-90,0,0])
        panelAngle(height);

        translate([0,0, profileSize])
        mirror([0,0,1])
        rotate([90,0,0])
        rotate([0,90,0])
        panelAngle(width);

        translate([0,height, profileSize])
        rotate([-90,0,0])
        rotate([0,90,0])
        panelAngle(width);
    }

    echo("panel", width, height);
    translate([profileThickness, profileThickness, 0])
    cube([width - 2 * profileThickness, height - 2 * profileThickness, 18]);
}

module panelAngle(length) {
    echo("angle", length);
    difference() {
        cube([20, 20, length]);
        translate([2,2,-1])
        cube([20, 20, length + 2]);
        rotate([0,0,45])
        translate([-18, -10, -1])
        cube([20, 20, length + 2]);

        translate([0,0,length])
        rotate([90,50,0])
        translate([0, 0, -21])
        cube([40, 20, 22]);

        rotate([90,-50,0])
        translate([0, -20, -21])
        cube([40, 20, 22]);
    }
}

module plyPanel(width = 500, height = 500) {
    //https://www.bauhaus.se/furuplywood-4mm-1220x2440mm.html
    cube([width, height, 4]);
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
    depth = 600;
    width = 900;
    shelfHeight = 1050;
    $t = 2;
    color([0.1,0.1,0.1]) {
        for(i = [0:1:min(2, $t*10)]) {
            translate([0, (width - 20) * i/2, 0]) {
                squareProfile(height);
                translate([depth - 20, 0, 0])
                squareProfile(height);   
            }
        }
        if($t > 0.2) {
            for(i = [0:1:min(2, $t*10-3)]) {
                translate([0, (width - 20) * i/2, 0]) {
                    translate([0,0,floorClearing])
                    translate([20,0,20])
                    rotate([0,90,0])
                    squareProfile(depth - 40);
                    translate([0,0,height])
                    translate([20,0,0])
                    rotate([0,90,0])
                    squareProfile(depth - 40);
                    translate([0,0,shelfHeight])
                    translate([20,0,0])
                    rotate([0,90,0])
                    squareProfile(depth - 40);
                }
            }
        }
    }
    
    color([0.2,0.2,0.2])
    if($t > 0.5) {
        difference() {
            union() {
                translate([-1.5,-1.5,height])
                bentAngle();
                translate([depth+1.5,-1.5,height])
                rotate([0,0,90])
                bentAngle();

                translate([-1.5,width+1.5,height])
                rotate([0,0,270])
                bentAngle();
                translate([depth+1.5,width,height])
                rotate([0,0,180])
                bentAngle();

                translate([0,0,floorClearing])
                mirror([0,0,1]) {
                    translate([-1.5,-1.5,0])
                    bentAngle();
                    translate([depth+1.5,-1.5,0])
                    rotate([0,0,90])
                    bentAngle();

                    translate([-1.5,width+1.5,0])
                    rotate([0,0,270])
                    bentAngle();
                    translate([depth+1.5,width,0])
                    rotate([0,0,180])
                    bentAngle();
                }

                translate([depth+1.5,width/2-10,floorClearing])
                mirror([0,0,1])
                rotate([90,0,90])
                straightAngle();
                translate([-1.5,width/2-10,floorClearing])
                mirror([0,0,1])
                rotate([90,0,90])
                straightAngle();

                translate([depth+1.5,width/2-10,height])
                rotate([90,0,90])
                straightAngle();
                translate([-1.5,width/2-10,height])
                rotate([90,0,90])
                straightAngle();

                
                translate([-1.5,-1.5,shelfHeight])
                bentCross();
                translate([depth+1.5,-1.5,shelfHeight])
                rotate([0,0,90])
                bentCross();

                translate([-1.5,width+1.5,shelfHeight])
                rotate([0,0,270])
                bentCross();
                translate([depth+1.5,width,shelfHeight])
                rotate([0,0,180])
                bentCross();

                translate([depth,width/2-10,shelfHeight])
                rotate([90,0,90])
                straightCross();
                translate([-1.5,width/2-10,shelfHeight])
                rotate([90,0,90])
                straightCross();
            }
            translate([20,width-30, shelfHeight])
            cube([depth-40, 50, height-shelfHeight-20]);
            translate([20,width-30, floorClearing+20])
            cube([depth-40, 50, shelfHeight-floorClearing-40]);
        }
    }

    color([0.1,0.1,0.1])
    if($t > 0.7) {
        translate([0,20,floorClearing+20])
        rotate([-90,0,0])
        squareProfile(width/2-30);
        translate([0,20,height])
        rotate([-90,0,0])
        squareProfile(width/2-30);
        translate([0,20,shelfHeight])
        rotate([-90,0,0])
        squareProfile(width/2-30);
        translate([depth-20,0,0]){
            translate([0,20,floorClearing+20])
            rotate([-90,0,0])
            squareProfile(width/2-30);
            translate([0,20,height])
            rotate([-90,0,0])
            squareProfile(width/2-30);
            translate([0,20,shelfHeight])
            rotate([-90,0,0])
            squareProfile(width/2-30);
        }
        translate([0,width/2-10,0]) {
            translate([0,20,floorClearing+20])
            rotate([-90,0,0])
            squareProfile(width/2-30);
            translate([0,20,height])
            rotate([-90,0,0])
            squareProfile(width/2-30);
            translate([0,20,shelfHeight])
            rotate([-90,0,0])
            squareProfile(width/2-30);
            translate([depth-20,0,0]){
                translate([0,20,floorClearing+20])
                rotate([-90,0,0])
                squareProfile(width/2-30);
                translate([0,20,height])
                rotate([-90,0,0])
                squareProfile(width/2-30);
                translate([0,20,shelfHeight])
                rotate([-90,0,0])
                squareProfile(width/2-30);
            }
        }
    }

    if($t > 0.8) {
        translate([20,20,shelfHeight-18])
        cube([depth-40,width/2-30,18]);
        translate([20,width/2+10,shelfHeight-18])
        cube([depth-40,width/2-30,18]);
        translate([20,20,floorClearing])
        cube([depth-40,width/2-30,18]);
        translate([20,width/2+10,floorClearing])
        cube([depth-40,width/2-30,18]);
    }

    if($t > 0.9) {
        translate([18,20,shelfHeight-20])
        rotate([-90,0,90])
        cube([width/2-30,shelfHeight-floorClearing-40,18]);
        translate([18,width/2+10,shelfHeight-20])
        rotate([-90,0,90])
        cube([width/2-30,shelfHeight-floorClearing-40,18]);

        translate([depth-18,0,0]) {
            translate([18,20,shelfHeight-20])
            rotate([-90,0,90])
            cube([width/2-30,shelfHeight-floorClearing-40,18]);
            translate([18,width/2+10,shelfHeight-20])
            rotate([-90,0,90])
            cube([width/2-30,shelfHeight-floorClearing-40,18]);
        }
    }

    if($t > 1.0) {
        translate([20,0,shelfHeight-20])
        rotate([-90,0,0])
        cube([depth-40,shelfHeight-floorClearing-40,18]);
    }

    if($t > 1.1)
        color([0.8, 0.8, 0.8])
        translate([0,0,height])
        cube([depth, width, 40]);

    if($t > 1.0)
        translate([tSlot40 + 270,300 + 280,floorClearing+20])
        svalkas();

    if($t > 1.0) //computer
        translate([20,20,floorClearing+20])
        cube([550,230,460]);

    translate([20,0,height])
    rotate([-90,0,0])
    cube([depth-40, height-shelfHeight, 18]);
    color([0.15,0.15,0.15]) {
        translate([2,20,height])
        rotate([-90,0,90])
        mesh(height-shelfHeight, width/2-30);
        translate([2,width/2+10,height])
        rotate([-90,0,90])
        mesh(height-shelfHeight, width/2-30);

        translate([depth-2,0,0]) {
            translate([0,20,height])
            mirror([1,0,0])
            rotate([-90,0,90])
            mesh(height-shelfHeight, width/2-30);
            translate([0,width/2+10,height])
            mirror([1,0,0])
            rotate([-90,0,90])
            mesh(height-shelfHeight, width/2-30);
        }
    }

    color([0.3,0.3,0.3])
    translate([20,width,height-20])
    mirror([1,0,0])
    rotate([0,90,90])
    meshDoor(height-shelfHeight-20, depth-40);


    color([0.3,0.3,0.3])
    translate([20,width,shelfHeight-20])
    mirror([1,0,0])
    rotate([0,90,90])
    meshDoor(shelfHeight-floorClearing-40, depth-40);

    for(x = [0:1:1])
        for(y = [0:1:4])
            translate([x*110 + 70, y*110 + 70, shelfHeight])
            cylinder(r=50, h = 140); //Glasses
}

module sawGuide() {
    height = 5;

    difference() {
        union() {
            translate([0,1,0])
            cube([height,13,8]);
            cube([height,15,5]);
        }
        translate([-0.01,1-0.01,1])
        cube([height + 1,10.5,10.5]);
    }
}
module screwGuide() {
    difference() {
        cube([21,4,10]);
        translate([-0.01,1,-0.01])
        cube([20,2,11]);
        translate([10,-0.01,5])
        rotate([-90,0,0])
        cylinder(r=1.5, h = 5, $fn=126);
    }
}
module angleGuide() {
    difference() {
        union() {
            cube([21,18,41]);
            translate([21,0,0])
            cube([1,4,20]);
        }
        translate([-0.01,-0.01,-0.01])
        cube([4.2,21,42]);
        translate([4,4,-0.01])
        cube([20,20,42]);
        union() {
            translate([1,1,-0.01])
            difference() {
                cube([20,20,40]);
                translate([2,2,-1])
                cube([20,20,42]);
            }
            translate([0.01,20.01,20.01])
            rotate([90,0,0])
            linear_extrude(22)
            polygon([[21,0],[0,21],[21,21]]);
        }
    }
}

module meshDoor(width = 300, height = 500) {
    rotate([0,90,0])
    squareProfile(width);
    translate([0, height-20,0])
    rotate([0,90,0])
    squareProfile(width);
    translate([0,20,0])
    rotate([-90,0,0])
    squareProfile(height-40);
    translate([width-20,20,0])
    rotate([-90,0,0])
    squareProfile(height-40);
    translate([20,20,0])
    mesh(height-40, width-40);

    translate([0,0,1.2]) {
        translate([0,height,0])
        angle();
        mirror([0,1,0])
        angle();
        translate([width,0,0])
        mirror([1,0,0]) {
            translate([0,height,0])
            angle();
            mirror([0,1,0])
            angle();
        }
    }

    translate([width/2, 10, 0])
    rotate([90,0,0])
    translate([-45,0,0]) {
        rotate([-90,0,0])
        cylinder(r = 5, h = 10);
        translate([90,0,0])
        rotate([-90,0,0])
        cylinder(r = 5, h = 10);
        translate([10,10,0]) {
            mirror([1,0,0])
            intersection() {
                rotate_extrude() 
                translate([10,0])
                circle(r=5);
                translate([0,0,-7])
                cube([15,15,15]);
            }
            translate([0,10,0])
            rotate([0,90,0])
            cylinder(r = 5, h = 70);
            translate([70,0,0])
            intersection() {
                rotate_extrude() 
                translate([10,0])
                circle(r=5);
                translate([0,0,-7])
                cube([15,15,15]);
            }
        }
    }
}

//https://www.bauhaus.se/vinkelprofil-stal-15x15x1-2mm-2m.html
module lProfile(length = 100, bevel = true) {
    difference() {
        cube([15,15,length]);
        translate([1.2, 1.2, -1])
        cube([15,15,length+2]);
        if(bevel) {
            translate([-1,1.2,0])
            rotate([-45,0,0])
            cube([15,15,20]);
            translate([-1,1.2,length])
            rotate([-45,0,0])
            cube([15,20,15]);
        }
    }
}


module mesh(width = 100, height = 150, thickness = 1.8, separation = 20, angle = 45) {
    rotate([0,90,0])
    lProfile(height);
    translate([0,width,0])
    mirror([0,1,0])
    rotate([0,90,0])
    lProfile(height);

    translate([height,0,0])
    rotate([0,90,90])
    lProfile(width);
    mirror([1,0,0])
    rotate([0,90,90])
    lProfile(width);

    translate([0,0,-thickness-1.2])
    intersection() {
        cube([height, width, thickness]);
        union() {
            for(x = [0:1:(width/separation)*3])
                translate([x*separation,0,0])
                rotate([0,0,angle])
                cube([thickness, width*3, thickness]);

            for(y = [0:1:(height/separation)*3])
                translate([0,-height+y*separation,0])
                rotate([0,0,angle])
                cube([height*3, thickness, thickness]);
        }
    }
}

module angle(connectWidth = 20, width = 80, thickness = 1.5, screwRadius = 4, screwCount = 2, offset = false) {
    screwOffset = ((width-connectWidth/2) / (screwCount+0.5));
    translate([width,-width,0])
    mirror([1,0,0])
    union() {
        difference() {
            cube([width,width,thickness]);
            translate([0,0,-1])
            cylinder(r=width-connectWidth, h=thickness + 2);

            for(i = [1:1:screwCount])
                translate([width-connectWidth/2 - 2,screwOffset * i - 8 + (offset ? screwRadius * 3 : 0),-1])
                cylinder(r=screwRadius, h=thickness + 2);

            for(i = [1:1:screwCount])
                translate([screwOffset * i - 8 - 1, width-connectWidth/2,-1])
                cylinder(r=screwRadius, h=thickness + 2);
        }
    }
}

module straightAngle(connectWidth = 20, width = 50, thickness = 1.5, screwRadius = 3, screwCount = 2) {
    union() {
        angle(connectWidth, width, thickness, screwRadius, screwCount);
        mirror([1,0,0])
        translate([-connectWidth,0,0])
        angle(connectWidth, width, thickness, screwRadius, screwCount);
    }
}

module straightCross(connectWidth = 20, width = 80, thickness = 1.5, screwRadius = 3, screwCount = 2) {
    union() {
        angle(connectWidth, width, thickness, screwRadius, screwCount);
        mirror([1,0,0])
        translate([-connectWidth,0,0])
        angle(connectWidth, width, thickness, screwRadius, screwCount);
    }
    translate([0,-connectWidth,0])
    mirror([0,1,0])
    union() {
        angle(connectWidth, width, thickness, screwRadius, screwCount);
        mirror([1,0,0])
        translate([-connectWidth,0,0])
        angle(connectWidth, width, thickness, screwRadius, screwCount);
    }
}

module bentCross(connectWidth = 20, width = 80, thickness = 1.5, screwRadius = 3, screwCount = 2) {
    rotate([90,0,0]){
        angle(connectWidth, width, thickness, screwRadius, screwCount);
        rotate([0,90,0])
        angle(connectWidth, width, thickness, screwRadius, screwCount);
    }
    translate([0,0,-connectWidth])
    mirror([0,0,1])
    rotate([90,0,0]){
        angle(connectWidth, width, thickness, screwRadius, screwCount);
        rotate([0,90,0])
        angle(connectWidth, width, thickness, screwRadius, screwCount);
    }
}

// !union() {
//     translate([-2,-2,0]) {
//         bentAngle();
//         translate([-4,-4,0])
//         bentAngleGuide();
//     }
// }

// !difference() {
//     cube([22,22, 20], center = true);
//     cube([20.5,20.5, 22], center = true);
// }

module bentAngleGuide(connectWidth = 20, width = 47, thickness = 3, screwRadius = 3, screwCount = 2) {
    module angle(connectWidth = 20, width = 80, thickness = 1.5, screwRadius = 4, screwCount = 2, offset = false) {
        screwOffset = ((width-connectWidth/2) / (screwCount+0.5));
        translate([width,-width,0])
        mirror([1,0,0])
        union() {
            difference() {
                translate([-3,0,0])
                cube([width+3,width,thickness]);
                translate([-3,0,0])
                translate([0,0,-1])
                cylinder(r=width-connectWidth, h=thickness + 2);

                translate([3,-3,0])
                for(i = [1:1:screwCount])
                    translate([width-connectWidth/2 - 6 - 2,screwOffset * i - 5 + (offset ? screwRadius * 3 : 0),-1])
                    cylinder(r=screwRadius, h=thickness + 2);

                for(i = [1:1:screwCount])
                    translate([screwOffset * i - 11 - 1, width-connectWidth/2,-1])
                    cylinder(r=screwRadius, h=thickness + 2);
            }
        }
    }
    translate([-thickness, -thickness, -width])
    cube([thickness,thickness,width]);
    rotate([90,0,0]){
        angle(connectWidth, width, thickness, screwRadius, screwCount);
        translate([-thickness,0,0])
        rotate([0,90,0])
        angle(connectWidth, width, thickness, screwRadius, screwCount, true);
    }
}
module bentAngle(connectWidth = 20, width = 47, thickness = 3, screwRadius = 3, screwCount = 2) {
    translate([-thickness, -thickness, -width])
    cube([thickness,thickness,width]);
    rotate([90,0,0]){
        angle(connectWidth, width, thickness, screwRadius, screwCount);
        translate([-thickness,0,0])
        rotate([0,90,0])
        angle(connectWidth, width, thickness, screwRadius, screwCount, offset = true);
    }
}

//https://www.bauhaus.se/ror-fyrkantigt-aluminium-20x20x1-5mm-2m-1.html
module squareProfile(length = 10, width = 20) {
    echo ("squareProfile", length);
    difference() {
        cube([width, width, length]);
        translate([1.5,1.5,-1])
        cube([width-1.5*2, width-1.5*2, length+2]);
    }
}

module b() {
    height = 600;
    shelfCount = 2;

    tSlot(height);
    translate([0, shelfDepth - tSlot40, 0])
    tSlot(height);

    //Dressings
    {
        translate([tSlot40,0,0])
        translate([0,4,0])
        rotate([90,0,0])
        plyPanel(openWidth-tSlot40*2, height);

        translate([openWidth,0,0])
        translate([0,4,0])
        rotate([90,0,0])
        plyPanel(width-openWidth-tSlot40, height);

        translate([0,tSlot40,0])
        rotate([0,0,90])
        rotate([90,0,0])
        plyPanel(shelfDepth-tSlot40*2, height);

        translate([width-4,tSlot40,0])
        rotate([0,0,90])
        rotate([90,0,0])
        plyPanel(shelfDepth-tSlot40*2, height);

        translate([openWidth-tSlot40,tSlot40,0])
        rotate([0,0,90])
        rotate([90,0,0])
        plyPanel(shelfDepth-tSlot40*2, height);
    }

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
    translate([openWidth - tSlot40, 0, floorClearing + tSlot40])
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

        //https://www.bauhaus.se/furuplywood-4mm-1220x2440mm.html


        //cube([width - tSlot40 * 2,height - floorClearing, 4]);
        translate([50,250,0])
        translate([tSlot40,tSlot40,height])
        rotate([0,0,-10])
        laptop();
    }
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