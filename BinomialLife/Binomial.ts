class Binomial {
	private static RED = 0;
	private static GREEN = 1;
	private static BLUE = 2;

	private cvs: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private imgData: ImageData;
	private width: number;
	private height: number;
	private dx: number;
	private dy: number;

	private bgColor: number[] = [0x0, 0x0, 0x0];
	private white: number[] = [0xFF, 0xFF, 0xFF];
	private colors: number[][] = new Array(1);

	private age: number = 0;
	private population: number = 0;
	private bArray: number[][] = [[]];

	public _dx4: number;
	public _width4: number;
	public _width4_dx4: number;
	public size: number;

	private running = false;

	constructor(canvasId: string = "canvas") {
		this.colors = new Array(100);
		for (let i = 0; i < this.colors.length; i++)
			this.colors[i] = [Math.round(i * 2.5), 205 - (i * 2), 100];
		this.cvs = document.getElementById(canvasId) as HTMLCanvasElement;
		this.ctx = this.cvs.getContext("2d") as CanvasRenderingContext2D;
		this.ctx.fillStyle = this.cvs.style.backgroundColor;
		this.ctx.strokeStyle = this.cvs.style.color;
	}

	public init(age: number = 100, population: number = 100): void {
		// console.log("age", age, "pop", population);
		if (!this.running) {
			this.running = true;
			this.age = age;
			this.population = population;
			this.bArray = [[0]];
			const normal = 1000;
			this.dx = Math.ceil(normal / age);
			this.dy = Math.ceil(normal / age);
			this.size = age;
			this.width = this.size * this.dx;
			this.height = this.size * this.dy;
			this.cvs.width = this.width;
			this.cvs.height = this.height;
			this._dx4 = this.dx * 4;
			this._width4 = this.width * 4;
			this._width4_dx4 = this._width4 - this._dx4;
			this.imgData = this.ctx.createImageData(this.width, this.height);
			this.imgData.data.fill(0x0);
			this.bArray = new Array(age);
			for (let i = 0; i < age; i++)
				this.bArray[i] = [];
			this.running = false;
		}
	}

	private paintArea(imgArr: Uint8ClampedArray, i: number, j: number, color: number[]) {
		let coor = (i * this.dy * this._width4 + (j * this._dx4));
		for (let by = 0; by < this.dy; by++) {
			for (let bx = 0; bx < this.dx; bx++) {
				imgArr[coor++] = color[Binomial.RED];
				imgArr[coor++] = color[Binomial.GREEN];
				imgArr[coor++] = color[Binomial.BLUE];
				imgArr[coor++] = 0xFF;
			}
			coor += this._width4_dx4;
		}
	}

	private paint(): void {
		let imgArr = this.imgData.data;
		let x = 0
		let y = 0
		for (let i = 0; i < this.bArray.length; i++)
			for (let j = 0; j < this.bArray[i].length; j++) {
				if (this.bArray[i] != undefined && this.bArray[i][j] != undefined) {
					if (this.bArray[i][j] > 0) {
						//this.paintArea(imgArr, i, j, this.colors[this.bArray[i][j] % this.colors.length]);
						let x = Math.floor((i+j) / 2)
						if (this.bArray[x] != undefined && this.bArray[x][x] != undefined) {
							if (this.bArray[x][x] == 0)
								y = 0
							else {
								y = Math.round((this.bArray[i][j] / this.bArray[x][x]) * this.colors.length)
								if (y >= this.colors.length)
									y = this.colors.length - 1
							}
						} else
							y  = 0
						this.paintArea(imgArr, i, j, this.colors[y]);
					}
				} else {
					this.paintArea(imgArr, i, j, this.bgColor);
				}
			}
		this.ctx.putImageData(this.imgData, 0, 0);
	}

	public async run(age: number = 100, population: number = 100) {
		console.log("start...")
		console.time("run")
		this.init(age, population);
		this.paint();
		for (let p = 0; p < population; p++) {
			let i = 0
			let j = 0
			for (let x = 0; x < this.age; x++) {
				if (this.bArray[i] && this.bArray[i][j])
					this.bArray[i][j]++
				else
					this.bArray[i][j] = 1
				if (Math.random() < 0.5)
					i++
				else
					j++
			}
			this.paint();
			await new Promise((r) => { setTimeout(r, 1) });
		}
		console.timeEnd("run");
	}
}