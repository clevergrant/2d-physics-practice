
import Ball from './Ball'
import Particle from './Particle'

type Thing =
| Ball
| Particle

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

export function rotate(velocity: { x: number, y: number }, angle: number) {
	const rotatedVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
	}

	return rotatedVelocities
}

/**
* Swaps out two colliding particles' x and y velocities after running through
* an elastic collision reaction equation
*
* @param  Object | particle      | A particle object with x and y coordinates, plus velocity
* @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
* @return Null | Does not return a value
*/

export function resolveCollision(thisThing: Thing, thatThing: Thing) {
	const xVelocityDiff = thisThing.vel.x - thatThing.vel.x
	const yVelocityDiff = thisThing.vel.y - thatThing.vel.y

	const xDist = thatThing.pos.x - thisThing.pos.x
	const yDist = thatThing.pos.y - thisThing.pos.y

	// Prevent accidental overlap of particles
	if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

		// Grab angle between the two colliding particles
		const angle = -Math.atan2(thatThing.pos.y - thisThing.pos.y, thatThing.pos.x - thisThing.pos.x)

		// Store mass in var for better readability in collision equation
		const m1 = thisThing.mass
		const m2 = thatThing.mass

		// Velocity before equation
		const u1 = rotate(thisThing.vel, angle)
		const u2 = rotate(thatThing.vel, angle)

		// Velocity after 1d collision equation
		const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y }
		const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y }

		// Final velocity after rotating axis back to original location
		const vFinal1 = rotate(v1, -angle)
		const vFinal2 = rotate(v2, -angle)

		// Swap particle velocities for realistic bounce effect
		thisThing.vel.x = vFinal1.x
		thisThing.vel.y = vFinal1.y

		thatThing.vel.x = vFinal2.x
		thatThing.vel.y = vFinal2.y
	}
}