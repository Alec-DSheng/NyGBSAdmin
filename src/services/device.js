import {request, METHOD} from '@/utils/request'


const api = {
	deviceList: 'api/v1/device/list',
	channelList: 'api/v1/device/channellist',
	channelTree: 'api/device/channel/tree',
	player: 'api/play/'
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
export async function player (device,channel) {
  let url = api.player + '/' + device + '/' + channel
	const data  = await request(url, METHOD.GET, {})
	return data
}