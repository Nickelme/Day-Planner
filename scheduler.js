const LOCAL_STORAGE_KEY = "SavedTimes";

function saveInfo(){
	var saveHour = $(this).attr("data-hour");
	var textfields = $("textarea");
	var saveText = ""
	console.log(textfields);
	textfields.each(function(){
		if($(this).attr("data-hour") === saveHour){
			saveText = $(this).val();
		}
	});
	console.log(`${saveHour} : ${saveText}`);

	var savedTimes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
	if(savedTimes == null){
		savedTimes = [];
	}
	savedTimes[saveHour] = saveText;
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedTimes));
}

function createTimeblocks(){
	var savedTimes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
	if(savedTimes == null){
		savedTimes = [];
	}
	for(var i = 9; i<18; i++){
		var row = $("<div>")
		row.addClass("row time-block");
		
		var hour = $("<div>");
		hour.addClass("col-sm-2 hour d-flex justify-content-end");
		var hourString = i+"AM"
		if(i > 12){
			hourString = (i-12)+"PM"
		}else if(i == 12){
			hourString = i+"PM";
		}
		hour.text(hourString);
		row.append(hour);

		var textarea = $("<textarea>");
		textarea.addClass("col-sm-8");
		textarea.attr("data-hour", i);
		if(i < moment().hour()){
			textarea.addClass("past");
		}else if(i == moment().hour()){
			textarea.addClass("present");
		}else{
			textarea.addClass("future");
		}
		textarea.val(savedTimes[i]);
		row.append(textarea);

		var saveBtn = $("<div>");
		saveBtn.addClass("col-sm-2 d-flex justify-content-center saveBtn");
		var saveI = $("<i>");
		saveI.addClass("align-self-center fa fa-save");
		saveI.attr("data-hour", i);
		saveI.click(saveInfo);
		saveBtn.append(saveI);
		row.append(saveBtn);

		$("#Time-Area").append(row);
	}
}

function setDay(){
	$("#currentDay").text(moment().format("dddd, MMMM Do"));
}

$(document).ready(function(){
	createTimeblocks();
	setDay();
});