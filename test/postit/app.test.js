const electronPath = require('electron')
const {TestDriver} = require('./testDriver')

const app = new TestDriver({
    path: electronPath,
    args: ['./ui/electron/main.js'],
    env: {
        NODE_ENV: 'test'
    }
})

beforeEach(async () => {
    await app.isReady;
})

test.skip('electron Test Driver', async () => {

    let result = await app.rpc('a_test');

    expect(result).toBe(42);
})

afterEach(async () => {
    await app.stop();
})




