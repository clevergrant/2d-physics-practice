import { Environment } from './types'
import { Color, getColor, distanceBetween } from './util'
import { resolveCollision } from './elastic-collision'

export default class Particle {

	pos: {
		x: number
		y: number
	}

	vel: {
		x: number,
		y: number
	}

	mass: number

	radius: number
	color: Color

	constructor(pos: { x: number, y: number }, radius: number, color: number = 0, mass: number = 1) {

		this.pos = pos

		this.vel = {
			x: (Math.random() - .5) * 3,
			y: (Math.random() - .5) * 3,
		}

		this.radius = radius

		this.color = getColor(color)
		this.mass = mass
	}

	updateColor(index: number) {
		this.color = getColor(index)
	}

	draw(env: Environment) {
		if (!env.c) return
		env.c.beginPath()
		env.c.arc(this.pos.x, this.pos.y,this.radius, 0, Math.PI * 2)
		env.c.strokeStyle = this.color.stroke
		env.c.stroke()
		env.c.fillStyle = this.color.fill
		env.c.fill()
		env.c.closePath()
	}

	update(env: Environment) {
		if (!env.c) return

		this.draw(env)

		for (let i = 0; i < env.particles.length; i++) {
			if (this === env.particles[i]) continue
			if (distanceBetween(this.pos.x, this.pos.y, env.particles[i].pos.x, env.particles[i].pos.y) - this.radius * 2 < 0)
				resolveCollision(this, env.particles[i])
		}

		if (
			this.pos.x - this.radius <= 0 ||
			this.pos.x + this.radius >= env.c.canvas.width
		)
			this.vel.x = -this.vel.x

		if (
			this.pos.y - this.radius <= 0 ||
			this.pos.y + this.radius >= env.c.canvas.height
		)
			this.vel.y = -this.vel.y

		this.pos.x += this.vel.x
		this.pos.y += this.vel.y
	}
}