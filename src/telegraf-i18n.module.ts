import { Module, Global } from '@nestjs/common';
import { TelegrafI18nMiddlewareProvider } from './telegraf-i18n.middleware';

@Global()
@Module({
    providers: [TelegrafI18nMiddlewareProvider],
    exports: [TelegrafI18nMiddlewareProvider],
})
export class TelegrafI18nModule {}