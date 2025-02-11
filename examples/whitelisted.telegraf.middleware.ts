import { Middleware } from 'telegraf';
import { TelegrafI18nContext } from '../src';
// import { TelegrafI18nContext } from 'nestjs-telegraf-i18n';

const WHITELISTED_USERS: number[] = [123456789, 987654321]; // Replace with actual Telegram user IDs

export const whitelistMiddleware: Middleware<TelegrafI18nContext> = async (ctx: TelegrafI18nContext, next) => {
    if (!ctx.from) {
        return;
    }

    if (WHITELISTED_USERS.includes(ctx.from.id)) {
        await next();
    } else {
        await ctx.reply(ctx.t('errors.userNotWhitedMessage'));
    }
};