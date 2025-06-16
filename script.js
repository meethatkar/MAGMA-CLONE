function loco() {
    gsap.registerPlugin(ScrollTrigger);
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // tl.from(".purple p", {scale: 0.3, rotation:45, autoAlpha: 0, ease: "power2"})
    //   .from(".line-3", {scaleX: 0, transformOrigin: "left center", ease: "none"}, 0)
    //   .to(".purple", {backgroundColor: "#28a92b"}, 0);



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
// FOR LOCOMOTIVE WORKING WITH GSAP WE NEED TO WRITE THIS BOILER CODE, WHICH IS TAKEN FROM LOCOMOTIVE CODEPEN (first link)
loco();

// PAGE 2
var clutter = "";           //WILL STORE EACH WORD

document.querySelector("#page-2>p").textContent.split(" ").forEach(function (dets) {
    clutter += `<span> ${dets} </span>`         //THIS IS TEMPLATE LITERALS
    document.querySelector("#page-2>p").innerHTML = clutter;        //replaced previous content with new clutter content
    // console.log(document.querySelector("#page-2>p").innerHTML);
})
//as we have changed innerHTML of that div with cluuter's content, we can achieve below thing.
gsap.to("#page-2>p>span", {
    scrollTrigger: {
        trigger: "#page-2>p>span",
        scroller: "#main",
        start: "top bottom",        //first parameter is for elemnt's position and 2nd for page's position.
        end: "bottom top",
        scrub: 0.5,         //creates a delay of 0.5 second when start (make smooth effect)
        // markers: true,
    },
    stagger: .2,        //for all <span> element.
    color: "white",
})

function canvas1() {
    const canvas = document.querySelector("#page-3>canvas");
    const context = canvas.getContext("2d");           //THIS RETURNS CANVASRENDERINGCONTEXT2D OBJECT (IT IS DRAWING TOOLKIT)

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //THIS WILL RUN WHENEVER WINDOW IS RESIZED, PURPOSE IS THAT CANVAS HEIGHT AND WIDTH WILL BE BASED ON CURRENT RESIZED WINDOW
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `
        assets/github-asset/frames00007.png
        assets/github-asset/frames00010.png
        assets/github-asset/frames00013.png
        assets/github-asset/frames00016.png
        assets/github-asset/frames00019.png
        assets/github-asset/frames00022.png
        assets/github-asset/frames00025.png
        assets/github-asset/frames00028.png
        assets/github-asset/frames00031.png
        assets/github-asset/frames00034.png
        assets/github-asset/frames00037.png
        assets/github-asset/frames00040.png
        assets/github-asset/frames00043.png
        assets/github-asset/frames00046.png
        assets/github-asset/frames00049.png
        assets/github-asset/frames00052.png
        assets/github-asset/frames00055.png
        assets/github-asset/frames00058.png
        assets/github-asset/frames00061.png
        assets/github-asset/frames00064.png
        assets/github-asset/frames00067.png
        assets/github-asset/frames00070.png
        assets/github-asset/frames00073.png
        assets/github-asset/frames00076.png
        assets/github-asset/frames00079.png
        assets/github-asset/frames00082.png
        assets/github-asset/frames00085.png
        assets/github-asset/frames00088.png
        assets/github-asset/frames00091.png
        assets/github-asset/frames00094.png
        assets/github-asset/frames00097.png
        assets/github-asset/frames00100.png
        assets/github-asset/frames00103.png
        assets/github-asset/frames00106.png
        assets/github-asset/frames00109.png
        assets/github-asset/frames00112.png
        assets/github-asset/frames00115.png
        assets/github-asset/frames00118.png
        assets/github-asset/frames00121.png
        assets/github-asset/frames00124.png
        assets/github-asset/frames00127.png
        assets/github-asset/frames00130.png
        assets/github-asset/frames00133.png
        assets/github-asset/frames00136.png
        assets/github-asset/frames00139.png
        assets/github-asset/frames00142.png
        assets/github-asset/frames00145.png
        assets/github-asset/frames00148.png
        assets/github-asset/frames00151.png
        assets/github-asset/frames00154.png
        assets/github-asset/frames00157.png
        assets/github-asset/frames00160.png
        assets/github-asset/frames00163.png
        assets/github-asset/frames00166.png
        assets/github-asset/frames00169.png
        assets/github-asset/frames00172.png
        assets/github-asset/frames00175.png
        assets/github-asset/frames00178.png
        assets/github-asset/frames00181.png
        assets/github-asset/frames00184.png
        assets/github-asset/frames00187.png
        assets/github-asset/frames00190.png
        assets/github-asset/frames00193.png
        assets/github-asset/frames00196.png
        assets/github-asset/frames00199.png
        assets/github-asset/frames00202.png
    `;
        var imgArr = data.split("\n");      //makes array in which each element is loc of image.
        // console.log("files function ", index);

        return imgArr[index];       //argument index is passed here.
    }

    const frameCount = 67;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);         //calling function in which location of imgs are stores, it will return passed number's img location.
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,       //animating frame property of imageSeq object
        snap: "frame",
        // When the animation tries to set frame to, say, 1.2, snap: "frame" forces it to either 1 or 2 (the nearest whole number). If it's 2.7, it snaps to 3. This means the onUpdate function (render in your case) will always receive a clean, whole frame number.
        ease: `none`,
        scrollTrigger: {
            scrub: 0.5,
            trigger: `#page-3`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,       //this is called to display new image on canvas.
    });

    images[1].onload = render;
    // The line images[1].onload = render; means that the render function will be called automatically as soon as the second image in your images array (the one at index 1) has completely finished loading.

    function render() {
        scaleImage(images[imageSeq.frame], context);
        // yaha pe images array mai se framecount-1 karke vus index ke element ko send kiya ja rha hai. with context
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;        /* this is done to know how much we have to scale image to make it fit in canvas.
    EG canvas.h = 800px;
    img.h = 1600px; so as per our formula VR = 800/1600 => 0.5
    so img ko scale(0.5) karna hoga to make it fit in canvas.
    */
        var ratio = Math.max(hRatio, vRatio);

        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        /*
        example
        cx = 800-100*0.45 => (BODMAS RULE) 175,
        so we have to shfit img from left and right side by 175px.
        */
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // means it clears the entire canvas from its top-left corner (0,0) to its full width and height
        ctx.drawImage(
            img,        //IMAGE OBJECT TO DRAW
            0,          //SOURCE X
            0,          //SOURCE Y
            img.width,      //SOURCE WIDTH
            img.height,     //SOURCE HEIGHT
            centerShift_x,      //DESTINATION X
            centerShift_y,      //DESTINATION Y
            img.width * ratio,      //DESTINATION WIDTH     (WIDTH ON CANVAS)
            img.height * ratio      //DESTINCATION HEIGHT   (HEIGHT ON CANVAS)
        );
    }
    ScrollTrigger.create({
        trigger: "#page-3",
        pin: true,
        scroller: "#main",
        start: "top top",
        end: "250% top",
    });
}
canvas1();


