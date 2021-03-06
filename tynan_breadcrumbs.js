initiliaze();

function initiliaze() { /*removes any residual instances of breadcrumb feature*/
    window.removeEventListener("hashchange", timedFunction);
    document.removeEventListener("keydown", hotKeyEvent);
    var elem = document.querySelector('#recentLinks');
    var btn = document.querySelector('#closeCrumbs');
  	if(elem != null) { elem.parentNode.removeChild(elem); }
    if(btn != null) { btn.parentNode.removeChild(btn); }
}

//#recentLinks div to hold breadcrumbs
var breadCrumbDiv = document.createElement('div'); // #recentLinks div to hold breadcrumbs
breadCrumbDiv.id = 'recentLinks';
breadCrumbDiv.style.position = 'absolute';
breadCrumbDiv.style.left = '228px';
breadCrumbDiv.style.height = '45px';
breadCrumbDiv.style.padding = '10px';
var topBarDiv = document.getElementsByClassName("roam-topbar")[0];
topBarDiv.appendChild(breadCrumbDiv); //put it in the topbar div for z-index purposes
window.addEventListener("hashchange", timedFunction);

//div + button to stop/start listener, & show/hide breadcrumbs
var toggleDiv = document.createElement('div');
toggleDiv.id = 'closeCrumbs';
toggleDiv.style.position = 'absolute';
toggleDiv.style.left = '212px';
toggleDiv.style.height = '45px';
toggleDiv.style.padding = '10px';
topBarDiv.appendChild(toggleDiv);

var toggleButton = document.createElement("button");
toggleButton.id = 'buttonLayer';
toggleButton.style.border = '0';
toggleButton.style.color = 'green';
toggleButton.style.fontSize = '24px';
toggleButton.innerHTML = "‣";
toggleDiv.appendChild(toggleButton);
toggleButton.onclick = turnOnOff;

var urlArray = [];
var linksArray = [];
var onOff = true;
var n = 0;
//this function flips the toggle switch, then shows/hides the breadcrumbs and adds/removes listener
function turnOnOff() {
    onOff = !onOff;
    if (!onOff) {
        breadCrumbDiv.style.display = 'none';
        toggleButton.style.color = 'grey';
      	window.removeEventListener("hashchange", timedFunction);
    } else {
        breadCrumbDiv.style.display = 'block';
        toggleButton.style.color = 'green';
      	window.addEventListener("hashchange", timedFunction);
    }
}

//had to delay function for adding breadcrumbs to give page time to load
function timedFunction() {
    setTimeout(addPageToRecent, 150)
}

function addPageToRecent() {
    var pageUrl = window.location.href; //snags the url for said page
    if (urlArray.slice(0, 8).includes(pageUrl) == false) { //checks if the link already exists in the last 5 links
        addLinkElement(pageUrl);
    }
    else {
        var index = urlArray.indexOf(pageUrl);
        urlArray.splice(index, 1);
        linksArray.splice(index, 1);
        addLinkElement(pageUrl);
    }
}

function  addLinkElement(pageUrl) {
    var parent = document.getElementsByClassName("rm-title-display")[0]; //snags the page title
    var children = parent.children[0]; 
    var lastNine = pageUrl.substr(pageUrl.length - 9);
    var linkElement = "<a id='" + lastNine + "' href='" + pageUrl + "' class='recentLink' style='padding: 0 10px;'>" + children.innerHTML.substring(0, 25) + "</a>"; //adds <a> element to array, maximum 25 chars, increase substring size if you wish
    urlArray.unshift(pageUrl);
    linksArray.unshift(linkElement);
    linksArray = linksArray.slice(0, 8); //reduces the array to to 5 link max, in crease if you wish
    breadCrumbDiv.innerHTML = linksArray.slice(1, 8).join("‣"); //puts the <a> array into the breadCrumbDiv
    var linkElements = document.getElementsByClassName("recentLink");
    for(i=0; i<linkElements.length; i++){
        var linkNumber = "<span style='color: #FFFFFF; padding-right: 3px;' class='linkNumber'>" + (i+1).toString() + "</span>";
       linkElements[i].innerHTML = linkNumber + linkElements[i].innerHTML;
    }
}

document.addEventListener ("keydown", hotKeyEvent);
/*
function linkDivCreate() {
    var linkDiv = document.createElement('div');
    linkDiv.style.display = "inline-block";
    linkDiv.innerHTML = linksArray.splice(i, 1);
}
*/

function hotKeyEvent(zEvent) {
    if (zEvent.ctrlKey  &&  zEvent.key === "1") { clickLink(1); }
    if (zEvent.ctrlKey  &&  zEvent.key === "2") { clickLink(2); }
    if (zEvent.ctrlKey  &&  zEvent.key === "3") { clickLink(3); }
    if (zEvent.ctrlKey  &&  zEvent.key === "4") { clickLink(4); }
    if (zEvent.ctrlKey  &&  zEvent.key === "5") { clickLink(5); }
    if (zEvent.ctrlKey  &&  zEvent.key === "6") { clickLink(6); }
    if (zEvent.ctrlKey  &&  zEvent.key === "7") { clickLink(7); }
}

function clickLink(n) {
    var linkToClick = linksArray[n];
    if(linkToClick != null) {
        var linkId = linkToClick.substring(7, 16)
        var someLink = document.getElementById(linkId);
        simulateClick(someLink);
    }
}

var simulateClick = function (elem) {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
};