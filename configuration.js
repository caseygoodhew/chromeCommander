var apply = function(obj1, obj2) {
	if (!obj1 || typeof(obj1) !== 'object') {
		return obj1;
	}

	for (var i in obj2) {
		obj1[i] = obj2[i];
	}

	return obj1;
}


String.format = function() {
	var args = Array.prototype.slice.call(arguments);

	var str = args[0];
	if (!args.length || typeof(str) !== 'string') {
		return '';
	}

	var map = {};
	for (var i = 1; i < args.length; i++) {
		if (typeof(args[i]) === 'object' && args[i] !== null) {
			apply(map, args[i]);
		} else {
			map[i-1] = args[i];
		}
	}

	return str.replace(/{([a-zA-Z_. \-\+0-9]+)}/g, function(match, value) { 
		return map[value] === undefined ? match : map[value];
	});
};

var makeid = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}


var addNewKVPRow = function() {
	var el = document.getElementsByClassName('kvp-template')[0];
	
	var node = document.createElement('x');
	node.innerHTML = String.format(el.outerHTML, { group: makeid() });
	
	var templates = node.getElementsByClassName('template');
	for (var i = 0; i < templates.length; i++) {
		templates[i].className = templates[i].className.replace(/\btemplate\b/gi,'');
	}

	while (node.childNodes.length) {
		el.parentNode.appendChild(node.firstChild);
	}
}

addNewKVPRow();

var packageData = function() {
	var inputs = Array.prototype.slice.call(document.getElementsByTagName('input'));
	var textareas = Array.prototype.slice.call(document.getElementsByTagName('textarea'));
	var elements = inputs.concat(textareas);

	var map = {};
	var data = { map: [] };

	for (var i = 0; i < elements.length; i++) {
		var el = elements[i];

		var name = el.getAttribute('data-element');
		var group = el.getAttribute('data-group');
		var type = (el.getAttribute('type') || el.tagName).toLowerCase();
		var value;

		switch (type) {
			case 'checkbox':
				value = el.checked;
				break;
			case 'input':
			case 'textarea':
				value = el.value;
				break;
		}

		if (group) {
			map[group] = map[group] || {};
		}

		(group ? map[group] : data)[name] = value;
	}

	for (var i in map) {
		
		var m = map[i];
		var isEmpty = true;
		
		for (var j in m) {
			if (m[j] && typeof(m[j]) == 'string') {
				isEmpty = false;
				break;
			}
		}

		if (!isEmpty) {
			data.map.push(m);
		}
	}

	return data;
}

document.getElementById('add-new-kvp').addEventListener('click', addNewKVPRow);

document.getElementById('create-package').addEventListener('click', function() {
	var data = packageData();
	


	debugger;
});