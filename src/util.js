
export function loadExternalScript(id, src, test, timeoutAfter = 10000) {
	let alreadyThere;
	try {
		alreadyThere = test.call();
	} catch(error) {
		// reject(error);
	}

	if(alreadyThere) {
		return Promise.resolve();
	}

	const inDom = document.querySelectorAll(`script[src*="${id}"]`).length > 0;

	if(!inDom) {
		const f = document.getElementsByTagName('script')[0];
		const j = document.createElement('script');
		j.id = id;
		j.async = true;
		j.src = src;
		f.parentNode.insertBefore(j, f);
	}

	const every = 250; // 4 times a second
	let total = 0;

	return new Promise((resolve, reject) => {
		const callbackTimer = setInterval(() => {
			let loaded = false;
			try {
				loaded = test.call();
			} catch(error) {
				// reject(error);
			}

			if(loaded) {
				clearInterval(callbackTimer);
				resolve();

				return;
			}

			if(total > timeoutAfter) {
				clearInterval(callbackTimer);
				reject(new Error(`${id} could not be loaded!`));
				return;
			}

			total += every;
		}, every);
	});
}
