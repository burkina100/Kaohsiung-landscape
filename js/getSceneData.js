window.onload = function() {
	// add dataset to list-item
	// var area = document.querySelectorAll(".region-container__list .list__area");
	// for(var i = 0; i < area.length; i++) {
	// 	area[i].setAttribute("data-num", i);
	// }

	// 抓取資料庫資料
	var xhr = new XMLHttpRequest();
	xhr.open("get", "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97", true);
	xhr.send();
	xhr.onload = function() {
		// 取得景點
		var landscapes = JSON.parse(xhr.responseText).result.records;

		document.querySelector(".region-container__list").addEventListener("change", function(e) {
			var area = e.target.value;
			// 改變景觀區title
			document.querySelector("#district").innerText = area;
			chosenView(area);
		}, false);

		// 選擇要留下的區域景觀
		function chosenView(area) {
			
			var viewInfo = [];
			for (var i = 0; i < landscapes.length; i++) {
				if(landscapes[i].Zone == area) {
					viewInfo.push(landscapes[i]);
				}
			}
			changeView(viewInfo);
		}

		// 更改景觀內容
		function changeView(viewInfo) {
			for (var i = 0; i < 8; i++) {
				if(viewInfo[i]){
					var displayNone = listItem[i].className.indexOf("dis-none");
					if(displayNone > 0) {
						// listItem[i].className.slice(0, displayNone);
						listItem[i].className = listItem[i].className.slice(0, displayNone-1);
					}
					image[i].style.backgroundImage = 'url("' + viewInfo[i].Picture1 + '")';
					name[i].innerText = viewInfo[i].Name;
					strict[i].innerText = viewInfo[i].Zone;
					opening[i].innerText = viewInfo[i].Opentime;
					location[i].innerText = viewInfo[i].Add;
					telephone[i].innerText = viewInfo[i].Tel;
					ticketInfo[i].innerText = viewInfo[i].Ticketinfo;
				} else {
					listItem[i].className += " dis-none";
				}
			}
		}
	};

	//抓取各區景觀元件
	var listItem = document.querySelectorAll(".list__item");
	var image = document.querySelectorAll(".scene-container__image");
	var name = document.querySelectorAll(".info__name");
	var strict = document.querySelectorAll(".info__strict");
	var opening = document.querySelectorAll(".opening-container__opening");
	var location = document.querySelectorAll(".location-container__location");
	var telephone = document.querySelectorAll(".telephone-container__telephone");
	var ticketInfo = document.querySelectorAll(".ticket-container__ticket");
	var initial = [listItem, image, name, strict, opening, location, telephone, ticketInfo];

	

	


};