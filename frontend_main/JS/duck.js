const container = document.querySelector('.animated-duck');

const body = document.createElement('img');
body.classList.add('animated-duck__body');
body.src = '../img/about-us-duck/body.png';

const leftPaw = document.createElement('img');
leftPaw.classList.add('animated-duck__left-paw');
leftPaw.src = '../img/about-us-duck/left-paw.png';

const rightPaw = document.createElement('img');
rightPaw.classList.add('animated-duck__right-paw');
rightPaw.src = '../img/about-us-duck/right-paw.png';

container.append(leftPaw, rightPaw, body);

document.addEventListener('DOMContentLoaded', () => {
  gsap.timeline().set(body, {left: '100%'})
  .set(leftPaw, {left: '100%'})
  .set(rightPaw, {left: '100%'})

  setTimeout(() => {
    gsap.timeline().fromTo(body, {top: '2%', transform: 'rotate(10deg)'}, {top: '5%', left: '60%', transform: 'rotate(-10deg)', duration: 0.8, ease: 'power.in'})
    .fromTo(leftPaw, {bottom: '10px', transform: 'rotate(-40deg'}, {bottom: '10%', left: '80%', transform: 'rotate(-15deg)', duration: 0.5, ease: 'power.in'}, '<')
    .to(body, {top: '3%', left: '40%', transform: 'rotate(0deg)', duration: 0.8, ease: 'power.inOut'}, '>1')
    .to(leftPaw, {left: '75%', transform: 'rotate(-25deg)', duration: 0.8, ease: 'power.inOut'}, '<')
    .fromTo(rightPaw, {bottom: '8%'}, {left: '70%', bottom: '15%', transform: 'rotate(25deg)', duration: 0.8, ease: 'power.inOut'}, '<')
    .to(body, {top: '8%', left: '25%', transform: 'rotate(-7deg)', duration: 0.6, ease: 'power.inOut'})
    .to(leftPaw, {bottom: '17%', left: '65%', transform: 'rotate(-60deg)', duration: 0.8, ease: 'power.inOut'}, '<')
    .to(rightPaw, {left: '50%', bottom: '13%', transform: 'rotate(15deg)', duration: 0.8, ease: 'power.inOut'}, '<')
    .to(body, {top: '0', left: '8%', transform: 'rotate(-3deg)', duration: 0.8, ease: 'power.inOut'})
    .to(leftPaw, {bottom: '25%', left: '30%', transform: 'rotate(-20deg)', duration: 0.8, ease: 'power.inOut'}, '<')
    .to(rightPaw, {left: '40%', bottom: '14%', transform: 'rotate(5deg)', duration: 0.8, ease: 'power.inOut'}, '<')
    .to(body, {top: 0, left: 0, transform: 'rotate(0deg)', duration: 0.8, ease: 'power.inOut'})
    .to(leftPaw, {bottom: '20%', left: '3%', transform: 'rotate(0)', duration: 0.8, ease: 'power.inOut'}, '<')
    .to(rightPaw, {left: '40%', transform: 'rotate(0)', duration: 0.8, ease: 'power.inOut'}, '<')
  }, 1000)
});
