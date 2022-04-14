const cv = document.getElementById("cpxCanvas") as HTMLCanvasElement;
const cx = cv.getContext("2d") as CanvasRenderingContext2D;
const WIDTH = cv.width;
const HEIGHT = cv.height;
const size = document.getElementById("size") as HTMLInputElement;
const checkImprove = document.getElementById("improve") as HTMLInputElement;
// github token : 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

// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
class Address {
    public i: number;         
    public j: number;         
    constructor(i: number, j: number) {
        this.set(i, j);
    }
    public set(i: number, j: number): void {
        this.i = i;
        this.j = j;
    }
    public setAddress(a : Address): void {
        this.i = a.i;
        this.j = a.j;
    }
    public equals(b: Address): boolean {
		return b!=undefined && this.i==b.i && this.j==b.j;
    }
}

class Pioneer {
    public locate : Address;
 	public walk : number = 0;
	public direction : number = NONE;
	public active : boolean = true;
	public start : Address = undefined;
	public found : Address = undefined;
	public route : Address[];
	public boundary = 10;
	public backward = false;
	        
    constructor(i: number, j: number) {
    	this.locate = new Address(i, j);
		this.start = new Address(i, j);
		if (map[i][j] != null) {
			this.walk = map[i][j];
		} else {
			this.walk = 0;
		}
		if (map[i][j]>0) 
			this.boundary = this.walk * GOLDEN;
		else
			this.boundary = 10;
		this.route = [];
		this.active = true;
    }

	public move() : void {
		if (this.direction > NONE) {
			let i = this.locate.i;
			let j = this.locate.j; 
			if (this.direction == NORTH) this.locate.i--;
			else if (this.direction == WEST) this.locate.j--;
			else if (this.direction == SOUTH) this.locate.i++;
			else if (this.direction == EAST) this.locate.j++;	
			this.backward = (this.route.length > 0 && this.locate.equals(this.route[this.route.length-1]));
			if (this.backward)
				this.route.pop();
			else
				this.route.push(new Address(i,j));
		}
	}
	public goBack() : void {
		if (this.route.length > 0) {
			let prior = this.route[this.route.length-1]
			if (prior.i < this.locate.i)
				this.direction = NORTH;
			else if (prior.j < this.locate.j)
				this.direction = WEST;
			else if (prior.i > this.locate.i)
				this.direction = SOUTH;
			else if (prior.j > this.locate.j)
				this.direction = EAST;
			else
				this.direction = NONE;
		} else
			this.direction = NONE;
	}
}

const GOLDEN = 1.61807;
const DEADEND = -2;
const WALL = -1;
const WAY = 0;
const NONE = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 4;
const EAST = 8;

var shortest : number = 0;
var n: number = Number(size.value)+1;
var m: number = Number(size.value)+1;
var improve = false;
var w = WIDTH / n;
var h = HEIGHT / m;
var maze: number[][] = new Array(m);
var map: number[][] = new Array(m);
var found = undefined;
var start: Address = new Address(0, 0);
var finish: Address = new Address(0, 0);
var worker: Address = new Address(0, 0);
var colors : string[] = new Array(100);
for (let i=0; i<colors.length; i++)
	colors[i] = rgb(i*2.5, 255-(i*2), 150+i);

var points = 0;	
var portal : Address[] = new Array(1);
var max_point = 0;
var path : Address[] = new Array(1);
var teams : Pioneer[] = [];

var time = 0;
generateMaze();

// ฟังก์ชั่น
// ----------------------------------------------------------------------------
function resetMaze() : void {
	improve = checkImprove.checked;
	found = undefined;
	worker.set(start.i, start.j);
	path = new Array(0);
	for (let i = 0; i < m; i++) 
		for (let j = 0; j < n; j++) {
			if (maze[i][j] != WALL)
				maze[i][j] = null;
			map[i][j] = null;
		}
	portal[0] = start; 
	points = 1;
	max_point = points;
	teams = [new Pioneer(start.i, start.j)];
	// shortest = Math.sqrt(m*n) / 4;
	shortest = 10;	
}

