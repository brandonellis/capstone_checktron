import {config} from '../config/config.js'

//TEMP file for development only
try{
	var axios = require('axios').create(require('../config/api.js').api)
}catch(err){
	alert("Dev Error: missing api.js (checktron/jsx/config/api.).\n	export default {\n	  baseURL: 'https://<name>.checkfront.com/api/3.0/',\n	  auth: {\n	    username: '<token>',\n	    password: '<secret>'\n	  }\n	}")
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
					items[key].image : null
			})
		}
		func(itemList)
	})
}
