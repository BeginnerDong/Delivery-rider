function forMatNum(num){
	return num<10?'0'+num:num+'';
}

function initDays(year,month){
	let totalDays=new Date(year,month,0).getDate();
	let dates=[];
	for(let d=1;d<=totalDays;d++){
		dates.push(forMatNum(d));
	};
	return dates;
}
function initPicker(start,end,mode="date",step) {
	let aToday=new Date();
	let tYear=aToday.getFullYear().toString();
	let tMonth=forMatNum(aToday.getMonth()+1).toString();
	let tDay=forMatNum(aToday.getDate()).toString();
	let tHours=forMatNum(aToday.getHours()).toString();
	let tMinutes=forMatNum(aToday.getMinutes()).toString();
	let tSeconds=forMatNum(aToday.getSeconds()).toString();
	let initstartDate=new Date(start);
	let endDate=new Date(end);
	if(start>end){
		initstartDate=new Date(end);
		endDate=new Date(start);
	};
	let startYear=initstartDate.getFullYear();
	let startMonth=initstartDate.getMonth();
	let endYear=endDate.getFullYear();
	let years=[],months=[],days=[],hours=[],minutes=[],seconds=[],defaultVal=[];
	let totalDays=new Date(startYear,startMonth,0).getDate();
	for(let s=startYear;s<=endYear;s++){
		years.push(s+'');
	};
	for(let m=1;m<=12;m++){
		months.push(forMatNum(m));
	};
	for(let d=1;d<=totalDays;d++){
		days.push(forMatNum(d));
	}
	for(let h=0;h<24;h++){
		hours.push(forMatNum(h));
	}
	for(let m=0;m<60;m+=step*1){
		minutes.push(forMatNum(m));
	}
	for(let s=0;s<60;s++){
		seconds.push(forMatNum(s));
	}
	switch(mode){
		case "date":
			defaultVal=[years.indexOf(tYear),months.indexOf(tMonth),days.indexOf(tDay)];
			return {years,months,days,defaultVal}
			break;
		case "yearMonth":
			defaultVal=[years.indexOf(tYear),months.indexOf(tMonth)];
			return {years,months,defaultVal}
			break;
		case "dateTime":
			defaultVal=[years.indexOf(tYear),months.indexOf(tMonth),days.indexOf(tDay),hours.indexOf(tHours),minutes.indexOf(tMinutes),seconds.indexOf(tSeconds)];
			return {years,months,days,hours,minutes,seconds,defaultVal}
			break;
		case "time":
			defaultVal=[hours.indexOf(tHours),minutes.indexOf(tMinutes),seconds.indexOf(tSeconds)];
			return {hours,minutes,seconds,defaultVal}
			break;			
	}
}
export{
	initDays,
	initPicker
}