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

var clutter = "";           //WILL STORE EACH WORD

document.querySelector("#page-2>p").textContent.split(" ").forEach(function (dets) {
    clutter += `<span> ${dets} </span>`         //THIS IS TEMPLATE LITERALS
    document.querySelector("#page-2>p").innerHTML = clutter;
    console.log(document.querySelector("#page-2>p").innerHTML);
})
gsap.to("#page-2>p>span", {
    scrollTrigger: {
        trigger: "#page-2>p>span",
        scroller: "#main",
        start: "top bottom",        //first parameter is for elemnt's position and 2nd for page's position.
        end: "bottom top",
        scrub: 0.5,         //creates a delay of 0.5 second when start (make smooth effect)
        // markers: true,
    },
    stagger: .2,
    color: "white",
})

function canvas() {
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

for (let i=0; i<frameCount; i++){
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

function render(){
    scaleImage(images[imageSeq.frame], context);
    // yaha pe images array mai se framecount-1 karke vus index ke element ko send kiya ja rha hai. with context
}

function scaleImage(img, ctx){
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;        /* this is done to know how much we have to scale image to make it fit in canvas.
    EG canvas.h = 800px;
    img.h = 1600px; so as per our formula VR = 800/1600 => 0.5
    so img ko scale(0.5) karna hoga to make it fit in canvas.
    */
    var ratio = Math.max(hRatio,vRatio);

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
    trigger: "#page-3",
    pin: true,
    scroller: "#main",
    start: "top top",
    end: "250% top",
});
}
canvas();