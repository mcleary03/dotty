const sym = 'ETH'
const limit = 60

const url = `https://min-api.cryptocompare.com/data/histominute?fsym=${sym}&tsym=USD&limit=${limit}`

// replace this with api call
const res = {
  Response: "Success",
  Type: 100,
  Aggregated: false,
  Data: [
  {
  time: 1533844500,
  close: 362.87,
  high: 362.88,
  low: 362.87,
  open: 362.87,
  volumefrom: 113.99,
  volumeto: 41339.07
  },
  {
  time: 1533844560,
  close: 362.88,
  high: 362.89,
  low: 362.87,
  open: 362.87,
  volumefrom: 88.05,
  volumeto: 31932.77
  },
  {
  time: 1533844620,
  close: 362.88,
  high: 362.88,
  low: 362.87,
  open: 362.88,
  volumefrom: 93.64,
  volumeto: 33947.23
  },
  {
  time: 1533844680,
  close: 362.85,
  high: 362.88,
  low: 362.85,
  open: 362.88,
  volumefrom: 142.08,
  volumeto: 51519.52
  },
  {
  time: 1533844740,
  close: 362.44,
  high: 362.85,
  low: 362.39,
  open: 362.85,
  volumefrom: 253.63,
  volumeto: 91893.97
  },
  {
  time: 1533844800,
  close: 362.01,
  high: 362.45,
  low: 362.01,
  open: 362.44,
  volumefrom: 1401.81,
  volumeto: 508297.77
  },
  {
  time: 1533844860,
  close: 362.04,
  high: 362.05,
  low: 362.01,
  open: 362.01,
  volumefrom: 62.09,
  volumeto: 22475.51
  },
  {
  time: 1533844920,
  close: 362.28,
  high: 362.28,
  low: 362.03,
  open: 362.04,
  volumefrom: 196.66,
  volumeto: 71184.1
  },
  {
  time: 1533844980,
  close: 362.49,
  high: 362.49,
  low: 362.28,
  open: 362.28,
  volumefrom: 146.17,
  volumeto: 52927.62
  },
  {
  time: 1533845040,
  close: 362.48,
  high: 362.49,
  low: 362.47,
  open: 362.49,
  volumefrom: 175.19,
  volumeto: 63448.94
  },
  {
  time: 1533845100,
  close: 362.46,
  high: 362.48,
  low: 362.46,
  open: 362.48,
  volumefrom: 110.93,
  volumeto: 40183.28
  },
  {
  time: 1533845160,
  close: 362.44,
  high: 362.46,
  low: 362.4,
  open: 362.46,
  volumefrom: 73.68,
  volumeto: 26691.55
  },
  {
  time: 1533845220,
  close: 362.64,
  high: 362.64,
  low: 362.44,
  open: 362.44,
  volumefrom: 129.1,
  volumeto: 46755.63
  },
  {
  time: 1533845280,
  close: 362.82,
  high: 362.82,
  low: 362.64,
  open: 362.64,
  volumefrom: 98.14,
  volumeto: 35540.08
  },
  {
  time: 1533845340,
  close: 362.8,
  high: 362.82,
  low: 362.8,
  open: 362.82,
  volumefrom: 78.83,
  volumeto: 28565.12
  },
  {
  time: 1533845400,
  close: 362.89,
  high: 362.89,
  low: 362.8,
  open: 362.8,
  volumefrom: 176.47,
  volumeto: 64000.87
  },
  {
  time: 1533845460,
  close: 362.91,
  high: 362.93,
  low: 362.88,
  open: 362.88,
  volumefrom: 90.96,
  volumeto: 32963.43
  },
  {
  time: 1533845520,
  close: 363.25,
  high: 363.39,
  low: 362.91,
  open: 362.91,
  volumefrom: 309.84,
  volumeto: 112469.33
  },
  {
  time: 1533845580,
  close: 363.25,
  high: 363.29,
  low: 363.25,
  open: 363.25,
  volumefrom: 120.92,
  volumeto: 43881.58
  },
  {
  time: 1533845640,
  close: 363.25,
  high: 363.25,
  low: 363.25,
  open: 363.25,
  volumefrom: 79.85,
  volumeto: 28969.82
  },
  {
  time: 1533845700,
  close: 363.34,
  high: 363.37,
  low: 363.25,
  open: 363.25,
  volumefrom: 78.74,
  volumeto: 28609.81
  },
  {
  time: 1533845760,
  close: 363.23,
  high: 363.36,
  low: 363.23,
  open: 363.35,
  volumefrom: 147.95,
  volumeto: 53704.74
  },
  {
  time: 1533845820,
  close: 362.98,
  high: 363.23,
  low: 362.97,
  open: 363.23,
  volumefrom: 158.63,
  volumeto: 57576.97
  },
  {
  time: 1533845880,
  close: 363.11,
  high: 363.13,
  low: 362.98,
  open: 362.98,
  volumefrom: 144.86,
  volumeto: 52576.48
  },
  {
  time: 1533845940,
  close: 362.98,
  high: 363.11,
  low: 362.97,
  open: 363.11,
  volumefrom: 231,
  volumeto: 83772.61
  },
  {
  time: 1533846000,
  close: 363.03,
  high: 363.03,
  low: 362.8,
  open: 362.92,
  volumefrom: 120.39,
  volumeto: 43761.26
  },
  {
  time: 1533846060,
  close: 363.06,
  high: 363.07,
  low: 362.98,
  open: 363.03,
  volumefrom: 65.39,
  volumeto: 23801.43
  },
  {
  time: 1533846120,
  close: 363.13,
  high: 363.14,
  low: 362.95,
  open: 363.06,
  volumefrom: 83.82,
  volumeto: 30531.6
  },
  {
  time: 1533846180,
  close: 363.12,
  high: 363.14,
  low: 363.03,
  open: 363.13,
  volumefrom: 138.56,
  volumeto: 50275.3
  },
  {
  time: 1533846240,
  close: 363.08,
  high: 363.12,
  low: 363.03,
  open: 363.12,
  volumefrom: 94.41,
  volumeto: 34243.18
  },
  {
  time: 1533846300,
  close: 363.24,
  high: 363.27,
  low: 363.07,
  open: 363.08,
  volumefrom: 179.22,
  volumeto: 65057.48
  },
  {
  time: 1533846360,
  close: 363.38,
  high: 363.38,
  low: 363.24,
  open: 363.24,
  volumefrom: 73.1,
  volumeto: 26555
  },
  {
  time: 1533846420,
  close: 363.51,
  high: 363.51,
  low: 363.38,
  open: 363.38,
  volumefrom: 151.82,
  volumeto: 55176.94
  },
  {
  time: 1533846480,
  close: 363.43,
  high: 363.52,
  low: 363.43,
  open: 363.51,
  volumefrom: 92.45,
  volumeto: 33574.31
  },
  {
  time: 1533846540,
  close: 363.37,
  high: 363.51,
  low: 363.37,
  open: 363.43,
  volumefrom: 335.36,
  volumeto: 121950.55
  },
  {
  time: 1533846600,
  close: 363.37,
  high: 363.56,
  low: 363.37,
  open: 363.37,
  volumefrom: 251.98,
  volumeto: 91570.87
  },
  {
  time: 1533846660,
  close: 363.38,
  high: 363.41,
  low: 363.38,
  open: 363.4,
  volumefrom: 70.36,
  volumeto: 25595.65
  },
  {
  time: 1533846720,
  close: 363.3,
  high: 363.39,
  low: 363.3,
  open: 363.38,
  volumefrom: 204.48,
  volumeto: 74292
  },
  {
  time: 1533846780,
  close: 363.27,
  high: 363.38,
  low: 363.27,
  open: 363.3,
  volumefrom: 158.72,
  volumeto: 57695.35
  },
  {
  time: 1533846840,
  close: 363.32,
  high: 363.32,
  low: 363.27,
  open: 363.27,
  volumefrom: 110.74,
  volumeto: 40568.78
  },
  {
  time: 1533846900,
  close: 363.16,
  high: 363.28,
  low: 363.16,
  open: 363.28,
  volumefrom: 85.92,
  volumeto: 31181.6
  },
  {
  time: 1533846960,
  close: 363.08,
  high: 363.16,
  low: 363.07,
  open: 363.16,
  volumefrom: 142.35,
  volumeto: 51678.67
  },
  {
  time: 1533847020,
  close: 363.17,
  high: 363.17,
  low: 363.08,
  open: 363.08,
  volumefrom: 102.34,
  volumeto: 37153.92
  },
  {
  time: 1533847080,
  close: 363.17,
  high: 363.17,
  low: 363.17,
  open: 363.17,
  volumefrom: 81.15,
  volumeto: 29447.86
  },
  {
  time: 1533847140,
  close: 363.17,
  high: 363.19,
  low: 363.17,
  open: 363.17,
  volumefrom: 141.36,
  volumeto: 51292.7
  },
  {
  time: 1533847200,
  close: 363.36,
  high: 363.36,
  low: 363.14,
  open: 363.17,
  volumefrom: 201.2,
  volumeto: 73055.52
  },
  {
  time: 1533847260,
  close: 363.36,
  high: 363.4,
  low: 363.36,
  open: 363.36,
  volumefrom: 127.84,
  volumeto: 46424.82
  },
  {
  time: 1533847320,
  close: 363.39,
  high: 363.4,
  low: 363.36,
  open: 363.36,
  volumefrom: 106.69,
  volumeto: 38734.86
  },
  {
  time: 1533847380,
  close: 363.58,
  high: 363.58,
  low: 363.39,
  open: 363.39,
  volumefrom: 161.98,
  volumeto: 58835.61
  },
  {
  time: 1533847440,
  close: 363.47,
  high: 363.66,
  low: 363.47,
  open: 363.58,
  volumefrom: 113.17,
  volumeto: 41159.03
  },
  {
  time: 1533847500,
  close: 363.68,
  high: 363.68,
  low: 363.51,
  open: 363.57,
  volumefrom: 128.76,
  volumeto: 46832.53
  },
  {
  time: 1533847560,
  close: 363.3,
  high: 363.68,
  low: 363.28,
  open: 363.68,
  volumefrom: 267.77,
  volumeto: 97428.79
  },
  {
  time: 1533847620,
  close: 363.19,
  high: 363.3,
  low: 363.13,
  open: 363.3,
  volumefrom: 102.45,
  volumeto: 37176.78
  },
  {
  time: 1533847680,
  close: 363.14,
  high: 363.19,
  low: 363.14,
  open: 363.19,
  volumefrom: 164.4,
  volumeto: 59624.59
  },
  {
  time: 1533847740,
  close: 363.11,
  high: 363.14,
  low: 363.1,
  open: 363.14,
  volumefrom: 171.93,
  volumeto: 62382.56
  },
  {
  time: 1533847800,
  close: 363.32,
  high: 363.32,
  low: 363.11,
  open: 363.11,
  volumefrom: 101.47,
  volumeto: 36823.49
  },
  {
  time: 1533847860,
  close: 363.39,
  high: 363.51,
  low: 363.32,
  open: 363.32,
  volumefrom: 184.98,
  volumeto: 67218.36
  },
  {
  time: 1533847920,
  close: 363.49,
  high: 363.49,
  low: 363.39,
  open: 363.39,
  volumefrom: 78.41,
  volumeto: 28471.83
  },
  {
  time: 1533847980,
  close: 363.6,
  high: 363.6,
  low: 363.49,
  open: 363.49,
  volumefrom: 389.06,
  volumeto: 141361.84
  },
  {
  time: 1533848040,
  close: 363.7,
  high: 363.75,
  low: 363.6,
  open: 363.6,
  volumefrom: 241.41,
  volumeto: 87739.42
  },
  {
  time: 1533848100,
  close: 363.75,
  high: 363.75,
  low: 363.7,
  open: 363.7,
  volumefrom: 0,
  volumeto: 0
  }
  ],
  TimeTo: 1533848100,
  TimeFrom: 1533844500,
  FirstValueInArray: true,
  ConversionType: {
  type: "direct",
  conversionSymbol: ""
  }
}

const dScale = 1000
const deltas = res.Data.map( d => Math.round((d.open-d.close)*dScale) )
