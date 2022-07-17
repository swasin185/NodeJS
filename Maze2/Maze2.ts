class Maze2 {
	public static GOLDEN: number = 1.618034;
	public static NONE: number = 0;
	public static NORTH: number = 1;
	public static WEST: number = 2;
	public static SOUTH: number = 4;
	public static EAST: number = 8;

	public static END = -2;
	public static WALL = -1;
	public static WAY = 0;

	private static RED = 0;
	private static GREEN = 1;
	private static BLUE = 2;
	private static ALPHA = 3;

	private size: number;
	private cvs: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private imgData: ImageData;
	private map: number[][];
	private portals: Coordinate[];
	private width: number;
	private height: number;
	private dx: number;
	private dy: number;
	private waiting : boolean = false;

	public _dx4: number;
	public _width4: number;
	public _width4_dx4: number;
	public _size_2: number;

	private bgColor: number[] = [0, 0, 0];
	private wayColor: number[] = [0xFF, 0xFF, 0xFF];
	private endColor: number[] = [0x80, 0x1F, 0x1F];
	private startColor: number[] = [0, 0xFF, 0];
	private finishColor: number[] = [0xFF, 0, 0];
	private runnerColor: number[] = [0xFF, 0xF0, 0x0F];
	private pathColor: number[] = [0xAF, 0xEF, 0x0F];
	private portalColor: number[] = [0, 0, 0xFF];
	private dot: number = 0x0F;
	private colors: number[][] = new Array(100);

	private startArea: Coordinate;
	private finishArea: Coordinate;
	private found: boolean;

	private running = false;
	private maxWalk: number = 0;
	private teams: Runner[] = [];
	private path: Coordinate[] = [];

	public getMaxWalk(): number {
		return this.maxWalk;
	}

	constructor(canvasId: string = "canvas", size: number = 500) {
		this.colors[0] = this.wayColor;
		for (let i = 1; i < this.colors.length; i++)
			this.colors[i] = [Math.round(i * 2.5), 205 - (i * 2), 200];
		this.cvs = document.getElementById(canvasId) as HTMLCanvasElement;
		this.ctx = this.cvs.getContext("2d") as CanvasRenderingContext2D;
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

	public init(size: number): void {
		if (!this.running) {
			this.running = true;
			if (size % 2 == 0)
				size++;
			this.size = size;
			this.map = new Array(size);
			for (let i = 0; i < size; i++) {
				this.map[i] = new Array(size);
				this.map[i].fill(Maze2.WALL);
			}
			const normal = 500;
			this.dx = Math.ceil(normal / size);
			this.dy = Math.ceil(normal / size);
			this.width = size * this.dx;
			this.height = size * this.dy;
			this.cvs.width = this.width;
			this.cvs.height = this.height;
			this.imgData = this.ctx.createImageData(this.width, this.height);
			let imgArr = this.imgData.data;
			this._dx4 = this.dx * 4;
			this._width4 = this.width * 4;
			this._width4_dx4 = this._width4 - this._dx4;
			this._size_2 = this.size - 2;
			imgArr.fill(0x0);
			let remainder = 0;
			for (let i = 0; i < this.imgData.data.length; i++) {
				remainder = i % 4;
				if (remainder == Maze2.ALPHA)
					imgArr[i] = 0xFF;
				else
					imgArr[i] = this.bgColor[remainder];
			}
			if (this.dx > 2)
				for (let y = this.dy; y < this.height; y += this.dy)
					for (let x = this.dx; x < this.width; x += this.dx)
						imgArr[(y * this.width + x) * 4 + 3] = this.dot;
			this.maxWalk = 0;
			this.startArea = new Coordinate(Math.floor(this.size / 4) * 2 + 1, Math.floor(this.size / 4) * 2 + 1);
			this.paintMaze();
			this.running = false;
		}
	}

	private paintArea(imgArr: Uint8ClampedArray, i: number, j: number, color: number[]) {
		let coor = (i * this.dy * this._width4 + (j * this._dx4));
		for (let by = 0; by < this.dy; by++) {
			for (let bx = 0; bx < this.dx; bx++) {
				imgArr[coor++] = color[Maze2.RED];
				imgArr[coor++] = color[Maze2.GREEN];
				imgArr[coor++] = color[Maze2.BLUE];
				coor++;
			}
			coor += this._width4_dx4;
		}
	}

	private hidePath(): void {
		let imgArr = this.imgData.data;
		for (let i = 1; i <= this._size_2; i++)
			for (let j = 1; j <= this._size_2; j++)
				if (this.map[i][j] == Maze2.WAY)
					this.paintArea(imgArr, i, j, this.bgColor);
		this.ctx.putImageData(this.imgData, 0, 0);
	}

	private paintMaze(): void {
		let imgArr = this.imgData.data;
		for (let i = 1; i <= this._size_2; i++)
			for (let j = 1; j <= this._size_2; j++)
				if (this.map[i][j] == Maze2.WAY)
					this.paintArea(imgArr, i, j, this.wayColor);
				else if (this.map[i][j] == Maze2.END)
					this.paintArea(imgArr, i, j, this.endColor);
				else if (this.map[i][j] == Maze2.WALL)
					this.paintArea(imgArr, i, j, this.bgColor);

		if (this.startArea != undefined)
			this.paintArea(imgArr, this.startArea.i, this.startArea.j, this.startColor);

		this.ctx.putImageData(this.imgData, 0, 0);
	}

	private paintPath(): void {
		let imgArr = this.imgData.data;
		for (let i = 1; i <= this._size_2; i++)
			for (let j = 1; j <= this._size_2; j++) {
				if (this.map[i][j] > Maze2.WAY) {
					let x = Math.ceil(this.map[i][j] / this.maxWalk * 99);
					this.paintArea(imgArr, i, j, this.colors[x]);
				} else if (this.map[i][j] == Maze2.END)
					this.paintArea(imgArr, i, j, this.endColor);
				// else if (this.map[i][j] == Maze2.WALL)
				// 	this.paintArea(imgArr, i, j, this.bgColor);
			}

		this.teams.forEach((runner => {
			if (runner.isActive())
				this.paintArea(imgArr, runner.getLocation().i, runner.getLocation().j, this.runnerColor);
			else
				this.paintArea(imgArr, runner.getLocation().i, runner.getLocation().j, this.endColor);
		}));

		this.portals.forEach(area => {
			this.paintArea(imgArr, area.i, area.j, this.portalColor);
		});

		this.path.forEach(area => {
			this.paintArea(imgArr, area.i, area.j, this.pathColor);
		});

		if (this.startArea != undefined)
			this.paintArea(imgArr, this.startArea.i, this.startArea.j, this.startColor);

		if (this.finishArea != undefined && this.found)
			this.paintArea(imgArr, this.finishArea.i, this.finishArea.j, this.finishColor);

		this.ctx.putImageData(this.imgData, 0, 0);
	}

	public getPathLength(): number {
		return this.path.length;
	}

	public getFinishDistanct(area: Coordinate): number {
		return (Math.abs(this.finishArea.i - area.i) + Math.abs(this.finishArea.j - area.j));
	}

	public setMap(coor: Coordinate, value: number): void {
		if (value > this.maxWalk)
			this.maxWalk = value;
		this.map[coor.i][coor.j] = value;
	}

	public getMap(): number[][] {
		return this.map;
	}

	public async generate(connect: number = 0.5, delay: number = 0) {
		connect = Number(connect);
		delay = Number(delay);
		this.finishArea = undefined;
		this.reset();
		if (!this.running) {
			this.running = true;
			console.time("generate");
			this.teams = [new Runner(this, 1, 1), new Runner(this, 1, this._size_2),
			new Runner(this, this._size_2, 1), new Runner(this, this._size_2, this._size_2)];
			while (this.running && this.teams.some((runner) => { return runner.isActive() })) {
				this.teams.forEach(runner => {
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
				if (delay > 10) {
					this.paintPath();
					await new Promise((r) => { setTimeout(r, delay) });
				}
			}

			this.finishArea = new Coordinate(Math.floor(Math.random() * this._size_2 / 2) * 2 + 1,
				Math.floor(Math.random() * this._size_2 / 2) * 2 + 1);

			connect -= 0.5;
			for (let i = 1; i <= this._size_2; i++)
				for (let j = 1; j <= this._size_2; j++)
					if (!(i % 2 == 1 && j % 2 == 1)
						&& (this.map[i][j] == Maze2.WALL) &&
						(Math.random() < connect))
						this.map[i][j] = Maze2.WAY;
					else
						if (this.map[i][j] != Maze2.WALL)
							this.map[i][j] = Maze2.WAY;

			this.paintMaze();
			console.timeEnd("generate");
			this.running = false;
		}
	}

	public clickXY(event: MouseEvent): void {
		if (!this.running) {
			this.running = true;
			let i = Math.floor(event.offsetY / this.dx);
			let j = Math.floor(event.offsetX / this.dy);
			if (this.map[i][j] != Maze2.WALL) {
				window.alert("set finish to i:" + i + " j:" + j);
				this.finishArea.set(i, j);
				this.paintMaze();
				this.paintPath();
			}
			this.running = false;
		}
	}

	public reset() {
		Runner.resetId();
		this.running = false;
		this.maxWalk = 0;
		this.teams = [];
		this.path = [];
		this.portals = [];
		this.found = false;
		for (let i = 1; i <= this._size_2; i++)
			for (let j = 1; j <= this._size_2; j++)
				if (this.map[i][j] != Maze2.WALL)
					this.map[i][j] = Maze2.WAY;
		//this.paintMaze();
		//this.paintPath();
		this.hidePath();
	}

	public isFounded(): boolean {
		return this.found;
	}

	private createPath(point: Coordinate): Coordinate[] {
		let path: Coordinate[] = new Array(this.map[point.i][point.j] - 1);
		let i = point.i;
		let j = point.j;
		let x = path.length - 1;
		let w = 0;
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
	}

	private isUpdatePath(point: Coordinate): boolean {
		let found = false;
		let idx = -1;
		while (!found && idx < this.path.length) {
			idx++;
			found = point.equals(this.path[idx]);
		}
		if (found) {
			if (this.map[point.i][point.j] < idx) {
				// console.log('update path', this.path.length, idx);
				let path = this.createPath(point);
				this.path = path.concat(this.path.slice(idx, this.path.length));
				return true;
			}
		} 
		return false;
	}

	private addPortal(area: Coordinate): void {
		let i = 0;
		while (i < this.portals.length && !this.portals[i].equals(area)) i++;
		if (i == this.portals.length)
			this.portals.push(new Coordinate(area.i, area.j));
	}

	public removePortal(area: Coordinate): void {
		let i = 0;
		while (i < this.portals.length && !this.portals[i].equals(area)) i++;
		if (i < this.portals.length)
			this.portals.splice(i, 1);
	}

	private addNewRunner(walk: number): void {
		let i = 0;
		let portal = this.portals[i];
		while (i < this.portals.length && (walk < this.map[portal.i][portal.j])) {
			this.teams.push(new Runner(this, portal.i, portal.j));
			portal = this.portals[++i];
		}
		if (!this.waiting)
			this.portals.splice(0, i);
	}

	public async solveMaze(delay: number = 0, waiting: boolean = true) {
		this.waiting = waiting;
		this.reset();
		if (!this.running) {
			this.running = true;
			this.teams = [new Runner(this, this.startArea.i, this.startArea.j)];
			console.time("First Found");
			console.time("Optimal Path");
			let activeCount = 1;
			while (this.running && activeCount > 0) {
				activeCount = 0;
				this.teams.forEach(runner => {
					if (runner.isActive()) {
						activeCount++;
						if (runner.getLocation().equals(this.finishArea)) {
							runner.setDirection(Maze2.NONE);
							this.found = true;
						} else
							runner.findNewPath(); // หาเส้นทางใหม่
						if (runner.getDirection() > Maze2.NONE) {
							if (runner.beyondBoundary()) {
								this.addPortal(runner.getLocation());
								runner.setDirection(Maze2.NONE);
							} else if (this.found && runner.beyondShortestPath()) {
								this.removePortal(runner.getLocation());
								runner.setDirection(Maze2.NONE);
							} 
							if (this.found) 
								this.isUpdatePath(runner.getLocation());
						} else
							this.removePortal(runner.getLocation());
						if (runner.getDirection() == Maze2.NONE) // ถ้าไม่มีเส้นทางใหม่ ให้กลับบ้าน
							runner.goBackUntilNewPath();
						if (runner.getDirection() == Maze2.NONE) // ถ้ากลับจนสุดแล้ว ให้เปลี่ยนไปเริ่มที่จุดพักต่อไป
							this.addNewRunner(this.map[runner.getLocation().i][runner.getLocation().j]);
						runner.move();
					}
				});
				if (this.found && this.getPathLength() == 0) {
					console.timeEnd("First Found");
					console.log("Runner", Runner.getMaxId(), "Avg.Move", Math.round(Runner.getTotalDistance() / Runner.getMaxId()));
					let path = this.createPath(this.finishArea);
					this.reset();
					this.found = true;
					this.path = path
					this.teams = [new Runner(this, this.startArea.i, this.startArea.j)];
					activeCount = 1;
					this.running = true;
				} else if (activeCount < this.teams.length / 2) {
					//console.log("teams=", activeCount, this.teams.length);
					this.teams = this.teams.filter(runner => { return runner.isActive() });
				}
				if (delay > 0) {
					this.paintPath();
					await new Promise((r) => { setTimeout(r, delay) });
				}
			}
			console.timeEnd("Optimal Path");
			console.log("Runner", Runner.getMaxId(), "Avg.Move", Math.round(Runner.getTotalDistance() / Runner.getMaxId()));
			this.paintMaze();
			this.paintPath();
			this.running = false;
		}
	}
}

class Coordinate {
	public i: number;
	public j: number;
	constructor(i: number, j: number) {
		this.set(i, j);
	}
	public set(i: number, j: number): void {
		this.i = i;
		this.j = j;
	}
	public setCoordinate(area: Coordinate): void {
		this.i = area.i;
		this.j = area.j;
	}
	public equals(area: Coordinate): boolean {
		return area != undefined && this.i == area.i && this.j == area.j;
	}
	public toString(): string {
		return this.i + ":" + this.j;
	}
}

class Runner {
	private static autoid = 0;
	private static totalDistance = 0;
	private id: number = ++Runner.autoid;
	private maze: Maze2;
	private locate: Coordinate;
	private walk: number = 1;
	private direction: number = Maze2.NONE;
	private active: boolean = true;
	private route: Coordinate[];
	private boundary = 20;
	private backward = false;

	public static resetId(): void {
		Runner.autoid = 0;
		Runner.totalDistance = 0;
	}

	public static getMaxId(): number {
		return Runner.autoid;
	}

	public static getTotalDistance(): number {
		return Runner.totalDistance;
	}


	public toString(): string {
		return this.id + " : " + this.walk + " | " + this.direction + " = " + this.boundary;
	}

	constructor(maze: Maze2, i: number, j: number) {
		this.maze = maze;
		this.locate = new Coordinate(i, j);
		this.walk = this.maze.getMap()[this.locate.i][this.locate.j];
		if (this.walk == undefined || this.walk <= Maze2.WAY) {
			this.walk = 1;
			this.maze.setMap(this.locate, this.walk);
		} else
			this.boundary = this.walk * Maze2.GOLDEN;

		this.route = [];
		this.active = true;
	}

	public isBackward(): boolean {
		return this.backward;
	}

	public setBackward(value: boolean): void {
		this.backward = value;
	}

	public isActive(): boolean {
		return this.active;
	}

	public setActive(value: boolean): void {
		this.active = value;
	}

	public getDirection(): number {
		return this.direction;
	}

	public setDirection(direct: number): void {
		this.direction = direct;
	}

	public getLocation(): Coordinate {
		return this.locate;
	}

	public setLocation(locate: Coordinate): void {
		this.locate = locate;
	}

	private setBoundary(): void {
		if (this.maze.getPathLength() > 0) {
			this.boundary = this.maze.getPathLength() - this.maze.getFinishDistanct(this.getLocation());
		}
	}

	public move(): void {
		let map = this.maze.getMap();
		if (this.direction == Maze2.NONE) {
			this.setActive(false);
		} else {
			let prior_i = this.locate.i;
			let prior_j = this.locate.j;
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
			} else {
				this.route.push(new Coordinate(prior_i, prior_j));
				this.walk++;
				Runner.totalDistance++;
				this.maze.setMap(this.locate, this.walk);
			}
		}
	}

	private atJunction(locate: Coordinate): boolean {
		return (locate.i % 2 == 1 && locate.j % 2 == 1);
	}

	public randomWallDirection(): void {
		let map = this.maze.getMap();
		if (this.atJunction(this.getLocation())) {
			let choice = 0;
			let direct = Maze2.NONE;
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
			} else
				this.direction = Maze2.NONE;
		} else {
			if (this.direction == Maze2.NORTH && map[this.locate.i - 1][this.locate.j] != Maze2.WALL)
				this.direction = Maze2.NONE;
			else if (this.direction == Maze2.WEST && map[this.locate.i][this.locate.j - 1] != Maze2.WALL)
				this.direction = Maze2.NONE;
			else if (this.direction == Maze2.SOUTH && map[this.locate.i + 1][this.locate.j] != Maze2.WALL)
				this.direction = Maze2.NONE;
			else if (this.direction == Maze2.EAST && map[this.locate.i][this.locate.j + 1] != Maze2.WALL)
				this.direction = Maze2.NONE;
		}
	}

	public routeBack(): void {
		this.direction = Maze2.NONE;
		if (this.route.length > 0) {
			let prior = this.route.pop();
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
	}

	public isNextLocation(i: number, j: number): boolean {
		let map = this.maze.getMap();
		return (map[i][j] == Maze2.WAY || (this.maze.isFounded() && map[i][j] - map[this.locate.i][this.locate.j] > 1));
	}

	public breakTheWall(): void {
		let map = this.maze.getMap();
		if (this.locate.i > 1 && this.direction == Maze2.SOUTH && map[this.locate.i - 1][this.locate.j] == Maze2.WALL)
			map[this.locate.i - 1][this.locate.j] = Maze2.END;
		else if (this.locate.j > 1 && this.direction == Maze2.EAST && map[this.locate.i][this.locate.j - 1] == Maze2.WALL)
			map[this.locate.i][this.locate.j - 1] = Maze2.END;
		else if (this.locate.i < this.maze._size_2 && this.direction == Maze2.NORTH && map[this.locate.i + 1][this.locate.j] == Maze2.WALL)
			map[this.locate.i + 1][this.locate.j] = Maze2.END;
		else if (this.locate.j < this.maze._size_2 && this.direction == Maze2.WEST && map[this.locate.i][this.locate.j + 1] == Maze2.WALL)
			map[this.locate.i][this.locate.j + 1] = Maze2.END;
	}

	public findNewPath(): void {
		this.direction = Maze2.NONE;
		let direct = Maze2.NONE;
		let idx = this.id % 4;
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
		} else 
			this.direction == Maze2.NONE;
	}

	public beyondBoundary(): boolean {
		return this.walk >= this.boundary;
	}

	public beyondShortestPath(): boolean {
		return this.walk + this.maze.getFinishDistanct(this.locate) >= this.maze.getPathLength();
	}

	public goBackUntilNewPath(): void {
		let canGoBack: boolean;
		do {
			this.routeBack();
			canGoBack = this.direction > Maze2.NONE;
			if (canGoBack) {
				this.move();
				this.findNewPath();
			}
			this.maze.removePortal(this.locate);
		} while (canGoBack && this.direction == Maze2.NONE);  // ย้อนกลับไปถ้ายังไม่เจอทางใหม่ 
	}

	public goBackUntilNewWall(): void {
		let canGoBack: boolean;
		do {
			this.routeBack();
			canGoBack = this.direction > Maze2.NONE;
			if (canGoBack) {
				this.move();
				this.randomWallDirection();
			}
		} while (canGoBack && this.direction == Maze2.NONE);  // ย้อนกลับไปถ้ายังไม่เจอทางใหม่ 
	}
}