"use strict";

const Tcping = require('./tcping');

module.exports = function test(mod) {
	let enabled = false,
		enterGameEvent = null,
		leaveGameEvent = null,
		TP = null;
	
	mod.game.on("enter_game", enterGameEvent = () => {
		if (TP) { TP.destructor(); }
	});
	mod.game.on("leave_game", leaveGameEvent = () => {
		if (TP) { TP.destructor(); }
	});
	
	mod.command.add("tcping", {
		$none() {
			enabled = !enabled;
			TP = new Tcping();
			console.log("tcping enabled");
		},
		param(server) {
			console.log("not yet ready");
		}
	}, this);
	
	this.destructor = () => {
		if (TP) {
			TP.destructor();
		}
		if (enterGameEvent) { 
			mod.game.off("enter_game", enterGameEvent);
		}
		if (leaveGameEvent) { 
			mod.game.off("leave_game", leaveGameEvent);
		}
		TP = null;
	}
};