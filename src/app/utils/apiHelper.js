import {hashHistory} from 'react-router'
import session from './session'

//A render may be attempted befor login confrimation is complete
export function getCategoryNames(func){
	try{
		session.axios.get('category').then((resp)=>{
			var category = resp.data.category
			var categoryNames = []
			for(var key in category){
				if(category[key].name === 'Gifts') continue
				categoryNames.push({name: category[key].name, id: key})
			}
			categoryNames.sort((a, b) => a.name.localeCompare(b.name))
	    func(categoryNames)
		}).catch(e => {
			func([])
		})
	}catch(e){
		func([])
	}
}

export function getItemList(start, end, category, func){
	var query = '?start_date=' + start + '&end_date=' + end
	if(category != null){
		query += '&category_id=' + category
	}
	session.axios.get('item'+query).then((resp)=>{
		var items = resp.data.items
		var itemList = []
		for(var key in items){
			if(items[key].type !== 'I') continue
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
		console.log(e)
		func(null)
	})
}

export function getItem(item, start, end, func){
	session.axios.get(
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
	session.axios.get(query).then((resp)=>{
		func(resp.data.item)
	}).catch(e=>{
		console.log(e)
		func(null)
	})
}

export function getSession(slip, session_id, func){
	//alert(session_id)
	session.axios.post('booking/session/clear').then(()=>{
		session.axios.post('booking/session', {slip: slip}).then(resp=>{
			func(resp.data.booking.session)
		}).catch(e=>{
			console.log(e)
			func(null)
		})
	})
}

export function getForm(func){
	session.axios.get('booking/form')
	.then(resp=>{
		func(resp.data)
	})
	.catch(e=>{
		console.log(e)
		func(null)
	})
}

export function createBooking(session_id, form, func){
	session.axios.post('booking/create', {form: form, session_id: session_id})
	.then(resp=>{
		console.log(JSON.stringify(resp.data, null, 4))
		func(resp.data)
	})
	.catch(e=>{
		console.log(e)
	})
}

export function getBookings(page, func){
	//alert('booking/index?page=' + page)
	session.axios.get('booking/index?page=' + page)
	.then(resp=>{
		//console.log(JSON.stringify(resp.data,null,4))
		func(resp.data)
	})
	.catch(e=>{
		console.log(e)
		func(null)
	})
}

export function getBookingInfo(id, func){
	//alert('booking/index?page=' + page)
	session.axios.get('booking/' + id)
	.then(resp=>{
		//console.log(JSON.stringify(resp.data,null,4))
		func(resp.data.booking)
	})
	.catch(e=>{
		console.log(e)
		func(null)
	})
}

export function getBookingPolicy(func){
	//alert('booking/index?page=' + page)
	session.axios.get('booking/form')
	.then(resp=>{
		//alert(JSON.stringify(resp.data.booking_policy.body,null,4))
		func(resp.data.booking_policy.body)
	})
	.catch(e=>{
		console.log(e)
		func(null)
	})
}

export function getCompanyInfo(func){
	session.axios.get('company')
	.then(resp=>{
		//alert(JSON.stringify(resp.data,null,4))
		func(resp.data.company)
	})
	.catch(e=>{
		console.log(e)
		func(null)
	})
}

export function changeStatus(booking, status, func){
	session.axios.get('booking/' + booking + '/update?status_id=' + status)
	.then(resp=>{
		//alert(JSON.stringify(resp.data))
		func()
	})
	.catch(e=>{
		console.log(e)
	})
}
//window.location.reload()
