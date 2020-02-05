import { Environment } from './types'
import { Color, getColor } from './util'

export default class CollisionCircle {

	x: number
	y: number

	radius: number
	color: Color

	constructor(x: number, y: number, radius: number, color: number = 0) {
		this.x = x
		this.y = y

		this.radius = radius
		this.color = getColor(color)
	}

	updateColor(index: number) {
		this.color = getColor(index)
	}

	draw(env: Environment) {
		if (!env.c) return
		env.c.beginPath()
		env.c.arc(this.x, this.y,this.radius, 0, Math.PI * 2)
		env.c.strokeStyle = this.color.stroke
		env.c.stroke()
		env.c.fillStyle = this.color.fill
		env.c.fill()
		env.c.closePath()
	}

	update(env: Environment) {
		this.draw(env)
	}
}