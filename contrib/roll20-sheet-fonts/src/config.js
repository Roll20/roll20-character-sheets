if (!process.env.DISCORD_ACTIVITY_CLIENT_ID) {
    throw new Error('DISCORD_ACTIVITY_CLIENT_ID environment variable is required');
}

export const CONFIG = {
    DISCORD_ACTIVITY_CLIENT_ID: process.env.DISCORD_ACTIVITY_CLIENT_ID,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    GITHUB_BASE_URL: 'https://raw.githubusercontent.com/Roll20/roll20-character-sheets/refs/heads/master',
    USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};