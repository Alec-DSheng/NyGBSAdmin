
import {request, METHOD} from '@/utils/request'


const api = {
	moving: 'api/v1/control/ptz',
	player: 'api/player/start'
}


export async function moving (params) {
	const data  = await request(api.moving, METHOD.POST,params)
	return data
}

export async function player (params) {
	const data  = await request(api.player, METHOD.GET,params)
	return data
}