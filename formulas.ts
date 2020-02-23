export class Formulas {
  static calculateMedian(arr: Array < number > ) {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  }

  static calculateArithmeticAverage(arr: Array < number > ) {
    return arr.reduce((prev, curr) => prev + curr) / arr.length;
  }

  static calculateMode(arr: Array < number > ) {
    let counted = arr.reduce((acc, curr) => {
      if (curr in acc) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});
    let mode = Object.keys(counted).reduce((a, b) => counted[a] > counted[b] ? a : b);
    return parseInt(mode);
  }

  static calculateMinimumSampleSize(confidenceInterval: number, varianceOfDistribution: number, maxError: number) {
    return Math.pow((confidenceInterval * varianceOfDistribution / maxError), 2);
  }
}