// page 4 clutter
clutter = "";           //WILL STORE EACH WORD

document.querySelector("#page-4>h1").textContent.split(" ").forEach(function (dets) {
    clutter += `<span> ${dets} </span>`         //THIS IS TEMPLATE LITERALS
    document.querySelector("#page-4>h1").innerHTML = clutter;
    // console.log(document.querySelector("#page-4>h1").innerHTML);
})
gsap.to("#page-4>h1>span", {
    scrollTrigger: {
        trigger: "#page-4>h1>span",
        scroller: "#main",
        start: "top bottom",        //first parameter is for elemnt's position and 2nd for page's position.
        end: "bottom top",
        scrub: 0.5,         //creates a delay of 0.5 second when start (make smooth effect)
        // markers: true,
    },
    stagger: .2,
    color: "white",
})


// CANVAS 2
function canvas2() {
    const canvas = document.querySelector("#page-5>canvas");
    const context = canvas.getContext("2d");           //THIS RETURNS CANVASRENDERINGCONTEXT2D OBJECT (IT IS DRAWING TOOLKIT)

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //THIS WILL RUN WHENEVER WINDOW IS RESIZED, PURPOSE IS THAT CANVAS HEIGHT AND WIDTH WILL BE BASED ON CURRENT RESIZED WINDOW
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `
        assets/github-asset/bridges00004.png
        assets/github-asset/bridges00007.png
        assets/github-asset/bridges00010.png
        assets/github-asset/bridges00013.png
        assets/github-asset/bridges00016.png
        assets/github-asset/bridges00019.png
        assets/github-asset/bridges00022.png
        assets/github-asset/bridges00025.png
        assets/github-asset/bridges00028.png
        assets/github-asset/bridges00031.png
        assets/github-asset/bridges00034.png
        assets/github-asset/bridges00037.png
        assets/github-asset/bridges00040.png
        assets/github-asset/bridges00043.png
        assets/github-asset/bridges00046.png
        assets/github-asset/bridges00049.png
        assets/github-asset/bridges00052.png
        assets/github-asset/bridges00055.png
        assets/github-asset/bridges00058.png
        assets/github-asset/bridges00061.png
        assets/github-asset/bridges00064.png
        assets/github-asset/bridges00067.png
        assets/github-asset/bridges00070.png
        assets/github-asset/bridges00073.png
        assets/github-asset/bridges00076.png
        assets/github-asset/bridges00079.png
        assets/github-asset/bridges00082.png
        assets/github-asset/bridges00085.png
        assets/github-asset/bridges00088.png
        assets/github-asset/bridges00091.png
        assets/github-asset/bridges00094.png
        assets/github-asset/bridges00097.png
        assets/github-asset/bridges00100.png
        assets/github-asset/bridges00103.png
        assets/github-asset/bridges00106.png
        assets/github-asset/bridges00109.png
        assets/github-asset/bridges00112.png
        assets/github-asset/bridges00115.png
        assets/github-asset/bridges00118.png
        assets/github-asset/bridges00121.png
        assets/github-asset/bridges00124.png
        assets/github-asset/bridges00127.png
        assets/github-asset/bridges00130.png
        assets/github-asset/bridges00133.png
        assets/github-asset/bridges00136.png
        assets/github-asset/bridges00139.png
        assets/github-asset/bridges00142.png
        assets/github-asset/bridges00145.png
        assets/github-asset/bridges00148.png
        assets/github-asset/bridges00151.png
        assets/github-asset/bridges00154.png
        assets/github-asset/bridges00157.png
        assets/github-asset/bridges00160.png
        assets/github-asset/bridges00163.png
    `;
        var imgArr = data.split("\n");      //makes array in which each element is loc of image.
        // console.log("files function ", index);

        return imgArr[index];       //argument index is passed here.
    }

    const frameCount = 53;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);         //calling function in which location of imgs are stores, it will return passed number's img location.
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,       //animating frame property of imageSeq object
        snap: "frame",
        // When the animation tries to set frame to, say, 1.2, snap: "frame" forces it to either 1 or 2 (the nearest whole number). If it's 2.7, it snaps to 3. This means the onUpdate function (render in your case) will always receive a clean, whole frame number.
        ease: `none`,
        scrollTrigger: {
            scrub: 0.5,
            trigger: `#page-5`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,       //this is called to display new image on canvas.
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
        // yaha pe images array mai se framecount-1 karke vus index ke element ko send kiya ja rha hai. with context
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;        /* this is done to know how much we have to scale image to make it fit in canvas.
    EG canvas.h = 800px;
    img.h = 1600px; so as per our formula VR = 800/1600 => 0.5
    so img ko scale(0.5) karna hoga to make it fit in canvas.
    */
        var ratio = Math.max(hRatio, vRatio);

        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        /*
        example
        cx = 800-100*0.45 => (BODMAS RULE) 175,
        so we have to shfit img from left and right side by 175px.
        */
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,        //IMAGE OBJECT TO DRAW
            0,          //SOURCE X
            0,          //SOURCE Y
            img.width,      //SOURCE WIDTH
            img.height,     //SOURCE HEIGHT
            centerShift_x,      //DESTINATION X
            centerShift_y,      //DESTINATION Y
            img.width * ratio,      //DESTINATION WIDTH     (WIDTH ON CANVAS)
            img.height * ratio      //DESTINCATION HEIGHT   (HEIGHT ON CANVAS)
        );
    }
    ScrollTrigger.create({
        trigger: "#page-5",
        pin: true,
        scroller: "#main",
        start: "top top",
        end: "250% top",
    });
}
canvas2();

