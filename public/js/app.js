var mix = document.getElementById.bind(document);

var playASCII = e => {
	var players = e.page.querySelectorAll("asciinema-player");
	var idx = (! e.fragmentIndex || e.fragmentIndex < 0) ? 0 : e.fragmentIndex;
	var player = players[idx];
	if (!player) {
		return;
	}
	if (player.tagName !== "ASCIINEMA-PLAYER") {
		return null;
	}
	setTimeout(() => {
		player.play();
	}, 500);
};

var flowtimeRequested = false;
var start = function() {
	
	if (! flowtimeRequested) {
		var it = document.createElement("script");
		it.src = "js/flowtime.js";
		document.head.appendChild(it);
		flowtimeRequested = true;
	}
	
	if (! window.Flowtime || ! window.Brav1Toolbox || ! Prism) {
		return setTimeout(start, 500);
	}

	Flowtime.showProgress(true);
	// Flowtime.useOverviewVariant(true);
	Flowtime.clicker(true);
	// Flowtime.setCrossDirection(true);
	// Flowtime.scrollTheSection(true);
	Flowtime.onNavigation(playASCII);

	Flowtime.updateNavigation();

	// Prism.highlightAll(true, () => {
	Flowtime.start();
	// });
};

var pages = [];
for (var i = 0; i < 8; i++) {
	((pagePath, idx) => {
		pages.push(
			new Promise((resolve, reject) => {
				fetch(pagePath)
					.then(response => {
						response.text().then(txt => {
							pages[idx] = txt;
							resolve(txt);
						});
					})
					.catch(reject);
			})
		);
	})(`/parts/line${i + 1}.html`, i);
}
Promise.all(pages)
	.then(results => {
		mix("root").innerHTML = pages.join("\n");
		Promise.all(
			Array.from(document.querySelectorAll("div[data-svg]"))
				.map(svgDiv => {
					var svgPath = svgDiv.attributes['data-svg'].value;
					return new Promise((resolve, reject) => {
						fetch(`svg/${svgPath}.svg`)
							.then(response => {
								response.text().then(txt => {
									svgDiv.innerHTML = txt;
									resolve();
								});
							})
							.catch(reject);
					});
				})
		)
			.then(() => {
				Prism.fileHighlight();
				Prism.highlightAll();
				
				var it = document.createElement("script");
				it.src = "js/brav1toolbox.js";
				document.head.appendChild(it);
				
				setTimeout(start, 500);
			})
			.catch(console.log);
	})
	.catch(console.log);
