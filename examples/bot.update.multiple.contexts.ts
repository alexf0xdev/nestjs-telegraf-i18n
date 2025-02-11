import {Command, Ctx, Update} from 'nestjs-telegraf';
import {Scenes} from "telegraf";
import { TelegrafI18nContext } from '../src';
// import { TelegrafI18nContext } from 'nestjs-telegraf-i18n';

@Update()
export class BotUpdate {
  @Command('hello')
  async helloCommand(@Ctx() ctx: Scenes.WizardContext & TelegrafI18nContext) {
    // You have access to both the WizardContext and TelegrafI18nContext internals
    const internationalized_message = ctx._i18n.t("i18n.menus.hello.message");
    await ctx.reply(internationalized_message);
    await ctx.scene.enter('some_scene');
  }
}