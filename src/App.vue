
<template>
	<div id='app'>
		<span v-bind='env.debugMsg'>{{ env.debugMsg }}</span>
		<canvas ref='canvas'></canvas>
	</div>
</template>

<script lang='ts'>
	/* eslint-disable spaced-comment */
	import Vue from 'vue'

	import { Environment } from './ts/types'

	import Ball from './ts/Ball'
	import CollisionCircle from './ts/CollisionCircle'
	import Particle from './ts/Particle'

	import {
		repeat,
		distanceBetween,
		randomIntFromRange,
	} from './ts/util'

	export default Vue.extend({
		name: `app`,
		data() {
			const data: {
					canvas: HTMLCanvasElement | null
					env: Environment
				} = {
					canvas: null,
					env: {
						c: null,
						mouse: { x: 0, y: 0 },
						// balls: [],
						particles: [],
					},
				}
			return data
		},
		mounted() {
			this.canvas = this.$refs.canvas as HTMLCanvasElement
			this.env.c = this.canvas.getContext(`2d`)

			this.canvas.width = innerWidth
			this.canvas.height = innerHeight

			addEventListener(`mousemove`, e => {
				this.env.mouse.x = e.clientX
				this.env.mouse.y = e.clientY
			})

			addEventListener(`resize`, () => {
				if (!this.env.c) return
				this.env.c.canvas.width = innerWidth
				this.env.c.canvas.height = innerHeight
				this.init()
			})

			addEventListener(`click`, () => {
				this.init()
			})

			this.init()
			this.animate()
		},
		methods: {
			init() {
				if (!this.env.c) return

				// Floating Particles
				//*
				const numParticles = 100

				this.env.particles = []

				for (let i = 0; i < numParticles; i++) {
					const radius = 20

					const pos = {
						x: randomIntFromRange(radius, this.env.c.canvas.width - radius),
						y: randomIntFromRange(radius, this.env.c.canvas.height - radius),
					}

					const color = Math.floor(Math.random() * 16)

					if (i !== 0) {
						for (let j = 0; j < this.env.particles.length; j++) {
							if (distanceBetween(pos.x, pos.y, this.env.particles[j].pos.x, this.env.particles[j].pos.y) - radius * 2 < 0) {
								pos.x = randomIntFromRange(radius, this.env.c.canvas.width - radius)
								pos.y = randomIntFromRange(radius, this.env.c.canvas.height - radius)
								j = -1
							}
						}
					}

					this.env.particles.push(new Particle(pos, radius, color))
				}

				this.env.particles.forEach(particle => particle.draw(this.env))

				//*/

				// Collision Detection
				/*
				this.env.collisionBall = new CollisionCircle((innerWidth / 2), (innerHeight / 2), 100, 14)
				this.env.collisionBall.draw(this.env)

				this.env.mouseBall = new CollisionCircle(this.env.mouse.x, this.env.mouse.y, 50, 5)
				this.env.mouseBall.draw(this.env)
				//*/

				// Bouncing Balls
				/*

				const numBalls = 30

				this.env.balls = []

				for (let i = 0; i < numBalls; i++) {
					if (!this.env.c) return

					const radius = 50

					let pos = {
						x: randomIntFromRange(radius, this.env.c.canvas.width - radius),
						y: randomIntFromRange(radius, this.env.c.canvas.height - radius),
					}

					const vel = {
						x: (Math.random() - .5) * 20,
						y: 0,
					}

					if (i !== 0) {
						for (let j = 0; j < this.env.balls.length; j++) {
							if (distanceBetween(pos.x, pos.y, this.env.balls[j].pos.x, this.env.balls[j].pos.y) - radius * 2 < 0) {
								pos = {
									x: randomIntFromRange(radius, this.env.c.canvas.width - radius),
									y: randomIntFromRange(radius, this.env.c.canvas.height - radius),
								}

								j = -1
							}
						}
					}

					const color = Math.floor(Math.random() * 16)

					this.env.balls.push(new Ball(pos, radius, 1, .995, vel, color))
				}

				this.env.gravity = 1
				this.env.friction = .9

				this.env.balls.forEach(ball => ball.draw(this.env))
				//*/

			},
			animate() {
				if (!this.env.c) return
				requestAnimationFrame(this.animate)
				this.env.c.clearRect(0, 0, innerWidth, innerHeight)

				if (!this.env.particles) return
				this.env.particles.forEach(particle => particle.update(this.env))

				// if (!this.env.balls) return
				// this.env.balls.forEach(ball => ball.update(this.env))

				// if (!this.env.mouseBall || !this.env.collisionBall) return

				// const distance = distanceBetween(this.env.collisionBall.x, this.env.collisionBall.y, this.env.mouseBall.x, this.env.mouseBall.y)

				// const span = document.querySelector(`span`)
				// if (span) span.innerHTML = `${distance}`

				// if (distance < this.env.mouseBall.radius + this.env.collisionBall.radius) this.env.collisionBall.updateColor(5)
				// else this.env.collisionBall.updateColor(14)

				// this.env.mouseBall.x = this.env.mouse.x
				// this.env.mouseBall.y = this.env.mouse.y

				// this.env.collisionBall.update(this.env)
				// this.env.mouseBall.update(this.env)
			},
		},
	})
</script>

<style>
body {
	margin: 0;
}

#app {
	height: 100vh;
	width: 100vw;
	position: relative;
}

span {
	position: absolute;
	top: 10px;
	left: 10px;
	color: green;
}

canvas {
	height: 100vh;
	width: 100vw;
}
</style>
