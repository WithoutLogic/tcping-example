"use strict";

const spawn = require('child_process').spawn;

class Tcping {
	constructor(mod) {
		this.ping_min = 0;
		this.ping_max = 0;
		this.ping_avg = 0;
		this.history = [];
		this.spawn_tcping();
		this.mod = mod;
	}

	spawn_tcping = () => {
		const params = ['-t', '-i', '5', '79.110.94.212', '7805'];
		try {
			this.ping_checker = spawn(__dirname+'\\tcping.exe', params);
			this.ping_checker.stdout.on('data', this.callback_tcping.bind(this));
		} catch (e) {
			console.log(e);
		}
	}
	
	callback_tcping = (data) => {
		if (data === null) { return; }
		data = data.toString();
		const l = data.length;
		const out = data.slice(53, l - 5);
		if (out.length === 0) { return; }
		
		console.log("ping_shakan: " + out + "ms");
	}
	
	destructor = () => {
		try {
			this.ping_checker.kill();
		} catch(e) {
			console.log(e);
		}
	}
}

module.exports = Tcping;