//      CLUTTER FOR PAGE 6
clutter = "";
var words = document.querySelector("#page-6>h1").textContent.split(" ");
words.forEach((word) => {
    clutter += `<span> ${word} </span>`;
    document.querySelector("#page-6>h1").innerHTML = clutter;
    // console.log(clutter);

});

gsap.to("#page-6>h1>span", {
    scrollTrigger: {
        trigger: "#page-6>h1>span",
        scroller: "#main",
        start: "top bottom",
        end: "top top",
        scrub: 0.5,
        // markers: true,
    },
    stagger: 0.2,
    color: "white"
})

function canvas3() {
    const canvas = document.querySelector("#page-7>canvas");
    const context = canvas.getContext("2d");           //THIS RETURNS CANVASRENDERINGCONTEXT2D OBJECT (IT IS DRAWING TOOLKIT)

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //THIS WILL RUN WHENEVER WINDOW IS RESIZED, PURPOSE IS THAT CANVAS HEIGHT AND WIDTH WILL BE BASED ON CURRENT RESIZED WINDOW
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var imgArr = []; 
        for(let i=1;i<=133;i++){
            imgArr.push(`assets/Page-7-canvas/${i}.webp`);
        }
        // var imgArr = data.split("\n");      //makes array in which each element is loc of image.
        // console.log("files function ", index);
        // console.log(imgArr);
        
        return imgArr[index];       //argument index is passed here.
    }

    const frameCount = 134;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);         //calling function in which location of imgs are stores, it will return passed number's img location.
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,       //animating frame property of imageSeq object
        snap: "frame",
        // When the animation tries to set frame to, say, 1.2, snap: "frame" forces it to either 1 or 2 (the nearest whole number). If it's 2.7, it snaps to 3. This means the onUpdate function (render in your case) will always receive a clean, whole frame number.
        ease: `none`,
        scrollTrigger: {
            scrub: 0.5,
            trigger: `#page-7`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,       //this is called to display new image on canvas.
    });

    images[1].onload = render;
    // The line images[1].onload = render; means that the render function will be called automatically as soon as the second image in your images array (the one at index 1) has completely finished loading.

    function render() {
        scaleImage(images[imageSeq.frame], context);
        // yaha pe images array mai se framecount-1 karke vus index ke element ko send kiya ja rha hai. with context
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;        /* this is done to know how much we have to scale image to make it fit in canvas.
    EG canvas.h = 800px;
    img.h = 1600px; so as per our formula VR = 800/1600 => 0.5
    so img ko scale(0.5) karna hoga to make it fit in canvas.
    */
        var ratio = Math.max(hRatio, vRatio);

        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        /*
        example
        cx = 800-100*0.45 => (BODMAS RULE) 175,
        so we have to shfit img from left and right side by 175px.
        */
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // means it clears the entire canvas from its top-left corner (0,0) to its full width and height
        ctx.drawImage(
            img,        //IMAGE OBJECT TO DRAW
            0,          //SOURCE X
            0,          //SOURCE Y
            img.width,      //SOURCE WIDTH
            img.height,     //SOURCE HEIGHT
            centerShift_x,      //DESTINATION X
            centerShift_y,      //DESTINATION Y
            img.width * ratio,      //DESTINATION WIDTH     (WIDTH ON CANVAS)
            img.height * ratio      //DESTINCATION HEIGHT   (HEIGHT ON CANVAS)
        );
    }
    ScrollTrigger.create({
        trigger: "#page-7",
        pin: true,
        scroller: "#main",
        start: "top top",
        end: "250% top",
    });
}
canvas3();