async function generateMaze() {
	n = Number(size.value)+1;
	m = Number(size.value)+1;
	w = WIDTH / n;
	h = HEIGHT / m;
	maze = new Array(m);
	map = new Array(m);
	for (let i = 0; i < m; i++) {
		maze[i] = new Array(n);
		maze[i].fill(WALL);
		map[i] = new Array(n);
		map[i].fill(WALL);
	}
	worker.i = 1;
	worker.j = 1;	
	let choice = NORTH;
	let walk = 0;
	let backward = false;
	start = new Address(Math.floor(m / 4) * 2 + 1, Math.floor(n / 4) * 2 + 1);
	finish = new Address(Math.floor(Math.random() * (m-2) / 2) * 2 + 1,
					   Math.floor(Math.random() * (n-2) / 2) * 2 + 1);
	paintMaze();
	while (choice > NONE) {
		if (map[worker.i][worker.j] == WALL) {
			maze[worker.i][worker.j] = null;
			map[worker.i][worker.j] = walk;
		} else 
			walk = map[worker.i][worker.j];
		walk++;
		if (worker.i%2 == 1 && worker.j%2 == 1) {
			choice = randomDirection(worker);
			if (choice == NONE) {
				choice = goBack(worker);
				if (!backward) { 
					connectDEADEND(worker, choice);
					backward = true;
				}
			} else 
				backward = false;
		}
		move(worker, choice);
	}
	connectMore();
	resetMaze();
	paintMaze();
}

function connectMore() {
	for (let i=2; i<maze.length-2; i+=2) {
		for (let j=2; j<maze.length-2; j+=2) {
			if (maze[i][j] == WALL && Math.random() > 0.9 &&
			((maze[i-1][j]!=WALL && maze[i+1][j]!=WALL && maze[i][j-1]==WALL && maze[i][j+1]==WALL) ||
			 (maze[i][j-1]!=WALL && maze[i][j+1]!=WALL && maze[i-1][j]==WALL && maze[i+1][j]==WALL))) {
				maze[i][j] = WAY;
			}
		}
	}
}

function howFarFromFinish(point : Address) : number {
	if (found == undefined)	
		return 0;
	else
		return Math.abs(found.i-point.i) + Math.abs(found.j-point.j);
} 

function connectDEADEND(point : Address, direction : number) : void {
	if (point.i > 1 && direction == SOUTH && map[point.i-1][point.j] == WALL && 
	    map[point.i][point.j] - map[point.i-2][point.j] > m)
		maze[point.i-1][point.j] = WAY;
	else if (point.j > 1 && direction == EAST && map[point.i][point.j-1] == WALL && 
         	map[point.i][point.j] - map[point.i][point.j-2] > m) 
		maze[point.i][point.j-1] = WAY;
	else if (point.i < m-2 && direction == NORTH && map[point.i+1][point.j] == WALL && 
	        map[point.i][point.j] - map[point.i+2][point.j] > n)
		maze[point.i + 1][point.j] = WAY;
	else if (point.j < n-2 && direction == WEST && map[point.i][point.j+1] == WALL && 
	        map[point.i][point.j] - map[point.i][point.j+2] > n)
		maze[point.i][point.j+1] = WAY;
}

async function solveMaze() {
	resetMaze();
	cx.clearRect(0, 0, WIDTH, HEIGHT);
	time = 0;
	let pioneer : Pioneer = new Pioneer(start.i, start.j);
	console.time("Solve Maze");
	while (points > 0) {
		time++;
		await explorer(pioneer);
	}
	console.timeEnd("Solve Maze");
	paintMaze();
	paintPath(pioneer.locate);
	console.log("points="+max_point, "path="+path.length);
	console.log("time="+time);
}

async function teamSolveMaze() {
	resetMaze();
	cx.clearRect(0, 0, WIDTH, HEIGHT);
	console.time("Team Solve Maze");
	time = 0;
	let count = 1;
	while (points > 0 && count > 0) {
		time++;
		count = 0;
		for (let pioneer of teams) { 
			if (pioneer.active) {
				count++;
				await explorer(pioneer);
			}
		}
	}
	paintMaze();
	paintPath(undefined);
	console.timeEnd("Team Solve Maze");
	console.log("points="+max_point, "path="+path.length);
	console.log("time="+time);
}

