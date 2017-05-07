import {config} from '../config/config.js'
import {hashHistory} from 'react-router'

try{
	var axios = require('axios').create(require('../config/api.js').api)
}catch(err){
	console.log("Dev Error: missing api.js (checktron/jsx/config/api.).\n	export default {\n	  baseURL: 'https://<name>.checkfront.com/api/3.0/',\n	  auth: {\n	    username: '<token>',\n	    password: '<secret>'\n	  }\n	}")
	var axios = require('axios').create({baseURL: config.api.hostname})
}


export function getCategoryNames(func){
	axios.get('category').then((resp)=>{
		var category = resp.data.category
		var categoryNames = []
		for(var key in category){
			categoryNames.push({name: category[key].name, id: key})
		}
		categoryNames.sort((a, b) => a.name.localeCompare(b.name))
    func(categoryNames)
	}).catch(e => {
		func([])
	})
}

export function getItemList(start, end, category, func){
	var query = '?start_date=' + start + '&end_date=' + end
	if(category != null){
		query += '&category_id=' + category
	}
	axios.get('item'+query).then((resp)=>{
		var items = resp.data.items
		var itemList = []
		for(var key in items){
			if(items[key].product_group_type === 'C') continue
			itemList.push({
				id: key,
				name: items[key].name,
				sku: items[key].sku,
				status: items[key].rate.status,
				avail: items[key].rate.summary.title,
				price: (items[key].rate.summary.price != undefined ?
					items[key].rate.summary.price.title : null),
				total: (items[key].rate.summary.price != undefined ?
					items[key].rate.summary.price.total : null),
				image: items[key].image != undefined ?
					items[key].image : null,
				giftCert: items[key].type === 'GC'
			})
		}
		func(itemList)
	}).catch(e => {
		func(null)
	})
}

export function getItem(item, start, end, func){
	axios.get(
		'item/' + item + '?start_date=' + start + '&end_date=' + end
	).then((resp)=>{
		func(resp.data.item)
	}).catch(e=>{
		console.log(e)
		func(null)
	})
}

export function getItemSlip(item_id, start_date, end_date, start_time, end_time, timeslot, param, func){
	var query = 'item/' + item_id + '?start_date=' + start_date
	if(end_date !== null) query += '&end_date=' + end_date
	if(start_time !== null) query += '&start_time=' + start_time
	if(end_time !== null) query += '&end_time=' + end_time
	if(timeslot !== null) query += '&timeslot=' + timeslot
	for(var key in param) query += '&param[' + key + ']=' + param[key]
	axios.get(query).then((resp)=>{
		func(resp.data.item)
	}).catch(e=>{
		console.log(e)
		func(null)
	})
}
