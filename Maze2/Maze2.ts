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
	private portalMap: number[][];
	private width: number;
	private height: number;
	private dx: number;
	private dy: number;

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
	private pathColor: number[] = [0xFF, 0xFF, 0];
	private portalColor: number[] = [0, 0, 0xFF];
	private dot: number = 0x0F;
	private colors: number[][] = new Array(100);

	private startArea: Coordinate;
	private finishArea: Coordinate;

	private running = false;
	private maxWalk: number = 0;
	private teams: Runner[] = [];
	private portals: Coordinate[] = [];
	private path: Coordinate[] = [];

	public getMaxWalk(): number {
		return this.maxWalk;
	}

	constructor(canvasId: string = "canvas", size: number = 40) {
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
			const normal = 1000;
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
				if (this.portalMap[i][j] > 0)
					this.paintArea(imgArr, i, j, this.portalColor);
				else if (this.map[i][j] > Maze2.WAY) {
					let x = Math.ceil(this.map[i][j] / this.maxWalk * 99);
					this.paintArea(imgArr, i, j, this.colors[x]);
				} else if (this.map[i][j] == Maze2.END)
					this.paintArea(imgArr, i, j, this.endColor);
			}

		this.teams.forEach((runner => {
			if (runner.isActive())
				this.paintArea(imgArr, runner.getLocation().i, runner.getLocation().j, this.runnerColor);
			else
				this.paintArea(imgArr, runner.getLocation().i, runner.getLocation().j, this.endColor);
		}));

		this.path.forEach(area => {
			this.paintArea(imgArr, area.i, area.j, this.pathColor);
		});

		if (this.startArea != undefined)
			this.paintArea(imgArr, this.startArea.i, this.startArea.j, this.startColor);

		if (this.finishArea != undefined)
			this.paintArea(imgArr, this.finishArea.i, this.finishArea.j, this.finishColor);

		this.ctx.putImageData(this.imgData, 0, 0);
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
				for (let runner of this.teams)
					if (runner.isActive()) {
						runner.randomWallDirection();
						if (runner.getDirection() == Maze2.NONE) {
							runner.goBack();
							if (Math.random() < connect)
								runner.breakTheWall();
							runner.move();
							runner.goBackUntilNewWall();
						}
						runner.move();
					}
				if (delay > 0) {
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
				//window.alert("i:" + i + " j:" + j + " = " + this.map[i][j]);
				this.finishArea.set(i, j);
				this.paintMaze();
				this.paintPath();
			}
			this.running = false;
		}
	}

	public reset() {
		this.running = false;
		this.maxWalk = 0;
		this.teams = [];
		this.portals = [];
		this.portalMap = new Array(this.size);
		for (let i = 0; i < this.size; i++) {
			this.portalMap[i] = new Array(this.size);
			this.portalMap[i].fill(0);
		}
		this.path = [];
		for (let i = 1; i <= this._size_2; i++)
			for (let j = 1; j <= this._size_2; j++)
				if (this.map[i][j] != Maze2.WALL)
					this.map[i][j] = Maze2.WAY;
		this.paintMaze();
		this.paintPath();
	}

	private createPath(point: Coordinate): Coordinate[] {
		let path: Coordinate[] = new Array(this.map[point.i][point.j] - 1);
		let i = point.i;
		let j = point.j;
		let x = 0;
		do {
			if (i > 1 && this.map[i][j] == this.map[i - 1][j] + 1)
				i--;
			else if (j > 1 && this.map[i][j] == this.map[i][j - 1] + 1)
				j--;
			else if (i < this._size_2 && this.map[i][j] == this.map[i + 1][j] + 1)
				i++;
			else if (j < this._size_2 && this.map[i][j] == this.map[i][j + 1] + 1)
				j++;
			path[x++] = new Coordinate(i, j);
		} while (i != this.startArea.i || j != this.startArea.j);
		return path;
	}

	private addPortal(area: Coordinate): void {
		if (this.path.length == 0) {
			this.portalMap[area.i][area.j] = 1;
			/*
			let i = 0;
			while (i < this.portals.length && !this.portals[i].equals(area)) i++;
			if (i == this.portals.length) {
				//				if (i > 0 && this.map[area.i][area.j] < this.map[this.portals[0].i][this.portals[0].j]) {
				//					let points = [];
				//					for (let portal of this.portals)
				//						points.push(this.map[portal.i][portal.j]);
				//					console.log(this.map[area.i][area.j], points);
				//					throw new Error("Add Portal");
				//				}
				this.portals.push(new Coordinate(area.i, area.j));
			}
			*/
		}
	}

	public removePortal(area: Coordinate): void {
		this.portalMap[area.i][area.j] = 0;
		/*
		let i = 0;
		while (i < this.portals.length && !this.portals[i].equals(area)) i++;
		if (i < this.portals.length)
			this.portals.splice(i, 1);
			*/
	}

	private addNewRunner(walk: number): void {
		for (let i = 1; i <= this._size_2; i++)
			for (let j = 1; j <= this._size_2; j++)
				if (this.portalMap[i][j] > 0 && walk < this.map[i][j]) {
					let newRunner = new Runner(this, i, j);
					if (this.path.length > 0)
						newRunner.setBoundary(this.path.length);
					this.teams.push(newRunner);
				}
		/*
		let i = 0;
		while (i < this.portals.length && walk < this.map[this.portals[i].i][this.portals[i].j]) {
			let portal = this.portals[i];
			let newRunner = new Runner(this, portal.i, portal.j);
			if (this.path.length > 0)
				newRunner.setBoundary(this.path.length);
			this.teams.push(newRunner);
			i++;
		}*/
	}

	public async solveMaze(delay: number = 0) {
		this.reset();
		if (!this.running) {
			this.running = true;
			this.teams = [new Runner(this, this.startArea.i, this.startArea.j)];
			console.time("Solve Maze");
			while (this.running && this.teams.some((runner) => { return runner.isActive() })) {
				for (let runner of this.teams)
					if (runner.isActive()) {
						if (runner.getLocation().equals(this.finishArea)) { // ถ้าพบเป้าหมาย ให้สร้างเส้นทางกลับไปจุดเริ่มต้น
							runner.setDirection(Maze2.NONE);
							this.path = this.createPath(this.finishArea);
							this.teams.forEach(r => {
								r.setBoundary(this.path.length);
							});
						} else
							runner.findNewPath(); // หาเส้นทางใหม่

						if (runner.getDirection() > Maze2.NONE) {
							if (runner.exceedBoundary()) {
								if (this.path.length == 0)
									this.addPortal(runner.getLocation());
								else
									this.removePortal(runner.getLocation());
								runner.setDirection(Maze2.NONE);
							}
						} else {
							this.removePortal(runner.getLocation());
						}

						if (runner.getDirection() == Maze2.NONE) { // ถ้าไม่มีเส้นทางใหม่ ให้กลับบ้าน
							// runner.goBackUntilNewPath();
							runner.goBack();
						}

						if (runner.getDirection() == Maze2.NONE) { // ถ้ากลับจนสุดแล้ว ให้เปลี่ยนไปเริ่มที่จุดพักต่อไป
							this.addNewRunner(this.map[runner.getLocation().i][runner.getLocation().j]);
						}

						runner.move();
					}
				this.teams = this.teams.filter(runner => { return runner.isActive() });
				if (delay > 0) {
					this.paintPath();
					await new Promise((r) => { setTimeout(r, delay) });
				}
			}
			console.timeEnd("Solve Maze");
			this.paintMaze();
			this.paintPath();
			this.running = false;
			window.alert("Finish Solve Maze " + this.path.length);
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
	private id: number = ++Runner.autoid;
	private maze: Maze2;
	private locate: Coordinate;
	private walk: number = 1;
	private direction: number = Maze2.NONE;
	private active: boolean = true;
	private route: Coordinate[];
	private boundary = 20;
	private backward = false;

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
		} else {
			this.boundary = this.walk * Maze2.GOLDEN;
		}

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

	public setBoundary(boundary: number): void {
		this.boundary = boundary;
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

	public goBack(): void {
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
		return (map[i][j] == Maze2.WAY || map[i][j] - map[this.locate.i][this.locate.j] > 1);
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
		let select = Maze2.NONE;
		let directions = Maze2.NONE;
		if (this.locate.i > 1 && this.isNextLocation(this.locate.i - 1, this.locate.j))
			directions += Maze2.NORTH;
		if (this.locate.j > 1 && this.isNextLocation(this.locate.i, this.locate.j - 1))
			directions += Maze2.WEST;
		if (this.locate.i < this.maze._size_2 && this.isNextLocation(this.locate.i + 1, this.locate.j))
			directions += Maze2.SOUTH;
		if (this.locate.j < this.maze._size_2 && this.isNextLocation(this.locate.i, this.locate.j + 1))
			directions += Maze2.EAST;
		if (directions > Maze2.NONE) {
			this.backward = false;
			select = Maze2.EAST;
			while ((select & directions) == 0 && select > Maze2.NONE)
				select >>= 1;
		}
		this.direction = select;
	}

	public exceedBoundary(): boolean {
		return this.walk >= this.boundary;
	}

	public goBackUntilNewPath(): void {
		let canGoBack: boolean;
		do {
			this.goBack();
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
			this.goBack();
			canGoBack = this.direction > Maze2.NONE;
			if (canGoBack) {
				this.move();
				this.randomWallDirection();
			}
		} while (canGoBack && this.direction == Maze2.NONE);  // ย้อนกลับไปถ้ายังไม่เจอทางใหม่ 
	}
}