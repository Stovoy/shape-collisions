const numberOfShapes = 50;
const drawQuadTree = false;
const drawBoundingBoxes = false;

class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Shape {
    constructor(id, points, x, y, color) {
        this.id = id;
        this.points = points;
        this.x = x;
        this.y = y;
        this.color = color;
        this.xVel = 0;
        this.yVel = 0;
        this.baseBoundingBox = this.calcBoundingBox();
        this.recalcBoundingBox();
    }

    draw(ctx, collides) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x + this.x, this.points[0].y + this.y);
        for (let i = 1; i < this.points.length; i++) {
            const point = this.points[i];
            ctx.lineTo(point.x + this.x, point.y + this.y);
        }
        ctx.lineTo(this.points[0].x + this.x, this.points[0].y + this.y);
        ctx.strokeStyle = 'black';
        if (collides) {
            ctx.fillStyle = 'red';
        } else {
            ctx.fillStyle = this.color;
        }
        ctx.stroke();
        ctx.fill();

        if (drawBoundingBoxes) {
            ctx.strokeStyle = 'purple';
            ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
        }
    }

    calcLines() {
        const lines = [];
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            let nextPoint;
            if (i === this.points.length - 1) {
                nextPoint = this.points[0];
            } else {
                nextPoint = this.points[i + 1];
            }
            lines.push(new Line(
                new Point(point.x + this.x, point.y + this.y),
                new Point(nextPoint.x + this.x, nextPoint.y + this.y)));
        }
        return lines;
    }

    calcBoundingBox() {
        let x1 = null;
        let y1 = null;
        let x2 = 0;
        let y2 = 0;
        for (let point of this.points) {
            if (x1 == null || point.x < x1) {
                x1 = point.x;
            }
            if (y1 == null || point.y < y1) {
                y1 = point.y;
            }
            if (point.x > x2) {
                x2 = point.x;
            }
            if (point.y > y2) {
                y2 = point.y;
            }
        }
        let width = x2 - x1;
        let height = y2 - y1;
        return new Rectangle(x1, y1, width, height);
    }

    recalcBoundingBox() {
        this.boundingBox = new Rectangle(
            this.baseBoundingBox.x + this.x,
            this.baseBoundingBox.y + this.y,
            this.baseBoundingBox.width,
            this.baseBoundingBox.height,
        );
    }

    collides(other) {
        // To test intersection, we first check every edge against each other
        for (let line of this.calcLines()) {
            for (let otherLine of other.calcLines()) {
                if (lineCollision(line, otherLine)) {
                    return true;
                }
            }
        }

        // Then, to test the complete containment edge case, we check to see if center point is in bounding box of other
        return pointInRectangle(this.boundingBox.center, other.boundingBox);
    }
}

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.center = new Point(this.x + this.width / 2, this.y + this.height / 2);
    }

    collides(other) {
        return rectangleCollision(this, other);
    }
}

class QuadTree {
    constructor(x, y, width, height) {
        this.root = new QuadNode(x, y, width, height);
        this.capacity = 1;
    }

    insert(shape) {
        this.insertInto(this.root, shape);
    }

    insertInto(node, shape) {
        if (!shape.boundingBox.collides(node.boundingBox)) {
            return;
        }

        if ((node.shapes.length > this.capacity) && !node.subdivided) {
            this.subdivideNode(node);
        }

        let insertIntoThisNode = true;
        if (node.subdivided) {
            insertIntoThisNode = false;
            if (shape.boundingBox.collides(node.nw.boundingBox)) {
                if (shape.boundingBox.collides(node.ne.boundingBox) ||
                    shape.boundingBox.collides(node.sw.boundingBox) ||
                    shape.boundingBox.collides(node.se.boundingBox)) {
                    insertIntoThisNode = true;
                } else {
                    this.insertInto(node.nw, shape);
                }
            } else if (shape.boundingBox.collides(node.ne.boundingBox)) {
                if (shape.boundingBox.collides(node.sw.boundingBox) ||
                    shape.boundingBox.collides(node.se.boundingBox)) {
                    insertIntoThisNode = true;
                } else {
                    this.insertInto(node.ne, shape);
                }
            } else if (shape.boundingBox.collides(node.sw.boundingBox)) {
                if (shape.boundingBox.collides(node.se.boundingBox)) {
                    insertIntoThisNode = true;
                } else {
                    this.insertInto(node.sw, shape);
                }
            } else if (shape.boundingBox.collides(node.se.boundingBox)) {
                this.insertInto(node.se, shape);
            }
        }

        if (insertIntoThisNode) {
            node.shapes.push(shape);
        }
    }

