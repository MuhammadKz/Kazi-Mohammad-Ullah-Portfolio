// Particle Background with dual color
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*2 +1;
    this.speedX = Math.random()*1 -0.5;
    this.speedY = Math.random()*1 -0.5;
    this.color = Math.random()>0.5?'rgba(231,84,255,0.7)':'rgba(59,130,246,0.7)';
  }
  update(){this.x += this.speedX; this.y += this.speedY;
    if(this.x>canvas.width)this.x=0;if(this.x<0)this.x=canvas.width;
    if(this.y>canvas.height)this.y=0;if(this.y<0)this.y=canvas.height;
  }
  draw(){ctx.fillStyle=this.color;ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill();}
}

function init(){particlesArray=[];for(let i=0;i<150;i++){particlesArray.push(new Particle());}}
function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);particlesArray.forEach(p=>{p.update();p.draw();});requestAnimationFrame(animate);}
init();animate();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;init();});

// Animate skill bars on scroll
const skills = document.querySelectorAll('.skill-bar');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.firstElementChild.style.width = entry.style.getPropertyValue('--skill-level');
    }
  });
},{threshold:0.5});
skills.forEach(skill=>observer.observe(skill));

// Scroll-triggered fade-in for sections
const faders = document.querySelectorAll('.fade-section, .timeline-item, .project-card');
const fadeObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('fade-in');}
  });
},{threshold:0.3});
faders.forEach(fader=>fadeObserver.observe(fader));

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const subject = encodeURIComponent('Portfolio Contact from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
    
    window.location.href = 'mailto:kazimuhammad0104@gmail.com?subject=' + subject + '&body=' + body;
    
    contactForm.reset();
  });
}

// Custom Cursor
(function() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  const cursorDot = document.getElementById('cursor-dot');
  const cursorAura = document.getElementById('cursor-aura');
  if (!cursorDot || !cursorAura) return;

  let mouseX = 0, mouseY = 0;
  let auraX = 0, auraY = 0;
  let currentAnimation = null;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function updateAura() {
    if (auraX !== mouseX || auraY !== mouseY) {
      if (currentAnimation) currentAnimation.cancel();

      const startX = auraX;
      const startY = auraY;
      const endX = mouseX;
      const endY = mouseY;

      currentAnimation = cursorAura.animate(
        [
          { left: startX + 'px', top: startY + 'px' },
          { left: endX + 'px', top: endY + 'px' }
        ],
        {
          duration: 500,
          fill: 'forwards',
          easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        }
      );

      currentAnimation.onfinish = () => {
        auraX = endX;
        auraY = endY;
      };

      auraX = startX + (endX - startX) * 0.15;
      auraY = startY + (endY - startY) * 0.15;
    }
    requestAnimationFrame(updateAura);
  }
  requestAnimationFrame(updateAura);

  const hoverTargets = document.querySelectorAll('a, button, .btn, .glass-card, .skill-card, .service-card, .project-card, .social-icon, .hamburger-menu, input, textarea, .hover-target');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorAura.classList.add('hover-active'));
    el.addEventListener('mouseleave', () => cursorAura.classList.remove('hover-active'));
  });
})();