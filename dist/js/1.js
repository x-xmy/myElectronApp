function a() {
  console.log(1);
  Promise.resolve().then(() => {
    console.log(2);
  });
}

setTimeout(() => {
  Promise.resolve().then(a);
  console.log(3);
}, 0);

Promise.resolve().then(() => {
  console.log(4);
});

console.log(5);

function test(obj) {
  for (let key in obj) {
    let v = obj[key];
    let funs = new Set();
    Object.defineProperty(obj, key, {
      get: function () {
        if (window._fun) {
          funs.add(window._fun);
        }
        return v;
      },
      set: function (val) {
        v = val;
        for (let f of funs) {
          f();
        }
      },
    });
  }
}

function test1(obj) {
  let funs = new Set();
  return new Proxy(obj, {
    get(target, property) {
      if (window._fun) {
        funs.add(window._fun);
      }
      return target[property];
    },
    set(target, property, value) {
      target[property] = value;
      for (let f of funs) {
        f();
      }
    },
  });
}

function handleRun(fun) {
  window._fun = fun;
  fun();
  window._fun = null;
}

class Nve {
  constructor(obj) {
    // let funs = new Set()
    // super(obj,{
    //   get(target, property){
    //     if(window._fun){
    //       funs.add(window._fun)
    //     }
    //     return target[property];
    //   },
    //   set(target, property, value){
    //     target[property] = value
    //     for(let f of funs){
    //       f()
    //     }
    //   }
    // })
  }
}

class Goods {
  constructor(good) {
    this.good = {
      data: good,
      num: 0,
    };
  }

  shose() {
    return this.good.num * this.good.data.p;
  }
  getNum() {
    return this.good.num;
  }
  add() {
    this.good.num++;
  }
  jian() {
    if (this.good.num > 0) {
      this.good.num--;
    }
  }
}

let g = new Goods({ p: 5 });
g.add();
// g.jian()
// console.log(g.getNum());
// console.log(g.shose());