    subdivideNode(node) {
        let halfWidth = node.boundingBox.width / 2;
        let halfHeight = node.boundingBox.height / 2;
        node.nw = new QuadNode(node.boundingBox.x, node.boundingBox.y, halfWidth, halfHeight);
        node.ne = new QuadNode(node.boundingBox.x + halfWidth, node.boundingBox.y, halfWidth, halfHeight);
        node.sw = new QuadNode(node.boundingBox.x, node.boundingBox.y + halfHeight, halfWidth, halfHeight);
        node.se = new QuadNode(node.boundingBox.x + halfWidth, node.boundingBox.y + halfHeight, halfWidth, halfHeight);
        node.subdivided = true;

        let oldShapes = node.shapes;
        node.shapes = [];

        for (let shape of oldShapes) {
            this.insertInto(node, shape);
        }
    }

    collisions(shape) {
        return this.collisionsFrom(this.root, shape);
    }

    collisionsFrom(node, queryShape) {
        let collisions = [];
        for (const shape of node.shapes) {
            if (queryShape.id === shape.id) {
                continue;
            }
            if (queryShape.collides(shape)) {
                collisions.push(shape);
            }
        }

        if (node.subdivided) {
            if (queryShape.boundingBox.collides(node.nw.boundingBox)) {
                collisions = collisions.concat(this.collisionsFrom(node.nw, queryShape));
            }
            if (queryShape.boundingBox.collides(node.ne.boundingBox)) {
                collisions = collisions.concat(this.collisionsFrom(node.ne, queryShape));
            }
            if (queryShape.boundingBox.collides(node.sw.boundingBox)) {
                collisions = collisions.concat(this.collisionsFrom(node.sw, queryShape));
            }
            if (queryShape.boundingBox.collides(node.se.boundingBox)) {
                collisions = collisions.concat(this.collisionsFrom(node.se, queryShape));
            }
        }
        return collisions;
    }

    draw(ctx, node) {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(node.boundingBox.x, node.boundingBox.y, node.boundingBox.width, node.boundingBox.height);
        if (node.subdivided) {
            this.draw(ctx, node.nw);
            this.draw(ctx, node.ne);
            this.draw(ctx, node.sw);
            this.draw(ctx, node.se);
        }
    }
}

class QuadNode {
    constructor(x, y, width, height) {
        this.shapes = [];
        this.boundingBox = new Rectangle(x, y, width, height);
        this.nw = null;
        this.ne = null;
        this.sw = null;
        this.se = null;
        this.subdivided = false;
    }
}

// Given three colinear points p, q, r, the function checks if
// point q lies on line segment 'pr'
function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) &&
        q.x >= Math.min(p.x, r.x) &&
        q.y <= Math.max(p.y, r.y) &&
        q.y >= Math.min(p.y, r.y);
}

// Finds the orientation of an ordered triplet (p,q,r)
// Returns the following values:
// 0 : Colinear points
// 1 : Clockwise points
// 2 : Counterclockwise
function orientation(p, q, r) {
    const v = (q.y - p.y) * (r.x - q.x) -
        (q.x - p.x) * (r.y - q.y);
    if (v > 0) {
        return 1;
    } else if (v < 0) {
        return 2;
    } else {
        return 0;
    }
}

