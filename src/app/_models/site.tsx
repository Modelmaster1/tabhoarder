import { sites } from '~/server/db/schema';

type site = typeof sites.$inferSelect;

export default site;