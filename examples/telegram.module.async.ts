import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegrafI18nMiddleware, TelegrafI18nContext } from '../src';
// import { TelegrafI18nMiddleware, TelegrafI18nContext } from 'nestjs-telegraf-i18n';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: "<your_bot_token>",
        options: {
          contextType: TelegrafI18nContext,
        },
      }),
    }),
  ],
  providers: [ TelegrafI18nMiddleware ],
})
export class TelegramModule {}
