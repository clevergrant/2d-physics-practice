import { Environment } from './types'
import { Color, getColor, distanceBetween } from './util'
import { resolveCollision } from './elastic-collision'

export default class Ball {

	pos: {
		x: number
		y: number
	}

	vel: {
		x: number,
		y: number
	}

	mass: number
	friction: number

	radius: number
	color: Color

	constructor(pos: { x: number, y: number }, radius: number, mass: number = 1, friction: number = .5, vel: { x: number, y: number } = { x: 0, y: 0 }, color: number = 0) {

		this.pos = pos

		this.vel = vel

		this.mass = mass
		this.friction = friction

		this.radius = radius
		this.color = getColor(color)
	}

	get landed() {
		return (this.pos.y + this.radius + this.vel.y) - innerHeight > 0
	}

	draw(env: Environment) {
		if (!env.c) return
		env.c.beginPath()
		env.c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
		env.c.strokeStyle = this.color.stroke
		env.c.stroke()
		env.c.fillStyle = this.color.fill
		env.c.fill()
		env.c.closePath()
	}

	update(env: Environment) {
		if (!env.c || !env.gravity || !env.friction) return

		this.draw(env)

		// for (let i = 0; i < env.balls.length; i++) {
		// 	if (this === env.balls[i]) continue

		// 	if (distanceBetween(this.pos.x, this.pos.y, env.balls[i].pos.x, env.balls[i].pos.y) - this.radius * 2 < 0)
		// 		resolveCollision(this, env.balls[i])
		// }

		if (
			// right wall
			this.pos.x + this.radius + this.vel.x > env.c.canvas.width ||
			// left wall
			this.pos.x - this.radius <= 0
		)
			this.vel.x = -this.vel.x

		if (this.landed) this.vel.x *= this.friction

		if (
			// floor
			this.pos.y + this.radius + this.vel.y > env.c.canvas.height ||
			// ceiling
			this.pos.y - this.radius <= 0
		)
			this.vel.y = -this.vel.y * this.friction * env.friction

		else this.vel.y += env.gravity

		this.pos.x += this.vel.x
		this.pos.y += this.vel.y

	}
}