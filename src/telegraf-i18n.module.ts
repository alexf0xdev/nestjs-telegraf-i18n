import { Module, Global } from '@nestjs/common';
import { TelegrafI18nMiddlewareProvider } from './telegraf-i18n.middleware';
import {TelegrafI18nContextGetterPatcher} from "./I18n-context-getter-patcher";

@Global()
@Module({
    providers: [TelegrafI18nMiddlewareProvider, TelegrafI18nContextGetterPatcher],
    exports: [TelegrafI18nMiddlewareProvider],
})
export class TelegrafI18nModule {}