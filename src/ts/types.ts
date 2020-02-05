import Ball from './Ball'
import CollisionCircle from './CollisionCircle'
import Particle from './Particle'

export type Environment = {
	c: CanvasRenderingContext2D | null
	gravity?: number
	friction?: number
	mouse: { x: number, y: number }

	particles: Particle[]
	// balls: Ball[]
	// mouseBall?: CollisionCircle
	// collisionBall?: CollisionCircle
}