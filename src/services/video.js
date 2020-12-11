
import {request, METHOD} from '@/utils/request'


const api = {
	moving: 'api/v1/control/ptz',
	player: 'api/player/start',
	stopPlayer: 'api/player/stop'
}


export async function moving (params) {
	const data  = await request(api.moving, METHOD.POST,params)
	return data
}

export async function player (params) {
	const data  = await request(api.player, METHOD.GET,params)
	return data
}

export async function stopPlayer (params) {
	const data  = await request(api.stopPlayer, METHOD.GET,params)
	return data
}