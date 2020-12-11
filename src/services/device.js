import {request, METHOD} from '@/utils/request'


const api = {
	deviceList: 'api/device',
	channelList: 'api/device/channel',
	channelTree: 'api/device/channel/tree'
}


export async function deviceList (params) {
	const data  = await request(api.deviceList, METHOD.GET,params)
	return data
}

export async function deviceChannelList (params) {
	const data  = await request(api.channelList, METHOD.GET,params)
	return data
}

export async function deviceChannelTree () {
	const data  = await request(api.channelTree, METHOD.GET,{})
	return data
}