import { Telegraf } from "telegraf";
import { InjectBot, Update } from 'nestjs-telegraf';
import { TelegrafI18nContext } from '../src';
// import { TelegrafI18nContext } from 'nestjs-telegraf-i18n';

@Update()
export class BotUpdate {
  constructor(
      @InjectBot() private readonly bot: Telegraf<TelegrafI18nContext>
  ) {
    this.bot.help((ctx) => {
          const message = ctx.i18n.t("i18n.menus.help.message");
          ctx.reply(message)
        }
    )
  }
}