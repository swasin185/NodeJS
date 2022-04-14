class RandomFibo {
  a: number = 0;
  b: number = 1;
  constructor() {
    let Rn_2 = 0;
    let Rn_1 = 1;
    let Rn = 0;
    let rand = 0;
    for (let i = 1; i <= 200; i++) {
      rand = Math.round(Math.random());
      if (rand == 1)
        Rn = Rn_1 + Rn_2;
      else
        Rn = Rn_1 - Rn_2;
      Rn_2 = Rn_1;
      Rn_1 = Rn;
      console.log(i + "[" + rand + "]\t" + Rn_2 + "\t\t" + Rn_1 + "\t\t:\t" + (Rn_1 / Rn_2));
    }
  }
}
new RandomFibo();