
import {request, METHOD} from '@/utils/request'


const api = {
  moving: 'api/v1/control/ptz'
}


export async function moving (params) {
	const data  = await request(api.moving, METHOD.POST,params)
	return data
}