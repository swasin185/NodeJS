var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Maze2 = /** @class */ (function () {
    function Maze2(canvasId, size) {
        if (canvasId === void 0) { canvasId = "canvas"; }
        if (size === void 0) { size = 500; }
        this.size = 0;
        this.imgData = new ImageData(1, 1);
        this.map = [[]];
        this.portals = [];
        this.width = 0;
        this.height = 0;
        this.dx = 0;
        this.dy = 0;
        this.waiting = false;
        this._dx4 = 0;
        this._width4 = 0;
        this._width4_dx4 = 0;
        this._size_2 = 0;
        this.bgColor = [0, 0, 0];
        this.wayColor = [0xFF, 0xFF, 0xFF];
        this.endColor = [0x80, 0x1F, 0x1F];
        this.startColor = [0, 0xFF, 0];
        this.finishColor = [0xFF, 0, 0];
        this.runnerColor = [0xFF, 0xF0, 0x0F];
        this.pathColor = [0xAF, 0xEF, 0x0F];
        this.portalColor = [0, 0, 0xFF];
        this.dot = 0x0F;
        this.colors = new Array(100);
        this.startArea = new Coordinate(0, 0);
        this.finishArea = new Coordinate(-1, -1);
        this.found = false;
        this.running = false;
        this.maxWalk = 0;
        this.teams = [];
        this.path = [];
        this.colors[0] = this.wayColor;
        for (var i = 1; i < this.colors.length; i++)
            this.colors[i] = [Math.round(i * 2.5), 205 - (i * 2), 200];
        this.cvs = document.getElementById(canvasId);
        this.ctx = this.cvs.getContext("2d");
        this.ctx.fillStyle = this.cvs.style.backgroundColor;
        this.ctx.strokeStyle = this.cvs.style.color;
        this.bgColor[Maze2.RED] = parseInt(this.ctx.fillStyle.substring(1, 3), 16);
        this.bgColor[Maze2.GREEN] = parseInt(this.ctx.fillStyle.substring(3, 5), 16);
        this.bgColor[Maze2.BLUE] = parseInt(this.ctx.fillStyle.substring(5, 7), 16);
        this.wayColor[Maze2.RED] = parseInt(this.ctx.strokeStyle.substring(1, 3), 16);
        this.wayColor[Maze2.GREEN] = parseInt(this.ctx.strokeStyle.substring(3, 5), 16);
        this.wayColor[Maze2.BLUE] = parseInt(this.ctx.strokeStyle.substring(5, 7), 16);
        this.init(size);
    }
    Maze2.prototype.getMaxWalk = function () {
        return this.maxWalk;
    };
    Maze2.prototype.init = function (size) {
        if (!this.running) {
            this.running = true;
            if (size % 2 == 0)
                size++;
            this.size = size;
            this.map = new Array(size);
            for (var i = 0; i < size; i++) {
                this.map[i] = new Array(size);
                this.map[i].fill(Maze2.WALL);
            }
            var normal = 500;
            this.dx = Math.ceil(normal / size);
            this.dy = Math.ceil(normal / size);
            this.width = size * this.dx;
            this.height = size * this.dy;
            this.cvs.width = this.width;
            this.cvs.height = this.height;
            this.imgData = this.ctx.createImageData(this.width, this.height);
            var imgArr = this.imgData.data;
            this._dx4 = this.dx * 4;
            this._width4 = this.width * 4;
            this._width4_dx4 = this._width4 - this._dx4;
            this._size_2 = this.size - 2;
            imgArr.fill(0x0);
            var remainder = 0;
            for (var i = 0; i < this.imgData.data.length; i++) {
                remainder = i % 4;
                if (remainder == Maze2.ALPHA)
                    imgArr[i] = 0xFF;
                else
                    imgArr[i] = this.bgColor[remainder];
            }
            if (this.dx > 2)
                for (var y = this.dy; y < this.height; y += this.dy)
                    for (var x = this.dx; x < this.width; x += this.dx)
                        imgArr[(y * this.width + x) * 4 + 3] = this.dot;
            this.maxWalk = 0;
            this.startArea = new Coordinate(Math.floor(this.size / 4) * 2 + 1, Math.floor(this.size / 4) * 2 + 1);
            this.paintMaze();
            this.running = false;
        }
    };
    Maze2.prototype.paintArea = function (imgArr, i, j, color) {
        var coor = (i * this.dy * this._width4 + (j * this._dx4));
        for (var by = 0; by < this.dy; by++) {
            for (var bx = 0; bx < this.dx; bx++) {
                imgArr[coor++] = color[Maze2.RED];
                imgArr[coor++] = color[Maze2.GREEN];
                imgArr[coor++] = color[Maze2.BLUE];
                coor++;
            }
            coor += this._width4_dx4;
        }
    };
    Maze2.prototype.hidePath = function () {
        var _a;
        var imgArr = (_a = this.imgData) === null || _a === void 0 ? void 0 : _a.data;
        for (var i = 1; i <= this._size_2; i++)
            for (var j = 1; j <= this._size_2; j++)
                if (this.map[i][j] == Maze2.WAY)
                    this.paintArea(imgArr, i, j, this.bgColor);
        this.ctx.putImageData(this.imgData, 0, 0);
    };
    Maze2.prototype.paintMaze = function () {
        var _a;
        var imgArr = (_a = this.imgData) === null || _a === void 0 ? void 0 : _a.data;
        for (var i = 1; i <= this._size_2; i++)
            for (var j = 1; j <= this._size_2; j++)
                if (this.map[i][j] == Maze2.WAY)
                    this.paintArea(imgArr, i, j, this.wayColor);
                else if (this.map[i][j] == Maze2.END)
                    this.paintArea(imgArr, i, j, this.endColor);
                else if (this.map[i][j] == Maze2.WALL)
                    this.paintArea(imgArr, i, j, this.bgColor);
        if (this.startArea != undefined)
            this.paintArea(imgArr, this.startArea.i, this.startArea.j, this.startColor);
        this.ctx.putImageData(this.imgData, 0, 0);
    };
    Maze2.prototype.paintPath = function () {
        var _this = this;
        var imgArr = this.imgData.data;
        for (var i = 1; i <= this._size_2; i++)
            for (var j = 1; j <= this._size_2; j++) {
                if (this.map[i][j] > Maze2.WAY) {
                    var x = Math.ceil(this.map[i][j] / this.maxWalk * 99);
                    this.paintArea(imgArr, i, j, this.colors[x]);
                }
                else if (this.map[i][j] == Maze2.END)
                    this.paintArea(imgArr, i, j, this.endColor);
                // else if (this.map[i][j] == Maze2.WALL)
                // 	this.paintArea(imgArr, i, j, this.bgColor);
            }
        this.teams.forEach((function (runner) {
            if (runner.isActive())
                _this.paintArea(imgArr, runner.getLocation().i, runner.getLocation().j, _this.runnerColor);
            else
                _this.paintArea(imgArr, runner.getLocation().i, runner.getLocation().j, _this.endColor);
        }));
        this.portals.forEach(function (area) {
            _this.paintArea(imgArr, area.i, area.j, _this.portalColor);
        });
        this.path.forEach(function (area) {
            _this.paintArea(imgArr, area.i, area.j, _this.pathColor);
        });
        if (this.startArea != undefined)
            this.paintArea(imgArr, this.startArea.i, this.startArea.j, this.startColor);
        // if (this.finishArea != undefined && this.found)
        if (this.finishArea != undefined)
            this.paintArea(imgArr, this.finishArea.i, this.finishArea.j, this.finishColor);
        this.ctx.putImageData(this.imgData, 0, 0);
    };
    Maze2.prototype.getPathLength = function () {
        return this.path.length;
    };
    Maze2.prototype.getFinishDistanct = function (area) {
        return (Math.abs(this.finishArea.i - area.i) + Math.abs(this.finishArea.j - area.j));
    };
    Maze2.prototype.setMap = function (coor, value) {
        if (value > this.maxWalk)
            this.maxWalk = value;
        this.map[coor.i][coor.j] = value;
    };
    Maze2.prototype.getMap = function () {
        return this.map;
    };
    Maze2.prototype.generate = function (connect, delay) {
        if (connect === void 0) { connect = 0.5; }
        if (delay === void 0) { delay = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var i, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connect = Number(connect);
                        delay = Number(delay);
                        this.reset();
                        if (!!this.running) return [3 /*break*/, 5];
                        this.running = true;
                        console.time("generate");
                        this.teams = [new Runner(this, 1, 1), new Runner(this, 1, this._size_2),
                            new Runner(this, this._size_2, 1), new Runner(this, this._size_2, this._size_2)];
                        _a.label = 1;
                    case 1:
                        if (!(this.running && this.teams.some(function (runner) { return runner.isActive(); }))) return [3 /*break*/, 4];
                        this.teams.forEach(function (runner) {
                            if (runner.isActive()) {
                                runner.randomWallDirection();
                                if (runner.getDirection() == Maze2.NONE) {
                                    runner.routeBack();
                                    if (Math.random() < connect)
                                        runner.breakTheWall();
                                    runner.move();
                                    runner.goBackUntilNewWall();
                                }
                                runner.move();
                            }
                        });
                        if (!(delay > 10)) return [3 /*break*/, 3];
                        this.paintPath();
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, delay); })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4:
                        this.finishArea = new Coordinate(Math.floor(Math.random() * this._size_2 / 2) * 2 + 1, Math.floor(Math.random() * this._size_2 / 2) * 2 + 1);
                        connect -= 0.5;
                        for (i = 1; i <= this._size_2; i++)
                            for (j = 1; j <= this._size_2; j++)
                                if (!(i % 2 == 1 && j % 2 == 1)
                                    && (this.map[i][j] == Maze2.WALL) &&
                                    (Math.random() < connect))
                                    this.map[i][j] = Maze2.WAY;
                                else if (this.map[i][j] != Maze2.WALL)
                                    this.map[i][j] = Maze2.WAY;
                        this.paintMaze();
                        console.timeEnd("generate");
                        this.running = false;
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Maze2.prototype.clickXY = function (event) {
        var _a;
        if (!this.running) {
            this.running = true;
            var i = Math.floor(event.offsetY / this.dx);
            var j = Math.floor(event.offsetX / this.dy);
            if (this.map[i][j] != Maze2.WALL) {
                window.alert("set finish to i:" + i + " j:" + j);
                (_a = this.finishArea) === null || _a === void 0 ? void 0 : _a.set(i, j);
                this.paintMaze();
                this.paintPath();
            }
            this.running = false;
        }
    };
    Maze2.prototype.reset = function () {
        Runner.resetId();
        this.running = false;
        this.maxWalk = 0;
        this.teams = [];
        this.path = [];
        this.portals = [];
        this.found = false;
        for (var i = 1; i <= this._size_2; i++)
            for (var j = 1; j <= this._size_2; j++)
                if (this.map[i][j] != Maze2.WALL)
                    this.map[i][j] = Maze2.WAY;
        //this.paintMaze();
        //this.paintPath();
        this.hidePath();
    };
    Maze2.prototype.isFounded = function () {
        return this.found;
    };
    Maze2.prototype.createPath = function (point) {
        var path = new Array(this.map[point.i][point.j] - 1);
        var i = point.i;
        var j = point.j;
        var x = path.length - 1;
        var w = 0;
        while (i != this.startArea.i || j != this.startArea.j) {
            w = this.map[i][j];
            if (i > 1 && this.map[i - 1][j] > 0 && w - this.map[i - 1][j] > 0)
                i--;
            else if (j > 1 && this.map[i][j - 1] > 0 && w - this.map[i][j - 1] > 0)
                j--;
            else if (i < this._size_2 && this.map[i + 1][j] > 0 && w - this.map[i + 1][j] > 0)
                i++;
            else if (j < this._size_2 && this.map[i][j + 1] > 0 && w - this.map[i][j + 1] > 0)
                j++;
            else {
                console.log("path Error", i, j, w);
                //throw new Error("Path Error!");
                return path;
            }
            path[x--] = new Coordinate(i, j);
        }
        return path;
    };
    Maze2.prototype.isUpdatePath = function (point) {
        var found = false;
        var idx = -1;
        while (!found && idx < this.path.length) {
            idx++;
            found = point.equals(this.path[idx]);
        }
        if (found) {
            if (this.map[point.i][point.j] < idx) {
                // console.log('update path', this.path.length, idx);
                var path = this.createPath(point);
                this.path = path.concat(this.path.slice(idx, this.path.length));
                return true;
            }
        }
        return false;
    };
    Maze2.prototype.addPortal = function (area) {
        var i = 0;
        while (i < this.portals.length && !this.portals[i].equals(area))
            i++;
        if (i == this.portals.length)
            this.portals.push(new Coordinate(area.i, area.j));
    };
    Maze2.prototype.removePortal = function (area) {
        var i = 0;
        while (i < this.portals.length && !this.portals[i].equals(area))
            i++;
        if (i < this.portals.length)
            this.portals.splice(i, 1);
    };
    Maze2.prototype.addNewRunner = function (walk) {
        var i = 0;
        var portal = this.portals[i];
        while (i < this.portals.length && (walk < this.map[portal.i][portal.j])) {
            this.teams.push(new Runner(this, portal.i, portal.j));
            portal = this.portals[++i];
        }
        if (!this.waiting)
            this.portals.splice(0, i);
    };
    Maze2.prototype.solveMaze = function (delay, waiting) {
        if (delay === void 0) { delay = 0; }
        if (waiting === void 0) { waiting = true; }
        return __awaiter(this, void 0, void 0, function () {
            var activeCount_1, path;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.waiting = waiting;
                        this.reset();
                        if (!!this.running) return [3 /*break*/, 5];
                        this.running = true;
                        this.teams = [new Runner(this, this.startArea.i, this.startArea.j)];
                        console.time("First Found");
                        console.time("Optimal Path");
                        activeCount_1 = 1;
                        _a.label = 1;
                    case 1:
                        if (!(this.running && activeCount_1 > 0)) return [3 /*break*/, 4];
                        activeCount_1 = 0;
                        this.teams.forEach(function (runner) {
                            if (runner.isActive()) {
                                activeCount_1++;
                                if (runner.getLocation().equals(_this.finishArea)) {
                                    runner.setDirection(Maze2.NONE);
                                    _this.found = true;
                                }
                                else
                                    runner.findNewPath(); // หาเส้นทางใหม่
                                if (runner.getDirection() > Maze2.NONE) {
                                    if (runner.beyondBoundary()) {
                                        _this.addPortal(runner.getLocation());
                                        runner.setDirection(Maze2.NONE);
                                    }
                                    else if (_this.found && runner.beyondShortestPath()) {
                                        _this.removePortal(runner.getLocation());
                                        runner.setDirection(Maze2.NONE);
                                    }
                                    if (_this.found)
                                        _this.isUpdatePath(runner.getLocation());
                                }
                                else
                                    _this.removePortal(runner.getLocation());
                                if (runner.getDirection() == Maze2.NONE) // ถ้าไม่มีเส้นทางใหม่ ให้กลับบ้าน
                                    runner.goBackUntilNewPath();
                                if (runner.getDirection() == Maze2.NONE) // ถ้ากลับจนสุดแล้ว ให้เปลี่ยนไปเริ่มที่จุดพักต่อไป
                                    _this.addNewRunner(_this.map[runner.getLocation().i][runner.getLocation().j]);
                                runner.move();
                            }
                        });
                        if (this.found && this.getPathLength() == 0) {
                            console.timeEnd("First Found");
                            console.log("Runner", Runner.getMaxId(), "Avg.Move", Math.round(Runner.getTotalDistance() / Runner.getMaxId()));
                            path = this.createPath(this.finishArea);
                            this.reset();
                            this.found = true;
                            this.path = path;
                            this.teams = [new Runner(this, this.startArea.i, this.startArea.j)];
                            activeCount_1 = 1;
                            this.running = true;
                        }
                        else if (activeCount_1 < this.teams.length / 2) {
                            //console.log("teams=", activeCount, this.teams.length);
                            this.teams = this.teams.filter(function (runner) { return runner.isActive(); });
                        }
                        if (!(delay > 0)) return [3 /*break*/, 3];
                        this.paintPath();
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, delay); })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4:
                        console.timeEnd("Optimal Path");
                        console.log("Runner", Runner.getMaxId(), "Avg.Move", Math.round(Runner.getTotalDistance() / Runner.getMaxId()));
                        this.paintMaze();
                        this.paintPath();
                        this.running = false;
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Maze2.GOLDEN = 1.618034;
    Maze2.NONE = 0;
    Maze2.NORTH = 1;
    Maze2.WEST = 2;
    Maze2.SOUTH = 4;
    Maze2.EAST = 8;
    Maze2.END = -2;
    Maze2.WALL = -1;
    Maze2.WAY = 0;
    Maze2.RED = 0;
    Maze2.GREEN = 1;
    Maze2.BLUE = 2;
    Maze2.ALPHA = 3;
    return Maze2;
}());
export default Maze2;
var Coordinate = /** @class */ (function () {
    function Coordinate(i, j) {
        this.i = 0;
        this.j = 0;
        this.set(i, j);
    }
    Coordinate.prototype.set = function (i, j) {
        this.i = i;
        this.j = j;
    };
    Coordinate.prototype.setCoordinate = function (area) {
        this.i = area.i;
        this.j = area.j;
    };
    Coordinate.prototype.equals = function (area) {
        return area != undefined && this.i == area.i && this.j == area.j;
    };
    Coordinate.prototype.toString = function () {
        return this.i + ":" + this.j;
    };
    return Coordinate;
}());
var Runner = /** @class */ (function () {
    function Runner(maze, i, j) {
        this.id = ++Runner.autoid;
        this.walk = 1;
        this.direction = Maze2.NONE;
        this.active = true;
        this.boundary = 20;
        this.backward = false;
        this.maze = maze;
        this.locate = new Coordinate(i, j);
        this.walk = this.maze.getMap()[this.locate.i][this.locate.j];
        if (this.walk == undefined || this.walk <= Maze2.WAY) {
            this.walk = 1;
            this.maze.setMap(this.locate, this.walk);
        }
        else
            this.boundary = this.walk * Maze2.GOLDEN;
        this.route = [];
        this.active = true;
    }
    Runner.resetId = function () {
        Runner.autoid = 0;
        Runner.totalDistance = 0;
    };
    Runner.getMaxId = function () {
        return Runner.autoid;
    };
    Runner.getTotalDistance = function () {
        return Runner.totalDistance;
    };
    Runner.prototype.toString = function () {
        return this.id + " : " + this.walk + " | " + this.direction + " = " + this.boundary;
    };
    Runner.prototype.isBackward = function () {
        return this.backward;
    };
    Runner.prototype.setBackward = function (value) {
        this.backward = value;
    };
    Runner.prototype.isActive = function () {
        return this.active;
    };
    Runner.prototype.setActive = function (value) {
        this.active = value;
    };
    Runner.prototype.getDirection = function () {
        return this.direction;
    };
    Runner.prototype.setDirection = function (direct) {
        this.direction = direct;
    };
    Runner.prototype.getLocation = function () {
        return this.locate;
    };
    Runner.prototype.setLocation = function (locate) {
        this.locate = locate;
    };
    Runner.prototype.setBoundary = function () {
        if (this.maze.getPathLength() > 0) {
            this.boundary = this.maze.getPathLength() - this.maze.getFinishDistanct(this.getLocation());
        }
    };
    Runner.prototype.move = function () {
        var map = this.maze.getMap();
        if (this.direction == Maze2.NONE) {
            this.setActive(false);
        }
        else {
            var prior_i = this.locate.i;
            var prior_j = this.locate.j;
            if (this.direction == Maze2.NORTH)
                this.locate.i--;
            else if (this.direction == Maze2.WEST)
                this.locate.j--;
            else if (this.direction == Maze2.SOUTH)
                this.locate.i++;
            else if (this.direction == Maze2.EAST)
                this.locate.j++;
            if (this.isBackward()) {
                this.walk = map[this.locate.i][this.locate.j];
            }
            else {
                this.route.push(new Coordinate(prior_i, prior_j));
                this.walk++;
                Runner.totalDistance++;
                this.maze.setMap(this.locate, this.walk);
            }
        }
    };
    Runner.prototype.atJunction = function (locate) {
        return (locate.i % 2 == 1 && locate.j % 2 == 1);
    };
    Runner.prototype.randomWallDirection = function () {
        var map = this.maze.getMap();
        if (this.atJunction(this.getLocation())) {
            var choice = 0;
            var direct = Maze2.NONE;
            if (this.locate.i > 1 && map[this.locate.i - 2][this.locate.j] == Maze2.WALL) {
                choice++;
                direct += Maze2.NORTH;
            }
            if (this.locate.j > 1 && map[this.locate.i][this.locate.j - 2] == Maze2.WALL) {
                choice++;
                direct += Maze2.WEST;
            }
            if (this.locate.i < this.maze._size_2 && map[this.locate.i + 2][this.locate.j] == Maze2.WALL) {
                choice++;
                direct += Maze2.SOUTH;
            }
            if (this.locate.j < this.maze._size_2 && map[this.locate.i][this.locate.j + 2] == Maze2.WALL) {
                choice++;
                direct += Maze2.EAST;
            }
            if (choice > Maze2.NONE) {
                this.backward = false;
                choice = Math.floor(Math.random() * choice);
                this.direction = Maze2.EAST;
                while (choice > 0) {
                    while ((this.direction & direct) == Maze2.NONE)
                        this.direction >>= 1;
                    this.direction >>= 1;
                    choice--;
                }
                while ((this.direction & direct) == Maze2.NONE)
                    this.direction >>= 1;
            }
            else
                this.direction = Maze2.NONE;
        }
        else {
            if (this.direction == Maze2.NORTH && map[this.locate.i - 1][this.locate.j] != Maze2.WALL)
                this.direction = Maze2.NONE;
            else if (this.direction == Maze2.WEST && map[this.locate.i][this.locate.j - 1] != Maze2.WALL)
                this.direction = Maze2.NONE;
            else if (this.direction == Maze2.SOUTH && map[this.locate.i + 1][this.locate.j] != Maze2.WALL)
                this.direction = Maze2.NONE;
            else if (this.direction == Maze2.EAST && map[this.locate.i][this.locate.j + 1] != Maze2.WALL)
                this.direction = Maze2.NONE;
        }
    };
    Runner.prototype.routeBack = function () {
        this.direction = Maze2.NONE;
        if (this.route.length > 0) {
            var prior = this.route.pop() || new Coordinate(0, 0);
            if (prior.i < this.locate.i)
                this.direction = Maze2.NORTH;
            else if (prior.j < this.locate.j)
                this.direction = Maze2.WEST;
            else if (prior.i > this.locate.i)
                this.direction = Maze2.SOUTH;
            else if (prior.j > this.locate.j)
                this.direction = Maze2.EAST;
            this.backward = true;
        }
    };
    Runner.prototype.isNextLocation = function (i, j) {
        var map = this.maze.getMap();
        return (map[i][j] == Maze2.WAY || (this.maze.isFounded() && map[i][j] - map[this.locate.i][this.locate.j] > 1));
    };
    Runner.prototype.breakTheWall = function () {
        var map = this.maze.getMap();
        if (this.locate.i > 1 && this.direction == Maze2.SOUTH && map[this.locate.i - 1][this.locate.j] == Maze2.WALL)
            map[this.locate.i - 1][this.locate.j] = Maze2.END;
        else if (this.locate.j > 1 && this.direction == Maze2.EAST && map[this.locate.i][this.locate.j - 1] == Maze2.WALL)
            map[this.locate.i][this.locate.j - 1] = Maze2.END;
        else if (this.locate.i < this.maze._size_2 && this.direction == Maze2.NORTH && map[this.locate.i + 1][this.locate.j] == Maze2.WALL)
            map[this.locate.i + 1][this.locate.j] = Maze2.END;
        else if (this.locate.j < this.maze._size_2 && this.direction == Maze2.WEST && map[this.locate.i][this.locate.j + 1] == Maze2.WALL)
            map[this.locate.i][this.locate.j + 1] = Maze2.END;
    };
    Runner.prototype.findNewPath = function () {
        this.direction = Maze2.NONE;
        var direct = Maze2.NONE;
        var idx = this.id % 4;
        if (this.locate.i > 1 && this.isNextLocation(this.locate.i - 1, this.locate.j)) {
            if (idx == 0)
                this.direction = Maze2.NORTH;
            direct += Maze2.NORTH;
        }
        if (this.direction == Maze2.NONE && this.locate.j > 1 && this.isNextLocation(this.locate.i, this.locate.j - 1)) {
            if (idx == 1)
                this.direction = Maze2.WEST;
            direct += Maze2.WEST;
        }
        if (this.direction == Maze2.NONE && this.locate.i < this.maze._size_2 && this.isNextLocation(this.locate.i + 1, this.locate.j)) {
            if (idx == 2)
                this.direction = Maze2.SOUTH;
            direct += Maze2.SOUTH;
        }
        if (this.direction == Maze2.NONE && this.locate.j < this.maze._size_2 && this.isNextLocation(this.locate.i, this.locate.j + 1)) {
            if (idx == 3)
                this.direction = Maze2.EAST;
            direct += Maze2.EAST;
        }
        if (direct > Maze2.NONE) {
            this.backward = false;
            if (this.direction == Maze2.NONE) {
                if (idx == 0)
                    this.direction = Maze2.EAST;
                else if (idx == 1)
                    this.direction = Maze2.NORTH;
                else if (idx == 2)
                    this.direction = Maze2.WEST;
                else
                    this.direction = Maze2.SOUTH;
                while ((this.direction & direct) == Maze2.NONE)
                    if (this.direction == Maze2.NORTH)
                        this.direction = Maze2.EAST;
                    else
                        this.direction >>= 1;
            }
        }
        else
            this.direction == Maze2.NONE;
    };
    Runner.prototype.beyondBoundary = function () {
        return this.walk >= this.boundary;
    };
    Runner.prototype.beyondShortestPath = function () {
        return this.walk + this.maze.getFinishDistanct(this.locate) >= this.maze.getPathLength();
    };
    Runner.prototype.goBackUntilNewPath = function () {
        var canGoBack;
        do {
            this.routeBack();
            canGoBack = this.direction > Maze2.NONE;
            if (canGoBack) {
                this.move();
                this.findNewPath();
            }
            this.maze.removePortal(this.locate);
        } while (canGoBack && this.direction == Maze2.NONE); // ย้อนกลับไปถ้ายังไม่เจอทางใหม่ 
    };
    Runner.prototype.goBackUntilNewWall = function () {
        var canGoBack;
        do {
            this.routeBack();
            canGoBack = this.direction > Maze2.NONE;
            if (canGoBack) {
                this.move();
                this.randomWallDirection();
            }
        } while (canGoBack && this.direction == Maze2.NONE); // ย้อนกลับไปถ้ายังไม่เจอทางใหม่ 
    };
    Runner.autoid = 0;
    Runner.totalDistance = 0;
    return Runner;
}());
