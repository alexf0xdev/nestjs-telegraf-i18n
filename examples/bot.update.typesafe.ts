import { Ctx, Start, Update } from 'nestjs-telegraf';
import { I18nTranslations } from './generated/i18n.generated';
import { TelegrafI18nContext } from '../src';
// import { TelegrafI18nContext } from 'nestjs-telegraf-i18n';

@Update()
export class BotUpdate {
  @Start()
  async start_command(@Ctx() ctx: TelegrafI18nContext<I18nTranslations>) {
    const internationalized_message = ctx.i18n.t("i18n.menus.hello.message");
    await ctx.reply(internationalized_message);
  }
}