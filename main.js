let balls = [];
let soccerImg;

let ballCount = 12;

function preload() {
  soccerImg = loadImage("/images/football.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight*.91);

  if(windowWidth < 600) {
    ballCount = 5;
  }

if(windowWidth > 1300) {
  ballCount = 20;

}
  for (let i = 0; i < ballCount; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  clear();

  for (let ball of balls) {
    ball.update();
    ball.display();
  }
}

class Ball {
  constructor() {
    this.size = random(50, 90);

    this.x = random(width);
    this.y = random(height);

    this.vx = random(-2, 2);
    this.vy = random(-1, 1);

    this.gravity = 0.35;
    this.bounce = 0.82;

    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.03, 0.03);
  }

  update() {
    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;

    // floor
    if (this.y + this.size / 2 > height) {
      this.y = height - this.size / 2;
      this.vy *= -this.bounce;

      this.vx *= 0.98;
    }

    // walls
    if (this.x - this.size / 2 < 0) {
      this.x = this.size / 2;
      this.vx *= -1;
    }

    if (this.x + this.size / 2 > width) {
      this.x = width - this.size / 2;
      this.vx *= -1;
    }

    this.rotation += this.rotationSpeed + this.vx * 0.01;
  }

  display() {
    push();

    translate(this.x, this.y);
    rotate(this.rotation);

    imageMode(CENTER);
    image(soccerImg, 0, 0, this.size, this.size);

    pop();
  }

  contains(px, py) {
    return dist(px, py, this.x, this.y) < this.size / 2;
  }

  bouncing() {
    // strong upward kick
    this.vy = random(-12, -18);

    // little sideways impulse
    this.vx += random(-3, 3);

    // extra spin
    this.rotationSpeed += random(-0.08, 0.08);
  }
}

function mousePressed() {
  for (let ball of balls) {
    if (ball.contains(mouseX, mouseY)) {
      ball.bouncing();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight*.91);
}

const images = document.querySelectorAll('#gallery img');
const modals = document.querySelectorAll('.featured');

// const logo = document.getElementById('logo');
// const logos = ['images/92no_vector.png', 'images/92no_neon.png']; // your two logos
//   let index = 0;

//   setInterval(() => {
//     index = (index + 1) % logos.length;
//     logo.src = logos[index];
//   }, 750); // change every 1000ms = 1s



images.forEach(img => {
  img.addEventListener('click', () => {
    const id = img.dataset.id;

    // hide all
    modals.forEach(m => m.classList.remove('active'));

    // show matching
    document.getElementById(id).classList.add('active');
  });
});

// close buttons
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.target.closest('.featured').classList.remove('active');
  });
});

// optional: click outside to close
modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});


document.querySelectorAll(".faq-header").forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    console.log(content);

    console.log(content.style.display);

    // header.classList.toggle("active");

    if (content.style.display === "block") {
      // console.log(content);
      console.log("block");
      content.style.display = "none";
    } else {
      content.style.display = "block";
      console.log("else");
    }
  });
});



document.querySelectorAll(".alt-header").forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    console.log(content);

    console.log(content.style.display);

    // header.classList.toggle("active");

    if (content.style.display === "block") {
      // console.log(content);
      console.log("block");
      content.style.display = "none";
    } else {
      content.style.display = "block";
      console.log("else");
    }
  });
});

