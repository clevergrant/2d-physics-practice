export const randomIntFromRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export const distanceBetween =
	(x1: number, y1: number, x2: number, y2: number) =>
		Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

export const repeat =
	(fn: Function, iterations: number) => {
		for(let i = 0; i < iterations; i++) fn(i)
	}

export const getColor = (index: number): Color => colors[index]

export const getRandomColor = (): Color => colors[Math.floor(Math.random() * colors.length)]

export type Color = {
	stroke: string
	fill: string
}

const opacity: number = .5

const colors = [
	{
		stroke: `rgba(255,23,68,1)`,
		fill: `rgba(255,23,68,${opacity})`,
	},
	{
		stroke: `rgba(245,0,87,1)`,
		fill: `rgba(245,0,87,${opacity})`,
	},
	{
		stroke: `rgba(213,0,249,1)`,
		fill: `rgba(213,0,249,${opacity})`,
	},
	{
		stroke: `rgba(101,31,255,1)`,
		fill: `rgba(101,31,255,${opacity})`,
	},
	{
		stroke: `rgba(61,90,254,1)`,
		fill: `rgba(61,90,254,${opacity})`,
	},
	{
		stroke: `rgba(41,121,255,1)`,
		fill: `rgba(41,121,255,${opacity})`,
	},
	{
		stroke: `rgba(0,176,255,1)`,
		fill: `rgba(0,176,255,${opacity})`,
	},
	{
		stroke: `rgba(0,229,255,1)`,
		fill: `rgba(0,229,255,${opacity})`,
	},
	{
		stroke: `rgba(29,233,182,1)`,
		fill: `rgba(29,233,182,${opacity})`,
	},
	{
		stroke: `rgba(0,230,118,1)`,
		fill: `rgba(0,230,118,${opacity})`,
	},
	{
		stroke: `rgba(118,255,3,1)`,
		fill: `rgba(118,255,3,${opacity})`,
	},
	{
		stroke: `rgba(198,255,0,1)`,
		fill: `rgba(198,255,0,${opacity})`,
	},
	{
		stroke: `rgba(255,234,0,1)`,
		fill: `rgba(255,234,0,${opacity})`,
	},
	{
		stroke: `rgba(255,196,0,1)`,
		fill: `rgba(255,196,0,${opacity})`,
	},
	{
		stroke: `rgba(255,145,0,1)`,
		fill: `rgba(255,145,0,${opacity})`,
	},
	{
		stroke: `rgba(255,61,0,1)`,
		fill: `rgba(255,61,0,${opacity})`,
	},
]
