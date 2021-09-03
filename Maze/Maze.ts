const cv = document.getElementById("cpxCanvas") as HTMLCanvasElement;
const cx = cv.getContext("2d") as CanvasRenderingContext2D;
const WIDTH = cv.width;
const HEIGHT = cv.height;
const textWidth = document.getElementById("width") as HTMLInputElement;
const textHeight = document.getElementById("height") as HTMLInputElement;
const checkImprove = document.getElementById("improve") as HTMLInputElement;

// ประกาศตัวแปร Global 
// ----------------------------------------------------------------------------
var n: number = Number(textWidth.value);
var m: number = Number(textHeight.value);
var w = WIDTH / n;
var h = HEIGHT / m;
var blocks: number[][] = new Array(m);
var path: number[][] = new Array(m);
var found_i = 0;
var found_j = 0;
var start_i = 1;
var start_j = 1;
var finish_i = m - 2;
var finish_j = n - 2;
var di = start_i;
var dj = start_j;
var pathCount = 0;
var maxStep = 0;
var improve = false;
var colors: string[] = new Array(100);
for (let i=0; i<colors.length; i++)
	colors[i] = rgb(150+i, 255-(i*2), 50+(i*2));

mazeGenerate();

// ฟังก์ชั่น
// ----------------------------------------------------------------------------
async function mazeGenerate() {
	n = Number(textWidth.value);
	m = Number(textHeight.value);
	w = WIDTH / n;
	h = HEIGHT / m;
	blocks = new Array(m);
	path = new Array(m);
	for (let i = 0; i < m; i++) {
		blocks[i] = new Array(n);
		blocks[i].fill(-1);
		path[i] = new Array(n);
		path[i].fill(-1);
	}

	di = start_i;
	dj = start_j;
	finish_i = Math.floor(Math.random() * (m-2) / 2) * 2 + 1;
	finish_j = Math.floor(Math.random() * (n-2) / 2) * 2 + 1;
	if(finish_i < m /2) finish_i = finish_i * 2 - 1;
	if(finish_j < n /2) finish_j = finish_j * 2 - 1;
	console.log("finish=", finish_i, finish_j);
	let choice = 1;
	let d = -1;
	let walk = 1;
	let backward = false;
	while (choice > 0) {
		if (blocks[di][dj] < 0) {
			blocks[di][dj] = walk++;
			backward = false;
		} else
			walk = blocks[di][dj] + 1;
			 
		if (di % 2 == 1 && dj % 2 == 1) {
			choice = 0;
			d = 0;
			if (di > 1 && blocks[di - 2][dj] == -1) { choice++; d += 1; }
			if (dj > 1 && blocks[di][dj - 2] == -1) { choice++; d += 2; }
			if (di < m - 2 && blocks[di + 2][dj] == -1) { choice++; d += 4; }
			if (dj < n - 2 && blocks[di][dj + 2] == -1) { choice++; d += 8; }
			choice = randomDirection(d, choice);
		}
		if (choice == 0 && !(di == start_i && dj == start_j)) {
			choice = goBack();
			if (choice > 0 && !backward) connnectDeadEnd(choice);
			backward = true;			
		}
		move(choice);
	}
	resetMaze();
}

function howFarFromFinish(i:number, j:number) : number {
	if (found_i == undefined || found_j == undefined)
		return -1;
	else
		return Math.abs(found_i - i) + Math.abs(found_j - j);
} 

function resetMaze() : void {
	improve = checkImprove.checked;
	found_i = undefined;
	found_j = undefined;
	di = start_i;
	dj = start_j;
	maxStep = 0;
	for (let i = 0; i < m; i++)
		for (let j = 0; j < n; j++)
			path[i][j] = -1; 
	pathCount = 0;
	for (let i = 0; i < m; i++) 
		for (let j = 0; j < n; j++) 
			if (blocks[i][j] > -1)
				blocks[i][j] = null;	
	paint();
}

function connnectDeadEnd(direction : number) : void {
	if (di > 1 && direction == 4 && blocks[di - 1][dj] == -1 && 
	    blocks[di][dj] - blocks[di - 2][dj] > m)
		blocks[di - 1][dj] = 0;
	else if (dj > 1 && direction == 8 && blocks[di][dj - 1] == -1 && 
         	blocks[di][dj] - blocks[di][dj-2] > m) 
		blocks[di][dj - 1] = 0;
	else if (di < m - 2 && direction == 1 && blocks[di + 1][dj] == -1 && 
	        blocks[di][dj] - blocks[di + 2][dj] > n)
		blocks[di + 1][dj] = 0;
	else if (dj < n - 2 && direction == 2 && blocks[di][dj + 1] == -1 && 
	        blocks[di][dj] - blocks[di][dj + 2] > n)
		blocks[di][dj + 1] = 0;
}

