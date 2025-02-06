import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegrafI18nModule, TelegrafI18nMiddlewareProvider, TelegrafI18nContext } from '../src';
// import { TelegrafI18nModule, TelegrafI18nMiddlewareProvider, TelegrafI18nContext } from 'nestjs-telegraf-i18n';

@Module({
  imports: [
    TelegrafI18nModule,
    TelegrafModule.forRootAsync({
      useFactory: (telegrafI18nMiddlewareProvider: TelegrafI18nMiddlewareProvider) => ({
        token: "<your_bot_token>",
        options: {
          contextType: TelegrafI18nContext,
        },
        middlewares: [
          telegrafI18nMiddlewareProvider.telegrafI18nMiddleware,
        ],
      }),
    }),
  ],
})
export class TelegramModule {}