async function explorer(worker : Pioneer) {
	if (found!=undefined && shortest < worker.boundary)
		worker.boundary = shortest;
		
	let di = worker.locate.i;
	let dj = worker.locate.j; 
	if (!worker.backward && (map[di][dj] == null || worker.walk < map[di][dj])) {
 		map[di][dj] = worker.walk;
	} else {
		worker.walk = map[di][dj];
	}
	if (map[di][dj] == DEADEND)
		worker.goBack();
	else {
		worker.walk++;
		worker.direction = NONE;
		if (worker.locate.equals(finish)) {
			found = finish;
			path = createPath(worker.locate);
			shortest = worker.walk-1;
		} else 
			worker.direction = selectDirection(worker.locate);
	}
			
	if (worker.direction == NONE || 
	   (worker.walk + howFarFromFinish(worker.locate)) > worker.boundary) {
		if (worker.direction == NONE || found != undefined) {
			let i = 0;
			while (i < points && !worker.locate.equals(portal[i])) i++; 
			if (i < points) {
				while (i < points-1) {
					portal[i] = portal[i+1];
					i++
				}
				points--;
			}
			
			if (worker.locate.equals(worker.start)) {
				worker.active = false;
				for (let i=0; i < points && worker.walk < map[portal[i].i][portal[i].j]; i++) 
						teams[teams.length] = new Pioneer(portal[i].i, portal[i].j);
				if (improve && found==undefined) {
					paintPath(undefined);
					await new Promise(r => setTimeout(r, 50));
				}
				if (points > 0 && worker.walk < map[portal[0].i][portal[0].j]) {
					if (max_point < points)
						max_point = points;
					if (improve) 
						console.log(di, dj, "START", points);
				}
//				else {
//					let c = 0;
//					for (let i=0; i<teams.length; i++) if (teams[i].active) c++;
//					console.log(c, "actived");
//				}
				
				if (points > 0) {
					worker.start = portal[0];
					worker.locate.setAddress(worker.start);
					worker.route = [];
					worker.walk = map[worker.locate.i][worker.locate.j];
					worker.direction = NONE;
					if (found == undefined) { 
						worker.boundary = worker.walk * GOLDEN;
						shortest = worker.boundary;
					}
				}
			}
		} else if (found == undefined) {
			let i = 0;
			while (i < points && !worker.locate.equals(portal[i])) i++;
			if (i == points) {
				portal[points] = new Address(di, dj);
				points++;
			} 
		} else {
			worker.active = false;
		}
			 
		if (points > 0 && !worker.locate.equals(worker.start)) { 
			worker.goBack();
			/*
 			if ((found==undefined || !worker.locate.equals(found)) && isDEADEND(worker.locate)) { 
				map[di][dj] = DEADEND;
				let i = 0;
				while (i < points && !worker.locate.equals(portal[i])) i++; 
				if (i < points) {
					console.log("remove deadend portal", di, dj)
					while (i < points-1) {
						portal[i] = portal[i+1];
						i++
					}
					points--;
				}
			}
			*/	
		}
	}
	//move(worker.locate, worker.direction);
	worker.move();
}

function createPath(point : Address) : Address[] {
	let path : Address[] = new Array(map[point.i][point.j]-1);
	let x = 0;
	path[x++] = new Address(point.i, point.j);
	let c = goBack(point);
	while (c > 0 && !point.equals(start)) {
		point = new Address(point.i, point.j);
		move(point, c);
		path[x++] = point;
		c = goBack(point);
	}
	return path;
}

function move(point : Address, direction : number) : void {
	if (direction == NORTH) point.i--;
	else if (direction == WEST) point.j--;
	else if (direction == SOUTH) point.i++;
	else if (direction == EAST) point.j++;
}

function goBack(point : Address) : number {
	let direction = NONE;
	if (point.i>1 && isPriorAddress(map[point.i][point.j], map[point.i-1][point.j])) 
		direction = NORTH; 
	else if (point.j>1 && isPriorAddress(map[point.i][point.j], map[point.i][point.j-1])) 
		direction = WEST; 
	else if (point.i<(m-2) && isPriorAddress(map[point.i][point.j], map[point.i+1][point.j])) 
		direction = SOUTH; 
	else if (point.j<(n-2) && isPriorAddress(map[point.i][point.j], map[point.i][point.j+1])) 
		direction = EAST;
	return direction;
}

function isPriorAddress(b1 : number,  b2 : number) : boolean {
	return b2 != null && b2 != WALL && b1 == b2 + 1;
}

function isNextAddress(b1 : number,  b2 : number, maze : number) : boolean {
	return b1 != DEADEND && maze != WALL && b2 != DEADEND && (b2 == null || b2-b1 > 1);
}

function isDEADEND(point : Address) : boolean {
	let x = 0;
	if (point.i<=1 || maze[point.i-1][point.j]==WALL || map[point.i-1][point.j]==DEADEND)
		x++;
	if 	(point.i>=(m-2) || maze[point.i+1][point.j]==WALL || map[point.i+1][point.j]==DEADEND)
		x++;	
	if (point.j<=1 || maze[point.i][point.j-1]==WALL || map[point.i][point.j-1]==DEADEND)
		x++;
	if (point.j>=(n-2) || maze[point.i][point.j+1]==WALL || map[point.i][point.j+1]==DEADEND)
		x++;
	return x>=3;
}