async function depthFirstSearch() {
	resetMaze();
	let choice = 1;
	let walk = 1;
	let d = 0;
	let distance = m * n;
	let time = 0;
	while (choice > 0) {
		time++;
		if (blocks[di][dj] == null || blocks[di][dj] > walk) {
			if (blocks[di][dj] == null) {
				paint();
				await new Promise(r => setTimeout(r, 5));
			}
			if (walk > maxStep) maxStep = walk;
 			blocks[di][dj] = walk++;
			if (di == finish_i && dj == finish_j) {
				found_i = finish_i;
				found_j = finish_j;
				distance = walk - 1;
				maxStep = distance;
				createPath();
				paint();
				await new Promise(r => setTimeout(r, 50));
			}
		} else
			walk = blocks[di][dj] + 1;

		choice = 0;
		if (walk + howFarFromFinish(di, dj) < distance) {
			d = 0;
			if (di > 1 && isNextBlock(blocks[di][dj], blocks[di - 1][dj]))
				{ choice++; d += 1; }
			if (dj > 1 && isNextBlock(blocks[di][dj], blocks[di][dj - 1]))
				{ choice++; d += 2; }
			if (di < m - 2 && isNextBlock(blocks[di][dj], blocks[di + 1][dj]))
				{ choice++; d += 4; }
			if (dj < n - 2 && isNextBlock(blocks[di][dj], blocks[di][dj + 1]))
				{ choice++; d += 8; }
			choice = selectDirection(d, choice);
		} 
		if (choice == 0) choice = goBack();
		move(choice);
	}
	paint();
	console.log("maxStep=" + maxStep, "time="+time);
}

function createPath() : void {
	pathCount++;
	for (let i = 0; i < m; i++) {
		path[i] = new Array(n);
		path[i].fill(-1);
	}
	let odi = di;
	let odj = dj;
	di = finish_i;
	dj = finish_j;
	let c = 0;
	let x = 1;
	while (di != 1 || dj != 1) {
		x++;
		c = goBack();
		path[di][dj] = blocks[di][dj];
		move(c);
	}
	di = odi;
	dj = odj;
	//console.log("path["+pathCount+"] = " + x);
}

function move(direction : number) : void {
	if (direction == 1) di--;
	else if (direction == 2) dj--;
	else if (direction == 4) di++;
	else if (direction == 8) dj++;
}

function goBack() : number {
	let choice = 0;
	if (di > 1 && isPriorBlock(blocks[di][dj], blocks[di - 1][dj])) 
		choice = 1; 
	else if (dj > 1 && isPriorBlock(blocks[di][dj], blocks[di][dj - 1])) 
		choice = 2; 
	else if (di<(m-1) && isPriorBlock(blocks[di][dj], blocks[di + 1][dj])) 
		choice = 4; 
	else if (dj<(n-1) && isPriorBlock(blocks[di][dj], blocks[di][dj + 1])) 
		choice = 8;
	return choice;
}

function isPriorBlock(b1 : number,  b2 : number) : boolean {
	return b1 == b2 + 1;
}

function isNextBlock(b1 : number,  b2 : number) : boolean {
	return b2 == null || b2-b1 > 1;
}

function randomDirection(directions : number, total : number) : number {
	let select = 0;
	if (total > 0) {
		let ran = Math.floor(Math.random() * total);
		select = 1;
		for (let ro = 0; ro < ran; ro++) {
			while ((select & directions) == 0 && select <= 8)
				select <<= 1;
			select <<= 1;
		}
		while ((select & directions) == 0 && select <= 8)
			select <<= 1;
	}
	return select;	
}

function selectDirection(directions : number, total : number) : number {
	let select = 0;
	if (total > 0) {
		select = 1;
		while ((select & directions) == 0 && select <= 8)
			select <<= 1;
	}
	return select;	
}

function routeDirection(directions : number, total : number) : number {
	let select = 0;
	if (total > 0) {
		select = 1;
		while ((select & directions) == 0 && select <= 8)
			select <<= 1;
	}
	return select;	
}

function paint() {
	cx.clearRect(0, 0, WIDTH, HEIGHT);
	let x = 0;
	let y = 0;
	cx.fillStyle = "white";
	cx.strokeStyle = 'black';
	for (let i = 0; i < m; i++)
		for (let j = 0; j < n; j++)
			if (blocks[i][j] != -1) {
				x = j * w;
				y = i * h;
				if (path[i][j] != -1) {
					cx.fillStyle = "yellow";
					cx.fillRect(x, y, w-1, h-1);
				} else {
					if (blocks[i][j]<=maxStep) {
						if (blocks[i][j] != null)
							cx.fillStyle = colors[Math.round(blocks[i][j] / maxStep * (colors.length-1))];
						else
							cx.fillStyle = "white";
					} else {
						cx.fillStyle = "grey";
					}
					cx.fillRect(x, y, w-1, h-1);
//					if (blocks[i][j] != null && blocks[i][j] > 0)
//						cx.strokeText(String(blocks[i][j]), x + 2, y + 10);
				}
			}
	cx.fillStyle = "orange";
	cx.fillRect(dj * w, di * h, w-1, h-1);
	cx.fillStyle = "blue";
	cx.fillRect(start_j * w, start_i * h, w-1, h-1);
	if (found_i && found_j) {
		cx.fillStyle = "red";
		cx.fillRect(found_j * w, found_i * h, w-1, h-1);
	}
}

function rgb(red:number, green:number, blue:number) : string {
	return (red & 0xF0 ? '#' : '#0') + (red == 0 ? '0' : '') + (red << 16 | green << 8 | blue).toString(16);
}