const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    try {
        const workspace = process.env.GITHUB_WORKSPACE;

        const commands = `
            cd /github/workspace
            source /root/.bashrc
            nvm use 20
            npm i
            npm run build
        `;

        // Run your Docker container
        await exec.exec('docker', [
            'pull',
            '2minrain/devela:v2'
        ]);
        await exec.exec('docker', [
            'run',
            '--rm',
            '-v',
            `${workspace}:/github/workspace`,
            `2minrain/devela:v2`,
            '/bin/bash',
            '-c',
            commands
        ]);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();