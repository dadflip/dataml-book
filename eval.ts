const points = [
  {x: 1, y: 2.5}, {x: 2, y: 1.8}, {x: 3, y: 1.5}, {x: 4, y: 2.2},
  {x: 5, y: 4.0}, {x: 6, y: 6.5}, {x: 7, y: 7.2}, {x: 8, y: 6.5}, {x: 9, y: 4.0}
];

function solve(deg) {
  const X = points.map(p => {
    const row = [];
    for (let i = 0; i <= deg; i++) row.push(Math.pow(p.x, i));
    return row;
  });
  const Y = points.map(p => p.y);
  
  // X^T
  const XT = [];
  for (let i = 0; i <= deg; i++) {
    XT[i] = [];
    for (let j = 0; j < points.length; j++) XT[i][j] = X[j][i];
  }
  
  // XT * X
  const XTX = [];
  for (let i = 0; i <= deg; i++) {
    XTX[i] = [];
    for (let j = 0; j <= deg; j++) {
      let sum = 0;
      for (let k = 0; k < points.length; k++) sum += XT[i][k] * X[k][j];
      XTX[i][j] = sum;
    }
  }
  
  // XT * Y
  const XTY = [];
  for (let i = 0; i <= deg; i++) {
    let sum = 0;
    for (let k = 0; k < points.length; k++) sum += XT[i][k] * Y[k];
    XTY[i] = sum;
  }
  
  // Gaussian elimination
  const M = XTX.map((row, i) => [...row, XTY[i]]);
  const n = deg + 1;
  for (let i = 0; i < n; i++) {
    let pivot = M[i][i];
    for (let j = i; j <= n; j++) M[i][j] /= pivot;
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        let f = M[k][i];
        for (let j = i; j <= n; j++) M[k][j] -= f * M[i][j];
      }
    }
  }
  return M.map(row => row[n]);
}

for (let deg = 1; deg <= 4; deg++) {
  console.log(`Deg ${deg}:`, solve(deg));
}
