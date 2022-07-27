import * as path from 'path';
// import * as Mocha from 'mocha';
const mochA = require("mocha");
const glob = require("glob");

export function run(): Promise<void> {
	// Create the mocha test
	const mocha = new mochA({
		ui: 'tdd',
		color: true
	});

	const testsRoot = path.resolve(__dirname, '..');

	return new Promise((c, e) => {
		glob('**/**.test.js', { cwd: testsRoot }, (err:any, files:any) => {
			if (err) {
				return e(err);
			}

			// Add files to the test suite
			files.forEach((f:any) => mocha.addFile(path.resolve(testsRoot, f)));

			try {
				// Run the mocha test
				mocha.run((failures:any) => {
					if (failures > 0) {
						e(new Error(`${failures} tests failed.`));
					} else {
						c();
					}
				});
			} catch (err) {
				console.error(err);
				e(err);
			}
		});
	});
}
