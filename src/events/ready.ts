import getEnv from '../utils/getEnv';
import postBotStats from '../others/postBotStats';
import checkPremiumGuilds from '../others/checkPremiumGuilds';
import Eris from 'eris';
import updateCounters from '../updateCounters';

const { DISCORD_PREFIX, UPDATE_COUNTER_INTERVAL } = getEnv();

const setStatus = (client: Eris.Client) => {};

const ready = (client: Eris.Client) => {
  const { users, guilds } = client;

  console.log(`Eris ready!`);

  console.log(`Serving to ${users.size} users in ${client.guilds.size} guilds`);
  setStatus(client);
  checkPremiumGuilds(guilds);

  setInterval(() => {
    console.log(
      `Serving to ${users.size} users in ${client.guilds.size} guilds`,
    );
    setStatus(client);
    postBotStats(guilds.size);
    checkPremiumGuilds(guilds);
  }, 1 * 60 * 60 * 1000);

  setInterval(() => {
    updateCounters(client.guilds);
  }, UPDATE_COUNTER_INTERVAL * 1000);
};

export default ready;