function lineCollision(l1, l2) {
    const o1 = orientation(l1.p1, l1.p2, l2.p1);
    const o2 = orientation(l1.p1, l1.p2, l2.p2);
    const o3 = orientation(l2.p1, l2.p2, l1.p1);
    const o4 = orientation(l2.p1, l2.p2, l1.p2);
    if (o1 !== o2 && o3 !== o4) {
        return true;
    }
    // l1.p1, l1.p2, l2.p1 are colinear and l2.p1 lies on l1.
    if (o1 === 0 && onSegment(l1.p1, l2.p1, l1.p2)) {
        return true;
    }

    // l1.p1, l1.p2, l2.p2 are colinear and l2.p2 lies on l1.
    if (o2 === 0 && onSegment(l1.p1, l2.p2, l1.p2)) {
        return true;
    }

    // l2.p1, l2.p2, l1.p1 are colinear and l1.p1 lies on l2.
    if (o3 === 0 && onSegment(l2.p1, l1.p1, l2.p2)) {
        return true;
    }

    // l2.p1, l2.p2, l1.p2 are colinear and l1.p2 lies on l2.
    return o4 === 0 && onSegment(l2.p1, l1.p2, l2.p2);
}

function rectangleCollision(r1, r2) {
    return r1.x < r2.x + r2.width &&
        r1.x + r1.width > r2.x &&
        r1.y < r2.y + r2.height &&
        r1.y + r1.height > r2.y;
}

function pointInRectangle(p, r) {
    return p.x > r.x &&
        p.x < r.x + r.width &&
        p.y > r.y &&
        p.y < r.y + r.height;
}

function start() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const shapes = [];
    const colors = ['blue', 'purple', 'pink', 'orange', 'black', 'green'];
    const width = 800;
    const height = 800;

    for (let i = 0; i < numberOfShapes; i++) {
        let points = [];
        for (let j = 0; j < Math.floor(Math.random() * 20) + 1; j++) {
            points.push(new Point(
                Math.random() * 100,
                Math.random() * 100,
            ));
        }
        shapes.push(
            new Shape(i, points,
                Math.random() * 400,
                Math.random() * 400,
                colors[Math.floor(Math.random() * colors.length)])
        );
    }

    function draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        const quadtree = new QuadTree(0, 0, width, height);
        for (let shape of shapes) {
            shape.recalcBoundingBox();
            quadtree.insert(shape);
        }

        if (drawQuadTree) {
            quadtree.draw(ctx, quadtree.root);
        }

        const collisionIds = new Set();
        for (let shape of shapes) {
            if (collisionIds.has(shape.id)) {
                continue;
            }
            let collisions = quadtree.collisions(shape);
            for (let collision of collisions) {
                collisionIds.add(collision.id);
            }
            if (collisions.length > 0) {
                collisionIds.add(shape.id);
            }
        }

        for (let shape of shapes) {
            if (collisionIds.has(shape.id)) {
                shape.draw(ctx, true);
            } else {
                shape.draw(ctx);
            }
        }
    }

    function move() {
        for (let shape of shapes) {
            shape.xVel += (Math.random() - 0.5) * 2;
            shape.yVel += (Math.random() - 0.5) * 2;
            shape.x += shape.xVel;
            shape.y += shape.yVel;
            if (shape.x < 0) {
                shape.x = 0;
                shape.xVel = 0;
            }
            if (shape.y < 0) {
                shape.y = 0;
                shape.yVel = 0;
            }
            if (shape.x > width) {
                shape.x = width;
                shape.xVel = 0;
            }
            if (shape.y > height) {
                shape.y = height;
                shape.yVel = 0;
            }
        }
    }

    draw();

    setInterval(() => {
        move();
        draw();
    }, 50);
}

start();