//  canvas 3 (circle effect)
gsap.to(".page-7-cir",{
    scrollTrigger:{
        scroller: "#main",
        trigger: ".page-7-cir",
        start: "top center",        //element's top on page's center
        end: "bottom top",
        // markers: true,
        scrub: 0.5
    },
    opacity: 1,
    scale: 1.7
})
gsap.to(".page-7-cir-inner",{
    scrollTrigger:{
        scroller: "#main",
        trigger: ".page-7-cir-inner",
        start: "top center",        //element's top on page's center
        end: "bottom top",
        // markers: true,
        scrub: 0.5
    },
    backgroundColor: "#0b2fc17e"
})

// page 8 video effect
var video = document.querySelector("#page-8");
gsap.to(video, {
    scrollTrigger: {
        scroller: "#main",
        trigger: video,
        start: "40% 50%",
        end: "45% 40%",
        scrub: 0.5,
        // markers: true
    },
    opacity : "1",
    scale : "1",
})

// PAGE 9 IMAGE SLIDER
var imgs = document.querySelectorAll(".slide");
var preBtn = document.getElementById("btn-previous");
var nextBtn = document.getElementById("btn-next");
// console.log(imgs, "img");
let counter = 0;
imgs.forEach((img, index) => {
    img.style.left = `${index * 100}%`
    console.log(img.style.right = `${index * 100}%`, " index");
})
function slideImg() {
    imgs.forEach((img) => {
        img.style.transform = `translateX(-${counter * 100}%)`;
    })
}
preBtn.addEventListener("click", () => {
    if (counter > 0) {
        counter--;
    }
    //added this so counter can't be negative
    else {
        counter = 0;
    }
    console.log(counter);
    slideImg();
})
nextBtn.addEventListener("click", () => {
    if (counter > 3) {
        counter = 4;
    }
    //so counnter can't be more then number of images
    else {
        counter++;
    }
    console.log(counter);
    slideImg();
})


// MENUI TOGGLE 
var navBtn = document.querySelector("#nav-mobile>button");
var navItemsBtn = document.querySelector("#n-m-head>button");
var mobileNav = document.querySelector("#nav-mobile");
var mobileItemsNav = document.querySelector("#nav-mobile-slider");
console.log(navBtn);

navBtn.addEventListener("click",()=>{
    console.log(navBtn);
    mobileNav.style.opacity = "0";
    mobileNav.style.zIndex = "20";
    mobileItemsNav.style.zIndex = "30";
    mobileItemsNav.style.opacity = "1";
    mobileItemsNav.style.transform = 'translateX(0%)'
    // mobileItemsNav.style.scale = "1";
})

navItemsBtn.addEventListener("click",()=>{
    console.log(navBtn);
    mobileNav.style.opacity = "1";
    mobileItemsNav.style.opacity = "0";
    mobileNav.style.zIndex = "30";
    mobileItemsNav.style.zIndex = "20";
    mobileItemsNav.style.transform = 'translateX(30%)';
    // mobileItemsNav.style.scale = "0.8";
})

var loader = document.querySelector("#loader-container");
window.addEventListener("load",()=>{
    loader.style.zIndex=0;  
    document.body.style.overflow = "auto";  
})