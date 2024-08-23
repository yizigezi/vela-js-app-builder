const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    try {
        const workspace = process.env.GITHUB_WORKSPACE;

        await exec.exec('cd', [workspace]);
        await exec.exec('npm', ['i']);
        await exec.exec('npm', ['run', 'build']);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();