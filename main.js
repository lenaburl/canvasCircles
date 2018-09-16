var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function getRandomColor(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomRGBColor() {
  var r = getRandomColor(0, 255),
      g = getRandomColor(0, 255),
      b = getRandomColor(0, 255),
      a = Math.random(),
      color = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  return color;
}

var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 25;

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

window.addEventListener('touchstart',
    function(event) {
        console.log('touchstart', event);
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
    }
);

window.addEventListener('touchmove',
    function(event) {
        console.log('move', event);
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
    }
);

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});



function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.minRadius = radius;

    this.draw = function() {
        c.beginPath();
        c.strokeStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.stroke();
    };

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interactive
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -=1;
        }

        this.draw();
    };

}

var circlesArray = [];
function init() {
    circlesArray = [];

    for (var i = 0; i < 400; i++) {
        var radius = Math.random() * 3 + 1,
            x = Math.random() * (innerWidth - radius * 2) + radius,
            y = Math.random() * (innerHeight - radius * 2) + radius,
            dx = Math.random() - 0.5,
            dy = Math.random() - 0.5;
        circlesArray.push(new Circle(x, y, dx, dy, radius, getRandomRGBColor()));
    }
}

init();


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circlesArray.length; i++) {
        circlesArray[i].update();
    }
}

animate();