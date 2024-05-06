const containers = document.querySelectorAll(".input-container")
const form = document.querySelector("form")

const tl = gsap.timeline({defaults: {duration: 1}});

// line

const start = "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 600 0.999512 600 0.999512";

const end = "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 601 0.999512 601 0.999512";

//Elastic Effect
containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeholder = container.querySelector(".placeholder");
  
    input.addEventListener("focus", () => {
      //Check to see if there is any text in the input
      if (!input.value) {
        tl.fromTo(
          line,
          { attr: { d: start } },
          { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
        );
        tl.to(line, { attr: { d: start }, ease: "elastic.out(3,0.5)" }, "<50%");
        //Placeholder Shift
        tl.to(placeholder, {top: -30, left: 0, scale: 0.7, duration: 0.5, ease: "power2.easeOut"}, "<05%");
      }
    });
  });

//revert back when not on focus
form.addEventListener('click', () => {
    containers.forEach((container) => {
        const input = container.querySelector(".input");
        const line = container.querySelector(".elastic-line");
        const placeholder = container.querySelector(".placeholder");

        // if(document.activeElement !== input){
        //     if(!input.value){
        //         gsap.to(placeholder, {
        //             top: 0,
        //             left: 0,
        //             scale: 1,
        //             duration: 0.5,
        //             ease: "power2.easeOut"
        //         })
        //     }
        // }


        //validation 
        //Name Validation
        input.addEventListener("input", (e) => {
            if (e.target.type === "text") {
                let inputText = e.target.value;
                if (inputText.length > 2) {
                    colorize("#6391E8", line, placeholder);
                } else {
                    colorize("#FE8C99", line, placeholder);
                }
            }
        //Email Validation
            if (e.target.type === "email") {
            let valid = validateEmail(e.target.value);
            if (valid) {
                colorize("#6391E8", line, placeholder);
            } else {
                colorize("#FE8C99", line, placeholder);
            }
        }
        //Phone Validation
        if (e.target.type === "tel") {
            let valid = validatePhone(e.target.value);
            if (valid) {
                colorize("#6391E8", line, placeholder);
            } else {
                colorize("#FE8C99", line, placeholder);
            }
        }
        });
    });
});

// checking email validation

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function validatePhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
  }

  //collorize
  function colorize(color, line, placeholder) {
    gsap.to(line, {stroke: color, duration: 0.75});
    gsap.to(placeholder,{color: color, duration: 0.75})
  };

  //checkbox animation fill
  const checkbox = document.querySelector('.checkbox');
  const tl2 = gsap.timeline({
    defaults: { duration: 0.5, ease: "Power2.easeOut"},
  })
  const tickMarkPath = document.querySelector(".tick-mark path");
  const pathLength = tickMarkPath.getTotalLength();

  gsap.set(tickMarkPath, {
    strokeDashoffset: pathLength,
    strokeDasharray: pathLength,
  });

  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
        tl2.to(".checkbox-fill", { top: "0%"});
        tl2.fromTo(tickMarkPath, {strokeDashoffset: pathLength}, {strokeDashoffset: 0});
        tl2.to('.checkbox-label', {color: "#6391e8"}, "<");
    }else{
        tl2.to('.checkbox-fill', {top:'100%'})
        tl2.fromTo(tickMarkPath, {strokeDashoffset: 0}, {strokeDashoffset: pathLength}, "<50%");
        tl2.to('.checkbox-label', {color: "#c5c5c5"}, "<");
    }
  });

//animating character
gsap.set('#eye', {transformOrigin:"center"})
gsap.fromTo("#eye", {scaleY: 1}, {scaleY:0.3, repeat:-1, yoyo:true, repeatDelay:0.5, ease: "power2.easeOut"});
gsap.fromTo("#eyebrow", {y:0}, {y:-1, repeat:-1, yoyo: true, repeatDelay:0.5, ease: "power2.easeOut"});

//button submit
const button = document.querySelector('button');
const tl3 = gsap.timeline({defaults: {duration: 1, ease: "power2.easeOut"}});

button.addEventListener("click", (e) => {
    e.preventDefault();
    tl3.to(".contact-right", { opacity: 0, PointerEvent: "none"} );
    tl3.to(".contact-left", {opacity: 0, PointerEvent: "none"}, "<" );
    tl3.to("form", {scale: 0.8}, "<");
    tl3.fromTo(".submitted", {scale: 0.7, opacity: 0}, {scale: 1.4, opacity: 1, duration: 1.3}, "<90%");
    gsap.set('#hand', {transformOrigin: 'left'})
    gsap.fromTo(
        "#hand",
        {rotation: 0, y: 0}, 
        {rotation: -10, y:2, ease: 'elastic(3,0.3)', duration: 2, delay: 1}
        );
});

//handwave


