import { I18nTranslations } from './generated/i18n.generated';
import { InjectBot, Update } from "nestjs-telegraf";
import { Telegraf } from "telegraf";
import { TelegrafI18nContext } from '../src';
// import { TelegrafI18nContext } from 'nestjs-telegraf-i18n';

@Update()
export class BotUpdate {
    constructor(
        @InjectBot() private readonly bot: Telegraf<TelegrafI18nContext<I18nTranslations>>
    ) {
        this.bot.help((ctx) => {
                const message = ctx.t("i18n.menus.help.message");
                ctx.reply(message)
            }
        )
    }
}