function randomDirection(point : Address) : number {
	let select = 0;
	let directions = 0;
	if (point.i > 1 && map[point.i-2][point.j] == WALL) { select++; directions += NORTH; }
	if (point.j > 1 && map[point.i][point.j-2] == WALL) { select++; directions += WEST; }
	if (point.i < m-2 && map[point.i+2][point.j] == WALL) { select++; directions += SOUTH; }
	if (point.j < n-2 && map[point.i][point.j+2] == WALL) { select++; directions += EAST; }
	if (select > NONE) {
		let ran = Math.floor(Math.random() * select);
		select = EAST;
		for (let ro = 0; ro < ran; ro++) {
			while ((select & directions) == 0 && select > NONE)
				select >>= 1;
			select >>= 1;
		}
		while ((select & directions) == 0 && select > NONE)
			select >>= 1;
	}
	return select;	
}

function selectDirection(point : Address) : number {
	let select = 0;
	let directions = 0;
	if (point.i > 1 && isNextAddress(map[point.i][point.j], map[point.i-1][point.j], maze[point.i-1][point.j]))
		directions += NORTH;
	if (point.j > 1 && isNextAddress(map[point.i][point.j], map[point.i][point.j-1], maze[point.i][point.j-1]))
		directions += WEST;
	if (point.i < m-2 && isNextAddress(map[point.i][point.j], map[point.i+1][point.j], maze[point.i+1][point.j]))
		directions += SOUTH;
	if (point.j < n-2 && isNextAddress(map[point.i][point.j], map[point.i][point.j+1], maze[point.i][point.j+1]))
		directions += EAST;	
	if (directions > NONE) {
		select = EAST;
		while ((select & directions) == 0 && select > NONE)
			select >>= 1;
	}
	return select;	
}

function paintPath(worker : Address) {
	let x = 0;
	let y = 0;
	for (let i = 1; i < m-1; i++) {
		y = i * h;
		for (let j = 1; j < n-1; j++) {
			if (map[i][j] != null && map[i][j] != WALL) {
				x = j * w;
				
				if (map[i][j] == DEADEND) 
					cx.fillStyle = "navy";
				else if (map[i][j] <= shortest) 
					cx.fillStyle = colors[Math.round(map[i][j] / shortest * (colors.length-1))];
				else 
				   cx.fillStyle = "#333333";
				cx.fillRect(x, y, w-1, h-1);
			}
		}
	}
	cx.fillStyle = "yellow";
	for (let i=0; i<path.length; i++) 
		if (path[i]!=undefined) 
			cx.fillRect(path[i].j * w, path[i].i * h, w-1, h-1);
		
	cx.fillStyle = "cyan";
	for (let i=0; i<points; i++) 
			cx.fillRect(portal[i].j * w, portal[i].i * h, w-1, h-1);

	if (time % 2 == 0) 
		cx.fillStyle = "red";
	else
		cx.fillStyle = "lime";
	cx.fillRect((start.j-0.5) * w, (start.i-0.5) * h, 2*w-1, 2*h-1);
	if (found != undefined) {
		cx.fillStyle = "red";
		cx.fillRect((found.j-0.5) * w, (found.i-0.5) * h, 2*w-1, 2*h-1);
	}
	for (let i=0; i<teams.length; i++) {
		if (teams[i].active)
			cx.fillStyle = "lime";
		else
			cx.fillStyle = "brown";
		cx.fillRect((teams[i].locate.j) * w, (teams[i].locate.i) * h, w-1, h-1);
	}		
	if (worker!=undefined) {
		cx.fillStyle = "orange";
		cx.fillRect(worker.j * w, worker.i * h, w-1, h-1);
	}
}

function paintMaze() {
	let x = 0;
	let y = 0;
	cx.clearRect(0, 0, WIDTH, HEIGHT);
	cx.fillStyle = "white";
	for (let i=1; i<m-1; i++)
		for (let j=1; j<n-1; j++) 
			if (maze[i][j] != WALL) {
				x = j * w;
				y = i * h;
				cx.fillRect(x, y, w-1, h-1);
			}
			
	cx.fillStyle = "lime";
	cx.fillRect((start.j-0.5) * w, (start.i-0.5) * h, 2*w-1, 2*h-1);
	if (finish.i && finish.j) {
		cx.fillStyle = "red";
		cx.fillRect((finish.j-0.5) * w, (finish.i-0.5) * h, 2*w-1, 2*h-1);
	}
}

function rgb(red:number, green:number, blue:number) : string {
	return (red & 0xF0 ? '#' : '#0') + (red == 0 ? '0' : '') + (red << 16 | green << 8 | blue).toString(16);
}
